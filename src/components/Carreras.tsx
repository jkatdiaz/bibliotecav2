import React from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonRouterLink
} from '@ionic/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons'
import { faPlugCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faJar } from '@fortawesome/free-solid-svg-icons'
import { faTractor } from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

import Drawer from './Drawer';
import './styles.css';

function Carreras() {
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
                <IonRouterLink href="/menu">
                    <IonButton className="boton-volver" shape="round" color="medium">
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </IonRouterLink>

                <IonRow className='card-carreras'>
                    <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                        <IonCard className='espacios-cards'>
                            <IonCardHeader>
                                <div className='card-carreras-item'>
                                    <FontAwesomeIcon icon={faComputer} />

                                </div>
                                <IonCardTitle className='text-font tamaño-letra-card-carreras'>PNF en Informática</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard className='espacios-cards'>
                            <IonCardHeader>
                                <div className='card-carreras-item'>
                                    <FontAwesomeIcon icon={faHelmetSafety} />
                                </div>
                                <IonCardTitle className='text-font tamaño-letra-card-carreras'>PNF en Construcción Civil</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                       
                        <IonCard className='espacios-cards'>
                            <IonCardHeader>
                                <div className='card-carreras-item'>
                                    <FontAwesomeIcon icon={faJar} />
                                </div>
                                <IonCardTitle className='text-font tamaño-letra-card-carreras'>PNF en Procesamiento y distribuición de alimentos</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                    <IonCol size="6" size-sm="6" size-md="4" size-lg="3">


                        <IonCard className='espacios-cards'>
                            <IonCardHeader>
                                <div className='card-carreras-item'>
                                    <FontAwesomeIcon icon={faGears} />
                                </div>
                                <IonCardTitle className='text-font tamaño-letra-card-carreras'>PNF en Mecánica</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard className='espacios-cards'>
                            <IonCardHeader>
                                <div className='card-carreras-item'>
                                    <FontAwesomeIcon icon={faTractor} />
                                </div>
                                <IonCardTitle className='text-font tamaño-letra-card-carreras'>PNF en Agroalimentaria</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>

                        <IonCard className='espacios-cards'>
                            <IonCardHeader>
                                <div className='card-carreras-item'>
                                    <FontAwesomeIcon icon={faPlugCircleCheck} />
                                </div>
                                <IonCardTitle className='text-font tamaño-letra-card-carreras'>PNF en Electricidad</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    
        
                    </IonCol>
                   
                    
                </IonRow>

            </IonPage>
        </>


    );
}
export default Carreras;