import Drawer from './Drawer';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRouterLink,IonHeader, IonPage } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './styles.css'
function Mision() {
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
                            <IonCardSubtitle>Mision</IonCardSubtitle>
                            {/* <IonCardTitle>Card Title</IonCardTitle> */}
                        </IonCardHeader>

                        <IonCardContent>
                            <div style={{ padding: '4px', fontSize: '14px' }}>
                            La misión principal de la Universidad Politécnica Territorial Agroindustrial del Táchira sede Rubio, es formar profesionales altamente calificados y competitivos, capaces de aplicar conocimientos científicos y tecnológicos para resolver problemas reales y contribuir al desarrollo socioeconómico de la sociedad venezolana y el mundo.

                            </div>

                        
                        </IonCardContent>



                    </IonCard>

                </div>
            </IonPage>


        </>
    )


}

export default Mision