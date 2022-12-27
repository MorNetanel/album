package com.example.album_project.exceptions;

import com.example.album_project.enums.ErrMsg;

public class LoginException extends Exception{

    public LoginException(ErrMsg errMsg) {
        super(errMsg.getDescription());
    }
}
