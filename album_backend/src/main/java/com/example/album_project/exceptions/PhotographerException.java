package com.example.album_project.exceptions;

import com.example.album_project.enums.ErrMsg;

public class PhotographerException extends Exception {

    public PhotographerException(ErrMsg errMsg) {
        super(errMsg.getDescription());
    }
}
