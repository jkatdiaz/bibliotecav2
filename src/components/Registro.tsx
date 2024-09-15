import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonInput, IonButton, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  // Estados para los campos y mensajes de error
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [pnf, setPnf] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [pnfError, setPnfError] = useState<string | null>(null);

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Resetear mensajes de error
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPnfError(null)

    // Validación simple
    let hasError = false;
    if (!firstName) {
      setFirstNameError('El nombre es obligatorio.');
      hasError = true;
    }
    if (!lastName) {
      setLastNameError('El apellido es obligatorio.');
      hasError = true;
    }
    if (!email) {
      setEmailError('El correo es obligatorio.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      hasError = true;
    }
    if (!pnf) {
      setPnfError('Seleccione el PNF');
      hasError = true;
    }

    // Si no hay errores, puedes proceder con la lógica de registro
    if (!hasError) {
      // Lógica de registro aquí
      console.log('Registrando con', firstName, lastName, email, password, selectedOption);
    }
  };

  return (
    <IonPage>
      <div className="text-font" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(208, 228, 243)' }}>
        <IonCard style={{ borderRadius: '20px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.67)' }}>
          <IonCardContent>
            <IonCardTitle className="text-font"   style={{ textAlign: 'center', marginBottom:"40px", fontSize:"19px" }}>Ingresa tus datos personales</IonCardTitle>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Nombre</span>
                <IonInput
                 className={`text-font inputs-datos-usuario ${firstNameError ? 'error-input' : ''}`}
                
                  value={firstName}
                  onIonInput={(e: any) => setFirstName(e.target.value)}
                  placeholder="Nombre"
                 
                ></IonInput>
                {firstNameError && <div className="error-message">{firstNameError}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px'}}>Apellido</span>
                <IonInput
              className={`text-font inputs-datos-usuario ${lastNameError ? 'error-input' : ''}`}
                  value={lastName}
                  onIonInput={(e: any) => setLastName(e.target.value)}
                  placeholder="Apellido"
                ></IonInput>
                {lastNameError && <div className="error-message">{lastNameError}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Correo</span>
                <IonInput
                className={`text-font inputs-datos-usuario ${emailError ? 'error-input' : ''}`}
                  value={email}
                  onIonInput={(e: any) => setEmail(e.target.value)}
                  placeholder="Correo"
                ></IonInput>
                {emailError &&  <div className="error-message">{emailError}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Contraseña</span>
                <IonInput
               className={`text-font inputs-datos-usuario ${passwordError ? 'error-input' : ''}`}
                  value={password}
                  onIonInput={(e: any) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                ></IonInput>
                {passwordError && <div className="error-message">{passwordError}</div>}
              </div>
              <div style={{ marginBottom: '12px' }}>
              <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>PNF</span>
                <IonSelect
                 className={`text-font inputs-datos-usuario ${pnfError ? 'error-input' : ''}`}
                  value={selectedOption}
                  onIonChange={(e: any) => setSelectedOption(e.detail.value)}
                  placeholder="Selecciona una opción"
                >
                  <IonSelectOption value="option1">Opción 1</IonSelectOption>
                  <IonSelectOption value="option2">Opción 2</IonSelectOption>
                  <IonSelectOption value="option3">Opción 3</IonSelectOption>
                  <IonSelectOption value="option4">Opción 4</IonSelectOption>
                  <IonSelectOption value="option5">Opción 5</IonSelectOption>
                </IonSelect>
                {pnfError && <div className="error-message">{pnfError}</div>}
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <IonButton color="secondary" type="submit" style={{borderRadius: '10px',textTransform:"capitalize", fontSize:'13px' }} className="text-font">Registrarse</IonButton>
              </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/home">
                <IonButton size="small" color="medium" className="text-font" style={{borderRadius: '10px',textTransform:"capitalize", fontSize:"9px" }}>Volver a Iniciar Sesiòn</IonButton>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
    </IonPage>
  );
};

export default Register;

