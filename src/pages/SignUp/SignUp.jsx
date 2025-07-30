import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import plane from "../../assets/images/form-img.png";
import logo from "../../assets/images/blue-logo.png";
import { setCurrentUser } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
function SignUp() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    //const users = JSON.parse(localStorage.getItem("users")) || [];
        dispatch(setCurrentUser(data));
        navigate("/login");
  };
  return (
    <>
        <section className="signup d-flex">
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                <img src={logo} alt="logo"/>
                <h3>sign up</h3>
                {/* Name */}
                <input
                type="text"
                placeholder="Your Name"
                className="form-control"
                {...register("name", { required: "Name is required" })}
                />
                <p className="error">{errors.name?.message}</p>

                {/* Email */}
                <input
                type="email"
                placeholder="Your Email"
                className="form-control"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Enter a valid email",
                    },
                })}
                />
                <p className="error">{errors.email?.message}</p>

                {/* Password */}
                <input
                type="password"
                placeholder="Password"
                className="form-control"
                {...register("password", {
                    required: "Password is required",
                    pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                    message:
                        "Must include capital letter, number, and special character",
                    },
                })}
                />
                <p className="error">{errors.password?.message}</p>

                {/* Confirm Password */}
                <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>

                {/* Country */}
                <select
                className="form-control"
                {...register("country", { required: "Country is required" })}
                >
                <option value="">Select Country</option>
                <option value="eg">Egypt</option>
                <option value="us">USA</option>
                <option value="sa">Saudi Arabia</option>
                </select>
                <p className="error">{errors.country?.message}</p>

                {/* Phone */}
                <input
                type="tel"
                placeholder="Phone Number"
                className="form-control"
                {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers allowed",
                    },
                    maxLength: {
                    value: 12,
                    message: "Phone number must be 12 digits or less",
                    },
                })}
                />
                <p className="error">{errors.phone?.message}</p>

                <Button type="submit" className="signup-button" title="sign up" />
                <p>already have an account? <Link to="/login">login</Link></p>
            </form>

            <div className="signup-img">
                <img src={plane} alt="plane"/>
            </div>
        </section>
    </>
  )
}

export default SignUp