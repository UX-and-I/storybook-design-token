import React from "react";
import { useMemo, useState, useRef } from "react";
import { CopyIcon, InfoIcon } from "@storybook/icons";
import {
  Button,
  TooltipMessage,
  TooltipNote,
  WithTooltip,
} from "storybook/internal/components";
import { styled } from "storybook/theming";
import { createPortal } from "react-dom";

import { Category } from "../types/category.types";
import { ClipboardButton } from "./ClipboardButton";
import { PresenterMapType, TokenPreview } from "./TokenPreview";
import { TokenValue } from "./TokenValue";
import { ToolButton } from "./ToolButton";
import { useFilteredTokens } from "../hooks/useFilteredTokens";
import { Popup } from "./Popup";
import { usePopup } from "../hooks/usePopup";
import { Token } from "../types/token.types";

interface TokenCardsProps {
  categories: Category[];
  padded?: boolean;
  readonly?: boolean;
  showValueColumn?: boolean;
  pageSize?: number;
  presenters?: PresenterMapType;
  filterNames?: string[];
  usageMap?: Record<string, string[]>;
  theme?: string;
}

export const TokenCards = ({
  categories,
  padded = true,
  readonly,
  showValueColumn = true,
  pageSize = 50,
  presenters,
  filterNames,
  usageMap,
  theme,
}: TokenCardsProps) => {
  const [tokenValueOverwrites, setTokenValueOverwrites] = useState<{
    [tokenName: string]: any;
  }>({});
  const [page, setPage] = useState(0);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const { popup, popupRef, handleContextMenu } = usePopup({
    usageMap,
    getElementRef: (token: Token) => cardRefs.current.get(token.name) || null,
    getTokenName: (token: Token) => token.name,
  });

  const Container = useMemo(
    () =>
      styled.div(() => ({
        display: "grid",
        columnGap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        padding: padded ? 15 : undefined,
        rowGap: 12,
      })),
    []
  );

  const Card = useMemo(
    () =>
      styled.div(({ theme }) => ({
        boxShadow:
          "rgb(0 0 0 / 10%) 0px 1px 3px 1px, rgb(0 0 0 / 7%) 0px 0px 0px 1px",
        borderRadius: 4,
        color: theme.color.defaultText,
        fontFamily: theme.typography.fonts.base,
        fontSize: theme.typography.size.s1,
        padding: 12,
        overflow: "hidden",

        ":hover": {
          backgroundColor: theme.background.hoverable,
        },

        "> *:not(:last-child)": {
          marginBottom: 8,
        },

        svg: {
          maxWidth: "100%",
          maxHeight: "100%",
        },
      })),
    []
  );

  const TokenName = styled.span(({ theme }) => ({
    fontFamily: theme.typography.fonts.mono,
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s1,
  }));

  const Pagination = useMemo(
    () =>
      styled.div(({ theme }) => ({
        alignItems: "center",
        color: theme.color.defaultText,
        display: "flex",
        fontFamily: theme.typography.fonts.base,
        fontSize: theme.typography.size.s1,
        justifyContent: "space-between",
        paddingRight: padded ? 15 : undefined,
        paddingBottom: padded ? 48 : undefined,
        paddingLeft: padded ? 15 : undefined,
        marginTop: 8,

        "& > div": {
          display: "flex",
          gap: 8,
        },
      })),
    []
  );

  const tokens = useFilteredTokens(categories, filterNames, theme);

  const pages = useMemo(() => Math.ceil(tokens.length / pageSize), [tokens]);

  return (
    <>
      <Container>
        {tokens
          .slice(page * pageSize, page * pageSize + pageSize)
          .map((token, index) => (
            <Card
              key={token.name + "-card-" + index}
              ref={(el: HTMLDivElement) => {
                if (el) cardRefs.current.set(token.name, el);
              }}
              onContextMenu={(e: React.MouseEvent<Element, MouseEvent>) =>
                handleContextMenu(e, token)
              }
            >
              <div>
                <TokenName>{token.name}</TokenName>

                <WithTooltip
                  hasChrome={false}
                  tooltip={<TooltipNote note="Copy to clipboard" />}
                >
                  <ClipboardButton
                    button={
                      <ToolButton>
                        <CopyIcon />
                      </ToolButton>
                    }
                    value={token.name}
                  />
                </WithTooltip>

                {token.description && (
                  <WithTooltip
                    tooltip={<TooltipMessage desc={token.description} />}
                  >
                    <ToolButton>
                      <InfoIcon />
                    </ToolButton>
                  </WithTooltip>
                )}
              </div>

              {showValueColumn && (
                <TokenValue
                  onValueChange={(newValue) => {
                    setTokenValueOverwrites((tokenValueOverwrites) => ({
                      ...tokenValueOverwrites,
                      [token.name]:
                        newValue === token.rawValue ? undefined : newValue,
                    }));
                  }}
                  readonly={readonly}
                  token={token}
                />
              )}

              <TokenPreview
                presenters={presenters}
                token={{
                  ...token,
                  value: tokenValueOverwrites[token.name] || token.value,
                }}
              />
            </Card>
          ))}
      </Container>

      {pages > 1 && (
        <Pagination>
          <span>
            Page {page + 1} of {pages}
          </span>
          <div>
            <Button
              disabled={page === 0}
              onClick={() => setPage((page) => Math.max(0, page - 1))}
              tertiary
              small
            >
              Previous page
            </Button>
            <Button
              disabled={page >= pages - 1}
              onClick={() => setPage((page) => Math.min(page + 1, pages - 1))}
              tertiary
              small
            >
              Next page
            </Button>
          </div>
        </Pagination>
      )}

      {popup &&
        usageMap &&
        createPortal(
          <Popup ref={popupRef} style={{ top: popup.top, left: popup.left }}>
            {usageMap && usageMap[popup.tokenName] ? (
              <>
                <div>Used in:</div>
                <ul>
                  {usageMap[popup.tokenName].map((usage, index) => (
                    <li key={index}>{usage}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div>Token might be unused or global, please check</div>
            )}
          </Popup>,
          document.body
        )}
    </>
  );
};
