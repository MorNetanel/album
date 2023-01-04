import Heading from "../Heading/Heading";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import backgroundPhoto from "Mountain.webp"

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Heading/>
            </header>
            
            <nav>
                <Menu />
            </nav>
            <main>
                <Routing />
            </main>
        </div>
    );
}

export default Layout;
