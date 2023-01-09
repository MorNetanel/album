import { useEffect, useState } from "react";
import PhotoModel from "../../../Models/Photo";
import "./Home.css";
import homeService from "../../../Services/HomeService";
import notificationService from "../../../Services/NotificationService";
import ImageCard from "../../ImageArea/ImageCard/ImageCard";
import { authStore } from "../../../Redux/AuthState";
import photographerService from "../../../Services/PhotographerService";
import { photosStore } from "../../../Redux/PhotosState";



function Home(): JSX.Element {



    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));


    const [photos, setPhotos] = useState<PhotoModel[]>([]);
useEffect( () =>{
    
            homeService.getPhotosOffline()
    .then(photos => setPhotos(photos))
    .catch(err => notificationService.error(err));}
        ,[photosStore.getState().photos]
);

    

const [clientType , setClientType] = useState<string>();
    useEffect(()=>{
        
        authStore.subscribe(()=>{
            setClientType(JSON.stringify(authStore.getState().user));
        })
    },[])

    

    
    


    

    return (
        <div className="Home ">
            
            {client.includes("PHOTOGRAPHER") && 
            <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} />
             )}</div>}
            {client.includes("CLIENT") && 
			<div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>}
            {authStore.getState().token == null && <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>}
        </div>
    );
}

export default Home;
