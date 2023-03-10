import "./ImageDetailsForClient.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoModel from "../../../Models/Photo";
import clientService from "../../../Services/ClientService";
import notificationService from "../../../Services/NotificationService";
import { purchasedPhotosStore } from "../../../Redux/PhotosPurchasedState";
function ImageDetailsForClient(): JSX.Element {


    function convertDataUrlToBlob(dataUrl: any): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);    
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    const [photo, setPhoto] = useState<PhotoModel>();
    const params = useParams();
    const id = +params.id!;
    const navigate = useNavigate();
    useEffect( () =>{
        clientService.getOnePhoto(id)
        .then(p => {
            setPhoto(p);
        })
        .catch(err=>notificationService.error(err))
    }, []);

    function purchasePhoto(){
        clientService.purchasePhoto(photo)
        .then(() =>{
            notificationService.success("Photo Purchased");
            
            navigate("/home");
        })
        .catch( err=>notificationService.error(err) )
    }


    function purchased() :boolean {
                const purchasedPhotos = purchasedPhotosStore.getState().photos;
                var boole: boolean = false;
                purchasedPhotos.forEach(p =>{
                    if (isPhotoEqual(p , photo))
                    boole = true  ;
                });
                return boole ;
    }

    function isPhotoEqual(p1 :PhotoModel, p2 :PhotoModel){
        return p1.id == p2.id;
    }


    
    return (
        <div className="ImageDetailsForClient">
			{photo && <>
            <div><h2>{photo.name}</h2>
            <span className="photographerName"> By {photo.photographer.firstName } </span>
            <span className="photographerName">{ photo.photographer.lastName}</span><br/>
            <span>Type: </span><h4>{photo.photoType}</h4>
            <span>Date: </span><h4>{photo.dateTime.toString()}</h4>
            <span>location: </span><h4>{photo.location}</h4>
            <span>Price: </span><h4>{photo.price}</h4></div>
            
            
            <img src={URL.createObjectURL(convertDataUrlToBlob(photo.image))}/>
               {! purchased() && <>
                <Link className="linkPurchase Image" to="" onClick={purchasePhoto} >Purchase Photo</Link>   
               </>}        
            {/* <Link className="linkPurchase Image" to="" onClick={purchasePhoto} >Purchase Photo</Link> */}
            
            </>}
        </div>
    );
}

export default ImageDetailsForClient;
