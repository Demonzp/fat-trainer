export function Exercise(values){
  const errors = {};

  if(!values.repeats || values.repeats.length<=0){
      errors.repeats = "repeats is required";
  }

  if(!values.measurment || values.measurment.length<=0){
    errors.measurment = "measurment is required";
  }

  return errors;
}