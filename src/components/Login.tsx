
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
      <div className="text-font card-login" >
        <IonCard className="text-font card2-login" >
          <IonCardContent className="text-font">
            <div style={{ textAlign: 'center', paddingBottom: '15px' }}>
              <img style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0px 0px 9px 6px rgba(116, 127, 135, 0.59)', backgroundColor: 'rgb(73, 103, 155)' }} alt="Silhouette of mountains" src={iconIut} />
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{marginBottom:'12px'}}>
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px', display:'flex', justifyContent:'center' }}>Usuario o Correo</span>
                <IonInput
                 className={`text-font inputs-datos-usuario ${emailError ? 'error-input' : ''}`}
                  value={email}
                  onIonInput={(e: any) => setEmail(e.target.value)}
                  placeholder="Usuario / Correo"
                  style={{ textAlign: 'center', fontSize: '16px', padding: '8px', border: 'none', background: 'transparent', width: '100%' }}
                ></IonInput>
                 {emailError &&  <div className="error-message">{emailError}</div>}
              </div>
              <div >
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px', display:'flex', justifyContent:'center' }}>Contraseña</span>
                <IonInput
                  className={`text-font inputs-datos-usuario ${passwordError ? 'error-input' : ''}`}
                  value={password}
                  onIonInput={(e: any) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                  style={{ textAlign: 'center', fontSize: '16px', padding: '8px', border: 'none', background: 'transparent', width: '100%' }}
                ></IonInput>
                {passwordError && <div className="error-message">{passwordError}</div>}
              </div>
              <div className="text-font" style={{ textAlign: 'center', marginTop: '20px' }}>
                <IonButton color="secondary" type="submit" style={{borderRadius: '10px',textTransform:"capitalize", fontSize:'13px' }} className="text-font">Iniciar Sesión</IonButton>
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
