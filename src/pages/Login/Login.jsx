import { useDispatch } from "react-redux";
import "./Login.css";
import { useForm } from "react-hook-form";
import { setCurrentUser } from "../../store/UserSlice";
import Button from "../../components/Button/Button";
import plane from "../../assets/images/form-img.png";
import logo from "../../assets/images/blue-logo.png";
import { Link } from "react-router-dom";

function Login() {
    const {handleSubmit, formState, register} = useForm();
    const dispatch = useDispatch();
    
    const onSubmit = (data) => {
    dispatch(setCurrentUser(data));
    window.location.href = "/";
  };

    console.log("state", formState);
    return (
        <>
            <section className="login d-flex ">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                    <img src={logo} alt="logo"/>
                    <h3>login</h3>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Your Email"
                        {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "enter a valid email",
                        },
                        })}
                    />
                    <p className="error">{formState.errors.email?.message}</p>

                    <input
                        className="form-control"
                        type="password"
                        placeholder="Your Password"
                        {...register("password", {
                        required: "password is required",
                        })}
                    />
                    <p className="error">{formState.errors.password?.message}</p>

                    <Button type="submit" className="login-button" title="login"/>
                    <p>don't have an account? <Link to="/signup">register</Link></p>
                </form>
                <div className="login-img">
                    <img src={plane} alt="plane"/>
                </div>
            </section>
        </>
    )
}

export default Login