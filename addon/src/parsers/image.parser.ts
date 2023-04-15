import { Category } from "../types/category.types";
import { File } from "../types/config.types";
import { Token, TokenPresenter, TokenSourceType } from "../types/token.types";
import { extname, basename, relative } from "path";
import { readFileSync } from "fs";

export async function parsePngFiles(
  files: File[] = []
): Promise<{ categories: Category[] }> {
  const tokens = determineTokens(files);

  let categoryNames = tokens
    .map((token) => token.categoryName)
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    categories: categoryNames.map((name) => {
      return {
        name: name || "Images",
        presenter: TokenPresenter.IMAGE,
        tokens: tokens.filter((token) => token.categoryName === name),
      };
    }),
  };
}

function determineTokens(files: File[]): Token[] {
  if (!files) {
    return [];
  }

  return files
    .map((file) => {
      const path = relative(process.cwd(), file.filename);
      return {
        name: basename(file.filename, extname(file.filename)),
        description: path,
        categoryName: "Images",
        presenter: TokenPresenter.IMAGE,
        rawValue: path,
        sourceType: TokenSourceType.IMAGE,
        value: toBase64(file.filename),
      };
    })
    .filter((token) => token.name);
}

function toBase64(filePath: string) {
  // read binary data
  const bitmap = readFileSync(filePath);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString("base64");
}
