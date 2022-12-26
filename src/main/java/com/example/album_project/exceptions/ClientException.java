package com.example.album_project.exceptions;

import com.example.album_project.enums.ErrMsg;

public class ClientException extends Exception {

    public ClientException(ErrMsg errMsg) {
        super(errMsg.getDescription());
    }
}
