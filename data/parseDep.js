const fs = require("fs");
try {
    console.time("===> Parsing");
    let data = fs.readFileSync("../public/france-departments.svg", "utf-8");
    let parsed = data.split("<path")
    parsed.shift()
    console.timeEnd("===> Parsing")
    console.time("===> Processing");
    let process = parsed.map(o=>o.split("\n").map(line => line.split("=") ).filter(arr=>arr.length>1));
    let transformed = process.map(arr=>{
      let res = {};
      for (let i = 0; i < arr.length; i++) {
        const o = arr[i];
        res[o[0].replace(/ /g,"")] = o[1].split("\"")[1]
      }
      return res
    })
    console.timeEnd("===> Processing");
    console.time("===> Saving");
    fs.writeFileSync(
      "./dep.json",
      JSON.stringify(transformed, null, 2)
    );
    console.timeEnd("===> Saving");
} catch (error) {
    console.error("An error occured : "+error.message)
}