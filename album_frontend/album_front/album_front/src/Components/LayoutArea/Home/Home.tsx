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
import { hostname } from "os";



function Home(): JSX.Element {

    const [token, setToken] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })
    }, [])



    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));
    const[price, setPhotoPrice] = useState<number>(2000);
    const [category, setCategory] = useState<string>("ALL");

    const [photos, setPhotos ] = useState<PhotoModel[]>([]);
    useEffect(()=>{
        //GUEST 
        if (!client.includes("PHOTOGRAPHER") && !client.includes("CLIENT")){
            console.log("no token");
            
        homeService.getPhotosOffline()
        .then(photos => setPhotos(photos))
        .catch(err => {notificationService.error(err)})}
        }
        ,[]);
    
        useEffect(()=>{
            //PHOTOGRAPER
            if (client.includes("PHOTOGRAPHER")){
                if (category != undefined){
                    photographerService.getByCategory(category)
                    .then(photos => setPhotos(photos))
                    .catch(err => {notificationService.error(err)})
                }
                else{
            photographerService.getAllPhotos()
            .then(photos => setPhotos(photos))
            .catch(err => {notificationService.error(err)})}}
            }
            ,[category]);

            useEffect(()=>{
                //CLIENT
                if (client.includes("CLIENT")){
                        clientService.getAllPhotos()
                    .then(photos => setPhotos(photos))
                .catch(err => {notificationService.error(err)})}
                }
                ,[]);

                

   

    

const [clientType , setClientType] = useState<string>();
    useEffect(()=>{
        
        authStore.subscribe(()=>{
            setClientType(JSON.stringify(authStore.getState().user));
        })
    },[])

    

    return (
        <div className="Home ">
            
            {client.includes("PHOTOGRAPHER") && <>
            <select name="category" className="category" onChange={(cat) =>setCategory(cat.target.value) } >
                
                <option value="ALL">All CATEGORIES</option>
               
                    <option value="LANDSCAPE">LANDSCAPE</option>
                    <option value="WILDLIFE">WILDLIFE</option>
                    <option value="MACRO">MACRO</option>
                    <option value="UNDERWATER">UNDERWATER</option>
                    <option value="AERIAL">AERIAL</option>
                    <option value="SCIENTIFIC">SCIENTIFIC</option>
                    <option value="PORTRAITS">PORTRAITS</option>
                    <option value="WEDDING">WEDDING</option>
                    <option value="DOCUMENTARY">DOCUMENTARY</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="FASHION">FASHION</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                    <option value="STREET">STREET</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="PET">PET</option>
                    <option value="PRODUCT">PRODUCT</option>
                    <option value="FOOD">FOOD</option>
                    <option value="ARCHITECTURE">ARCHITECTURE</option>
                </select> 
            <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} />
             )}</div> </>}



            {client.includes("CLIENT") && <>
            
            {/* <div className="price">
                <label htmlFor="customRange3" className="form-label">Price</label>
                <input onChange={(p) => setPhotoPrice(+p.target.value)} type="range" className="form-range" min="0" max="100"  id="customRange3"/>
                <span className="price">{price}</span><br/>
                </div>



                <select name="category" className="category" onChange={(cat) =>setCategory(cat.target.value) } >
                
                <option value="ALL">All CATEGORIES</option>
               
                    <option value="LANDSCAPE">LANDSCAPE</option>
                    <option value="WILDLIFE">WILDLIFE</option>
                    <option value="MACRO">MACRO</option>
                    <option value="UNDERWATER">UNDERWATER</option>
                    <option value="AERIAL">AERIAL</option>
                    <option value="SCIENTIFIC">SCIENTIFIC</option>
                    <option value="PORTRAITS">PORTRAITS</option>
                    <option value="WEDDING">WEDDING</option>
                    <option value="DOCUMENTARY">DOCUMENTARY</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="FASHION">FASHION</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                    <option value="STREET">STREET</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="PET">PET</option>
                    <option value="PRODUCT">PRODUCT</option>
                    <option value="FOOD">FOOD</option>
                    <option value="ARCHITECTURE">ARCHITECTURE</option>
                </select> */}

			<div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div>
            

                
                 </>}
            {authStore.getState().token == null && <>
             <div className="Photo ">{photos.map(photo => <ImageCard key={photo.id} photo = {photo} /> )}</div></>}
        </div>
    );
}

export default Home;
