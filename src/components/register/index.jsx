import { useState, useRef } from "react";
import CloseButton from "../closeButton";
import "./index.css";
import { useForm } from "react-hook-form";
import SwitchButton from "../switch";

const RegisterPage = ({
  closeLogin,
  setIsLogin,
  notes,
  getNotes,
  setUser,
  setPass,
}) => {
  const [switchLogin, setSwitchLogin] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { username, email, password } = data;
    fetch("http://127.0.0.1:8000/users/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, notes }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to create user");
          return;
        } else {
          localStorage.setItem("username", username);
          setIsLogin(data.username);
          setPass(data.password);
          return response.json();
        }
      })
      .then((data) => {
        alert(data["message"]); //
      });
    reset();
    closeLogin;
  });

  const submitLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email);

    fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to login");
        }
      })
      .then((data) => {
        if (data["response"] === true) {
          setUser(data["username"]);
          setPass(password);
          localStorage.setItem("username", JSON.stringify(data["username"]));
          localStorage.setItem("notes", JSON.stringify(data["notes"]));
          console.log(data["notes"]);
          setIsLogin(data["username"]);
          getNotes(data["notes"]);
        } else {
          alert("The username or password are wrong");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="register">
      <div className="register-header">
        {" "}
        <div className="register-header__container">
          <h4 className="register-header__title">
            {!switchLogin ? "Register" : "Login"}
          </h4>
          <SwitchButton onChange={() => setSwitchLogin(!switchLogin)} />
        </div>
        <CloseButton
          position={"register-header__close"}
          closeNote={closeLogin}
        />
      </div>
      {!switchLogin ? (
        <>
          <form className="register-form" onSubmit={onSubmit}>
            {/* Nombre */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              {...register("username", {
                required: { value: true, message: "username is required" },
                minLength: { value: 2, message: "2 characters minimun" },
                maxLength: { value: 20, message: "20 characters maximun" },
              })}
            />
            {errors.username && <span>{errors.username.message}</span>}
            {/* Correo */}
            <label htmlFor="email">email</label>
            <input
              type="email"
              name=""
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
            {/* Contraseña */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "Password required" },
                minLength: {
                  value: 8,
                  message: "The password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            {/* Confirmar contraseña */}
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm password is required",
                },
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
            {/* Terminos y condiciones */}
            <label htmlFor="terms">I accept the terms and conditions</label>
            <input
              type="checkbox"
              {...register("terms", {
                required: {
                  value: true,
                  message: "You must accept the terms and conditions",
                },
              })}
            />
            {errors.terms && <span>{errors.terms.message}</span>}
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          {/* <div className="login-header">
            <h4 className="login-header__title">Login</h4>
            <CloseButton
              position={"login-header__close"}
              closeNote={closeLogin}
            />
          </div> */}
          <div className="login-body">
            <div className="login-body__group">
              <span>Email</span>
              <input ref={emailRef} type="email" placeholder="email" />
            </div>
            <div className="login-body__group">
              <span>Password</span>
              <input ref={passwordRef} type="password" placeholder="password" />
            </div>
            <button onClick={submitLogin}>Login</button>
          </div>
        </>
      )}
    </div>
  );
};
export default RegisterPage;
