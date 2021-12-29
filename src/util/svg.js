function extractMinMax(arr, margin){
  let current = parseFloat(arr[0]);
  let min = current;
  let max = current;
  for (let i = 1; i < arr.length; i++) {
    const val = parseFloat(arr[i]);
    current+=val;
    if(min>current) min = current;
    if(max<current) max = current;
  }
  return { min: min-margin, max: max+margin }
}


function computeViewbox(path, ratio){
  let margin = 0.1;
  let matrix = path.split(" ").filter(s=>s.includes(",")).map(o=>o.split(","))
  let xArr = matrix.map(o=>o[0]);
  let yArr = matrix.map(o=>o[1]);
  let { min: xMin, max: xMax } = extractMinMax(xArr, margin);
  let { min: yMin, max: yMax } = extractMinMax(yArr, margin);
  // ratio > 1 (16/9, 4/3) : x-width greater than y-height
  let width = xMax-xMin;
  let height = yMax-yMin;
  let currentRatio = width/height;
  let diff = 0;
  if(currentRatio>ratio){
    diff = (width/ratio)-height;
    yMin -= diff/2;
    height += diff;
  } else {
    diff = (height/ratio)-width;
    xMin -= diff/2;
    width += diff; 
  }
  return `${xMin} ${yMin} ${width} ${height}`
}

module.exports = {
  computeViewbox
}