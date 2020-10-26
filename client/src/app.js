import React,{ useEffect } from "react";

import { Switch, useLocation } from "react-router-dom";
import { GuestRoute, AuthRoute, UnknownRoute } from "middlewares";

import { AppStateProvider, useAppState } from "state/appState";
import appReducer, { initialState } from "state/appReducer"; 
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Message from "components/Message/Message";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import axios from "axios";

let ps;

const switchRoutes = ()=>{
  return (
    <Switch>
      {routes.map((prop, key) => {
        if(prop.middelware === 'guest'){
          return(
            <GuestRoute
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }else{
          return (
            <AuthRoute
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
                
      })}
      <UnknownRoute/>
    </Switch>
  );
};

const useStyles = makeStyles(styles);

function App({...rest}) {
  useLocation();

  const [{activRoutes}, {isAuth}] = useAppState();

  useEffect(()=>{
    isAuth();
  },[]);

  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
    
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
    // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={activRoutes}
          logoText={"Fit Trainer"}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={activRoutes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <Message/>
          <div className={classes.container}>{switchRoutes()}</div>
          </div>
            <Footer routes={activRoutes}/>
          </div>
      </div>
  );
}

export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <App />
  </AppStateProvider>
);