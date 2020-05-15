function skipws(str) {
  var i = 0;

  do {
    if (str[i] !== ' ' && str[i] !== '\t') {
      return i;
    }
  } while (++i < str.length);

  return i;
}

var parsers: any = {};

parsers.parse_tag = function parse_tag(str) {
  var result = str.match(/^\s*@(\S+)/);

  if (!result) {
    throw new Error('Invalid `@tag`, missing @ symbol');
  }

  return {
    source: result[0],
    data: {
      tag: result[1]
    }
  };
};

parsers.parse_type = function parse_type(str, data) {
  if (data.errors && data.errors.length) {
    return null;
  }

  var pos = skipws(str);
  var res = '';
  var curlies = 0;

  if (str[pos] !== '{') {
    return null;
  }

  while (pos < str.length) {
    curlies += str[pos] === '{' ? 1 : str[pos] === '}' ? -1 : 0;
    res += str[pos];
    pos++;

    if (curlies === 0) {
      break;
    }
  }

  if (curlies !== 0) {
    throw new Error('Invalid `{type}`, unpaired curlies');
  }

  return {
    source: str.slice(0, pos),
    data: {
      type: res.slice(1, -1)
    }
  };
};

parsers.parse_name = function parse_name(str, data) {
  if (data.errors && data.errors.length) {
    return null;
  }

  var pos = skipws(str);
  var name = '';
  var brackets = 0;
  var res: any = {
    optional: false
  }; // if it starts with quoted group assume it is a literal

  var quotedGroups = str.slice(pos).split('"');

  if (
    quotedGroups.length > 1 &&
    quotedGroups[0] === '' &&
    quotedGroups.length % 2 === 1
  ) {
    name = quotedGroups[1];
    pos += name.length + 2; // assume name is non-space string or anything wrapped into brackets
  } else {
    while (pos < str.length) {
      brackets += str[pos] === '[' ? 1 : str[pos] === ']' ? -1 : 0;
      name += str[pos];
      pos++;

      if (brackets === 0 && /\s/.test(str[pos])) {
        break;
      }
    }

    if (brackets !== 0) {
      throw new Error('Invalid `name`, unpaired brackets');
    }

    res = {
      name: name,
      optional: false
    };

    if (name[0] === '[' && name[name.length - 1] === ']') {
      res.optional = true;
      name = name.slice(1, -1);

      if (name.indexOf('=') !== -1) {
        var parts = name.split('=');
        name = parts[0];
        res['default'] = parts[1].replace(/^(["'])(.+)(\1)$/, '$2');
      }
    }
  }

  res.name = name;
  return {
    source: str.slice(0, pos),
    data: res
  };
};

parsers.parse_description = function parse_description(str, data) {
  if (data.errors && data.errors.length) {
    return null;
  }

  var result = str.match(/^\s+((.|\s)+)?/);

  if (result) {
    return {
      source: result[0],
      data: {
        description: result[1] === undefined ? '' : result[1]
      }
    };
  }

  return null;
};

var MARKER_START = '/**';
var MARKER_START_SKIP = '/***';
var MARKER_END = '*/';
/* ------- util functions ------- */

function find(list, filter) {
  var i = list.length;
  var matchs = true;

  while (i--) {
    for (var k in filter) {
      if ({}.hasOwnProperty.call(filter, k)) {
        matchs = filter[k] === list[i][k] && matchs;
      }
    }

    if (matchs) {
      return list[i];
    }
  }

  return null;
}
/* ------- parsing ------- */

/**
 * Parses "@tag {type} name description"
 * @param {string} str Raw doc string
 * @param {Array<function>} parsers Array of parsers to be applied to the source
 * @returns {object} parsed tag node
 */

function parse_tag(str, parsers) {
  if (typeof str !== 'string' || str[0] !== '@') {
    return null;
  }

  var data = parsers.reduce(
    function (state, parser) {
      var result;

      try {
        result = parser(state.source, Object.assign({}, state.data));
      } catch (err) {
        state.data.errors = (state.data.errors || []).concat(
          parser.name + ': ' + err.message
        );
      }

      if (result) {
        state.source = state.source.slice(result.source.length);
        state.data = Object.assign(state.data, result.data);
      }

      return state;
    },
    {
      source: str,
      data: {}
    }
  ).data;
  data.optional = !!data.optional;
  data.type = data.type === undefined ? '' : data.type;
  data.name = data.name === undefined ? '' : data.name;
  data.description = data.description === undefined ? '' : data.description;
  return data;
}
/**
 * Parses comment block (array of String lines)
 */

function parse_block(source, opts) {
  var trim = opts.trim
    ? function (s) {
        return s.trim();
      }
    : function (s) {
        return s;
      };
  var toggleFence =
    typeof opts.fence === 'function'
      ? opts.fence
      : function (line) {
          return line.split(opts.fence).length % 2 === 0;
        };
  var source_str = source
    .map(function (line) {
      return trim(line.source);
    })
    .join('\n');
  source_str = trim(source_str);
  var start = source[0].number; // merge source lines into tags
  // we assume tag starts with "@"

  source = source
    .reduce(
      function (state, line) {
        line.source = trim(line.source); // start of a new tag detected

        if (line.source.match(/^\s*@(\S+)/) && !state.isFenced) {
          state.tags.push({
            source: [line.source],
            line: line.number
          }); // keep appending source to the current tag
        } else {
          var tag = state.tags[state.tags.length - 1];

          if (
            opts.join !== undefined &&
            opts.join !== false &&
            opts.join !== 0 &&
            !line.startWithStar &&
            tag.source.length > 0
          ) {
            var _source;

            if (typeof opts.join === 'string') {
              _source = opts.join + line.source.replace(/^\s+/, '');
            } else if (typeof opts.join === 'number') {
              _source = line.source;
            } else {
              _source = ' ' + line.source.replace(/^\s+/, '');
            }

            tag.source[tag.source.length - 1] += _source;
          } else {
            tag.source.push(line.source);
          }
        }

        if (toggleFence(line.source)) {
          state.isFenced = !state.isFenced;
        }

        return state;
      },
      {
        tags: [
          {
            source: []
          }
        ],
        isFenced: false
      }
    )
    .tags.map(function (tag) {
      tag.source = trim(tag.source.join('\n'));
      return tag;
    }); // Block description

  var description = source.shift(); // skip if no descriptions and no tags

  if (description.source === '' && source.length === 0) {
    return null;
  }

  var tags = source.reduce(function (tags, tag) {
    var tag_node = parse_tag(tag.source, opts.parsers);

    if (!tag_node) {
      return tags;
    }

    tag_node.line = tag.line;
    tag_node.source = tag.source;

    if (opts.dotted_names && tag_node.name.includes('.')) {
      var parent_name;
      var parent_tag;
      var parent_tags = tags;
      var parts = tag_node.name.split('.');

      while (parts.length > 1) {
        parent_name = parts.shift();
        parent_tag = find(parent_tags, {
          tag: tag_node.tag,
          name: parent_name
        });

        if (!parent_tag) {
          parent_tag = {
            tag: tag_node.tag,
            line: Number(tag_node.line),
            name: parent_name,
            type: '',
            description: ''
          };
          parent_tags.push(parent_tag);
        }

        parent_tag.tags = parent_tag.tags || [];
        parent_tags = parent_tag.tags;
      }

      tag_node.name = parts[0];
      parent_tags.push(tag_node);
      return tags;
    }

    return tags.concat(tag_node);
  }, []);
  return {
    tags: tags,
    line: start,
    description: description.source,
    source: source_str
  };
}
/**
 * Produces `extract` function with internal state initialized
 */

export function mkextract(opts) {
  var chunk = null;
  var indent = 0;
  var number = 0;
  opts = Object.assign(
    {},
    {
      trim: true,
      dotted_names: false,
      fence: '```',
      parsers: [
        PARSERS.parse_tag,
        PARSERS.parse_type,
        PARSERS.parse_name,
        PARSERS.parse_description
      ]
    },
    opts || {}
  );
  /**
   * Read lines until they make a block
   * Return parsed block once fullfilled or null otherwise
   */

  return function extract(line) {
    var result = null;
    var startPos = line.indexOf(MARKER_START);
    var endPos = line.indexOf(MARKER_END); // if open marker detected and it's not, skip one

    if (startPos !== -1 && line.indexOf(MARKER_START_SKIP) !== startPos) {
      chunk = [];
      indent = startPos + MARKER_START.length;
    } // if we are on middle of comment block

    if (chunk) {
      var lineStart = indent;
      var startWithStar = false; // figure out if we slice from opening marker pos
      // or line start is shifted to the left

      var nonSpaceChar = line.match(/\S/); // skip for the first line starting with /** (fresh chunk)
      // it always has the right indentation

      if (chunk.length > 0 && nonSpaceChar) {
        if (nonSpaceChar[0] === '*') {
          var afterNonSpaceCharIdx = nonSpaceChar.index + 1;
          var extraCharIsSpace = line.charAt(afterNonSpaceCharIdx) === ' ';
          lineStart = afterNonSpaceCharIdx + (extraCharIsSpace ? 1 : 0);
          startWithStar = true;
        } else if (nonSpaceChar.index < indent) {
          lineStart = nonSpaceChar.index;
        }
      } // slice the line until end or until closing marker start

      chunk.push({
        number: number,
        startWithStar: startWithStar,
        source: line.slice(lineStart, endPos === -1 ? line.length : endPos)
      }); // finalize block if end marker detected

      if (endPos !== -1) {
        result = parse_block(chunk, opts);
        chunk = null;
        indent = 0;
      }
    }

    number += 1;
    return result;
  };
}
/* ------- Public API ------- */

export function parse(source, opts?) {
  var blocks = [];
  var extract = mkextract(opts);
  var lines = source.split(/\n/);
  lines.forEach(function (line) {
    var block = extract(line);

    if (block) {
      blocks.push(block);
    }
  });
  return blocks;
}

export const PARSERS = parsers;
