import "./Menu.css";
import { NavLink } from "react-router-dom";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink className=" NavLink" aria-current="page" to="/home">Home</NavLink>
            <NavLink className="NavLink" aria-current="page" to="/aboutus">About Us </NavLink>
        </div>
    );
}

export default Menu;
