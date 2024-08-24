import Drawer from './Drawer';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRouterLink, IonToolbar, IonButtons, IonMenuButton, IonButton, IonTitle, IonContent, IonHeader, IonPage } from '@ionic/react';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
function Vision() {
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
                <Link to="/menu" className="no-underline">
                    <IonButton className="boton-volver" shape="round" color="medium">
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>

                <div className='card-valores '>

                    <IonCard className='text-font espacios-cards'>
                        <IonCardHeader>
                            <IonCardSubtitle>Visión</IonCardSubtitle>
                            {/* <IonCardTitle>Card Title</IonCardTitle> */}
                        </IonCardHeader>

                        <IonCardContent>
                            <div style={{ padding: '4px', fontSize: '14px' }}>
                                Ser una universidad de excelencia, reconocida a nivel nacional e internacional por la calidad de sus profesionales, la relevancia de su investigación y su contribución al desarrollo sostenible de la región.

                            </div>


                        </IonCardContent>



                    </IonCard>

                </div>
            </IonPage>


        </>
    )


}

export default Vision