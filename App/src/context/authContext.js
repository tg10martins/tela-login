import React, { useReducer } from "react";

let initialState = {
    Loading: true,
    isLogged: false,
    name: '',
    isAdmin: 'false',
    token: '',
    idUser: '',
    idRestaurant: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case "logIn":
            return { ...state, isLogged: action.payload, Loading: false }
        case "logOut":
            return { ...state, isLogged: false }
        case "verify":
            return { ...state, isLogged: true, Loading: false, idUser: action.payload.id, isAdmin: action.payload.admin, name: action.payload.name }
        default:
            return state
    }
}

export const Context = React.createContext();

export const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
    
}
