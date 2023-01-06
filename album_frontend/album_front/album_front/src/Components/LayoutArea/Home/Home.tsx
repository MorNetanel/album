import { useEffect, useState } from "react";
import PhotoModel from "../../../Models/Photo";
import "./Home.css";
import homeService from "../../../Services/HomeService";
import notificationService from "../../../Services/NotificationService";
import ImageCard from "../../ImageArea/ImageCard/ImageCard";




function Home(): JSX.Element {
    const [photos, setPhotos] = useState<PhotoModel[]>([]);
useEffect( () =>{
    homeService.getPhotosOffline()
    .then(photos => setPhotos(photos))
    .catch(err => notificationService.error(err));
},[]
);
    return (
        <div className="Home ">
			<div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>
        </div>
    );
}

export default Home;
