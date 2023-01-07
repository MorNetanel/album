import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppUserModel } from "../../../Models/AppUser";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Register.css";

function Register(): JSX.Element {


    const {register, handleSubmit, formState} = useForm<AppUserModel>();
    const navigate = useNavigate();

    function send(appUser: AppUserModel){

        authService.register(appUser)
        .then( () =>{
            notificationService.success("Hello ");
            navigate("/home");
        })
        .catch(err => notificationService.error(err));
    }

    return (
        <div className="Register">
			 <div className="container-lg forml">
                <form onSubmit={handleSubmit(send)}>
                    
                    <input className="form-control" placeholder="First Name" {...register("firstName", {
                        required:{value:true, message:"Please insert first name"}, 
                        minLength:{value:2, message:"First name must be minimum 2 characters long"}, 
                        maxLength:{value:10, message:"First name must be maximum 10 characters long"}
                    })} />
                     <span className="error">{formState.errors?.firstName?.message}</span><br/><br/>

                    

                    <input className="form-control" placeholder="Last Name" {...register("lastName", {
                        required:{value:true, message:"Please insert last name"}, 
                        minLength:{value:2, message:"Last name must be minimum 2 characters long"}, 
                        maxLength:{value:10, message:"Last name must be maximum 10 characters long"}
                    })} />
                     <span className="error">{formState.errors?.lastName?.message}</span><br/><br/>

                     <input className="form-control" placeholder="User Name" {...register("username", {
                        required:{value:true, message:"Please insert User name"}, 
                        minLength:{value:5, message:"User name must be minimum 5 characters long"}, 
                        maxLength:{value:10, message:"User name must be maximum 10 characters long"}
                    })} />
                     <span className="error">{formState.errors?.username?.message}</span><br/><br/>
                    

                     <input type="eamil" className="form-control" placeholder="email" {...register("email" , {
                        required:{value:true, message:"Please insert email"}, 
                        minLength:{value:5, message:"Email must be at least 5 characters long"}, 
                        maxLength:{value:20, message:"Email must be maximum 20 characters long"}
                    })}/>

                     <span className="error">{formState.errors?.email?.message}</span><br/><br/>

                    <input type="password" className="form-control" placeholder="password" {...register("password" , {
                        required:{value:true, message:"Please insert password"}, 
                        minLength:{value:5, message:"Password must be at least 5 characters long"}, 
                        maxLength:{value:15, message:"Email must be maximum 15 characters long"}
                    })}/>
                     <span className="error">{formState.errors?.password?.message}</span><br/><br/>
            
                    <select name="appUserType" className="form-select form-select-sm" aria-label=".form-select-sm example"{...register("appUserType")} >
                        <option value="PHOTOGRAPHER">Photographer</option>
                        <option value="CLIENT">Client</option>
                    </select>
                   


                    <button type="submit" >Login</button>
                    
                </form>
                </div>
        </div>
    );
}

export default Register;
