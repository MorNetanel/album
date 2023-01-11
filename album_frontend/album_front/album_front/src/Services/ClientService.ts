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
       
        if (photosStore.getState().photos.length == 0){
                const response = (await axios.get<PhotoModel[]> (appConfig.clientUrl));
               const  photos = response.data;
                photosStore.dispatch(createFetchAction(photos));
                return photos;
        }
        else
            return photosStore.getState().photos;
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


    public async getByCategory (cat:string){
        if (photosStore.getState().photos.length == 0){
           
            
                    const response = (await axios.get<PhotoModel[]> (appConfig.clientUrl));
                   const photos = response.data;
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

    public async getByCategoryAndPrice(cat :string , price:number){
            if (photosStore.getState().photos.length == 0){
                 const response = (await axios.get<PhotoModel[]> (appConfig.clientUrl));
                   const allPhotos = response.data;
                   const photosAfterTwoFilters :PhotoModel[] = [];

                        for (let index = 0; index < allPhotos.length; index++) {
                            if (allPhotos[index].photoType == cat && allPhotos[index].price <= price)
                            photosAfterTwoFilters.push(allPhotos[index])}

                            return photosAfterTwoFilters;

            }
            else{
                const allPhotos = photosStore.getState().photos;
                const photosAfterTwoFilters :PhotoModel[] = [];

                        for (let index = 0; index < allPhotos.length; index++) {
                            if (allPhotos[index].photoType == cat && allPhotos[index].price <= price)
                            photosAfterTwoFilters.push(allPhotos[index])}
                            console.log("photos after 2 filters");
                                
                            console.log(photosAfterTwoFilters);
                                
                            return photosAfterTwoFilters;
            }
    }
    


}

const clientService = new ClientService();
export default clientService;