import React, { useState } from 'react';
import { IonCard, IonCardContent, IonContent,IonAlert, IonCardTitle, IonInput, IonButton, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Bienvenida from './Bienvenida';
import { useHistory } from 'react-router-dom';

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: string;
  role_id: number;
}
interface UserData {
  first_name: string;
  id: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: '',
    role_id: 0
  });

  // Maneja el cambio de los campos del formulario
  const handleChange = (e: CustomEvent) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value })); // Actualiza el estado
  };
  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que todos los campos estén llenos
    const errors: { [key: string]: string } = {};
    if (!form.first_name) errors.first_name = 'Este campo es obligatorio';
    if (!form.last_name) errors.last_name = 'Este campo es obligatorio';
    if (!form.email) errors.email = 'Este campo es obligatorio';
    if (!form.password) errors.password = 'Este campo es obligatorio';
    if (!form.role_id) errors.role_id = 'Seleccione un rol';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await fetchData(); // Llama a la función para enviar la solicitud
  };

  // Función para enviar la solicitud
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://library-0a07.onrender.com/user/', form);

      if (response.data) {
        // const { first_name, id } = response.data; // Asegúrate de que estos campos existan en la respuesta
        const userDataToStore = { first_name: form.first_name }; // Usa el objeto de formulario
        localStorage.setItem('userData', JSON.stringify(userDataToStore));
      
        setIsModalOpen(true); //e el modal si la respuesta es exitosa
      } else {
        console.error('Error al registrarse');
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setIsErrorModalOpen(true);
    } finally {
      setIsLoading(false); // Oculta el spinner
    }
  };
  // Maneja el cierre del modal de éxito
  
  const handleModalClose = () => {
    setIsModalOpen(false); // Cierra el modal
    history.push({
      pathname: '/bienvenida', // La ruta a la que deseas redirigir
      state: { userData } // Envía los datos del usuario
    });
  };

  const handleRetry = async () => {
    setIsErrorModalOpen(false);
    await fetchData;
  };

  return (
    <IonPage>
      <div className="text-font" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(208, 228, 243)' }}>
        <IonCard style={{ borderRadius: '20px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.67)' }}>
          <IonCardContent>
            <IonCardTitle className="text-font" style={{ textAlign: 'center', marginBottom: "40px", fontSize: "19px" }}>Ingresa tus datos personales</IonCardTitle>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Nombre</span>
                <IonInput
                  name="first_name"
                  className={`text-font inputs-datos-usuario ${formErrors.first_name ? 'error-input' : ''}`}
                  value={form.first_name}
                  onIonChange={handleChange}
                  placeholder="Nombre"
                ></IonInput>
                {formErrors.first_name && <div className="error-message">{formErrors.first_name}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Apellido</span>
                <IonInput
                  name="last_name"
                  className={`text-font inputs-datos-usuario ${formErrors.last_name ? 'error-input' : ''}`}
                  value={form.last_name}
                  onIonChange={handleChange}
                  placeholder="Apellido"
                ></IonInput>
                {formErrors.last_name && <div className="error-message">{formErrors.last_name}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Correo</span>
                <IonInput
                  name="email"
                  className={`text-font inputs-datos-usuario ${formErrors.email ? 'error-input' : ''}`}
                  value={form.email}
                  onIonChange={handleChange}
                  placeholder="Correo"
                ></IonInput>
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Contraseña</span>
                <IonInput
                  name="password"
                  className={`text-font inputs-datos-usuario ${formErrors.password ? 'error-input' : ''}`}
                  value={form.password}
                  onIonChange={handleChange}
                  placeholder="Contraseña"
                  type="password"
                ></IonInput>
                {formErrors.password && <div className="error-message">{formErrors.password}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Rol</span>
                <IonSelect
                  name="role_id"
                  className={`text-font inputs-datos-usuario ${formErrors.roleId ? 'error-input' : ''}`}
                  value={form.role_id}
                  onIonChange={handleChange}
                  placeholder="Selecciona un rol"
                >
                  <IonSelectOption value={1}>Estudiante</IonSelectOption>
                  <IonSelectOption value={2}>Profesor</IonSelectOption>
                  <IonSelectOption value={3}>Administrador</IonSelectOption>
                </IonSelect>
                {formErrors.role_id && <div className="error-message">{formErrors.role_id}</div>}
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {isLoading ? (
                  <div className="spinner-overlay">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <IonButton color="secondary" type="submit" style={{ borderRadius: '10px', textTransform: "capitalize", fontSize: '13px' }} className="text-font">Registrarse</IonButton>
                )}
              </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/home">
                <IonButton size="small" color="medium" className="text-font" style={{ borderRadius: '10px', textTransform: "capitalize", fontSize: "9px" }}>Volver a Iniciar Sesión</IonButton>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>
      </div>

      {/* Modales para mostrar mensajes */}
      <IonAlert
        className='text-font'
        isOpen={isModalOpen}
        header="Éxito"
        message="Su registro ha sido realizado con éxito."
        buttons={[{
          text: 'Aceptar',
          handler: handleModalClose
        }]}
        onDidDismiss={() => setIsModalOpen(false)}
        mode="ios"
      />
       
      <IonAlert
        className='text-font'
        isOpen={isErrorModalOpen}
        header="Error"
        message="No se pudo registrar. Por favor, intente de nuevo más tarde."
        buttons={[{
          text: 'Reintentar',
          handler: handleRetry
        }]}
        onDidDismiss={() => setIsErrorModalOpen(false)}
        mode="ios"
      />
    </IonPage>
  );
};



export default Register;

