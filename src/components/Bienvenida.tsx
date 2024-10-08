import React, { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';
import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonRouterLink,
    IonContent, IonCard, IonCardHeader, IonCardContent, IonText,
} from '@ionic/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import bienvenida from './../images/fondoss-removebg-preview.png'
import { Link, useLocation } from 'react-router-dom';


import Drawer from './Drawer';
import './styles.css';

interface UserData {
    id: number;
    first_name: string;
  }
const Bienvenida: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          // Opcional: redirigir o mostrar un mensaje
          console.log("No se encontraron datos de usuario.");
        }
      }, []);
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

                <div className="welcome-container">
                    <div className="welcome-content">
                        <h1 className='bienvenida'>Hola Bienvenido, {userData ? userData.first_name : 'invitado'}!</h1>

                        <img src={bienvenida} alt="Imagen de bienvenida" className="welcome-image" />

                        <div className="cards-container">
                            <Link to="/libros" className="no-underline">
                                <IonCard className=" clickable-card card">
                                    <IonCardHeader>
                                        <h2 className='services' >Consultar libros</h2>
                                    </IonCardHeader>

                                </IonCard>
                            </Link>

                            <Link to="/menu" className="no-underline">
                                <IonCard className="clickable-card card">
                                    <IonCardHeader>
                                        <h2 className='services'>Conoce más acerca de la universidad</h2>
                                    </IonCardHeader>

                                </IonCard>
                            </Link>
                        </div>
                    </div>
                </div>
            </IonPage >
        </>
    )

}
export default Bienvenida;