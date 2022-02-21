// const { get, post } = require("axios");
import { getQuestion as getBackQuestion, checkProposal } from "../back/questions";

/*
var count = -1;
const mock = [
  { 
    city: "Lannion",
    proposals: [
      { id: "22", name: "Côtes d'Armor" },
      { id: "35", name: "Ille-et-Vilaine" },
      { id: "69", name: "Rhône" },
      { id: "01", name: "Ain" }
    ]
  },
  {
    city: "Lille",
    proposals: [
      { id: "78", name: "Yvelines" },
      { id: "62", name: "Pas-de-Calais" },
      { id: "59", name: "Nord" },
      { id: "2B", name: "Corse du Nord" }
    ]
  },
  {
    city: "Valence",
    proposals: [
      { id: "83", name: "Var" },
      { id: "89", name: "Yonne" },
      { id: "73", name: "Savoie" },
      { id: "07", name: "Ardèche" }
    ]
  }
];
*/

export async function getQuestion(query) {
  return { status: 200, data: getBackQuestion(query) };
  /*
  return new Promise((resolve, reject) => {
    if (query.level == 1) {
      count = (count + 1) % (mock.length);
      setTimeout(() => {
        resolve({ status: 200, data: mock[count] });
      }, 200);
    } else {
      reject({ status: 400, data: {} });
    }
  });
  */
}
export async function postAnswer(body) {
  return { status: 200, data: checkProposal(body) };
  /*
  return new Promise((resolve) => {
    let res = ["22", "59", "07"];
    setTimeout(() => {
      resolve({ status: 200, data: { result: body.value == res[count], value: res[count] } });
    }, 500);
  });
  */
}