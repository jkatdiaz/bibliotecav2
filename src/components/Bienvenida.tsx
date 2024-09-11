import React from 'react';
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
import { Link } from 'react-router-dom';

import Drawer from './Drawer';
import './styles.css';

const Bienvenida: React.FC<{ username: string }> = ({ username }) => {
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
                        <h1 className='bienvenida'>Hola Bienvenido, {username}!</h1>

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