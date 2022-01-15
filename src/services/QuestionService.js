// const { get, post } = require("axios");
var count = -1;
const mock = [
  { 
    city: "Lannion",
    proposals: [
      { number: "22", name: "Côtes d'Armor" },
      { number: "35", name: "Ille-et-Vilaine" },
      { number: "69", name: "Rhône" },
      { number: "01", name: "Ain" }
    ]
  },
  {
    city: "Lille",
    proposals: [
      { number: "78", name: "Yvelines" },
      { number: "62", name: "Pas-de-Calais" },
      { number: "59", name: "Nord" },
      { number: "2B", name: "Corse du Nord" }
    ]
  },
  {
    city: "Valence",
    proposals: [
      { number: "83", name: "Var" },
      { number: "89", name: "Yonne" },
      { number: "73", name: "Savoie" },
      { number: "07", name: "Ardèche" }
    ]
  }
];

module.exports = {
  getQuestion: async (query)=> new Promise((resolve, reject) => {
    if(query.level == 1){
      count = (count+1)%(mock.length);
      resolve({ status: 200, data: mock[count] });
    }
    reject({ status: 400, data: { } })
  }),
  postAnswer: async (body)=> new Promise((resolve) => {
    let res = ["22", "59", "07"];
    setTimeout(() => {
      resolve({ status: 200, data: { result: body.number==res[count], value: res[count] } });
    }, 500);
  })
}