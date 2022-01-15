<template>
  <v-container class="pa-6 mb-lg-12">
    <v-row class="text-center">
      <v-col cols="12">
        <v-card flat outlined color="card">
          <v-card-text class="text-h4 text-sm-h3 question--text mt-4">
              {{cityName}}
          </v-card-text>
          <v-card-text>
            <CardGrid :proposals="proposals" @answer="processAnswer($event)" ref="grid"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="refreshProposal">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CardGrid from "./question/CardGrid.vue"
  import { getQuestion, postAnswer } from "../services/QuestionService"

  export default {
    name: 'Question',

    components: {
      CardGrid
    },

    props:{
      settings: {
        type: Object,
        default: null
      }
    },

    watch: {
      settings: {
        immediate: true,
        handler(value){
          if(value){
            this.updateProposals();
          }
        }
      }
    },

    data: () => ({
      cityName: null,
      proposals: null,
      timeoutRefresh: 500,
    }),

    methods:{
      async updateProposals(){
        try {
          let res = await getQuestion(this.settings);
          console.log(res);
          this.proposals = this.shuffle(res?.data?.proposals);
          this.cityName = res?.data?.city;
        } catch (error) {
          this.$emit("error", { message: error.message })
        }
      },
      refreshProposal(){
        this.$refs.grid.actOnRefresh();
      },
      async processAnswer(event){
        console.log("Answer processed in Question.vue")
        try {
          let res = await postAnswer(event);
          console.log(`Result : ${JSON.stringify(res)}`)
          this.$refs.grid.displayResult(res?.data, this.timeoutRefresh);
          await this.updateProposals();
        } catch (error) {
          this.$emit("error", { message: error.message });
        }
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
