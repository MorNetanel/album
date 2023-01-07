import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppUserModel } from "../Models/AppUser";

export class AuthState{
    public token :string = null ;
    public user:any  = null;
    
    constructor (){
        if (localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            const tokenObject = jwtDecode(this.token);
            this.user = tokenObject;

        }
    }
}

export enum AuthActionTypes{
    Login, Register,  Logout
}

export interface AuthAction{
    type:AuthActionTypes, 
    payload?:any
}

export function loginAction(token:string){
    return {type:AuthActionTypes.Login, payload:token}
}

export function registerAction(token:string){
    return {type:AuthActionTypes.Register, payload:token}
}

export function logoutAction(){
    return {type:AuthActionTypes.Logout}
}

export function reducer(currentState = new AuthState(), action:AuthAction){
    const newState = {...currentState};

    switch(action.type){
        case AuthActionTypes.Login:
        case AuthActionTypes.Register:
            newState.token = action.payload;
            localStorage.setItem("token", newState.token);
            const tokenObject: {user: AppUserModel} = jwtDecode(newState.token);            
            newState.user = tokenObject;
        break;

        case AuthActionTypes.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }
    return newState;
}

export const authStore = createStore(reducer, composeWithDevTools());
