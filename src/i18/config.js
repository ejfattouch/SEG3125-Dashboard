import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsEN from "@/locales/en/translation.json";
import translationsFR from "@/locales/fr/translation.json";


i18n.use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: translationsEN,
            },
            fr: {
                translation: translationsFR,
            },
        },
    });

export default i18n;