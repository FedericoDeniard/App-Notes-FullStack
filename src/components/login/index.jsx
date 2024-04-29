import CloseButton from "../closeButton";
import "./index.css";
import { useForm } from "react-hook-form";

const LoginPage = ({ closeLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("Enviando datos...");
    reset();
    closeLogin;
  });

  // console.log(JSON.stringify(watch(), null, 1));

  return (
    <div className="login">
      <div className="login-header">
        {" "}
        <h4 className="login-header__title">Login</h4>
        <CloseButton position={"login-header__close"} closeNote={closeLogin} />
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        {/* Nombre */}
        <label htmlFor="name">Username</label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Name is required" },
            minLength: { value: 2, message: "2 characters minimun" },
            maxLength: { value: 20, message: "20 characters maximun" },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
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
    </div>
  );
};
export default LoginPage;
