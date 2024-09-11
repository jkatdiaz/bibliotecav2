// src/pages/Home.tsx
// 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft,faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { IonContent, IonButton, IonButtons, IonMenuButton, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { Link } from 'react-router-dom';

import Drawer from './Drawer';
import './styles.css';

interface CardData {
    id: number; // Añadido el id aquí
    name: string;
    publication_year: string;
    author: string;
    download_url: string;
    book_type_id: number;
    pnf_id: number;
    description: string;
}

const Libros: React.FC = () => {
    const [data, setData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<CardData[]>('https://library-0a07.onrender.com/book/');
                setData(response.data);
                console.log(response.data); // Aquí ya es un objeto
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                <div className='scroll-container'>
                    {loading ? (
                        <p>Cargando ...</p>
                    ) : (

                        <IonGrid>
                            <Link to="/subirlibro" className="no-underline">

                                <IonButton className="boton-agregar" style={{ textTransform: 'capitalize' }} color="medium" shape="round">
                             
                                    <div className="text-font" style={{ textTransform: 'capitalize' }}>
                                    <FontAwesomeIcon style={{ paddingRight: '4px' }} icon={faCirclePlus} />
                                    
                                      Añadir libro
                                    </div>
                              
                                   </IonButton>

                            </Link>
                            <IonRow className='card-carreras'>
                                {data.map((item) => (
                                    <IonCol size="6" size-sm="6" size-md="4" size-lg="3" key={item.id}>
                                        <IonCard className="espacios-cards clickable-card text-font">
                                            <IonCardTitle style={{ textAlign: 'center', padding: '10px', fontSize: '20px' }}>{item.name}</IonCardTitle>
                                            <IonCardContent>
                                                <IonText>
                                                    <h3>Autor: {item.author}</h3>
                                                    <p>Año de publicación: {item.publication_year}</p>
                                                </IonText>
                                                <Link to={`/editarlibro/${item.id}`}>
                                                    <button className="text-font">Editar</button>
                                                </Link>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    )}
                </div>
            </IonPage>
        </>
    );
};

export default Libros;
