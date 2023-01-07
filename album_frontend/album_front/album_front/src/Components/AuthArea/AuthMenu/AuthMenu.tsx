import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import Register from "../Register/Register";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [token, setToken] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })
    }, [])

    function logout(){
        authService.logout();
        notificationService.success("Bye bye");
    }
    return (
        <div className="AuthMenu">
                <div >
                    {!authStore.getState().token && <>
            <Link className="Auth" to="/auth/register">Register</Link><br/>
            <Link className="Auth" to="/auth/login">Login</Link><br/>
            </>}
            {authStore.getState().token && <>
            <Link className="Auth" to="/home" onClick={logout}>Logout</Link>
                    </>}
			</div>
        </div>
    );
}

export default AuthMenu;
