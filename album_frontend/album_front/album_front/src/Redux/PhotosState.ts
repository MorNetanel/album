import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import  PhotoModel  from "../Models/Photo";



export class PhotosState{
    public photos:PhotoModel[] = [];
}

export enum PhotosActionType{
    FetchPhotos, AddPhoto, EditPhoto, DeletePhoto, ClearPhotos
}

export interface PhotosAction {
    type:PhotosActionType;
    payload?:any
}

export function createFetchAction(photos:PhotoModel[]){
    return{type:PhotosActionType.FetchPhotos, payload:photos}
}

export function createAddPhotoAction(photo:PhotoModel){
    return{type:PhotosActionType.AddPhoto, payload:photo}
}

export function createEditAction(photo:PhotoModel){
    return{type:PhotosActionType.EditPhoto, payload:photo}
}

export function createDeleteAction(id: number){
    return{type:PhotosActionType.DeletePhoto, payload:id}
}

export function createClearAction(){
    return{type:PhotosActionType.ClearPhotos}
}

export function photosReducer(currentState = new PhotosState(), action:PhotosAction):PhotosState{
    const newState = {...currentState}

    switch(action.type){

        case PhotosActionType.FetchPhotos:
            newState.photos = action.payload;
        break;

        case PhotosActionType.AddPhoto:
            newState.photos.push(action.payload);
        break;

        case PhotosActionType.EditPhoto:
            const indexToEdit = newState.photos.findIndex(photo => photo.id == action.payload.id);
            if (indexToEdit>=0)
            newState.photos[indexToEdit] = action.payload;
        break;

        case PhotosActionType.DeletePhoto:
            const indexToDelete = newState.photos.findIndex(photo => photo.id == action.payload.id);
            if (indexToDelete>=0)
            newState.photos.splice(indexToDelete, 1);
        break;

        case PhotosActionType.ClearPhotos:
            newState.photos = [];
        break;
    }

    return newState;
}

export const photosStore = createStore(photosReducer, composeWithDevTools());