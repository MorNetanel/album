import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../../../Models/LoginData";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {




    const {register, handleSubmit, formState} = useForm<LoginData>();
    const navigate = useNavigate();

    
    
    
    
    

    function send(loginData:LoginData){

        authService.login(loginData)
        .then( () =>{
            notificationService.success("Hello " + authStore.getState().user.firstName);
           
            
            navigate("/home");
        })
        .catch(err =>{

            
            


         notificationService.error(err)});
    }
    return (
        <div className="Login">
           
            <div className="container-lg forml">
                <form onSubmit={handleSubmit(send)}>
                    
                    
                     <input className="form-control" placeholder="User Name" {...register("username", {
                        required:{value:true, message:"Please insert User name"}, 
                        minLength:{value:5, message:"User name must be minimum 5 characters long"}, 
                        maxLength:{value:10, message:"User name must be maximum 10 characters long"}
                    })} />
                     <span className="error">{formState.errors?.username?.message}</span><br/><br/>
                    


                    <input  className="form-control" placeholder="password" {...register("password" , {
                        required:{value:true, message:"Please insert password"}, 
                        minLength:{value:5, message:"Password must be at least 5 characters long"}, 
                        maxLength:{value:15, message:"Email must be maximum 15 characters long"}
                    })}/>
                     <span className="error">{formState.errors?.password?.message}</span><br/><br/>

                    <button type="submit" >Login</button>
                    
                </form>
                </div>
        </div>
    );
}

export default Login;
