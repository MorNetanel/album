import { useEffect, useState } from "react";
import PhotoModel from "../../../Models/Photo";
import "./Home.css";
import homeService from "../../../Services/HomeService";
import notificationService from "../../../Services/NotificationService";
import ImageCard from "../../ImageArea/ImageCard/ImageCard";
import { authStore } from "../../../Redux/AuthState";
import photographerService from "../../../Services/PhotographerService";
import { photosStore } from "../../../Redux/PhotosState";
import clientService from "../../../Services/ClientService";



function Home(): JSX.Element {



    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));
    const[price, setPhotoPrice] = useState<number>();

    const [photos, setPhotos] = useState<PhotoModel[]>([]);

useEffect( () =>{
    if (price === undefined){
            homeService.getPhotosOffline()
            .then(photos => setPhotos(photos))
    .catch(err => notificationService.error(err));}
            else{
                clientService.getByMaxPrice(price)
            
    .then(photos => setPhotos(photos))
    .catch(err => notificationService.error(err));}
}
        ,[price]);


const [photosForPhotograper, setPhotosForPhotograper] = useState<PhotoModel[]>([]);
useEffect( () =>{
    
            photographerService.getAllPhotos()
    .then(photos => setPhotosForPhotograper(photos))
    .catch(err => notificationService.error(err));}
        ,[]
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
            <div className="Photo ">{photosForPhotograper.map(photo => <ImageCard key={photo.id} photo = {photo} />
             )}</div>}



            {client.includes("CLIENT") && <>
            
           
            <div className="price">
                <label htmlFor="customRange3" className="form-label">Price</label>
                <input onChange={(p) => setPhotoPrice(+p.target.value)} type="range" className="form-range" min="0" max="2000"  id="customRange3"/>
                <span className="price">{price}</span><br/>
                </div>

			<div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>
            

            
                
                
                
                
                
                 </>}




            {authStore.getState().token == null &&
             <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>}
        </div>
    );
}

export default Home;
