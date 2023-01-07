import { Notyf } from "notyf";
//We would like to acknowledge that for notifications we used MIT Notyf!

class NotificationService{
    private notify = new Notyf({duration: 3500, ripple:true,  position: {y:"bottom", x:"left"}});

    public success(msg: string){
        this.notify.success(msg);
    }

    public error(err: any){
        const msg = this.errorHandler(err);
        this.notify.error(msg);
    }

    private errorHandler(err: any){



        if (typeof err.response.data.value ==="string" )
        return err.response.data.value;
        if(typeof err === "string")
            return err;

        if(typeof err.response?.data === "string")
            return err.response.data;

        if(Array.isArray(err.response?.data))
            return err.response.data[0]; 

        if(typeof err.message === "string")
            return err.message;

        return "Error occurred, try again...";
        
    }
}




const notificationService = new NotificationService();
export default notificationService;