import { randomUUID, RandomUUIDOptions } from "crypto";


export class AppUserModel{
    public firstName :string;
    public lastName :string;
    public username :string;
    public email :string;
    public password :string;
    public appUserType : AppUserType;

    constructor ( firstName :string,
     lastName :string,
     username :string,
     email :string,
     password :string,
     appUserType : AppUserType){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this. appUserType = appUserType;
     }

}



export enum AppUserType{
    PHOTOGRAPHER, CLIENT
}