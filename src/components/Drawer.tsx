import React, { useState, useRef } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Drawer: React.FC = () => {
    const menuRef = useRef<HTMLIonMenuElement>(null);

    const handleButtonClick = () => {
        if (menuRef.current) {
            menuRef.current.close();
        }
    };

    return (
        <>
            <IonMenu ref={menuRef} contentId="main-content">
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <Link to="/perfilusuario">
                        <IonButton
                            fill="clear"
                            className="text-font"
                            style={{ textTransform: 'capitalize', color: 'black', fontSize: '20px' }}
                            onClick={handleButtonClick}
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
