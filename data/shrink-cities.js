const cities = require("./cities.json");
const fs = require("fs");

let duplicates = {};
let uniqueNames = [...new Set(cities.map(c => c.name))];
console.log(`Cities length = ${cities.length} vs. Unique names = ${uniqueNames.length}`)
for (let i = 0; i < uniqueNames.length; i++) {
  let arr = cities.filter(c => c.name == uniqueNames[i]);
  if (arr.length > 1) {
    duplicates[uniqueNames[i]] = arr.map(c => c.department)
  }
}

// Minify cities file and sort it by population
fs.writeFileSync("./data/mini-cities.json", JSON.stringify(cities.map(c => {
  return { n: c.name, d: c.department, p: c.population, o: duplicates[c.name]?.filter(x=>x!=c.department) || undefined };
}).sort((a, b) => b.p - a.p)));