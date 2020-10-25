import routes from "routes.js";
import MsgTypes from "../../constants/msgTypes";

const getAuthRoutes = ()=>{
  return routes.filter((rout)=> rout.middelware==='guest' && !rout.hidden);
}
const getDashboardRoutes = ()=>{
  return routes.filter((rout)=> rout.middelware==='auth' && !rout.hidden);
}

const Auth = (_, dispath, axios, addMessage)=>{
  const isAuth = async ()=>{
    const token = localStorage.getItem('token');

    if(!token){
      dispath({type: "AUTH_CHANGE", token:null, user:null, activRoutes:getAuthRoutes()});

      return Promise.resolve();
    }else{
      let response = {};
      try {
        response = await axios.get("/users",{
          headers:{
            'Authorization':token
          },
        });
      } catch (error) {
        console.log('err = ', error);
        addMessage({type:MsgTypes.error,txt:error.toString()});

        dispath({type: "AUTH_CHANGE", token:null, user:null, activRoutes:getAuthRoutes()});
        
        return Promise.reject(error);
      }

      dispath({type: "AUTH_CHANGE", token, user:{email:response.data.email},activRoutes:getDashboardRoutes()});

      return Promise.resolve(response.data);
    }
  }

  const authUser = (token, email)=>{
    localStorage.setItem('token', token);

    dispath({
      type: "AUTH_CHANGE", 
      token, 
      user:{email},
      activRoutes:getDashboardRoutes()
    });

    addMessage({type:MsgTypes.success,txt:`Hello, ${email}!`});
  }

  const signIn = async (values)=>{
    let response = {};

    try {
      response = await axios.post("/signin", values);
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }
        
    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    authUser(response.data.token, values.email);

    return Promise.resolve(response.data);
  }

  const signOut = ()=>{
    localStorage.clear();
    dispath({type: "AUTH_CHANGE", token:null, user:null, activRoutes:getAuthRoutes()});
    addMessage({type:MsgTypes.info,txt:`We hope you will come back to us.`});
  }

  const signUp = async (values) => {
    let response = {};

    try {
      response = await axios.post("http://localhost:5000/signup",values);
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 409){
      addMessage({type:MsgTypes.error,txt:response.data});
      return Promise.reject(response.data);
    }

    addMessage({type:MsgTypes.success,txt:response.data});

    return Promise.resolve(response.data);
  }

  const verifyEmail = async (values)=>{
    let response = {};

    try {
      response = await axios.post("http://localhost:5000/verification",{
        ...values,
        verificationCode:Number(values.verificationCode)
      });
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 400 || response.status === 500){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    authUser(response.data.token, values.email);

    return Promise.resolve(response.data);
  }

  return {
    signIn,
    signUp,
    signOut,
    verifyEmail,
    isAuth
  }
}

export default Auth;