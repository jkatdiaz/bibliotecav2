import React, { useState, useRef } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,IonMenuController  } from '@ionic/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Drawer: React.FC= () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú


    const handleMenuClose = () => {
        setIsOpen(false); // Cierra el menú
    };
   
    return (
        <>
            <IonMenu  contentId="main-content">
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                <Link to={'/perfilusuario/'} onClick={() => { handleMenuClose(); }}>
                        <IonButton
                            fill="clear"
                            className="text-font"
                            style={{ textTransform: 'capitalize', color: 'black', fontSize: '20px' }}
                        >
                            <FontAwesomeIcon style={{ paddingRight: '12px' }} icon={faUser} />
                            Mi Cuenta
                        </IonButton>
                    </Link>
                </IonContent>
            </IonMenu>
        </>
    );
};

export default Drawer;
