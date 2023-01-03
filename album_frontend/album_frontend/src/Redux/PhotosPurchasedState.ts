import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { PhotoModel } from "../Models/Photo";



export class PhotosState{
    public photos:PhotoModel[] = [];
}

export enum PhotosActionType{
    FetchPurchasedPhotos, PurchasePhoto, ClearPurchasedPhotos
}

export interface PhotosAction {
    type:PhotosActionType;
    payload?:any
}

export function createFetchAction(photos:PhotoModel[]){
    return{type:PhotosActionType.FetchPurchasedPhotos, payload:photos}
}

export function createPurchasePhotoAction(photo:PhotoModel){
    return{type:PhotosActionType.PurchasePhoto, payload:photo}
}



export function createClearPurchaseAction(){
    return{type:PhotosActionType.ClearPurchasedPhotos}
}

export function photosReducer(currentState = new PhotosState(), action:PhotosAction):PhotosState{
    const newState = {...currentState}

    switch(action.type){

        case PhotosActionType.FetchPurchasedPhotos:
            newState.photos = action.payload;
        break;

        case PhotosActionType.PurchasePhoto:
            newState.photos.push(action.payload);
        break;

       

        case PhotosActionType.ClearPurchasedPhotos:
            newState.photos = [];
        break;
    }

    return newState;
}

export const purchasedPhotosStore = createStore(photosReducer, composeWithDevTools());