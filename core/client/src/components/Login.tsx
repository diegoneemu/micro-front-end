import React from "react";
import { useTranslation } from "react-i18next";

function Login(props: any): JSX.Element {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <form>
        <label>
          {t("login.userName")}:
          <input type="text" />
        </label>
        <br />
        <label>
          {t("login.password")}:
          <input type="text" />
        </label>
      </form>
    </div>
  );
}

export default Login;
