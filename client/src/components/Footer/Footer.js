/*eslint-disable*/
import React from "react";

import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {List, ListItem, ListItemText} from "@material-ui/core";

import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const {routes} = props;

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {routes.map((rout)=>{
              return (
                <NavLink key={rout.name} to={rout.layout + rout.path} className={classes.item}>
                  <ListItem button className={classNames(classes.inlineBlock, classes.block, classes.nav)}>
                    <ListItemText 
                      primary={rout.name}
                      className={classes.linkText}
                      disableTypography={true}
                    />
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="/#"
              target="_blank"
              className={classes.a}
            >
              @
            </a>
            , made with love for a better web
          </span>
        </p>
      </div>
    </footer>
  );
}
