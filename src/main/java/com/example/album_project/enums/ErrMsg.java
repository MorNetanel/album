package com.example.album_project.enums;

public enum ErrMsg {


    ID_ALREADY_EXIST("Id already exist"),

    ID_NOT_FOUND("Id not found"),

    PHOTO_NOT_FOUND_BY_NAME("Photo not found by name"),

    PHOTOGRAPHER_NOT_FOUND_BY_NAME("Photographer not found by name"),

    PHOTO_ACTION_FAILURE("Failed to complete photo action"),

    PHOTO_PURCHASE_UNAVAILABLE("Unable to complete purchase"),

    EMAIL_NOT_FOUND("Email not found"),

    LOGIN_FAILURE("Failed to login"),

    REGISTRATION_FAILURE("Failed to register");





    private String description;

    ErrMsg(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }



}
