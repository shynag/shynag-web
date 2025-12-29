import { DEFAULT_LOCALE } from "../constants";

export function formatDate(
  date: Date,
  locale: string = DEFAULT_LOCALE
): string {
  return new Intl.DateTimeFormat(locale).format(date);
}
