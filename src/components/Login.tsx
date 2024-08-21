
import React, { useState } from 'react';
import { IonCard, IonCardContent, IonInput, IonButton, IonPage, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import iconIut from '../images/logoIut.png';
import './Login.css';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // Define estados para los campos y mensajes de error
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Resetear mensajes de error
    setEmailError(null);
    setPasswordError(null);

    // Validación simple
    let hasError = false;
    if (!email) {
      setEmailError('El correo es obligatorio.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      hasError = true;
    }

    // Si no hay errores, puedes proceder con la lógica de inicio de sesión
    if (!hasError) {
      // Lógica de inicio de sesión aquí
      console.log('Iniciando sesión con', email, password);
    }
  };

  return (
    <IonPage>
      <div className="text-font" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(208, 228, 243)' }}>
        <IonCard className="text-font" style={{ position: 'relative', borderRadius: '20px', flexDirection: 'column', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.67)' }}>
          <IonCardContent className="text-font">
            <div style={{ textAlign: 'center', paddingBottom: '15px' }}>
              <img style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0px 0px 9px 6px rgba(116, 127, 135, 0.59)', backgroundColor: 'rgb(73, 103, 155)' }} alt="Silhouette of mountains" src={iconIut} />
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.18)', marginBottom: '12px', borderRadius: '5px', padding: '8px' }}>
                <IonInput
                  className="text-font"
                  value={email}
                  onIonInput={(e: any) => setEmail(e.target.value)}
                  placeholder="Usuario / Correo"
                  style={{ textAlign: 'center', fontSize: '16px', padding: '8px', border: 'none', background: 'transparent', width: '100%' }}
                ></IonInput>
                {emailError && <IonText color="danger"><p>{emailError}</p></IonText>}
              </div>
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.18)', borderRadius: '5px', padding: '8px' }}>
                <IonInput
                  className="text-font"
                  value={password}
                  onIonInput={(e: any) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                  style={{ textAlign: 'center', fontSize: '16px', padding: '8px', border: 'none', background: 'transparent', width: '100%' }}
                ></IonInput>
                {passwordError && <IonText color="danger"><p>{passwordError}</p></IonText>}
              </div>
              <div className="text-font" style={{ textAlign: 'center', marginTop: '20px' }}>
                <IonButton color="secondary" type="submit" style={{borderRadius: '10px',textTransform:"capitalize" }} className="text-font">Iniciar Sesión</IonButton>
              </div>
            </form>
            <div className="text-font" style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/register">
                <IonButton size="small" color="medium" className="text-font" style={{borderRadius: '10px',textTransform:"capitalize", fontSize:"9px" }}>¿Eres nuevo? ¡Registrate!</IonButton>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
    </IonPage>
  );
};

export default Login;
