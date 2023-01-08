import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhotoModel from "../../../Models/Photo";
import notificationService from "../../../Services/NotificationService";
import photographerService from "../../../Services/PhotographerService";
import "./AddPhoto.css";

function AddPhoto(): JSX.Element {


    const{register, handleSubmit, formState} = useForm<PhotoModel>();
    const navigate = useNavigate();

    function send(photo :PhotoModel){
        photo.image = (photo.image as FileList[0]);
        console.log(photo);
        
        photographerService.addPhoto(photo)
        .then(() =>{
            notificationService.success("Photo added");
            navigate("/home");
        })
        .catch(err=>{
            notificationService.error(err);
            
            
        })
    }
    return (
        <div className="AddPhoto">
			


            <form onSubmit={handleSubmit(send)}>

<label >Name: </label> <br/>
<input   type="text" id ="name"{...register("name", {
    required:{value:true, message:"Please enter name"},
    minLength:{value:2, message:"Name must be at least 2 characters long"},
    maxLength:{value:10, message:"Name must be maximum 10 characters long"}
})} /> <br/>
<span className="error">{formState.errors?.name?.message}<br/></span>



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


<input type="file" {...register("image", {
required:{value:true, message:"Please load image file"}
})}/> <br/><br/>



<button>Add</button>
</form>




        </div>
    );
}

export default AddPhoto;
