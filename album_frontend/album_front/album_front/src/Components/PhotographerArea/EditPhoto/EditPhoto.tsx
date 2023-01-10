import PhotoModel from "../../../Models/Photo";
import "./EditPhoto.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import notificationService from "../../../Services/NotificationService";
import photographerService from "../../../Services/PhotographerService";

function EditPhoto(): JSX.Element {

    const [photo, setPhoto] = useState<PhotoModel>();
    const {register, handleSubmit, formState, setValue} = useForm<PhotoModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;


    useEffect( () =>{
        photographerService.getPhoto(id)
        .then(photo =>{
            setPhoto(photo);
            setValue("id", photo.id)
            setValue("name", photo.name);
            setValue("image", photo.image);
            setValue("location", photo.location);
            setValue("price", photo.price);
            setValue("photoType", photo.photoType);
            setValue("dateTime", photo.dateTime);
        })
        .catch(err =>{
            notificationService.error(err)
        })
    },[]);

    function send(photo :PhotoModel){
        // photo.id = id;
        // photo.image = photo.image;
        // photo.name = photo.name;
        photographerService.updatePhoto(photo)
        .then(()=>{
            notificationService.success("Photo updated")
            navigate("/home")
        })
        .catch(err =>notificationService.error(err))
    }


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
        <div className="EditPhoto">
                   {photo && <><h2>{photo.name}</h2></>}
                   
            <form onSubmit={handleSubmit(send)}>




<label >Price: </label> <br/>
<input type="number" id ="price" step="0.1" {...register("price", {
    required:{value:true, message:"Please enter price"}, 
    min:{value:0.1, message:"Price must be positive number"},
    max:{value:2000, message:"Price must be maximum 2000"}
})} /> <br/>
<span className="error">{formState.errors?.price?.message}<br/></span>


<label >Photo type: </label> <br/>
<select id="photoType" {...register("photoType")}>
  <option value="LANDSCAPE">LANDSCAPE</option>
  <option value="WILDLIFE">WILDLIFE</option>
  <option value="MACRO">MACRO</option>
  <option value="UNDERWATER">UNDERWATER</option>
  <option value="ASTROPHOTOGRAPHY">ASTROPHOTOGRAPHY</option>
  <option value="AERIAL">AERIAL</option>
  <option value="SCIENTIFIC">SCIENTIFIC</option>
  <option value="PORTRAITS">PORTRAITS</option>
  <option value="WEDDING">WEDDING</option>
  <option value="DOCUMENTARY">DOCUMENTARY</option>
  <option value="SPORTS">SPORTS</option>
  <option value="FASHION">FASHION</option>
  <option value="COMMERCIAL">COMMERCIAL</option>
  <option value="STREET">STREET</option>
  <option value="EVENT">EVENT</option>
  <option value="TRAVEL">TRAVEL</option>
  <option value="PET">PET</option>
  <option value="PRODUCT">PRODUCT</option>
  <option value="FOOD">FOOD</option>
  <option value="ARCHITECTURE">ARCHITECTURE</option>
</select> <br/><br/>




<label >Location: </label> <br/>
<input type="text" id ="location"{...register("location", {
    required:{value:true, message:"Please enter location"},
    minLength:{value:5, message:"Location must be at least 5 characters long"},
    maxLength:{value:15, message:"Location must be maximum 15 characters long"}
})} /> <br/>
<span className="error">{formState.errors?.location?.message}<br/></span>

{photo && <>
<img src={URL.createObjectURL(convertDataUrlToBlob(photo.image))}/><br/>
</>}





<button>Edit</button>
</form>
        </div>
    );
}

export default EditPhoto;
