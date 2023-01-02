<template>
  <v-app id="app" style="background: #FFFFF">
    <AppBar/>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="8">
            <Summary @settings="applySettings($event)"/>
            <Question :settings="settings" @error="displayError($event)" ref="question"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Question from './components/Question.vue';
import AppBar from './components/AppBar.vue';
import Summary from "./components/Summary.vue";

export default {
  name: 'App',

  components: {
    AppBar,
    Question,
    Summary
  },

  data: () => ({
    settings: null,
  }),

  methods:{
    applySettings(event){
      this.settings = Object.assign({}, event);
      this.resetHistory()
    },
    displayError(event){
      console.error(event);
    },
    resetHistory(){
      this.$refs.question.resetHistory();
    }
  },

  beforeMount(){
    if(localStorage.getItem("dark-theme")){
      try {
        this.$vuetify.theme.dark = (localStorage.getItem("dark-theme")=='true');
      } catch (error) {
        localStorage.removeItem('dark-theme');
      }
    } else this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
    .v-card__text, .v-card__title {
       word-break: normal; /* maybe !important  */
    }
</style>