import "./ImageDetailsForPhotographer.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoModel from "../../../Models/Photo";
import photographerService from "../../../Services/PhotographerService";
import notificationService from "../../../Services/NotificationService";
import { createAddPhotoAction, createFetchAction, photosStore } from "../../../Redux/PhotosState";

function ImageDetailsForPhotographer(): JSX.Element {

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
        photographerService.getPhoto(id)
        .then(photo => {
            setPhoto(photo);
        })
        .catch(err=>console.log(err))
    }, []);


    function deletePhoto(){
            photographerService.deletePhoto(id)
            .then(() =>{
                notificationService.success("Photo Deleted");
                photosStore.dispatch(createFetchAction([]));
                navigate("/home");
            })
            .catch( err=>notificationService.error(err) )
        }
    

    return (
        <div className="ImageDetailsForPhotographer">
            
			{photo && <>
            <div><h2>{photo.name}</h2>
            <span>Type: </span><h4>{photo.photoType}</h4>
            <span>Date: </span><h4>{photo.dateTime.toString()}</h4>
            <span>location: </span><h4>{photo.location}</h4>
            <span>Price: </span><h4>{photo.price}</h4></div>
            
            <img src={URL.createObjectURL(convertDataUrlToBlob(photo.image))}/><br/>
                       
            <span className="options">        
            <Link className="link" to={"/photographer/updatephoto/" + id}>Edit Photo</Link><br/>
            <Link className="link" to="" onClick={deletePhoto} >Delete Photo</Link>
            </span>
            </>}
        </div>
    );
}

export default ImageDetailsForPhotographer;
