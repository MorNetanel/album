import Heading from "../Heading/Heading";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import backgroundPhoto from "Mountain.webp"
import Footer from "../Footer/Footer";
import Home from "../../HomeArea/Home/Home";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Heading/>
            </header>
            
            <nav>
                <Menu />
            </nav>
            <Home/>
            <main>
                <Routing />
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;
