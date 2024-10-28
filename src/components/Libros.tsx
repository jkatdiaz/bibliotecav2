// src/pages/Home.tsx
// 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faCirclePlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IonContent, IonAlert, IonInput, IonButton, IonButtons, IonMenuButton, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useLocation } from 'react-router-dom';

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

interface UserData {
    id: number;
    first_name: string;
    role_id: number;
}


const Libros: React.FC = () => {
    const [data, setData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);


    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        } else {
            console.log("No se encontraron datos de usuario.");
        }
    }, []);

    
    const userRole = userData ? userData.role_id : null;
    
    useEffect(() => {
        fetchData();
    }, [location.pathname]); 

    useEffect(() => {
        filterData();
    }, [searchTerm, data]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://library-0a07.onrender.com/book/');

            setData(response.data);
            setFilteredData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsErrorModalOpen(true);
            setLoading(false);
        }
    };

    const filterData = () => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const newFilteredData = data.filter(item => {
            // Convertir publication_year a cadena si no lo es
            const publicationYearStr = item.publication_year.toString();

            return (
                item.name.toLowerCase().includes(lowercasedTerm) ||
                item.author.toLowerCase().includes(lowercasedTerm) ||
                publicationYearStr.includes(lowercasedTerm)
            );
        });
        setFilteredData(newFilteredData);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRetry = () => {
        fetchData(); // Reintenta la solicitud
        setIsErrorModalOpen(false); // Cierra el modal de error
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

   

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
                <Link to="/bienvenida" className="no-underline">
                    <IonButton className="boton-volver" shape="round" color="medium" >
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>
                <div className='scroll-container'>
                    {loading ? (
                        // <p>Cargando ...</p>
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className="action-bar">
                                <div className="search-bar">
                                    <IonInput
                                        className="search-input text-font"
                                        placeholder="Buscar"
                                        value={searchTerm}
                                        onIonInput={handleSearchChange}
                                    />
                                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                                </div>
                                <Link to="/subirlibro" className="no-underline">
                                    <IonButton className="boton-agregar" style={{ textTransform: 'capitalize' }} color="medium" shape="round" onClick={() => setSearchTerm('')}>
                                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                                            <FontAwesomeIcon style={{ paddingRight: '4px' }} icon={faCirclePlus} />
                                            Añadir libro
                                        </div>
                                    </IonButton>
                                </Link>
                            </div>

                            <IonGrid>

                                <IonRow className='card-carreras'>
                              
                                    {filteredData.map((item) => (
                                        <IonCol size="6" size-sm="6" size-md="4" size-lg="3" key={item.id}>
                                            <IonCard className="espacios-cards clickable-card text-font">
                                                <IonCardTitle style={{ textAlign: 'center', padding: '10px', fontSize: '16px' }}>{item.name}</IonCardTitle>
                                                <IonCardContent>
                                                    <IonText>
                                                        <h3 style={{ fontSize: '11px', color: 'black' }}>Autor: {item.author}</h3>
                                                        <p style={{ fontSize: '11px', color: 'black' }}>Año de publicación: {item.publication_year}</p>
                                                        <p style={{ fontSize: '11px', color: 'black' }}>PNF: {item.pnf_id}</p>
                                                    </IonText>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                                        {userRole === 1 && (
                                                            <Link to={`/editarlibro/${item.id}`}>
                                                                <IonButton color='dark' size="small" style={{ textTransform: 'capitalize', fontSize: '10px' }} className="text-font">Editar</IonButton>
                                                            </Link>
                                                        )}
                                                     
                                                        <Link to={`/verlibro/${item.id}`}>

                                                            <IonButton
                                                                color='dark'
                                                                size="small"
                                                                style={{ textTransform: 'capitalize', fontSize: '10px' }}
                                                                className="text-font">Ver libro</IonButton>
                                                        </Link>
                                                    </div>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonGrid>
                        </>
                    )}
                </div>
              
                <IonAlert
                    className='text-font'
                    isOpen={isErrorModalOpen}
                    onDidDismiss={() => handleCloseErrorModal}
                    header="Error"
                    message="Error al consultar. Por favor, intente de nuevo más tarde."
                    buttons={[
                        {
                            text: 'Reintentar',
                            handler: handleRetry
                        },
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: handleCloseErrorModal
                        }
                    ]}
                    mode="ios"
                />
            </IonPage>
        </>
    );
};

export default Libros;
