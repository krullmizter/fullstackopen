interface ExerciseCalculationResults {
  trainingPhase: number;
  numberOfTrainingDays: number;
  success: boolean;
  rating: number;
  ratingDesc: string;
  goal: number;
  average: number;
}

export const exerCalc = (
  hoursDaily: number[],
  goal: number
): ExerciseCalculationResults => {
  const trainingPhase = hoursDaily.length;
  const numberOfTrainingDays = hoursDaily.filter((day) => day > 0).length;
  const average = hoursDaily.reduce((a, b) => a + b, 0) / trainingPhase;
  const success = average >= goal;

  let rating: number;
  let ratingDesc: string;

  if (average >= goal) {
    rating = 3;
    ratingDesc = "Great success!";
  } else if (average >= goal * 0.5) {
    rating = 2;
    ratingDesc = "Not too bad, but you could be better";
  } else {
    rating = 1;
    ratingDesc = "You need to work harder...";
  }

  return {
    trainingPhase,
    numberOfTrainingDays,
    success,
    rating,
    ratingDesc,
    goal,
    average,
  };
};

if (require.main === module) {
  console.log(
    "EXERCISE CALCULATOR\nPlease provide your goal, followed by daily exercise hours as arguments.\n"
  );

  const inputLength = process.argv.length;

  if (inputLength < 4) {
    console.error(
      "Too few arguments, goal and at least one day of exercise hours are needed."
    );
    process.exit(1);
  } else {
    const goal = Number(process.argv[2]);
    const hoursDaily = process.argv.slice(3).map(Number);

    if (isNaN(goal)) {
      console.error("The goal value must be a valid number.");
      process.exit(1);
    }

    if (hoursDaily.some(isNaN)) {
      console.error("All daily exercise hours must be valid numbers.");
      process.exit(1);
    }

    const result = exerCalc(hoursDaily, goal);
    const {
      trainingPhase,
      numberOfTrainingDays,
      success,
      rating,
      ratingDesc,
      goal: targetGoal,
      average,
    } = result;

    console.log(`
        Training Phase: ${trainingPhase} days
        Number of Training Days: ${numberOfTrainingDays}
        Success (true/false): ${success}
        Rating: ${rating} (${ratingDesc})
        Goal: ${targetGoal} hours/day
        Avg. Daily Hours: ${average.toFixed(2)}
      `);
  }
}

export default exerCalc;
