import React, { createContext, useReducer, useContext } from "react"

import UseActionsState from "state/actions";

const Context = createContext()

export function AppStateProvider({ reducer, initialState = {}, children }) {
  const value = UseActionsState(useReducer(reducer, initialState))
  return <Context.Provider value={value} children={children} />
}

export function useAppState() {
  return useContext(Context)
}