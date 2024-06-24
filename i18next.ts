import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: {
            translation: en
        },
        uz: {
            translation: uz
        },
        ru: {
            translation: ru
        }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the current language translation is not available
    interpolation: {
        escapeValue: false // React already does escaping
    }
});

export default i18n;
