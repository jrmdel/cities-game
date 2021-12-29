<template>
  <v-container fluid>
    <v-row justify="center" v-for="i in 2" :key="i">
      <v-col v-for="k in 2" :key="k" cols="6">
        <AnswerCard :proposal="possibleAnswers[2*(i-1)+k-1]" @selected="actOnClick($event)" :disabled="disabled"/>
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

  },
  data: ()=>({
    //
    possibleAnswers: [
      {name: "", number: "73"},
      {name: "", number: "78"},
      {name: "", number: "2B"},
      {name: "", number: "2A"},
    ],
    allPossible: [...Array(95).keys()].map(n=> (n<9) ? `0${n+1}` : `${n+1}` ).filter(n=>n!="20").concat(["2A", "2B"]),
    disabled: false,
  }),
  methods:{
    actOnClick(event){
      this.disabled = true;
      console.log(`Card with value ${event.value} clicked`)
      setTimeout(()=>{
        this.disabled = false;
      },2500)
    },
    actOnRefresh(){
      for (let i = 0; i < this.possibleAnswers.length; i++) {
        this.possibleAnswers[i].number = this.pickRandomElementFrom(this.allPossible);
      }
    },
    pickRandomElementFrom(arr){
      return arr[Math.floor(arr.length*Math.random())]
    }
  }
}
</script>

<style scoped>
  .card-fix:focus::before { opacity: 0 !important; }
  .card-fix:hover::before { opacity: 0.08 !important; }
</style>