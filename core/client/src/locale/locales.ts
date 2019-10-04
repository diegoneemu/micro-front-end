const getLocale = (language: string) => {
  let locale = null;

  switch (language) {
    case "pt-BR":
      locale = require("./pt-BR.json");
    case "en-US":
      locale = require("./en-US.json");
  }

  return locale;
};

export default getLocale;
