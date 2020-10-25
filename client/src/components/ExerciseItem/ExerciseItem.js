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
  formControl: {
    minWidth: 200,
    marginLeft:5,
    marginRight:5
  },
};

const useStyles = makeStyles(styles);

const ExerciseItem = ({exercise, isSubmit, returnVals, i})=>{
  const classes = useStyles();

  const [{exercises}, {downExercise, upExercise, delExercise}] = useAppState();

  const { handleChange, values, errors, setErrors } = UseValidationForm(
    ()=>{},
    { 
      id:exercise.id, 
      name: exercise.name, 
      measureType: exercise.measureType, 
      zIndex: exercise.zIndex
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
        returnVals({});
      }
    }
  },[isSubmit]);

  return(
    <ListItem>
      <Grid container direction="row">
        <TextField
          error={errors.name ? true:false} 
          onChange={handleChange}
          name="name"
          value={values.name}
          label="Exercise Name"
          helperText={errors.name}
        />
        <FormControl className={classes.formControl} error={errors.measureType ? true:false}>
          <InputLabel id="demo-simple-select-disabled-label">Measurement type</InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            name="measureType"
            value={values.measureType}
            onChange={handleChange}
          >
            {measurementTypes.map((prop)=>{
              return <MenuItem value={prop} key={prop}>{prop}</MenuItem>
            })}
          </Select>
          <FormHelperText>{errors.measureType}</FormHelperText>
        </FormControl>
        {i>0?
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={()=>upExercise(exercise.id)}
            className={classes.button}
          >
            <ArrowUpwardIcon />
          </Button>
          :null
        }
        {i<exercises.length-1?
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={()=>downExercise(exercise.id)}
            className={classes.button}
          >
            <ArrowDownwardIcon />
          </Button>
          :null
        }
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=>delExercise(exercise.id)}
          className={classes.button}
        >
          <ClearIcon />
        </Button>
      </Grid>
    </ListItem>
  );
}

export default ExerciseItem;