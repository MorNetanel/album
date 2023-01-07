import { Link } from "react-router-dom";
import Register from "../Register/Register";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    return (
        <div className="AuthMenu">
                <div >
            <Link className="Auth" to="/auth/register">Register</Link>

			</div>
        </div>
    );
}

export default AuthMenu;
