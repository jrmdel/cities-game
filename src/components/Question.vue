<template>
  <v-container class="pa-6">
    <v-row class="text-center">
      <v-col cols="12">
        <v-card flat outlined color="card">
          <v-card-text class="text-h3 question--text mt-4">
              {{cityName}}
          </v-card-text>
          <v-card-text>
            <CardGrid/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CardGrid from "./question/CardGrid.vue"

  export default {
    name: 'Question',

    components: {
      CardGrid
    },

    data: () => ({
      cityName: "Aast"
    }),
  }
</script>
