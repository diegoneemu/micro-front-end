import getLocale from "./locales";

export const load = (language: string) => {
  let locale: any = language;

  if (language.includes("-")) {
    locale = language.replace("-", "_");
  }

  return getLocale(locale);
};
