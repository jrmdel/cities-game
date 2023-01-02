<template>
  <v-container class="pa-6 mb-lg-12">
    <v-row class="text-center">
      <v-col cols="12">
        <v-card v-show="proposals!=null" flat outlined color="card">
          <v-card-text class="question--text mt-4">
            <div class="text-h5 text-sm-h4">{{cityName}}</div>
            <div class="my-1 my-sm-2 text-lg-subtitle-1">Population : {{getFormattedPopulation}}</div>
          </v-card-text>
          <v-card-text>
            <CardGrid :proposals="proposals" @answer="processAnswer($event)" ref="grid"/>
          </v-card-text>
          <v-card-actions class="mx-sm-6 mx-md-7">
            <Results :history="historyArray"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CardGrid from "./question/CardGrid.vue"
  import Results from "./question/Results.vue"
  import { getQuestion, postAnswer } from "../services/QuestionService"
  import { db } from "../plugins/firebaseDb";
  import { collection, addDoc } from "firebase/firestore"; 

  export default {
    name: 'Question',

    components: {
      CardGrid,
      Results
    },

    props:{
      settings: {
        type: Object,
        default: null
      }
    },

    computed: {
      hasTempData:{
        get(){
          return this.tempProposals != null;
        }
      },
      readyToPropagate:{
        get(){
          return this.hasTempData && this.timeoutElapsed;
        }
      },
      getFormattedPopulation: {
        get(){
          return (this.cityPopulation != null) ? (parseInt(this.cityPopulation)).toLocaleString() : ""
        }
      }
    },

    watch: {
      settings: {
        immediate: true,
        async handler(value){
          if(value){
            await this.updateProposals();
            this.propagateProposalsAndName();
          }
        }
      },
      readyToPropagate: {
        handler(value){
          if(value){
            this.propagateProposalsAndName();
            this.timeoutElapsed = false;
          }
        }
      }
    },

    data: () => ({
      cityName: null,
      cityPopulation: null,
      proposals: null,
      timeoutRefresh: 1000,
      timeoutElapsed: false,
      tempProposals: null,
      historyArray: [],
    }),

    methods:{
      async updateProposals(){
        try {
          let res = await getQuestion(this.settings);
          this.tempProposals = Object.assign({}, {
            proposals: this.shuffle(res?.data?.proposals),
            population: res?.data?.population,
            cityName: res?.data?.city
          })
        } catch (error) {
          this.$emit("error", { message: error?.message || error })
        }
      },
      propagateProposalsAndName(){
        this.proposals = this.tempProposals?.proposals || [];
        this.cityName = this.tempProposals?.cityName || "";
        this.cityPopulation = this.tempProposals?.population || "";
        this.tempProposals = null;
      },
      async processAnswer(event){
        try {
          let query = { city: this.cityName, proposals: this.proposals.map(o=>o.id), ...event };
          let res = await postAnswer(query);
          this.saveInHistory({ ...query, ...res?.data });
          this.historyArray.push(res?.data?.result);
          this.$refs.grid.displayResult(res?.data, this.timeoutRefresh);
          this.initiateTimeoutClock();
          await this.updateProposals();
        } catch (error) {
          this.$emit("error", { message: error.message });
        }
      },
      async saveInHistory(data){
        try {
          await addDoc(
            collection(db, "history-cities-fr"),
            { ...data, population: parseInt(this.cityPopulation), level: this.settings?.level, date: (new Date).toISOString() }
          );
        } catch (error) {
          console.warn("Unable to log answer: "+error.message);
        }
      },
      initiateTimeoutClock(){
        setTimeout(()=>{
          this.timeoutElapsed = true;
        }, this.timeoutRefresh)
      },
      resetHistory(){
        this.historyArray = [];
      },
      shuffle([...arr]){
        let m = arr.length;
        while (m) {
          const i = Math.floor(Math.random() * m--);
          [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
      },
    }
  }
</script>
