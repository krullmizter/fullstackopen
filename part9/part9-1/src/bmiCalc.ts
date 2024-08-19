export const bmiCalc = (
  height: number,
  weight: number
): { bmi: number; bmiCategory: string } => {
  const bmi = weight / (height / 100) ** 2;

  let bmiCategory: string;

  if (bmi < 18.5) {
    bmiCategory = "underweight";
  } else if (bmi < 25) {
    bmiCategory = "normal";
  } else if (bmi < 30) {
    bmiCategory = "overweight";
  } else {
    bmiCategory = "obese";
  }

  return { bmi, bmiCategory };
};

if (require.main === module) {
  console.log(
    "BMI CALCULATOR\nPlease provide your height and weight, in whole numbers, as the arguments.\n"
  );

  const inputLength = process.argv.length;

  if (inputLength < 4) {
    console.error("Too few arguments, height and weight are needed");
    process.exit(1);
  } else if (inputLength > 4) {
    console.error("Too many arguments, only height and weight are needed");
    process.exit(1);
  } else {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);

    if (isNaN(height) || isNaN(weight)) {
      console.error("Your input values are not numbers");
      process.exit(1);
    } else if (height <= 0 || weight <= 0) {
      console.error("Height and weight must be positive numbers");
      process.exit(1);
    } else {
      const { bmi, bmiCategory } = bmiCalc(height, weight);
      console.log(
        `Your BMI is ${bmi.toFixed(
          2
        )}, which is considered to be in the ${bmiCategory} range`
      );
    }
  }
}

export default bmiCalc;
