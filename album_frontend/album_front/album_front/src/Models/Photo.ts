import PhotographerModel from "./Photographer";



 class PhotoModel{
    public id :number;
    public name:string;
    public dateTime: Date;
    public image:File | FileList | string;
    public price :number;
    public photoType: PhotoType;
    public location: string;
    public photographer: PhotographerModel;

    constructor(id: number, name:string, dateTime:Date, image:File |FileList, price:number, photoType:PhotoType,location:string, photographer:PhotographerModel ){
        this.id = id;
        this.name = name;
        this.dateTime = dateTime;
        this.image = image;
        this. price = price;
        this.photoType = photoType;
        this.location = location;
        this.photographer = photographer;
    }
}
export default PhotoModel;




export enum PhotoType{
    LANDSCAPE, WILDLIFE, MACRO, UNDERWATER, ASTROPHOTOGRAPHY, AERIAL, SCIENTIFIC, PORTRAITS, WEDDING,
    DOCUMENTARY, SPORTS, FASHION, COMMERCIAL, STREET, EVENT, TRAVEL, PET,PRODUCT, FOOD, ARCHITECTURE

}