import Menu from "../Menu/Menu";
import "./Heading.css";

function Heading(): JSX.Element {
    return (
        <div className="Heading">
			<div>
                <h1>Album Project</h1>
                <Menu/>
            </div>
        </div>
    );
}

export default Heading;
