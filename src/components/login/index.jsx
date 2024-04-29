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

  console.log(JSON.stringify(watch(), null, 1));

  return (
    <div className="login">
      <div className="login-header">
        {" "}
        <h4 className="login-header__title">Login</h4>
        <CloseButton position={"login-header__close"} closeNote={closeLogin} />
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        {/* Nombre */}
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          {...register("nombre", {
            required: { value: true, message: "Nombre es requerido" },
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 20, message: "Máximo 20 caracteres" },
          })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}
        {/* Correo */}
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          name=""
          {...register("email", {
            required: { value: true, message: "Correo es requerido" },
            pattern: {
              value: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/,
              message: "Correo no válido",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        {/* Contraseña */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "Contraseña requerida" },
            minLength: {
              value: 8,
              message: "La contraseña debe tener porlomenos 8 caracteres",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        {/* Confirmar contraseña */}
        <label htmlFor="confirmarPassword">Confirmar contraseña</label>
        <input
          type="password"
          {...register("confirmarPassword", {
            required: {
              value: true,
              message: "Confirmar password es requerido",
            },
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmarPassword && (
          <span>{errors.confirmarPassword.message}</span>
        )}
        {/* Terminos y condiciones */}
        <label htmlFor="terminos">Acepto terminos y condiciones</label>
        <input
          type="checkbox"
          {...register("terminos", {
            required: {
              value: true,
              message: "Debes aceptar los términos y condiciones",
            },
          })}
        />
        {errors.terminos && <span>{errors.terminos.message}</span>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
export default LoginPage;
