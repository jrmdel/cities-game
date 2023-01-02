<template>
  <v-card class="card-fix flex d-flex flex-column" tile outlined @click="actOnClick()" :loading="loading" :disabled="disabled" min-height="100">
    <v-card-title class="mt-n2 text-h5 text-sm-h4">
      {{ getProposalId }}
    </v-card-title>
    <v-card-text class="my-n5 my-md-n3">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="8" sm="7" md="5">
            <DepartmentSvg :id="getProposalId" :color="color"/>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-subtitle class="mt-n3 text-sm-subtitle-1 text-md-h6">
      {{ getProposalTitle }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import DepartmentSvg from "./DepartmentSvg.vue";

export default {

  components:{
    DepartmentSvg
  },

  watch:{
    disabled:{
      handler(val, old){
        if(old==true && val==false) this.loading = false;
      }
    }
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
    getProposalId:{
      get(){
        return this.proposal?.id || ""
      }
    },
    getProposalTitle:{
      get(){
        return this.proposal?.name || ""
      }
    },

  },

  data: ()=>({
    loading: false,
    color: null,
  }),

  methods: {
    actOnClick(){
      this.$emit("selected", {value: this.getProposalId});
      this.loading = "primary";
    },
    displayColor(color, timeout){
      this.color = color;
      setTimeout(()=>{
        this.color = null;
      },timeout)
    }
  }
}
</script>

<style scoped>
  .card-fix:focus::before { opacity: 0 !important; }
  /* .card-fix:hover::before { opacity: 0.08 !important; } */
</style>