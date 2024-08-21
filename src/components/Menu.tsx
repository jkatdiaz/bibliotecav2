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
import mision from '../images/mision.png'
import vision from '../images/vision.png'
import objetivos from '../images/objetivo.png'
import reseña from '../images/reseña.png'
import carreras from '../images/carreras.png'
import valores from '../images/valores.png'
import './styles.css';
import Drawer from './Drawer';

function Menu() {
    return (
        <>
            <Drawer />
            <IonPage className="custom-background" id="main-content">
                <IonHeader>
                    <IonToolbar >
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className='scrollable-container '>


                    <IonRow className='card-carreras' >
                        <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                            <IonRouterLink href="/mision">
                                <IonCard className="espacios-cards clickable-card">
                                    <img className='imagenes-card' alt="Card image" src={mision} />
                                    <IonCardHeader>
                                        <IonCardTitle className='text-font tamaño-letra-card'>Misión</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonRouterLink>
                            <IonRouterLink href="/objetivos">
                            <IonCard className="espacios-cards clickable-card">
                                <img className='imagenes-card text-font' alt="Card image" src={objetivos} />
                                <IonCardHeader>
                                    <IonCardTitle className='text-font tamaño-letra-card'>Objetivos</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                            </IonRouterLink>
                            <IonRouterLink href="/carreras">
                                <IonCard className="espacios-cards clickable-card">
                                    <img className='imagenes-card' alt="Card image" src={carreras} />
                                    <IonCardHeader>
                                        <IonCardTitle className='text-font tamaño-letra-card'>Carreras que ofrecen</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonRouterLink>
                        </IonCol>
                        <IonCol size="6" sizeMd="4" sizeLg="3">

                            <IonRouterLink href="/vision">
                                <IonCard className="clickable-card espacios-cards">
                                    <img className='imagenes-card' alt="Card image" src={vision} />
                                    <IonCardHeader>
                                        <IonCardTitle className='text-font tamaño-letra-card'>Visión</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonRouterLink>

                            <IonRouterLink href="/reseña">
                            <IonCard className='espacios-cards'>
                                <img className='imagenes-card' alt="Card image" src={reseña} />
                                <IonCardHeader>
                                    <IonCardTitle className='text-font tamaño-letra-card'>Reseña</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                            </IonRouterLink>
                            <IonRouterLink href="/valores">
                                <IonCard className="espacios-cards clickable-card">
                                    <img className='imagenes-card' alt="Card image" src={valores} />
                                    <IonCardHeader>
                                        <IonCardTitle className='text-font tamaño-letra-card'>Valores</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonRouterLink>
                        </IonCol>

                    </IonRow>
                </div>
            </IonPage >
        </>


    );
}
export default Menu;