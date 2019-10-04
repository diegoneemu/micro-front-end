import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { StoreProvider } from "./store/Store";
import moment from "moment";
import { load } from "./locale/loadLocale";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const root = document.getElementById("root");
const defaultLanguage = "pt-BR";

interface ISession {
  user: any;
}
interface IGlobal {
  session: ISession;
}
declare global {
  interface Window {
    global: IGlobal;
    getLabel: Function;
    moment: any;
    i18n: any;
  }
}

window.moment = moment;
window.i18n = i18n;
window.getLabel = i18n.getFixedT(defaultLanguage, ["client", "translation"]);
window.global = {
  session: {
    user: null
  }
};

function app() {
  ReactDOM.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    root
  );
}

function login() {
  ReactDOM.render(<App />, root);
}

function setGlobalSessionData(data: any) {
  window.global.session = data;

  if (!window.global.session.user.lng) {
    window.global.session.user.lng = "pt-BR";
  }
}

function localeSettings(locale: string) {
  moment.updateLocale(locale, {});

  i18n.use(initReactI18next).init({
    lng: locale,
    debug: false,
    fallbackLng: locale,
    useDataAttrOptions: true,
    resources: {
      "en-US": {
        translation: load("en-US")
      },
      "pt-BR": {
        translation: load("pt-BR")
      }
    },
    interpolation: {
      escapeValue: false
    }
  });
}

localeSettings(defaultLanguage);

// TODO: carregar o usuário a partir do back

if (!window.global.session.user) ReactDOM.render(<App />, root);
