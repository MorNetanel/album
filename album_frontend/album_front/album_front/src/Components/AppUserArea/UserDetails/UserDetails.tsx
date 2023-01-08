import "./UserDetails.css";
import {useEffect, useState} from "react";
import { authStore } from "../../../Redux/AuthState";
import { AppUserModel } from "../../../Models/AppUser";


function UserDetails(): JSX.Element {




    

    const [user, setUser] = useState<AppUserModel>();
    useEffect(() =>{
        setUser(authStore.getState().user);
    },[]);



    return (
        <div className="UserDetails">
                <h2>User details</h2><br/>
            {user &&<div>
            <h2>{user.firstName + " "}
            {user.lastName}</h2>
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
            <h2> {user.appUserType}</h2>
            </div>}
			
        </div>
    );
}

export default UserDetails;
