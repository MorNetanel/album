import { useEffect, useState } from "react";
import PhotoModel from "../../../Models/Photo";
import homeService from "../../../Services/HomeService";
import notificationService from "../../../Services/NotificationService";
import ImageCard from "../../ImageArea/ImageCard/ImageCard";
import "./Home.css";

function Home(): JSX.Element {
    
    
    const [photos, setPhotos] = useState<PhotoModel[]>([]);
    useEffect(()=>{
        homeService.getPhotosOffline()
        
        
        .then(photos => setPhotos(photos))
        .catch(err => notificationService.error(err))
    },[]
    );
    console.log(photos);
    
    return (
        <div className="Home">
			
            <div>{photos.map(photo => <ImageCard key={photo.id} photo = {photo}/>)}</div>

        </div>
    );
}

export default Home;
