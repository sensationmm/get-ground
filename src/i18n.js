import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEnglish from './locales/en/translation.json';
import translationGerman from './locales/de/translation.json';

i18n
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: translationEnglish
      },
      de: {
        translation: translationGerman
      }
    },
  });


export default i18n;

// import i18n from "i18next"
// import Backend from "i18next-xhr-backend"
// import LanguageDetector from "i18next-browser-languagedetector"
// import { reactI18nextModule } from "react-i18next"

// i18n
//   .use(Backend)
//   .use(reactI18nextModule)
//   .use(LanguageDetector)
//   .init({
//     fallbackLng: "en",

//     // have a common namespace used around the full app
//     ns: ["translations"],
//     defaultNS: "translations",

//     debug: true,

//     react: {
//       wait: true,
//     },
//   })

// export default i18n
