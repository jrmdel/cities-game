const fs = require("fs");
const dep = require("./departments-FR.json");

fs.writeFileSync("./data/dep-list.json", JSON.stringify(dep.map(o => {
  return { id: o.id.slice(3), name: o.title }
})));