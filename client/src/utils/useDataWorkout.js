import {useState, useEffect} from "react";

import {useAppState} from "state/appState";
import {useLocation, useHistory} from "react-router-dom";
import { getUrlParams, parseDate, upInArray, downInArray, createId } from "utils/global";
import RoutNames from "../constants/routNames";

let zIndex = 0;

const useDataWorkout = (type)=>{
  const location = useLocation();
  const history = useHistory();
  const {date=null} = getUrlParams(location);

  const [isSubmit, setIsSubmit] = useState(false);
  const [pickDate, setPickDate] = useState(new Date());
  const [idWorkout, setIdWorkout] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [workoutExs, setWorkoutExs] = useState([]);

  const handleClose = (idEx) => {
    setOpen(false);

    if(!idEx){
      return;
    }

    const ex = {
      ...exercises.find(ex=>ex.id===idEx),
      repeats:1,
      measurment:1,
      zIndex,
      key:createId(10)
    };

    zIndex++;

    const newExs = [
      ...workoutExs,
      ex
    ];

    setWorkoutExs(newExs);
  };

  const [{exercises}, {getExercises, getWorkouts, createWorkout, updateWorkout}] = useAppState();

  useEffect(()=>{
    getExercises();
    getWorkouts();
    let day;
    if(date){
      day = new Date(date);
      if(day == 'Invalid Date'){
        day = new Date();
      }
      day = new Date(day.setHours(day.getHours()+2));
    }else{
      day = new Date();
    }
    setPickDate(day);
  },[]);

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
        if(type==="create"){
          createWorkout({date: pickDate, exercises: newWorkoutEx})
            .then((data)=>history.push(RoutNames.dashboard));
        }else if(type==="update"){
          updateWorkout({id:idWorkout, date: pickDate, exercises: newWorkoutEx});
        } 
      }
    }
  }

  const dateToString = (paramDate)=>{
    return parseDate(paramDate);
  }

  const delEx = (key)=>{

    const idx = workoutExs.findIndex((ex)=> ex.key===key);

    const newArr = [
      ...workoutExs.slice(0, idx),
      ...workoutExs.slice(idx+1)
    ];

    setWorkoutExs(newArr);
  }

  const upExercise = (idEx) => {
    setWorkoutExs(upInArray(idEx, workoutExs));
  }

  const downExercise = (idEx) =>{
    setWorkoutExs(downInArray(idEx, workoutExs));
  }

  return{
    isSubmit,
    pickDate,
    open,
    workoutExs,
    exercises,
    RoutNames,
    history,
    setWorkoutExs,
    setIdWorkout,
    handleClickOpen,
    handleClose,
    handleSubmit,
    returnVals,
    dateToString,
    delEx,
    upExercise,
    downExercise
  }
}

export default useDataWorkout;