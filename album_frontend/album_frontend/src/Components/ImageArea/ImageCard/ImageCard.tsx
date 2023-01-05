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
            <div>{props.photo.name}</div>
           
			{/* <img  src={URL.createObjectURL(convertDataUrlToBlob(props.photo.image))} alt="Card image cap"/> */}
        </div>
    );
}

export default ImageCard;
