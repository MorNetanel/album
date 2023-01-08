import "./Menu.css";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import {useEffect, useState} from "react";
import PhotographerMenu from "../../PhotographerArea/PhotographerMenu/PhotographerMenu";
import ClientMenu from "../../ClientArea/ClientMenu/ClientMenu";


function Menu(): JSX.Element {

    
    

    const [clientType , setClientType] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setClientType(JSON.stringify(authStore.getState().user));
        })
    },[])


    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));

    return (




        <div className="Menu">



<br/>
			<NavLink className=" NavLink"  to="/home">Home</NavLink>
            <NavLink className="NavLink"  to="/aboutus">About Us </NavLink>
         
         {client.includes("PHOTOGRAPHER") && <PhotographerMenu/>}
         {client.includes("CLIENT") &&  <ClientMenu/>}
             

           

              

                




            
        </div>
    );
}

export default Menu;
