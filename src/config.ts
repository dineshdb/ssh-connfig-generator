import { parse as parseCsv } from "@std/csv/parse";

export async function fromCSV(
  file: string,
  { skipFirstRow = true, separator = "," } = {},
): Promise<unknown[]> {
  const content = await Deno.readTextFile(file);
  return fromCSVContent(content, { separator, skipFirstRow });
}

export const fromCSVContent = (
  content: string,
  { skipFirstRow = true, separator = "," },
) =>
  parseCsv(content, {
    separator,
    skipFirstRow,
  });
