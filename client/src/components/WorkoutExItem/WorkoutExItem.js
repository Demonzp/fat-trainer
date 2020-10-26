import React,{ useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { 
        Grid,
        ListItem, 
        TextField, 
        FormControl, 
        InputLabel, 
        Select, 
        MenuItem, 
        FormHelperText,
        Button
} from "@material-ui/core";

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ClearIcon from '@material-ui/icons/Clear';

import UseValidationForm from "utils/useValidationForm";
import {Exercise as Validation} from "validation/exercise";

import {measurementTypes} from "constants/selectMeasurement";

import {useAppState} from "state/appState";

const styles = {
  exItem:{
    marginRight:5
  }
};

const useStyles = makeStyles(styles);

const WorkoutExItem = ({exercise, isSubmit, returnVals, delEx, downExercise, upExercise})=>{
  const classes = useStyles();

  //const [{exercises}, {downExercise, upExercise, delExercise}] = useAppState();
  //console.log(' measurment = ', exercise.measurment);
  const { handleChange, values, errors, setErrors } = UseValidationForm(
    ()=>{},
    { 
      id:exercise.id, 
      name: exercise.name,
      repeats:exercise.repeats,
      measurment:exercise.measurment
    },
    Validation
  );

  useEffect(()=>{
    if(isSubmit){
      const err = Validation(values);
      setErrors(err);
      if(Object.keys(err).length === 0){
        returnVals(values);
      }else{
        returnVals({},err);
      }
    }
  },[isSubmit]);

  const getText = (val)=>{
    if(val==="Kilograms"){
      return "kg";
    }else if(val==="Meters"){
      return "m";
    }else if(val==="Minutes"){
      return "min";
    }else{
      return "unknoun";
    }
  }

  return(
    <ListItem>
      <Grid container direction="row">
        <TextField
          className={classes.exItem}
          disabled
          error={errors.name ? true:false} 
          onChange={handleChange}
          name="name"
          value={values.name}
          label="Exercise Name"
          helperText={errors.name}
        />
        <TextField
          className={classes.exItem}
          error={errors.repeats ? true:false} 
          onChange={handleChange}
          name="repeats"
          value={values.repeats}
          label="Repeats"
          helperText={errors.repeats}
        />
        <TextField
          className={classes.exItem}
          error={errors.measurment ? true:false} 
          onChange={handleChange}
          name="measurment"
          value={values.measurment}
          label="Measurment"
          helperText={errors.measurment}
        />
        <Grid
          container
          item
          xs={1}
          justify="center"
          alignItems="center"
          className={classes.exItem}
        >
          <span>{getText(exercise.measureType)}</span>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=>{upExercise(exercise.id)}}
          className={classes.button}
        >
          <ArrowUpwardIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=>{downExercise(exercise.id)}}
          className={classes.button}
        >
          <ArrowDownwardIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=>{delEx(exercise.id)}}
          className={classes.button}
        >
          <ClearIcon />
        </Button>
      </Grid>
    </ListItem>
  );
}

export default WorkoutExItem;