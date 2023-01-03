import axios from "axios";
import { AppUserModel } from "../Models/AppUser";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import { createClearPurchaseAction, createPurchasePhotoAction, purchasedPhotosStore } from "../Redux/PhotosPurchasedState";
import { createClearAction, createFetchAction, photosStore } from "../Redux/PhotosState";
import appConfig from "../Util/Config";

class AuthService{

    public async register(credentials:AppUserModel){
        const response = axios.post<string>(appConfig.authUrl + "/register", credentials);
        const token = (await response).data;
        authStore.dispatch(loginAction(token));
        
    }

    public async login(username:string, password:string){
        const response = axios.post<string>(appConfig.authUrl + "/login?user=" + username + "&password=" + password, );
        const token = (await response).data;
        authStore.dispatch(loginAction(token));
    }





    public logout(){
        authStore.dispatch(logoutAction());
        photosStore.dispatch(createClearAction());
        purchasedPhotosStore.dispatch(createClearPurchaseAction());
    }
}

const authService = new AuthService();
export default authService;