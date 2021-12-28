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
      {name: "Savoie", number: "73"},
      {name: "Yvelines", number: "78"},
      {name: "Corse 2B", number: "2B"},
      {name: "Corse 2A", number: "2A"},
    ],
    disabled: false,
  }),
  methods:{
    actOnClick(event){
      this.disabled = true;
      console.log(`Card with value ${event.value} clicked`)
      setTimeout(()=>{
        this.disabled = false;
      },2500)
    }
  }
}
</script>

<style scoped>
  .card-fix:focus::before { opacity: 0 !important; }
  .card-fix:hover::before { opacity: 0.08 !important; }
</style>