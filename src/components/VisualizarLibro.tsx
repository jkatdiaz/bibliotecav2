// src/PdfViewer.tsx
import React , { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonMenuButton, IonButtons, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import Drawer from './Drawer';
import { useLocation } from 'react-router-dom';


const PdfViewer: React.FC = () => {
    const pdfUrl = localStorage.getItem('pdfUrl');

    const resetVariable =()=>{
        
        localStorage.removeItem('pdfUrl')
    }
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
                <Link to="/libros" className="no-underline">
                    <IonButton
                        className="boton-volver"
                        shape="round"
                        color="medium"
                        onClick={resetVariable}
                       

                    >
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>
                <IonContent>
                    {pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            style={{ width: '100%', height: '80vh', border: 'none' }}
                            title="PDF Viewer"
                        />
                    ) : (
                        <div>No se encontró el PDF.</div>
                    )}
                 
                </IonContent>
            </IonPage>
        </>
    );
};

export default PdfViewer;
