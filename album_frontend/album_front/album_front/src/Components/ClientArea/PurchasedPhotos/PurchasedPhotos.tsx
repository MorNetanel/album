import "./PurchasedPhotos.css";
import { useEffect, useRef, useState } from "react";
import PhotoModel from "../../../Models/Photo";
import clientService from "../../../Services/ClientService";
import notificationService from "../../../Services/NotificationService";
import ImageCard from "../../ImageArea/ImageCard/ImageCard";
import { authStore } from "../../../Redux/AuthState";
import homeService from "../../../Services/HomeService";

function PurchasedPhotos(): JSX.Element {
    
   
    const [photos, setPhotos ] = useState<PhotoModel[]>([]);
    useEffect(()=>{
          
          
    //    homeService.getPhotosOffline()
       clientService.getAllPurchasedPhotos()
            .then(photos => setPhotos(photos))
        .catch(err => {notificationService.error(err)})
        }
        ,[]);
    return (
        <div className="PurchasedPhotos">
            
         
            
           
     

            <div>{Array.isArray(photos) ? "yes"  : "no"}</div>
            <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>
      

                
                
        </div>
    );
}

export default PurchasedPhotos;
