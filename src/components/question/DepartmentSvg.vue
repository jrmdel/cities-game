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
        return computeViewbox(this.getPath, 1) || ""
      }
    },
    getPath: {
      get(){
        return this.getObject?.d || ""
      }
    },
    getColor: {
      get(){
        return (this.color) ? this.parseColor(this.color) : this.defaultColor;
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
    defaultColor: "#fafafa"
  }),

  methods: {
    parseColor(color){
      return (typeof color == "string" && color[0]=="#") ? color : this.$vuetify.theme.themes[this.$vuetify.theme.isDark ? "dark" : "light"][color]
    }
  }
}
</script>