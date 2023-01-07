import "./Menu.css";
import { NavLink } from "react-router-dom";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink className=" NavLink"  to="/home">Home</NavLink>
            <NavLink className="NavLink"  to="/aboutus">About Us </NavLink>
        </div>
    );
}

export default Menu;
