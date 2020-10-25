import MsgTypes from "../../constants/msgTypes";

let zIndex = 0;

const newExercise = (ex)=>{
  let newEx = {
    ...ex,
    id:ex._id,
    zIndex
  }

  delete newEx._id;
  zIndex++;
  return newEx;
}

const Exercise = (state, dispath, axios, addMessage)=>{
  const getExercises = async ()=>{

    if(state.isLoadedExercises){
      return;
    }

    let response = {};

    try {
      response = await axios().get("/exercise");
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    const newExercises = response.data.map((ex=>newExercise(ex)));

    dispath({type:"SET_EXERCISES", exercises:newExercises});

    return Promise.resolve(response.data);
  }

  const createExercise = async(values)=>{
    let response = {};

    try {
      response = await axios().post("/exercise/create", values);
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    if(state.isLoadedExercises){
      dispath({type:"ADD_EXERCISE", exercise:newExercise(response.data.exercise)});
    }

    addMessage({type:MsgTypes.success,txt:`${values.name}, ${response.data.message}`});

    return Promise.resolve(response.data);
  }

  const updateState = (arr)=>{
    let newExercises = [...state.exercises];
    arr.forEach((exercise)=>{
      const idx = state.exercises.findIndex(ex=>ex.id===exercise.id);
      newExercises = [
        ...newExercises.slice(0, idx),
        exercise,
        ...newExercises.slice(idx + 1)
      ];
    });

    dispath({type:"UPDATE_EXERCISES", exercises:newExercises});
  }

  const updateExercises = async (arr)=>{
    let arrResUpdate = [];
    let arrErrUpdate = [];
    let forNewState = [];

    for (const exercise of arr) {
      let response = {};

      try {
        response = await axios().put(`/exercise/update/${exercise.id}`, exercise);
      } catch (error) {
        console.log('err = ', error);
        arrErrUpdate.push({err:error.toString(),id:exercise.id});
        continue;
      }

      if(response.status === 401 || response.status === 500 || response.status === 400){
        arrErrUpdate.push({err:response.data.message, id:exercise.id});
        continue;
      }

      arrResUpdate.push({data:response.data, id:exercise.id});
      forNewState.push(exercise);
    }

    let errStr = '';
    arrErrUpdate.forEach((err,i)=>{
      errStr+=`${err.err} whis update: "${err.id}"`;
      if(arrErrUpdate.length>1 && i<arrErrUpdate.length-1){
        errStr+= ', ';
      }
    });

    
    if(arrResUpdate.length<=0){
      addMessage({type:MsgTypes.error,txt:errStr});
      return Promise.reject(arrErrUpdate);
    }else{
      let successStr = 'success update: ';
      arrResUpdate.forEach((data,i)=>{
        successStr += data.id;
        if(arrResUpdate.length>1 && i<arrResUpdate.length-1){
          successStr+= ', ';
        }
      });
      if(arrErrUpdate.length>0){
        addMessage({type:MsgTypes.warning,txt:errStr+successStr});
      }else{
        addMessage({type:MsgTypes.success,txt:successStr});
      }

      updateState(forNewState);

      return Promise.resolve(arrResUpdate, arrErrUpdate);
    }
  }

  const downExercise = (id)=>{
    const idx = state.exercises.findIndex((ex)=>ex.id===id);

    if(idx>=state.exercises.length-1){
      return;
    }

    const newExercises = [
      ...state.exercises.slice(0, idx),
      {
        ...state.exercises[idx+1],
        zIndex: state.exercises[idx+1].zIndex-1
      },
      {
        ...state.exercises[idx],
        zIndex: state.exercises[idx].zIndex+1
      },
      ...state.exercises.slice(idx + 2)
    ];

    dispath({type:"UPDATE_EXERCISES", exercises:newExercises});
  }

  const upExercise = (id)=>{
    const idx = state.exercises.findIndex((ex)=>ex.id===id);

    if(idx===0){
      return;
    }

    const newExercises = [
      ...state.exercises.slice(0, idx-1),
      {
        ...state.exercises[idx],
        zIndex: state.exercises[idx].zIndex-1
      },
      {
        ...state.exercises[idx-1],
        zIndex: state.exercises[idx-1].zIndex+1
      },
      ...state.exercises.slice(idx+1)
    ];

    dispath({type:"UPDATE_EXERCISES", exercises:newExercises});
  }

  const delExercise = async (id)=>{
    let response = {};

    try {
      response = await axios().delete(`/exercise/delete/${id}`);
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    dispath({type:"DELETE_EXERCISE", id});
    addMessage({type:MsgTypes.success,txt:`delete ${id}`});
    
    return Promise.resolve(response.data);
  }

  return {
    createExercise,
    updateExercises,
    getExercises,
    downExercise,
    upExercise,
    delExercise
  }
}

export default Exercise;