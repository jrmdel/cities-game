<template>
  <v-container fluid>
    <!-- Visibility as a 2x2 grid on all screens except xs ones -->
    <v-row class="mx-n6 mx-sm-0" :dense="$vuetify.breakpoint.smAndDown" justify="center" v-for="i in 2" :key="i">
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
  data: ()=>({
    /*
    possibleAnswers: [
      {name: "Haute-Savoie", number: "74"},
      {name: "Ain", number: "01"},
      {name: "Corse du Nord", number: "2B"},
      {name: "Bouches du Rhône", number: "13"},
    ],
    */
    allPossible: [...Array(95).keys()].map(n=> (n<9) ? `0${n+1}` : `${n+1}` ).filter(n=>n!="20").concat(["2A", "2B"]),
    disabled: false,
    temporaryAnswer: null,
  }),
  methods:{
    actOnClick(event){
      this.disabled = true;
      this.temporaryAnswer = event.value;
      this.$emit("answer", { number: event.value });
      console.log(`Card with value ${event.value} clicked`);
      setTimeout(()=>{
        this.disabled = false;
      },2500)
    },
    actOnRefresh(){
      for (let i = 0; i < this.possibleAnswers.length; i++) {
        this.possibleAnswers[i].number = this.pickRandomElementFrom(this.allPossible);
      }
    },
    displayResult(data, timeout){
      console.log("Display result called in CardGrid.vue")
      if(data?.result == true){
        console.log("Data result is true : calling "+`card${this.getIdFromProposals(this.temporaryAnswer)}`)
        console.log(this.$refs);
        this.$refs.answerCards[this.getIdFromProposals(this.temporaryAnswer)]?.displayColor("success", timeout);
        //this.$refs.card.displayColor("success", 1500);
      } else {
        this.$refs.answerCards[this.getIdFromProposals(this.temporaryAnswer)]?.displayColor("error", timeout);
        this.$refs.answerCards[this.getIdFromProposals(data?.value)]?.displayColor("success", timeout);
        // this.$refs[`card${this.getIdFromProposals(this.temporaryAnswer)}`]?.displayColor("error", timeout);
        // this.$refs[`card${this.getIdFromProposals(data?.value)}`]?.displayColor("success", timeout);
      }
    },
    pickRandomElementFrom(arr){
      return arr[Math.floor(arr.length*Math.random())]
    },
    getIdFromProposals(value){
      if(this.proposals != null){
        return this.proposals.findIndex(o=>o.number == value);
      } return null
    },
  }
}
</script>

<style scoped>
  .card-fix:focus::before { opacity: 0 !important; }
  .card-fix:hover::before { opacity: 0.08 !important; }
</style>