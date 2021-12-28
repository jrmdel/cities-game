<template>
  <svg :viewBox="getViewbox" xmlns="http://www.w3.org/2000/svg">
    <path
      :d="getPath"
      :title="getTitle"
      :fill="getColor"
      stroke="#111111"
      stroke-width="0.4%" />
  </svg>
</template>

<script>
import departments from "@/../data/departments-FR.json";
import { computeViewbox } from "@/util/svg";

export default {

  props:{
    id: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#fafafa"
    }
  },

  computed: {
    getViewbox: {
      get(){
        return computeViewbox(this.getPath) || ""
      }
    },
    getPath: {
      get(){
        return this.getObject?.d || ""
      }
    },
    getColor: {
      get(){
        return this.color
      }
    },
    getTitle: {
      get(){
        return this.getObject?.title || ""
      }
    },
    getObject: {
      get(){
        return this.paths.find(o=>o.id.includes(this.id)) || {}
      }
    }
  },

  data:()=>({
    paths: departments,
  })
}
</script>