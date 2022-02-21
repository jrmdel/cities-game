const dep = require("../../data/dep-list.json");
const cities = require("../../data/mini-cities.json");

function pickCity(nFirst = cities.length){
  let el = sample(cities, nFirst);
  let proposals = [ dep.find(d=>d.id == el.d) ];
  for (let i = 0; i < 3; i++) {
    proposals.push(pickProposals(proposals.concat(el.o || [])));
  }
  return {
    city: el.n,
    population: el.p,
    proposals
  }
}

function pickProposals(exclude){
  return sample(dep.filter(o=>!exclude.map(e=>e.id).includes(o.id)))
}

function sample(arr, n=arr.length){
  return arr[Math.floor(Math.random() * n)];
}

module.exports = {
  getQuestion(query){
    if(query.level == 1){
      // Easy level = top 1,000 cities
      return pickCity(1000);
    } else if(query.level == 2){
      // Medium level = top 10,000 cities
      return pickCity(10000);
    } else {
      // Hard level = all cities
      return pickCity();
    }
  },

  /**
   * Check if the value provided is the correct answers amongst the list of possible values
   * @param {Object} body - Contains fields `city`, `proposals` and `value`
   * @returns {Object} An object with a field `result` holding a truthy value, and a field `value` with the correct answer
   * @example let res = checkProposal({ city: "Aast", proposals: ["41", "64", "01", "29"], value: "01" })
   * console.log(res) // { result: false, value: "64" }
   */
  checkProposal(body){
    let res = cities.find(c => c.n == body.city && body.proposals.includes(c.d));
    if(body.value == res.d) return { result: true, value: res.d };
    return { result: (body.value == res.d), value: res.d };
  }
}