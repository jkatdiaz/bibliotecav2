import Drawer from './Drawer';
import { IonCard, IonRouterLink, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonTitle, IonContent, IonHeader, IonPage } from '@ionic/react';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
function Valores() {
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
                <div className='card-valores '>

                    <IonCard className='text-font espacios-cards'>
                        <IonCardHeader>
                            <IonCardSubtitle>Valores clave</IonCardSubtitle>
                            {/* <IonCardTitle>Card Title</IonCardTitle> */}
                        </IonCardHeader>

                        <IonCardContent>
                            <div style={{ padding: '4px', fontSize: '14px' }}>
                                <strong> Excelencia Académica:</strong> La búsqueda constante de la calidad en la enseñanza, investigación y servicio a la comunidad.

                            </div>

                            <div style={{ padding: '4px', fontSize: '14px' }}>

                                <strong>Innovación:</strong> La promoción de ideas nuevas y enfoques creativos en todos los ámbitos de la universidad.
                            </div>
                            <div style={{ padding: '4px', fontSize: '14px' }}>
                                <strong> Integridad:</strong> La honestidad, transparencia y ética en todas las acciones y relaciones.

                            </div>

                            <div style={{ padding: '4px', fontSize: '14px' }}>
                                <strong> Respeto:</strong> La valoración de la diversidad, la inclusión y las opiniones de todos los miembros de la comunidad universitaria.

                            </div>

                            <div style={{ padding: '4px', fontSize: '14px' }}>

                                <strong>Responsabilidad Social: </strong> El compromiso de contribuir al bienestar de la sociedad y el medio ambiente.

                            </div>
                            <div style={{ padding: '4px', fontSize: '14px' }}>

                                <strong>Libertad Académica: </strong> La garantía de la libertad de expresión, investigación y pensamiento crítico.

                            </div>
                            <div style={{ padding: '4px', fontSize: '14px' }}>

                                <strong>Colaboración:</strong> El trabajo en equipo y la cooperación entre diferentes disciplinas y áreas de conocimiento
                            </div>



                        </IonCardContent>



                    </IonCard>

                </div>
            </IonPage>


        </>
    )


}

export default Valores