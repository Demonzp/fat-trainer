import React,{ useState, useEffect, useReducer } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { 
        ListItem,
        List,
} from "@material-ui/core";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {useAppState} from "state/appState";
import {useLocation, useHistory} from "react-router-dom";
import { getUrlParams, parseDate } from "utils/global";

import RoutNames from "../constants/routNames";

import WorkoutExItem from "components/WorkoutExItem/WorkoutExItem.js";
import ExercisePicker from "components/ExercisePicker/ExercisePicker.js";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    minWidth: 200,
  },
};
  
const useStyles = makeStyles(styles);

let zIndex = 0;

const initialState = {
  workoutExs:[],
  pickDate: new Date(),
  zIndex:0
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATE":
      return {...state, pickDate: action.pickDate}
    case "INIT_EXERCISES":
      let zIdx = state.zIndex;

      const arr = action.workoutExs.map(ex=> {
        const newEx = {
          ...ex,
          zIndex:zIdx
        }    

        zIdx++;

        delete newEx._id;

        return newEx;
      });
      console.log('arr = ', arr);

      return {...state, zIndex: zIdx, workoutExs:arr};
    default:
      return state;
  }
}

const getFullExercises = (workExs, exs)=>{
  console.log('exs = ', exs);
  const full = workExs.map(workEx=>{
    let idx = exs.findIndex(ex=>ex.id==workEx._id);
    console.log('idx = ', idx);
    return {
      ...workEx,
      ...exs[idx]
    }
  });

  console.log('full = ', full);

  return full;
}

function EditWorkout(){

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const {date=null} = getUrlParams(location);

  const [isSubmit, setIsSubmit] = useState(false);
  //const [pickDate, setPickDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [{workoutExs, pickDate}, dispatch] = useReducer(reducer, initialState);
  //const [workoutExs, setWorkoutExs] = useState([]);

  const handleClose = (idEx) => {
    setOpen(false);
    if(!idEx){
      return;
    }
    const ex = {
      ...exercises.find(ex=>ex.id===idEx),
      repeats:1,
      measurment:1,
      zIndex
    };

    zIndex++;

    const newExs = [
      ...workoutExs,
      ex
    ];

    //setWorkoutExs(newExs);
  };

  const [{exercises, workouts, isLoadedExercises, isLoadedWorkouts}, {getExercises, getWorkouts}] = useAppState();

  useEffect(()=>{
    getExercises();
    getWorkouts();
    let day;
    if(date){
      day = new Date(date);
      if(day == 'Invalid Date'){
        console.log(day);
        day = new Date();
      }
      day = new Date(day.setHours(day.getHours()+6));
    }else{
      day = new Date();
    }
    console.log('day1 = ', day);
    dispatch({type:"SET_DATE", pickDate:day});
    // const selectWork = workouts.find(work=>parseDate(new Date(work.date))===parseDate(day));
    // if(!selectWork){
    //   history.push(`${RoutNames.newWorkout}?date=${day}`);
    //   return;
    // }

    // dispatch({
    //   type:'INIT', 
    //   pickDate:day,
    //   workoutExs: getFullExercises(selectWork.exercises, exercises),
    // });
  },[]);

  useEffect(()=>{
    
    if(!isLoadedExercises || !isLoadedWorkouts){
      return;
    }
    console.log('day = ', pickDate);

    const selectWork = workouts.find(work=>parseDate(new Date(work.date))===parseDate(new Date(pickDate)));
    console.log('selectWork = ', selectWork);

    if(!selectWork){
      history.push(`${RoutNames.newWorkout}?date=${pickDate}`);
      return;
    }

    if(exercises.length>0){
      dispatch({
        type:'INIT_EXERCISES',
        workoutExs: getFullExercises(selectWork.exercises, exercises),
      });
    }else{
      dispatch({
        type:'INIT_EXERCISES',
        workoutExs: [],
      });
    }
    
  },[pickDate, isLoadedExercises, isLoadedWorkouts]);

  let newWorkoutEx = [];
  const numWorkoutEx = workoutExs.length;
  let numCallbacks = 0;
  let numErrs = 0;

  const handleSubmit = (e)=>{
    e.preventDefault();
    setIsSubmit(true);
  }

  function returnVals(vals,errs){
    numCallbacks++;

    if(errs){
      numErrs++;
    }

    if(Object.keys(vals).length !== 0){
      const idx = workoutExs.findIndex(exercise=>exercise.id===vals.id);

      newWorkoutEx.push({
        ...workoutExs[idx],
        ...vals
      });
    }

    if(numCallbacks===numWorkoutEx){
      setIsSubmit(false);
      if(numErrs<=0 && newWorkoutEx.length>0){
        console.log('edit = ', newWorkoutEx);
        //createWorkout({date: pickDate, exercises: newWorkoutEx});
      }
    }
  }

  const dateToString = (paramDate)=>{
    // if(paramDate == 'Invalid Date'){
    //   setPickDate(new Date());
    // }
    return parseDate(new Date(paramDate));
  }

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>New Workout</h4>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <Button color="primary" onClick={handleClickOpen}>Add Exercise</Button>
                  </ListItem>
                </List>
                <ExercisePicker workoutExs={workoutExs} open={open} onClose={handleClose} />
                <List>
                  {workoutExs.map((exercise,i)=>{
                    return (
                      <WorkoutExItem 
                        key={exercise.id}
                        isSubmit={isSubmit}
                        exercise={exercise}
                        returnVals={returnVals}
                        delEx = {()=>{}}
                        i={i}
                      />
                    );
                  })}
                </List>
              </CardBody>
              <CardFooter>
                <List>
                  <ListItem>
                    <Button color="primary" type="submit">Create Workout</Button>
                  </ListItem>
                  <ListItem>
                    <span>on date: {dateToString(pickDate)}</span>
                  </ListItem>
                </List>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default EditWorkout;