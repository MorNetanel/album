import "./PhotographerMenu.css";
import { authStore } from "../../../Redux/AuthState";
import {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import AddPhoto from "../AddPhoto/AddPhoto";

function PhotographerMenu(): JSX.Element {


    // const [clientType , setClientType] = useState<string>();
    // useEffect(()=>{
    //     authStore.subscribe(()=>{
    //         setClientType(JSON.stringify(authStore.getState().user));
    //     })
    // },[])
    // const tokenDecoded = JSON.stringify(authStore.getState().user);
    // const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));

    return (
        <div className="PhotographerMenu">
			
            <NavLink className=" NavLink"  to="/photographer/details">Details</NavLink>
            <NavLink className=" NavLink"  to="/photographer/add">Add photo</NavLink>
        </div>
    );
}

export default PhotographerMenu;
