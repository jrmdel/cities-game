const fs = require("fs");
try {
    console.time("===> Parsing");
    // From geonames website, download txt file of the chosen country on https://download.geonames.org/export/dump/
    let data = fs.readFileSync("./data/FR.txt", "utf-8");
    let parsed = data.split("\n").map(line => line.split("\t"));
    console.timeEnd("===> Parsing")
    console.log(`Parsed data : ${parsed.length} entries`);

    console.time("===> Processing");
    // Type 4 administrative region (a city) with population greater than or equal to 0 ; here 34841
    // cf. http://www.geonames.org/export/codes.html
    let cities = parsed.filter(line => line[14]>=0 && line[7]=='ADM4').sort((a,b)=>a[1].localeCompare(b[1]));
    // Population greater than 1 000 ; here 9773
    let d = cities.filter(line => line[14]>1000);
    // Population greater than 10 000 ; here 937
    let e = cities.filter(line => line[14]>10000);
    console.timeEnd("===> Processing");
    console.log(`Total of cities : ${cities.length}\nGreater than 1 000 : ${d.length}\nGreater than 10 000 : ${e.length}`);

    console.time("===> Writing");
    fs.writeFileSync(
        "./data/cities.json",
        JSON.stringify(cities.map(city=>{ return {name:city[1], lat:city[4], lon:city[5], department:city[11], population:city[14], elevation:city[16]} }), null, 2)
    )
    console.timeEnd("===> Writing");
} catch (error) {
    console.error("An error occured : "+error.message)
}