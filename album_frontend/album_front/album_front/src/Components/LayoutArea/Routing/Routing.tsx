import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import AboutUs from "../../AboutUsArea/AboutUs/AboutUs";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import UserDetails from "../../AppUserArea/UserDetails/UserDetails";
import AddPhoto from "../../PhotographerArea/AddPhoto/AddPhoto";
import ImageDetailsForPhotographer from "../../ImageArea/ImageDetailsForPhotographer/ImageDetailsForPhotographer";
import EditPhoto from "../../PhotographerArea/EditPhoto/EditPhoto";
import ImageDetailsForClient from "../../ImageArea/ImageDetailsForClient/ImageDetailsForClient";
import PurchasedPhotos from "../../ClientArea/PurchasedPhotos/PurchasedPhotos";



function Routing(): JSX.Element {
    return (
        <div className="Routing">
			 <Routes>


            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/photographer/details" element={<UserDetails />} />
            <Route path="/client/details" element={<UserDetails />} />
            <Route path="/client/purchased" element={<PurchasedPhotos />} />
            <Route path="/photographer/add" element={<AddPhoto />} />
            <Route path="/photographer/photo/:id"  element={<ImageDetailsForPhotographer />} />
            <Route path="/client/photo/:id"  element={<ImageDetailsForClient />} />
            <Route path="/photographer/updatephoto/:id"  element={<EditPhoto />} />


            
            





        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/*" element={<PageNotFound/>} />
            </Routes>
        </div>
    );
}

export default Routing;
