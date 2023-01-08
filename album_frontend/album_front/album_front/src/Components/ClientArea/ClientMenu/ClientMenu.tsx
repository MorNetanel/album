import { NavLink } from "react-router-dom";
import "./ClientMenu.css";

function ClientMenu(): JSX.Element {
    return (
        <div className="ClientMenu">
			
            <NavLink className=" NavLink"  to="/client/details">Details</NavLink>
     
        </div>
    );
}

export default ClientMenu;
