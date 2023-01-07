import { Link } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import "./Heading.css";

function Heading(): JSX.Element {
    return (
        <div className="Heading">
			<div>
               <div className="Auth"><AuthMenu/></div>
                <h1>Album Project</h1>
               
               
            </div>
        </div>
    );
}

export default Heading;
