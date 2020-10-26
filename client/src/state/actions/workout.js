import MsgTypes from "../../constants/msgTypes";

const Workout = (state, dispath, axios, addMessage)=>{
  const getWorkouts = async()=>{

    if(state.isLoadedWorkouts){
      return;
    }

    let response = {};

    try {
      response = await axios().get("/workout");
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }
    dispath({type:"SET_WORKOUTS", workouts:response.data});

    return Promise.resolve(response.data);
  }

  const createWorkout = async (data)=>{
    let response = {};

    try {
      response = await axios().post("/workout/create", data);
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    dispath({type:"ADD_WORKOUT", workout:response.data.workout});
    addMessage({type:MsgTypes.success,txt:response.data.message});
    return Promise.resolve(response.data);

  }

  const updateWorkout = async (data)=>{
    let response = {};

    try {
      response = await axios().put(`/workout/update/${data.id}`, data);
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    dispath({type:"UPDATE_WORKOUT", workout:response.data});
    addMessage({type:MsgTypes.success,txt:response.data.message});
    return Promise.resolve(response.data);
  }

  return {
    getWorkouts,
    createWorkout,
    updateWorkout
  }
}

export default Workout;