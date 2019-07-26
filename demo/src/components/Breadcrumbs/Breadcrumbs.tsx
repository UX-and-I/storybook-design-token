import './Breadcrumbs.css';

import React, { Fragment } from 'react';

import { ShIcon } from '../Icon/Icon';

interface Breadcrumb {
  title: string;
  url: string;
}

interface BreadcrumbProps {
  links: Breadcrumb[];
}

export function ShBreadcrumbs({ links }: BreadcrumbProps) {
  return (
    <nav className="sh-breadcrumbs">
      {links.map((link, index) => (
        <Fragment key={index}>
          <a className="sh-breadcrumbs__link" href={link.url}>
            {link.title}
          </a>
          {index < links.length - 1 && (
            <ShIcon glyph="chevron-right" size="s" />
          )}
        </Fragment>
      ))}
    </nav>
  );
}
