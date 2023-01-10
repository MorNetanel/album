import axios from "axios";
import PhotoModel from "../Models/Photo";
import PhotographerModel from "../Models/Photographer";
import { authStore } from "../Redux/AuthState";
import { purchasedPhotosStore } from "../Redux/PhotosPurchasedState";
import { createAddPhotoAction, createFetchAction, photosStore } from "../Redux/PhotosState";
import appConfig from "../Util/Config";
import notificationService from "./NotificationService";
import { createPurchasePhotoAction } from "../Redux/PhotosPurchasedState";


class ClientService{

    public async getDetails(){
        const user = authStore.getState().user;
        if (user === "undefined"){
        const response = axios.get<PhotographerModel>(appConfig.clientUrl + "/details");
        return (await response).data;
        }
        else {
            return user;
        }
    }

    public async getOnePhoto(id:number){
        
       
        const photo = photosStore.getState().photos.find(photo=> photo.id == id);
        if (typeof photo === "undefined"){
                return (await axios.get<PhotoModel>(appConfig.clientUrl + "/photo/" + id)).data;
        }
        
            return photo;
        
    }

    

    public async getAllPhotos(){
        let photos:PhotoModel[] = photosStore.getState().photos;
        if (typeof photos === "undefined"){
                const response = (await axios.get<PhotoModel[]> (appConfig.clientUrl));
                photos = response.data;
                photosStore.dispatch(createFetchAction(photos));
        }
            return photos;
    }

    public async purchasePhoto(photo :PhotoModel){
        if (purchasedPhotosStore.getState().photos.includes(photo))
        return false;
        else{
            const response = axios.post<PhotoModel>(appConfig.clientUrl);
            const photoPurcased = (await response).data;
            purchasedPhotosStore.dispatch(createPurchasePhotoAction(photoPurcased));
            return photoPurcased;
        }
    }

    public async getByMaxPrice(maxPrice:number){
        if (photosStore.getState().photos.length == 0){
            const photos = this.getAllPhotos();
            return (await photos).filter(p => p.price <= maxPrice);
        }
        else return photosStore.getState().photos.filter(p => p.price <= maxPrice);
    }
    


}

const clientService = new ClientService();
export default clientService;