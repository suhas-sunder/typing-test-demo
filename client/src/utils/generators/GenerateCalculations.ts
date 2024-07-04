import GenerateRandNum from "./GenerateRandNum";

interface PropType {
  currentLives: number;
}

//Generates an array of of numbers and operators as string to form 'calculations' based on available lives
function GenerateCalculations({ currentLives }: PropType) {
  currentLives = Math.floor(currentLives);
  currentLives = currentLives <= 2 ? 2 : currentLives - 1; //When current life is 1, i % current life = 0 so adjusting for value so that it doesn't mess up the logic/calculation below
  const maxLives = 5;
  //Array of nested operators from easy to hard difficulty
  const operators = [
    [],
    ["+", "/", "+", "/"],
    ["+", "/", "*", "-", "."],
    ["+", "/", "*", "-", "."],
    ["+", "/", "*", "-", "."],
    ["+", "/", "*", "-", "."],
  ];
  const operatorsIndex = maxLives - currentLives; //Lives represent the difficulty and so does the matching index in the operators array therefore this calculation works
  const calcArr: string[] = [];

  //Adjust the string of numbers and operators being displayed depending on the difficulty "number of lives". Higher difficulty = more operators.
  for (let i = 1; i <= 13; i++) {
    const randDigit = GenerateRandNum({ max: 9 }).toString();
    if (i % currentLives === 0 && i !== 0 && i !== 13) {
      calcArr.push(
        operators[operatorsIndex][GenerateRandNum({ max: 5 })] || randDigit,
      );
    } else {
      calcArr.push(randDigit);
    }
  }

  return calcArr;
}

export default GenerateCalculations;
