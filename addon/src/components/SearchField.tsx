import React from "react";
import { useCallback } from "react";
import { Icons } from "@storybook/components";
import { styled } from "@storybook/theming";
import { Input } from "./Input";

const SearchHolder = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  "&:focus-within svg": {
    color: theme.color.defaultText,
  },
}));

const SearchIcon = styled(Icons)(({ theme }) => ({
  width: 12,
  height: 12,
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 1,
  pointerEvents: "none",
  color: theme.textMutedColor,
}));

const ClearButton = styled.button(({ theme }) => ({
  width: 16,
  height: 16,
  padding: 4,
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 1,
  background: "rgba(0,0,0,0.1)",
  border: "none",
  borderRadius: 16,
  color: theme.color.defaultText,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClearIcon = styled(Icons)(({ theme }) => ({}));

const SearchInput = styled(Input)(({ theme }) => ({
  paddingLeft: 28,
  paddingRight: 28,
  height: 32,
}));

interface SearchFieldProps {
  style?: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, onChange, style }: SearchFieldProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  return (
    <SearchHolder className="token-search" style={style}>
      <SearchIcon icon="search" />
      <SearchInput
        value={value}
        onChange={handleChange}
        placeholder="Provide a token name …"
      />
      <ClearButton onClick={handleClear}>
        <ClearIcon icon="cross" />
      </ClearButton>
    </SearchHolder>
  );
}
