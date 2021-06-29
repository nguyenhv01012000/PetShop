import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  English: {
    translation: {
      "title1": "Locator for",
      "title2": "cho chó và mèo",
      "signin": "Đăng nhập",
      "signup": "Tạo tài khoản",
      "username":"Tên Đăng Nhập",
      "password":"Mật khẩu",
      "email" : "Email",
      "forgotPassword": "Quên Mật Khẩu",
      "createAccount" : "Tạo Tài Khoản Mới",
    }
  },
  Español: {
    translation: {
      "title1": "Thiết bị định vị",
      "title2": "cho chó và mèo",
      "signin": "Đăng nhập",
      "signup": "Tạo tài khoản",
      "username":"Tên Đăng Nhập",
      "password":"Mật khẩu",
      "email" : "Email",
      "forgotPassword": "Quên Mật Khẩu",
      "createAccount" : "Tạo Tài Khoản Mới",
    }
  },
  Français: {
    translation: {
      "title1": "Thiết bị định vị",
      "title2": "cho chó và mèo",
      "signin": "Đăng nhập",
      "signup": "Tạo tài khoản",
      "username":"Tên Đăng Nhập",
      "password":"Mật khẩu",
      "email" : "Email",
      "forgotPassword": "Quên Mật Khẩu",
      "createAccount" : "Tạo Tài Khoản Mới",
    }
  },
  ViệtNam: {
    translation: {
      "title1": "Thiết bị định vị",
      "title2": "cho chó và mèo",
      "signin": "Đăng nhập",
      "signup": "Tạo tài khoản",
      "username":"Tên Đăng Nhập",
      "password":"Mật khẩu",
      "email" : "Email",
      "forgotPassword": "Quên Mật Khẩu",
      "createAccount" : "Tạo Tài Khoản Mới",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;