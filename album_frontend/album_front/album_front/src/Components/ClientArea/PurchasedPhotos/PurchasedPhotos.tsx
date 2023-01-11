import "./PurchasedPhotos.css";
import { useEffect, useRef, useState } from "react";
import PhotoModel from "../../../Models/Photo";
import clientService from "../../../Services/ClientService";
import notificationService from "../../../Services/NotificationService";
import ImageCard from "../../ImageArea/ImageCard/ImageCard";
import { authStore } from "../../../Redux/AuthState";

function PurchasedPhotos(): JSX.Element {
    
   
    const [photos, setPurchasedPhotos ] = useState<PhotoModel[]>([]);
    useEffect(()=>{
    
                clientService.getAllPurchasedPhotos()
            .then(photos=> setPurchasedPhotos(photos))
        .catch(err => {notificationService.error(err)})
        }
        ,[]);
    return (
        <div className="PurchasedPhotos">
            
         
            
           
     

        <div>Purchased</div>
             <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>
        
      

                
                
        </div>
    );
}

export default PurchasedPhotos;
