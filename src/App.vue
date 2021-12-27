<template>
  <v-app id="app" style="background: #FFFFF">
    <AppBar/>
    <v-main>
      <Summary/>
      <Question/>
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
    //
  }),

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