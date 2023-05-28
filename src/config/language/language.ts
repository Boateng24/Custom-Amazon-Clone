import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';


// Initialize i18next
i18next.use(initReactI18next).init({
    resources:{
        en: {
            translation:{
                //English translation here 
            }
        }
    },
    lng: 'en', // Set default language to English
    fallbackLng: 'en', // Use 'en' as the fallback language
    interpolation:{
        escapeValue: false // React already escapes output by default, so disable it here
    }

})

export default i18next;