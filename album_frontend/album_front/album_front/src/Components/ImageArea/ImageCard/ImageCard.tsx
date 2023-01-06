import PhotoModel from "../../../Models/Photo";
import "./ImageCard.css";

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


    return (
        <div className="ImageCard">
			<div className="Image">
                <h2>{props.photo.name}</h2>
                <h3>{props.photo.location}</h3>
                <h3>{props.photo.price}</h3>
                
            </div>
        </div>
    );
}

export default ImageCard;
