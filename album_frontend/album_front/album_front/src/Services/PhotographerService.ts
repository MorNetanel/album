import axios from "axios";
import e from "express";
import { config } from "yargs";
import  PhotoModel, { PhotoType }  from "../Models/Photo";
import PhotographerModel from "../Models/Photographer";
import { authStore } from "../Redux/AuthState";
import { createAddPhotoAction, createDeleteAction, createFetchAction, photosStore, createEditAction } from "../Redux/PhotosState";
import appConfig from "../Util/Config";


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
        if (photosStore.getState().photos.length ==0 ){
        const response = axios.get<PhotoModel[]>(appConfig.photographerUrl);
        const photos = (await response).data;
        photosStore.dispatch(createFetchAction((photos)));
        return photos;
        }
        else{
            const photographerId = authStore.getState().user.photographerId;
            return photosStore.getState().photos.filter(photo => photo.photographer.id === photographerId);
        }
    }

    public async addPhoto(photo:PhotoModel){



        
         
     
    
     let reader = new FileReader();
        var image = photo.image as FileList;
        reader.readAsDataURL(image[0]);
        console.log(photo);
        reader.onload = async function () {
             photo.image = reader.result as string;
             const response = await axios.post(appConfig.photographerUrl + "/add", photo);
            const newPhoto = response.data;
            photosStore.dispatch(createAddPhotoAction(newPhoto));
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        const response =   await axios.post(appConfig.photographerUrl + "/add", photo );
        const newPhoto = response.data;
        photosStore.dispatch(createAddPhotoAction(newPhoto));
            return newPhoto;
        };
    

        // reader.onerror = function (error) {
        //   console.log('Error: ', error);
        // };
        
        

    //     let reader = new FileReader();
    //     var image = photo.image as FileList;
    //     reader.readAsDataURL(image[0]);
    //     reader.onload = async function () {
    //          photo.image = reader.result as string;

    //     //      console.log(photo);
    //                 photo.name = "p11";
    //                 photo.location = "eilat";
    //                 photo.price = 12;
    //                 photo.photoType = PhotoType.AERIAL;
    //          const response =   await axios.post(appConfig.photographerUrl + "/add", photo);
    //         const newPhoto = response.data;
            
    //         photosStore.dispatch(createAddPhotoAction(newPhoto));
    //         return newPhoto;
    //     }
    // }

    public async getPhoto(id: number){
        const photo = photosStore.getState().photos.find(photo=> photo.id == id);
        if (typeof photo === "undefined")
        return (await axios.get<PhotoModel>(appConfig.photographerUrl + "photo/" + id)).data;
        return photo;
    }

    public async deletePhoto(id: number){
        const response = (await axios.delete(appConfig.photographerUrl+id)).data;
        photosStore.dispatch(createDeleteAction(id));
        return response;
    }

    public async updatePhoto(photo:PhotoModel){
        //update photographer into photo
        let photographerId :number = authStore.getState().user.id;
        let firstName :string = authStore.getState().user.firstName;
        let lastName:string = authStore.getState().user.lastName;
        let email :string = authStore.getState().user.email;
        let photographer:PhotographerModel = new PhotographerModel(photographerId, firstName, lastName, email);
        photo.photographer = photographer;

        let reader = new FileReader();
        var image = photo.image as FileList;
        reader.readAsDataURL(image[0]);
        reader.onload = async function () {
             photo.image = reader.result as string;


        

        const response = (await axios.put<PhotoModel>(appConfig.photographerUrl));
        const newPhoto = response.data;
        photosStore.dispatch(createEditAction(newPhoto));
        return newPhoto;
         }

    }

    










}

const photographerService = new PhotographerService();
export default photographerService;