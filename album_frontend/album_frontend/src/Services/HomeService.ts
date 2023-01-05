import axios from "axios";
import { PhotoModel } from "../Models/Photo";
import { createFetchAction, photosStore } from "../Redux/PhotosState";
import appConfig from "../Util/Config";


class HomeService{
    public async getPhotosOffline(){
        if (photosStore.getState().photos.length == 0){
        const response = axios.get<PhotoModel[]>(appConfig.guestUrl);
        photosStore.dispatch(createFetchAction((await response).data));
        return (await response).data;
        }

        else return photosStore.getState().photos;
    }
}

const homeService = new HomeService();
export default homeService;