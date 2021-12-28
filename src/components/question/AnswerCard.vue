<template>
  <v-card class="card-fix" outlined @click="actOnClick" :loading="loading" :disabled="disabled" min-height="170">
    <v-card-title>
      {{ getProposalNumber }} - {{ getProposalTitle }}
    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="7" lg="5">
            <DepartmentSvg :id="getProposalNumber" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import DepartmentSvg from "./DepartmentSvg.vue";

export default {

  components:{
    DepartmentSvg
  },

  props:{
    proposal:{
      type: Object,
      default: ()=>{}
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },

  computed:{
    getColor(){
      return this.$vuetify.theme.themes[this.$vuetify.theme.isDark ? "dark" : "light"].accent;
    },
    getProposalNumber:{
      get(){
        return this.proposal?.number || ""
      }
    },
    getProposalTitle:{
      get(){
        return this.proposal?.name || ""
      }
    }
  },

  data: ()=>({
    number: "01",
    name: "Ain",
    loading: false,
  }),
  methods: {
    actOnClick(){
      this.$emit("selected", {value: this.getProposalNumber});
      this.loading = "primary";
      setTimeout(()=>{
        this.loading = false;
      }, 2500)
    }
  }
}
</script>

<style scoped>
  .card-fix:focus::before { opacity: 0 !important; }
  .card-fix:hover::before { opacity: 0.08 !important; }
</style>