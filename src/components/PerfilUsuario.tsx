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
    IonContent, IonCard, IonCardHeader, IonCardContent, IonText, IonGrid, IonRow, IonCol, IonItem, IonInput, IonCardTitle, IonLabel
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import registro from './../images/fondosss-removebg-preview.png'


import Drawer from './Drawer';
import './styles.css';

const PerfilUsuario: React.FC = () => {
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
                        <IonCardContent style={{paddingBottom:'0px'}}>
                           <IonCardTitle className="text-font" style={{ textAlign: 'center', marginBottom: "10px", fontSize: "19px" }}>Perfil del Usuario</IonCardTitle> 
                            <form >
                                <IonRow>
                                <IonCol size='6'>
                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Nombre</span>
                                    <div style={{ marginBottom: '12px' }}>
                                        <IonInput
                                            className="text-font inputs-datos-usuario"

                                            placeholder="Nombre"
                                          
                                        ></IonInput>

                                    </div>

                                </IonCol>
                                <IonCol size='6'>
                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Apellido</span>
                                    <div style={{ marginBottom: '12px' }}>
                                        <IonInput
                                            className="text-font inputs-datos-usuario"

                                            placeholder="Apellido"
                                        ></IonInput>

                                    </div>

                                </IonCol>
                                <IonCol size='6'>
                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Correo</span>
                                    <div style={{ marginBottom: '12px' }}>
                                        <IonInput
                                            className="text-font inputs-datos-usuario"

                                            placeholder="Correo"

                                        ></IonInput>

                                    </div>

                                </IonCol>
                                <IonCol size='6'>
                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>PNF</span>
                                    <div style={{ marginBottom: '12px' }}>
                                        <IonInput
                                            className="text-font inputs-datos-usuario"

                                            placeholder="PNF"
                                          
                                        ></IonInput>

                                    </div>

                                </IonCol>
                                <IonCol size='6'>
                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Trayecto</span>
                                    <div style={{ marginBottom: '12px' }}>
                                        <IonInput
                                            className="text-font inputs-datos-usuario"

                                            placeholder="Trayecto"
                                         
                                        ></IonInput>

                                    </div>

                                </IonCol>
                                <IonCol size='6'>
                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Rol</span>
                                    <div style={{ marginBottom: '12px' }}>
                                        <IonInput
                                            className="text-font inputs-datos-usuario"

                                            placeholder="Rol"
                                           
                                        ></IonInput>

                                    </div>

                                </IonCol>

                                </IonRow>
                               
                              
{/* 
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <IonButton color="secondary" type="submit" style={{ borderRadius: '10px', textTransform: "capitalize" }} className="text-font">Registrarse</IonButton>
                                </div> */}
                            </form>
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