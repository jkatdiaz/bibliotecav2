import Drawer from './Drawer';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRouterLink, IonHeader, IonPage } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './styles.css'
function Objetivos() {
    return (
        <>
            <Drawer />

            <IonPage className="custom-background" id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle className='text-font'>Biblioteca Digital</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Link to="/menu" className="no-underline">
                    <IonButton className="boton-volver" shape="round" color="medium">
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>
                <div className='card-valores scroll-container'>

                    <IonCard className='text-font espacios-cards'>
                        <IonCardHeader>
                            <IonCardSubtitle>Objetivos</IonCardSubtitle>
                            {/* <IonCardTitle>Card Title</IonCardTitle> */}
                        </IonCardHeader>

                        <IonCardContent>
                            <div >
                                <div  style={{ padding: '4px', fontSize: '14px' }}>
                                <strong>Objetivos generales de la institución:</strong> Formar profesionales técnicos altamente calificados.
                                Contribuir al desarrollo socioeconómico del país.
                                Promover la investigación y la innovación.
                                Ofrecer educación de calidad y accesible.
                                Establecer vínculos con el sector productivo.

                                </div>
                               <div  style={{ padding: '4px', fontSize: '14px' }}> 

                                <strong>Objetivos específicos de cada programa de estudio:</strong> Capacitar a los estudiantes en conocimientos teóricos y prácticos de su área.
                                Desarrollar habilidades para la resolución de problemas.
                                Fomentar el espíritu emprendedor.
                                Promover la investigación aplicada.
                               </div>
                               <div  style={{ padding: '4px', fontSize: '14px' }}>

                                <strong>Objetivos de la Misión Alma Mater: </strong> Transformar los institutos politécnicos en universidades experimentales.
                                Adaptar la educación a las necesidades del país.
                                Fomentar un enfoque educativo humanista.
                               </div>
                                

                            </div>


                        </IonCardContent>



                    </IonCard>

                </div>
            </IonPage>


        </>
    )


}

export default Objetivos