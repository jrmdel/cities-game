<template>
  <v-container fluid>
    <!-- Visibility as a 2x2 grid on all screens -->
    <v-row class="mx-n6 mx-sm-0" :dense="$vuetify.breakpoint.xs" justify="center" v-for="i in 2" :key="i">
      <v-col v-for="k in 2" :key="k" cols="6" class="d-flex flex-column">
        <AnswerCard v-if="gameIsOn" :proposal="possibleAnswers[2*(i-1)+k-1]" @selected="actOnClick($event)" :disabled="disabled" ref="answerCards"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AnswerCard from "./AnswerCard.vue";

export default {

  components: {
    AnswerCard
  },

  props:{
    proposals: {
      type: Array,
      default: null,
    }
  },

  computed: {
    possibleAnswers: {
      get(){
        return (this.proposals) ? this.proposals : Array(4);
      }
    },
    gameIsOn: {
      get(){
        return this.proposals != null;
      }
    }
  },

  watch:{
    proposals: {
      handler(value){
        if(value) this.disabled = false;
      }
    }
  },

  data: ()=>({
    disabled: false,
    temporaryAnswer: null,
  }),

  methods:{
    actOnClick(event){
      this.disabled = true;
      this.temporaryAnswer = event.value;
      this.$emit("answer", event);
    },
    displayResult(data, timeout){
      if(data?.result == true){
        this.$refs.answerCards[this.getIdFromProposals(this.temporaryAnswer)]?.displayColor("success", timeout);
      } else {
        this.$refs.answerCards[this.getIdFromProposals(this.temporaryAnswer)]?.displayColor("error", timeout);
        this.$refs.answerCards[this.getIdFromProposals(data?.value)]?.displayColor("success", timeout);
      }
    },
    getIdFromProposals(value){
      if(this.proposals != null){
        return this.proposals.findIndex(o=>o.id == value);
      } return null
    },
  }
}
</script>