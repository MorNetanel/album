import "./PageNotFound.css";
import notFoundImage from "./305.jpg"
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<img className="ImageNotFound" src={notFoundImage} alt="404" />
        </div>
    );
}

export default PageNotFound;
