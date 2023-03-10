import axios from "axios";
import e from "express";
import { config } from "yargs";
import  PhotoModel, { PhotoType }  from "../Models/Photo";
import PhotographerModel from "../Models/Photographer";
import { authStore } from "../Redux/AuthState";
import { createAddPhotoAction, createDeleteAction, createFetchAction, photosStore, createEditAction } from "../Redux/PhotosState";
import appConfig from "../Util/Config";
import { useNavigate } from "react-router-dom";


class PhotographerService{

    

    public async getDetails(){
        const user = authStore.getState().user;
        if (user === "undefined"){
        const response = axios.get<PhotographerModel>(appConfig.photographerUrl + "/details");
        return (await response).data;
        }
        else {
            return user;
        }
    }

    public async getAllPhotos(){
        console.log("get all photos");
        
        const photographerId:number = authStore.getState().user.id;
        if (photosStore.getState().photos.length ==0 && authStore.getState().user.clientType == "PHOTOGRAPHER" ){
        const response = axios.get<PhotoModel[]>(appConfig.photographerUrl);
        const photos = (await response).data.filter(p =>p.photographer.id == photographerId );
        photosStore.dispatch(createFetchAction((photos)));
        return photos;
        }
        else{
            
            return photosStore.getState().photos.filter(photo => photo.photographer.id == photographerId);
        }
    }

    

    public async addPhoto(photo:PhotoModel){

     let reader = new FileReader();
        var image = photo.image as FileList;
        reader.readAsDataURL(image[0]);

        reader.onload = async function () {
             photo.image = reader.result as string;

             console.log( photo);
             const response = await axios.post(appConfig.photographerUrl , photo);
            const newPhoto = response.data;
            
            photosStore.dispatch(createAddPhotoAction(newPhoto));
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        };
    

        

    public async getPhoto(id: number){
        const photographerId:number = authStore.getState().user.id;
        const photo = photosStore.getState().photos.find(photo=> photo.id == id);
        if (typeof photo === "undefined"){            
        return (await axios.get<PhotoModel>(appConfig.photographerUrl + "/photo/" + id)).data;}
        return photo;
    }

    public async deletePhoto(id: number){
        const response = (await axios.delete(appConfig.photographerUrl+ "/" +id)).data;
        photosStore.dispatch(createDeleteAction(id));
        return response;
    }


    public async getByCategory (cat:string){
        const photographerId:number = authStore.getState().user.id;
        if (photosStore.getState().photos.length == 0){
                    const response = (await axios.get<PhotoModel[]> (appConfig.photographerUrl));
                   const photos = response.data.filter(photo => photo.photographer.id == photographerId);
                photosStore.dispatch(createFetchAction(photos));
                if (cat == "ALL"){
                                 return photos;}
                                else
                    return photos.filter((p) => p.photoType.valueOf().toString() ===cat);
        }
        if (cat == "ALL")
                return photosStore.getState().photos;
                else{           
        const photos = photosStore.getState().photos.filter((p) => p.photoType.valueOf().toString() === cat);
        return photos;}
    }


    public async updatePhoto(photo:PhotoModel){
      
        const response = (await axios.put(appConfig.photographerUrl, photo));
        const newPhoto = response.data;
        photosStore.dispatch(createEditAction(newPhoto));
        
        
        return newPhoto;
        
         

    }


    

    










}

const photographerService = new PhotographerService();
export default photographerService;


