import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
            xs: 200,
        },
    },
    theme: {
        themes: {
            light: {
                primary: colors.teal,
                secondary: "#bcc4db",
                accent: "#efca08",
                accent2: "#7b0828",
                warning: "#F08700",
                error: "#ed254e",
                card: "#fafafa",
                background: "#B3D8D5",
                question: colors.shades.black
            },
            dark: {
                primary: colors.teal,
                secondary: "#5B5F97",
                accent: "#efca08",
                accent2: "#7b0828",
                warning: "#F08700",
                error: "#ed254e",
                card: "#3F4164",
                background: "#EEEEEE",
                question: colors.shades.white
            }
        }
    }
});
