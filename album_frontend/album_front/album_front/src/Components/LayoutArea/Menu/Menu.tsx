import "./Menu.css";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import {useEffect, useState} from "react";

function Menu(): JSX.Element {

    
    

    return (




        <div className="Menu">



<br/>
			<NavLink className=" NavLink"  to="/home">Home</NavLink>
            <NavLink className="NavLink"  to="/aboutus">About Us </NavLink>
         
              

            {/* {clientType.includes("CLIENT") && <>
            <NavLink className=" NavLink"  to="/client/details">Details</NavLink>
            
            </>}  */}

              

                




            
        </div>
    );
}

export default Menu;
