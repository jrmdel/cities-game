<template>
  <v-container class="pa-6 mt-lg-12">
    <v-card flat >
      <v-card-title class="text-h5 text-sm-h4 font-weight-light">
        <span>Which department is this city in ?</span>
        <v-spacer></v-spacer>
        <v-icon class="d-flex" @click="settings = !settings" >mdi-cog</v-icon>
      </v-card-title>
      <v-card-text>
        <v-expand-transition>
          <div v-show="settings">
            <v-row align="center" justify="start">
              <v-col cols="4">
                <v-radio-group v-model="level">
                  <v-radio color="accent2" label="Easy" :value="1"></v-radio>
                  <v-radio color="accent2" label="Medium" :value="2"></v-radio>
                  <v-radio color="accent2" label="Hard" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-btn dark depressed large color="accent2" @click="saveSettings">PLAY</v-btn>
          </div>
        </v-expand-transition>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data:()=>({
    settings: true,
    level: 1,
  }),

  methods:{
    toggleSettings(){
      this.settings = !this.settings;
    },
    saveSettings(){
      this.$emit("settings", { level: this.level });
      setTimeout(()=> {
        this.settings = false;
      }, 250)
    }
  }
}
</script>