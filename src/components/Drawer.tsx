import React, { useState, useRef } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonMenuToggle } from '@ionic/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';


const Drawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú

    const history = useHistory();


    const handleMenuClose = () => {
        setIsOpen(false); // Cierra el menú
    };

    const handleLogout = () => {
        // Eliminar datos del localStorage
        localStorage.removeItem('userData');
        // Redirigir al login
        history.push('/login');
    };

    return (
        <>

            <IonMenu contentId="main-content" isOpen={isOpen} >
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <Link to={'/perfilusuario/'} onClick={() => { handleMenuClose(); }}>
                        <IonMenuToggle>
                            <IonButton
                                fill="clear"
                                className="text-font"
                                style={{ textTransform: 'capitalize', color: 'black', fontSize: '20px' }}
                            >
                                <FontAwesomeIcon style={{ paddingRight: '12px' }} icon={faUser} />
                                Mi Cuenta
                            </IonButton>
                        </IonMenuToggle>

                    </Link>

                </IonContent>
                <IonMenuToggle>
                    <IonButton
                        fill="clear"
                        className="text-font"
                        style={{ textTransform: 'capitalize', color: 'black', fontSize: '20px', paddingBottom: '10px' }}
                        onClick={handleLogout} // Llama a la función de cierre de sesión
                    >
                        <FontAwesomeIcon style={{ paddingRight: '12px' }} icon={faSignOutAlt} />
                        Cerrar Sesión
                    </IonButton>
                </IonMenuToggle>
            </IonMenu>
        </>
    );
};

export default Drawer;
