
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonHeader, IonAlert, IonCard, IonCardContent, IonToolbar, IonRow, IonButtons, IonMenuButton, IonTitle, IonPage, IonInput, IonSelect, IonSelectOption, IonButton, IonLabel, IonItem, IonTextarea, IonCol } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from './LoadingSpinner';
import Drawer from './Drawer';
import PdfViewer from './VisualizarLibro';
import './styles.css';

interface BookType {
    id: number;
    name: string;
}

interface PNF {
    id: number;
    name: string;
}



interface FormState {
    name: string;
    book_type: string;
    publication_year: string;
    author: string;
    download_url: string;
    pnf_id: number;
    description: string;
    first_name: string, // Nuevo campo
    last_name: string
}
const VerLibro: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isNetworkErrorModalOpen, setIsNetworkErrorModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>({
        name: '',
        book_type: '',
        publication_year: '',
        author: '',
        download_url: '',
        pnf_id: 0,
        description: '',
        first_name: '',
        last_name: ''
    });
    const [bookTypes, setBookTypes] = useState<BookType[]>([]);
    const [pnfs, setPnfs] = useState<PNF[]>([]);
    const history = useHistory();
    const { id } = useParams<{ id: string }>(); // ID del libro a visualizar


    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch book types
            const bookTypesResponse = await axios.get<BookType[]>('https://library-0a07.onrender.com/book_type/');
            setBookTypes(bookTypesResponse.data);

            console.log('Book Types:', bookTypesResponse.data);


            // Fetch PNFs
            const pnfsResponse = await axios.get<PNF[]>('https://library-0a07.onrender.com/pnf/');
            setPnfs(pnfsResponse.data);

            // Fetch book details for viewing
            const bookResponse = await axios.get<FormState>(`https://library-0a07.onrender.com/book/${id}/`);
            setForm(bookResponse.data);
            console.log(form)
            console.log(bookTypes, "aqui")
            console.log('selected value:', form.book_type);
            localStorage.setItem("pdfUrl",bookResponse.data.download_url)
            setPdfUrl(bookResponse.data.download_url)

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
            setIsNetworkErrorModalOpen(true);
        }
    };

    const fullName = `${form.first_name || "N/A"} ${form.last_name || ""}`;

    const handleNetworkErrorClose = () => setIsNetworkErrorModalOpen(false);

    const handleRetry = async () => {
        setIsNetworkErrorModalOpen(false); // Close the error modal
        await fetchData(); // Retry fetching data
    };

    const handleCancel = () => {
        setIsNetworkErrorModalOpen(false); // Just close the modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        history.push('/libros'); // Redirige a la página de libros
    };

    
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
                <div className='scroll-container'>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="text-font card-datos-usuario">
                            <IonCard className='carddos-datos-usuario'>
                                <IonCardContent>
                                    <form>
                                        <IonRow>
                                            <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                                <div>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Nombre del Libro</span>
                                                    <IonInput
                                                        type="text"
                                                        className="text-font inputs-datos-usuario"
                                                        placeholder="Nombre del Libro"
                                                        name="name"
                                                        value={form.name}
                                                        disabled
                                                        style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}

                                                    />
                                                </div>
                                            </IonCol>
                                            <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                                <div>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Año de publicación</span>
                                                    <IonInput
                                                        type="number"
                                                        className="text-font inputs-datos-usuario"
                                                        name="publication_year"
                                                        placeholder="Año de publicación"
                                                        value={form.publication_year}
                                                        style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}

                                                    />
                                                </div>
                                            </IonCol>
                                            <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                                <div>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Autor</span>
                                                    <IonInput
                                                        type="text"
                                                        className="text-font inputs-datos-usuario"
                                                        placeholder="Autor"
                                                        name="author"
                                                        value={form.author}
                                                        disabled
                                                        style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}

                                                    />
                                                </div>
                                            </IonCol>
                                            {/* <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                                <div>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Adjuntar libro</span>
                                                    <IonInput
                                                        type="text"
                                                        className="text-font inputs-datos-usuario"
                                                        placeholder="Adjuntar archivo"
                                                        name="download_url"
                                                        value={form.download_url}
                                                        disabled
                                                        style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}

                                                    />
                                                </div>
                                            </IonCol> */}
                                            <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                                                <div>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Tipo</span>

                                                    <IonSelect
                                                        className="text-font inputs-datos-usuario"
                                                        name="book_type"
                                                        placeholder="Seleccionar tipo de libro"
                                                        style={{ textAlign: 'center', width: '100%', backgroundColor: '#f0f0f0', color: '#000', fontSize: '13px', opacity: 1, cursor: 'not-allowed' }} // Estilos para mejorar la visibilidad
                                                        value={form.book_type}
                                                        disabled

                                                        mode="ios"
                                                    >
                                                        {bookTypes.map(type => (

                                                            <IonSelectOption className="text-font" key={type.id} value={type.name}>{type.name}</IonSelectOption>
                                                        ))}

                                                    </IonSelect>
                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                                                <div style={{ textAlign: 'center' }}>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>PNF</span>
                                                    <IonSelect
                                                        className="text-font inputs-datos-usuario"
                                                        style={{ textAlign: 'center', width: '100%', backgroundColor: '#f0f0f0', color: '#000', fontSize: '13px', opacity: 1, cursor: 'not-allowed' }} // Estilos para mejorar la visibilidad
                                                        name="pnf_id"
                                                        placeholder="Selecciona el PNF"
                                                        value={form.pnf_id}
                                                        disabled

                                                        mode="ios"
                                                    >
                                                        {pnfs.map(pnf => (
                                                            <IonSelectOption style={{ fontSize: '13px' }} className="text-font" key={pnf.id} value={pnf.id}>{pnf.name}</IonSelectOption>
                                                        ))}
                                                    </IonSelect>
                                                </div>
                                            </IonCol>
                                            <IonCol size='12'>
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Descripción o reseña</span>
                                                <div>
                                                    <IonTextarea
                                                        className="text-font inputs-datos-usuario"
                                                        placeholder="Reseña o sinopsis del libro"
                                                        name="description"
                                                        value={form.description}
                                                        disabled
                                                        style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}

                                                    />
                                                </div>
                                            </IonCol>
                                            <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                                <div>
                                                    <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Publicado por: </span>
                                                    <IonInput
                                                        type="text"
                                                        className="text-font inputs-datos-usuario"
                                                        placeholder="Usuario"
                                                        value={fullName}
                                                        disabled
                                                        style={{ backgroundColor: 'white', color: 'black', opacity: 1, cursor: 'not-allowed' }}

                                                    />
                                                </div>
                                            </IonCol>
                                        </IonRow>

                                        <div style={{ textAlign: 'center' }}>
                                            {pdfUrl && (
                                                <Link to="/visualizarlibro">
                                                    <IonButton className="text-font" color="dark" style={{ borderRadius: '10px', textTransform: "capitalize", fontSize: '13px' }}>
                                                        Mostrar PDF
                                                    </IonButton>
                                                </Link>
                                            )}
                                            {/* <IonButton className="text-font" color="dark" style={{ borderRadius: '10px', textTransform: "capitalize", fontSize: '13px' }} onClick={handleShowPdf}>Mostrar PDF</IonButton> */}

                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <IonButton
                                                color="secondary"
                                                onClick={handleModalClose}
                                                style={{ borderRadius: '10px', textTransform: "capitalize", fontSize: '13px' }}
                                                className="text-font"
                                            >
                                                Cerrar
                                            </IonButton>
                                        </div>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    )}
                </div>
                {isLoading && (
                    <div className="spinner-overlay">
                        <LoadingSpinner />
                    </div>
                )}
                <IonAlert
                    className='text-font'
                    isOpen={isModalOpen}
                    header="Éxito"
                    message="Los detalles del libro se han mostrado correctamente."
                    buttons={[{
                        text: 'Aceptar',
                        handler: handleModalClose
                    }]}
                    onDidDismiss={() => setIsModalOpen(false)}
                    mode="ios"
                />
                <IonAlert
                    className='text-font'
                    isOpen={isErrorModalOpen}
                    header="Error"
                    message="No se pudo cargar la información del libro. Por favor, intente de nuevo más tarde."
                    buttons={[{
                        text: 'Aceptar',
                        handler: () => setIsErrorModalOpen(false)
                    }]}
                    onDidDismiss={() => setIsErrorModalOpen(false)}
                    mode="ios"
                />
                <IonAlert
                    className='text-font'
                    isOpen={isNetworkErrorModalOpen}
                    header="Error de Red"
                    message="No se pudo conectar al servidor. ¿Desea intentar nuevamente?"
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: handleCancel
                        },
                        {
                            text: 'Reintentar',
                            handler: handleRetry
                        }
                    ]}
                    onDidDismiss={() => setIsNetworkErrorModalOpen(false)}
                    mode="ios"
                />
            </IonPage>
        </>
    );
};

export default VerLibro