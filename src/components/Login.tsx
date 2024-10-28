import React, { useState } from "react";
import axios from "axios";
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonPage,
  IonText,
  IonAlert,
} from "@ionic/react";
import { Link } from "react-router-dom";
import iconIut from "../images/logoIut.png";
import "./Login.css";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {}

interface FormState {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: null, password: null });
    setErrorMessage(null); // Resetea el mensaje de error

    let hasError = false;
    if (!form.email) {
        setErrors((prev) => ({ ...prev, email: "El correo es obligatorio." }));
        hasError = true;
    }
    if (!form.password) {
        setErrors((prev) => ({
            ...prev,
            password: "La contraseña es obligatoria.",
        }));
        hasError = true;
    }

    if (!hasError) {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "https://library-0a07.onrender.com/user/login",
                form
            );

            const { user } = response.data;
            console.log(response.data, "aqui respuesta");
            localStorage.setItem(
                "userData",
                JSON.stringify({ id: user.id, first_name: user.first_name, role_id: user.role_id })
            );
            window.location.href = "/bienvenida";
        } catch (error) {
            console.error("Error en el inicio de sesión", error);
            setIsErrorModalOpen(true)
            // Manejo de errores
            if (axios.isAxiosError(error) && error.response) {
               
                const message = error.response.data.detail || "Error desconocido";
                setErrorMessage(message)
                
            } else {
                setErrorMessage("Ocurrió un error desconocido.");
            }
        } finally {
            setIsLoading(false); // Ocultar el spinner
        }
    }
};

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrors({ email: null, password: null });

  //   let hasError = false;
  //   if (!form.email) {
  //     setErrors((prev) => ({ ...prev, email: "El correo es obligatorio." }));
  //     hasError = true;
  //   }
  //   if (!form.password) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       password: "La contraseña es obligatoria.",
  //     }));
  //     hasError = true;
  //   }

  //   if (!hasError) {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.post(
  //         "https://library-0a07.onrender.com/user/login",
  //         form
  //       );

  //       const { user } = response.data;
  //       console.log(response.data, "aqui respuesta");
  //       localStorage.setItem(
  //         "userData",
  //         JSON.stringify({ id: user.id, first_name: user.first_name,role_id: user.role_id })
  //       );
  //       window.location.href = "/bienvenida";
  //     } catch (error) {
  //       console.error("Error en el inicio de sesión", error);
  //       setIsErrorModalOpen(true);
  //     } finally {
  //       setIsLoading(false); // Ocultar el spinner
  //     }
  //   }
  // };
  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la propagación del evento
    setShowPassword((prev) => !prev);
  };

  const resetForm = () => {
    setForm({
      email: "",
      password: "",
    });

    setIsLoading(false);
    setIsErrorModalOpen(false);
    setShowPassword(false);
  };

  return (
    <div className="text-font card-login">
      <IonCard className="text-font card2-login">
        <IonCardContent className="text-font">
          <div style={{ textAlign: "center", paddingBottom: "15px" }}>
            <img
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                boxShadow: "0px 0px 9px 6px rgba(116, 127, 135, 0.59)",
                backgroundColor: "rgb(73, 103, 155)",
              }}
              alt="Silhouette of mountains"
              src={iconIut}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <span
                className="text-font"
                style={{
                  textAlign: "center",
                  color: "black",
                  fontWeight: "500",
                  fontSize: "13px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Usuario o Correo
              </span>
              <IonInput
                className={`text-font inputs-datos-usuario ${
                  errors.email ? "error-input" : ""
                }`}
                name="email"
                value={form.email}
                onIonInput={handleInputChange}
                placeholder="Usuario / Correo"
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  padding: "8px",
                  border: "none",
                  background: "transparent",
                  width: "100%",
                }}
              ></IonInput>
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <IonInput
                className={`text-font inputs-datos-usuario ${
                  form.password ? "error-input" : ""
                }`}
                name="password"
                value={form.password}
                onIonChange={handleInputChange}
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  padding: "8px",
                  border: "none",
                  background: "transparent",
                  width: "100%",
                }}
              />

              <button
                onClick={togglePasswordVisibility}
                type="button"
                style={{
                  zIndex: 1000,
                  position: "absolute",
                  right: "10px",
                  top: "36%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseDown={(e) => e.preventDefault()} // Previene el efecto de enfoque del input
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
              <div style={{ height: "20px", textAlign: "center" }}>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
            </div>
            <div
              className="text-font"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <Link to="/bienvenida">
                <IonButton
                  color="secondary"
                  type="submit"
                  style={{
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    fontSize: "13px",
                  }}
                  className="text-font"
                >
                  Iniciar Sesión
                </IonButton>
              </Link>
            </div>
          </form>

          <div
            className="text-font"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <Link to="/register">
              <IonButton
                onClick={() => resetForm()}
                size="small"
                color="medium"
                className="text-font"
                style={{
                  borderRadius: "10px",
                  textTransform: "capitalize",
                  fontSize: "9px",
                }}
              >
                ¿Eres nuevo? ¡Registrate!
              </IonButton>
            </Link>
          </div>
        </IonCardContent>
      </IonCard>
      {isLoading && (
        <div className="spinner-overlay">
          <LoadingSpinner />
        </div>
      )}

      <IonAlert
        className="text-font"
        isOpen={isErrorModalOpen}
        header="Error"
        message={errorMessage}
        buttons={[
          {
            text: "Aceptar",
            handler: () => setIsErrorModalOpen(false),
          },
        ]}
        onDidDismiss={() => setIsErrorModalOpen(false)}
        mode="ios"
      />
    </div>
  );
};

export default Login;
