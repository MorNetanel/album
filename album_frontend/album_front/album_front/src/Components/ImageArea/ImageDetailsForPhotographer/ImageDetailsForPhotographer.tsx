import "./ImageDetailsForPhotographer.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoModel from "../../../Models/Photo";
import photographerService from "../../../Services/PhotographerService";

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
    return (
        <div className="ImageDetailsForPhotographer">
            
			{photo && <>
            <div><h2>{photo.name}</h2>
            <h3>{photo.photoType}</h3>
            <h3>{photo.dateTime.toString()}</h3>
            <h3>{photo.location}</h3>
            <h3>{photo.price}</h3></div>
            <img src={URL.createObjectURL(convertDataUrlToBlob(photo.image))}/><br/>
            </>}
        </div>
    );
}

export default ImageDetailsForPhotographer;
