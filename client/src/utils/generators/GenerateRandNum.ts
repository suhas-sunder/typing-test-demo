interface PropTypes {
  max: number;
}
function GenerateRandNum({ max }: PropTypes) {
  return Math.floor(Math.random() * Math.abs(Math.ceil(max)));
}

export default GenerateRandNum;
