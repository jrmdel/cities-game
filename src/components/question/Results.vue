<template>
  <div class="d-flex flex-wrap">
    <div flat v-for="(h,i) in history" :key="i">
      <v-icon :small="$vuetify.breakpoint.smAndDown" :color="getColorFromResult(h)">{{getIconFromResult(h)}}</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      default: ()=>[],
    }
  },
  
  methods: {
    getIconFromResult(result){
      return (result) ? "mdi-check" : "mdi-close";
    },
    getColorFromResult(result){
      return (result) ? "success" : "error";
    }
  }
}
</script>