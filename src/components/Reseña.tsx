import Drawer from './Drawer';
import { IonCard, IonCardContent, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRouterLink, IonHeader, IonPage } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './styles.css'
function Reseña() {
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
                            <IonCardSubtitle>Reseña</IonCardSubtitle>
                            {/* <IonCardTitle>Card Title</IonCardTitle> */}
                        </IonCardHeader>

                        <IonCardContent>
                            <div style={{ padding: '4px', fontSize: '14px' }}>
                           

                                La Universidad Politécnica Territorial Agroindustrial del Táchira, conocido como IUT, fue fundado en 1971 con el objetivo de formar técnicos superiores en diversas áreas. A lo largo de su historia, ha experimentado un crecimiento constante, expandiendo su oferta académica y abriendo nuevas sedes en todo el país.

                                En la actualidad, se enfoca en formar profesionales técnicos altamente calificados y adaptados a las demandas del mercado laboral venezolano. Ha implementado nuevos programas de estudio y se ha ajustado a las políticas educativas nacionales.

                            </div>


                        </IonCardContent>



                    </IonCard>

                </div>
            </IonPage>


        </>
    )


}

export default Reseña