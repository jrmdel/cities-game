function extractMinMax(arr){
  let current = parseFloat(arr[0]);
  let min = current;
  let max = current;
  for (let i = 1; i < arr.length; i++) {
    const val = parseFloat(arr[i]);
    current+=val;
    if(min>current) min = current;
    if(max<current) max = current;
  }
  return { min, max }
}


function computeViewbox(path){
  let matrix = path.split(" ").filter(s=>s.includes(",")).map(o=>o.split(","))
  let xArr = matrix.map(o=>o[0]);
  let yArr = matrix.map(o=>o[1]);
  let { min: xMin, max: xMax } = extractMinMax(xArr);
  let { min: yMin, max: yMax } = extractMinMax(yArr);
  return `${xMin} ${yMin} ${xMax-xMin} ${yMax-yMin}`
}

module.exports = {
  computeViewbox
}