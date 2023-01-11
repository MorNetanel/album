import axios from "axios";
import  PhotoModel  from "../Models/Photo";
import { createClearAction, createFetchAction, photosStore } from "../Redux/PhotosState";
import appConfig from "../Util/Config";


class HomeService{
    public async getPhotosOffline(){
       
        photosStore.dispatch(createClearAction());
        const response = axios.get<PhotoModel[]>(appConfig.guestUrl);
        photosStore.dispatch(createFetchAction((await response).data));
        return (await response).data;
        

        
    }
}

const homeService = new HomeService();
export default homeService;