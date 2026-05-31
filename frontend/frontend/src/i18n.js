import i18n from "i18next";

import { initReactI18next }
from "react-i18next";

const resources = {

  en: {

    translation: {

      budget:
        "Budget Settings",

      income:
        "Total Income",

      expense:
        "Total Expense",

      balance:
        "Current Balance",

      transactions:
        "Transactions",

    },

  },

  hi: {

    translation: {

      budget:
        "बजट सेटिंग्स",

      income:
        "कुल आय",

      expense:
        "कुल खर्च",

      balance:
        "वर्तमान बैलेंस",

      transactions:
        "लेनदेन",

    },

  },

};

i18n
.use(initReactI18next)
.init({

  resources,

  lng: "en",

  fallbackLng: "en",

  interpolation: {

    escapeValue: false,

  },

});

export default i18n;