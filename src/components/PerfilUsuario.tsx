import React, { useEffect, useState } from 'react';
import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonRouterLink,
    IonContent, IonCard, IonCardHeader, IonCardContent, IonText, IonGrid, IonRow, IonCol, IonItem, IonInput, IonCardTitle, IonLabel
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import registro from './../images/fondosss-removebg-preview.png'
import axios from 'axios';


import Drawer from './Drawer';
import './styles.css';

const PerfilUsuario: React.FC = () => {

    const [userData, setUserData] = useState<any>(null); // Cambia `any` por una interfaz adecuada si la defines
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const { id } = JSON.parse(storedData);
            fetchUserData(id);
        }
    }, []);

    const fetchUserData = async (id: number) => {
        try {
            const response = await axios.get(`https://library-0a07.onrender.com/user/${id}`);
            setUserData(response.data[0]); // Asumiendo que la respuesta es un array
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('No se pudo cargar la información del usuario.');
        }
    };


    return (
        <>
            <Drawer />
            <IonPage className="custom-background" id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Link to="/bienvenida" className="no-underline">
                    <IonButton className="boton-volver" shape="round" color="medium">
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>

                <div className="text-font card-datos-usuario" >
                    <IonCard className='carddos-datos-usuario'>
                        <IonCardContent style={{ paddingBottom: '0px' }}>
                            <IonCardTitle className="text-font" style={{ textAlign: 'center', marginBottom: "10px", fontSize: "19px" }}>Perfil del Usuario</IonCardTitle>
                            {error && <div className="error-message">{error}</div>}
                            {userData ? (
                                <form >
                                    <IonRow>
                                        <IonCol size='6'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Nombre</span>
                                            <div style={{ marginBottom: '12px' }}>
                                                <IonInput
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Nombre"
                                                    value={userData.first_name}
                                                    disabled
                                                    style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}
                                                />

                                            </div>

                                        </IonCol>
                                        <IonCol size='6'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Apellido</span>
                                            <div style={{ marginBottom: '12px' }}>
                                                <IonInput
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Apellido"
                                                    value={userData.last_name}
                                                    disabled
                                                    style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}
                                                />

                                            </div>

                                        </IonCol>
                                        <IonCol size='6'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Correo</span>
                                            <div style={{ marginBottom: '12px' }}>
                                                <IonInput
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Correo"
                                                    value={userData.email}
                                                    disabled
                                                    style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}
                                                />

                                            </div>

                                        </IonCol>
                                        <IonCol size='6'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>PNF</span>
                                            <div style={{ marginBottom: '12px' }}>
                                                <IonInput
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="PNF"
                                                    value={userData.user_type}
                                                    disabled
                                                    style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}
                                                />

                                            </div>

                                        </IonCol>
                                        <IonCol size='6'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Trayecto</span>
                                            <div style={{ marginBottom: '12px' }}>
                                                <IonInput
                                                    className="text-font inputs-datos-usuario"

                                                    placeholder="Trayecto"
                                                    value={userData.user_type}
                                                    disabled
                                                    style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}
                                                ></IonInput>

                                            </div>

                                        </IonCol>
                                        <IonCol size='6'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Rol</span>
                                            <div style={{ marginBottom: '12px' }}>
                                                <IonInput
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Rol"
                                                    value={userData.role_name}
                                                    disabled
                                                    style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}
                                                />

                                            </div>

                                        </IonCol>

                                    </IonRow>

                                </form>
                            ) : (
                                <div>Cargando datos del usuario...</div>
                            )}
                            <div className='div-imagen-perfil-usuario'>
                                <img src={registro} alt="Imagen de bienvenida" className="imagen-perfil-usuario" />

                            </div>

                        </IonCardContent>
                    </IonCard>
                </div>

            </IonPage >
        </>
    )

}
export default PerfilUsuario;