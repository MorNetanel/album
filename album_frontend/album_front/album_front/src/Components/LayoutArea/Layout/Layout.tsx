import Heading from "../Heading/Heading";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import backgroundPhoto from "Mountain.webp"
import Footer from "../Footer/Footer";
import Home from "../Home/Home";

function Layout(): JSX.Element {
    return (
        <div className="Layout">





			<Heading/>
           
            <main>
            <Routing/>
            </main>
            <Footer/>
            
           
        </div>
    );
}

export default Layout;
