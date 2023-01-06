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
        
        let photos :PhotoModel[] = photosStore.getState().photos;
        let photo :PhotoModel | undefined = photos.find(p=> p.id == id);
        if (typeof photo === "undefined"){
                return axios.get<PhotoModel>(appConfig.clientUrl + id);
        }
        else{
            return photo;
        }
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
    


}

const clientService = new ClientService();
export default clientService;