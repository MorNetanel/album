package com.example.album_project.enums;

public enum ErrMsg {


    ID_ALREADY_EXIST("Id already exist"),

    ID_NOT_FOUND("Id not found"),

    PHOTO_ACTION_FAILURE("Failed to complete photo action");

    private String description;

    ErrMsg(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }



}
