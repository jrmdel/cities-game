<template>
  <v-app-bar app flat color="secondary">
      <div class="d-flex align-center">
        <span class="text-h6 font-weight-regular">City </span>
        <v-icon color="primary">mdi-compass-outline</v-icon>
        <span class="text-h6 font-weight-regular"> Compass</span>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <v-switch v-model="computedTheme" inset 
        :prepend-icon="(computedTheme) ? 'mdi-weather-night' : 'mdi-white-balance-sunny'" hide-details></v-switch>
      </div>
      <v-divider class="mx-3" inset vertical></v-divider>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-app-bar>
</template>

<script>
export default {

  computed: {
    computedTheme:{
      get(){
        return this.$vuetify.theme.dark || null
      },
      set(value){
        this.$vuetify.theme.dark = value;
        localStorage.setItem("dark-theme", value);
      }
    }, 
  },

  data: ()=>({
    //
  })
}
</script>