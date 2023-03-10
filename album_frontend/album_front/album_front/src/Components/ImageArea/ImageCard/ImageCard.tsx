import { Link } from "react-router-dom";
import PhotoModel from "../../../Models/Photo";
import { authStore } from "../../../Redux/AuthState";
import "./ImageCard.css";
import {useEffect, useState} from "react";

interface PhotoProperties{
    photo:PhotoModel
}
function ImageCard(props:PhotoProperties): JSX.Element {

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

    const [clientType , setClientType] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setClientType(JSON.stringify(authStore.getState().user));
        })
    },[])


    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));


    return (
        <div className="ImageCard">
			<div className="Image">

                <h2>{props.photo.name}</h2>

                {client.includes("PHOTOGRAPHER")  && <Link className="Link" to={"/photographer/photo/" + props.photo.id}>
                <img src={URL.createObjectURL(convertDataUrlToBlob(props.photo.image))}/><br/>
                </Link>}
                {client.includes("CLIENT")  && <Link className="Link" to={"/client/photo/" + props.photo.id}>
                <img src={URL.createObjectURL(convertDataUrlToBlob(props.photo.image))}/><br/>
                </Link>}
                {authStore.getState().token == null &&
                <img src={URL.createObjectURL(convertDataUrlToBlob(props.photo.image))}/>}
                <h3>{props.photo.location}</h3>
                <h3>{props.photo.price}</h3>
                
                
                
            </div>
        </div>
    );
}

export default ImageCard;
