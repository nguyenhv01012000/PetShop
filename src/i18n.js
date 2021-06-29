import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  English: {
    translation: {
      "title1": "Locator for",
      "title2": "for dogs and cats",
      "signin": "Login",
      "signup": "Create Account",
      "username":"User name",
      "password":"password",
      "email" : "Email",
      "forgotPassword": "Forgot password",
      "createAccount" : "Create New Account",
      "hasAccount" : "Already have an account"
    }
  },
  Español: {
    translation: {
      "title1": "Dispositivos de posicionamiento",
      "title2": "para perros y gatos",
      "signin": "Iniciar sesión",
      "signup": "Crear una cuenta",
      "username":"Nombre de usuario",
      "password":"contraseña",
      "email" : "Email",
      "forgotPassword": "Se te olvidó tu contraseña",
      "createAccount" : "crear una nueva cuenta",
      "hasAccount" : "Ya tienes una cuenta"
    }
  },
  Français: {
    translation: {
      "title1": "Dispositifs de positionnement",
      "title2": "pour chiens et chats",
      "signin": "Connexion",
      "signup": "Créer un compte",
      "username":"Nom d'utilisateur",
      "password":"le mot de passe",
      "email" : "Email",
      "forgotPassword": "Mot de passe oublié",
      "createAccount" : "Créer un nouveau compte",
      "hasAccount" : "Vous avez déjà un compte"
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
      "hasAccount" : "Đã có tài khoản"
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