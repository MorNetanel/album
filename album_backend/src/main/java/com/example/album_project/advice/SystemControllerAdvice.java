package com.example.album_project.advice;

import com.example.album_project.exceptions.ClientException;
import com.example.album_project.exceptions.LoginException;
import com.example.album_project.exceptions.PhotographerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class SystemControllerAdvice {



    @ExceptionHandler(value = {PhotographerException.class, ClientException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDetails photographerClientExceptionHandler(Exception e){
        return new ErrorDetails(Exception.class.getSimpleName(),e.getMessage() );
    }

    @ExceptionHandler(value = {LoginException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorDetails authExceptionHandler(Exception e){

        return new ErrorDetails(Exception.class.getSimpleName(),e.getMessage() );
    }
}
