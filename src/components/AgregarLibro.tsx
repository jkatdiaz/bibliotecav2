import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { IonContent, IonButtons, IonMenuButton,IonButton, IonItem,IonLabel,IonInput, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { IonHeader, IonAlert, IonCard, IonCardContent, IonText, IonToolbar, IonRow, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage, IonInput, IonSelect, IonSelectOption, IonButton, IonLabel, IonItem, IonTextarea, IonCol } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

import Drawer from './Drawer';
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
    publication_year: string;
    author: string;
    download_url: string;
    book_type_id: number;
    pnf_id: number;
    description: string;
    user_id: number
}

const SubirLibro: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});


    const history = useHistory();
    const [bookTypes, setBookTypes] = useState<BookType[]>([]);
    const [pnfs, setPnfs] = useState<PNF[]>([]);
    const [form, setForm] = useState<FormState>({
        name: '',
        publication_year: '',
        author: '',
        download_url: '',
        book_type_id: 0,
        pnf_id: 0,
        description: '',
        user_id: 0
    });


    useEffect(() => {
        // Fetch book types
        axios.get<BookType[]>('https://library-0a07.onrender.com/book_type/')
            .then(response => setBookTypes(response.data))
            .catch(error => console.error('Error fetching book types:', error));

        // Fetch PNFs
        axios.get<PNF[]>('https://library-0a07.onrender.com/pnf/')
            .then(response => setPnfs(response.data))
            .catch(error => console.error('Error fetching PNFs:', error));
       

        const storedUserId = localStorage.getItem('userData');
        const encontrado = JSON.parse(storedUserId)
        const user_id = encontrado.id
        console.log(user_id)
        
        if (storedUserId) {
            setForm(prevForm => ({
                ...prevForm,
                user_id: Number(user_id) // Asegúrate de convertirlo a número si es necesario
            }));
        }
    }, []);

    const handleChange = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const { name, value } = target;

        // Convert number inputs to numbers
        const newValue = name === 'book_type_id' || name === 'pnf_id' ? Number(value) : value;

        setForm(prevForm => ({
            ...prevForm,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Verifica que todos los campos estén llenos
        const errors: { [key: string]: string } = {};
        if (!form.name) errors.name = 'Este campo es obligatorio';
        if (!form.publication_year) errors.publication_year = 'Este campo es obligatorio';
        if (!form.author) errors.author = 'Este campo es obligatorio';
        if (!form.download_url) errors.download_url = 'Este campo es obligatorio';
        if (!form.book_type_id) errors.book_type_id = 'Este campo es obligatorio';
        if (!form.pnf_id) errors.pnf_id = 'Este campo es obligatorio';
        if (!form.description) errors.description = 'Este campo es obligatorio';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setIsLoading(true)
        try {
            const response = await axios.post('https://library-0a07.onrender.com/book/', form)
            if (response.data) {
                setIsModalOpen(true); // Abre el modal si la respuesta es exitosa
            } else {

                console.error('Error al añadir el libro');
                setIsErrorModalOpen(true)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setIsErrorModalOpen(true)
        } finally {
            setIsLoading(false); // Oculta el spinner
        }

    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        history.push('/libros'); // Redirige a la página de libros
        // window.location.reload()
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
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Link to="/libros" className="no-underline">
                    <IonButton onClick={() => setFormErrors({})} className="boton-volver" shape="round" color="medium">
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>
                <div className='scroll-container'>
                    <div className="text-font card-datos-usuario">
                        <IonCard className='carddos-datos-usuario'>
                            <IonCardContent>
                                <form onSubmit={handleSubmit}>
                                    <IonRow>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div>
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}> Nombre del Libro</span>
                                                <IonInput
                                                    type="text"
                                                    className={`text-font inputs-datos-usuario ${formErrors.name ? 'error-input' : ''}`}
                                                    placeholder="Nombre del Libro"
                                                    name="name"
                                                    value={form.name}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                                {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div>
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}> Año de publicación</span>
                                                <IonInput
                                                    type="number"
                                                    className={`text-font inputs-datos-usuario ${formErrors.publication_year ? 'error-input' : ''}`}
                                                    name="publication_year"
                                                    placeholder="Año de publicación"
                                                    value={form.publication_year}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                                {formErrors.publication_year && <div className="error-message">{formErrors.publication_year}</div>}
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div>
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Autor</span>
                                                <IonInput
                                                    type="text"
                                                    className={`text-font inputs-datos-usuario ${formErrors.author ? 'error-input' : ''}`}
                                                    placeholder="Autor"
                                                    name="author"
                                                    value={form.author}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                                {formErrors.author && <div className="error-message">{formErrors.author}</div>}
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div >
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Adjuntar libro</span>
                                                <IonInput
                                                    type="text"
                                                    className={`text-font inputs-datos-usuario ${formErrors.download_url ? 'error-input' : ''}`}
                                                    placeholder="Adjuntar archivo"
                                                    name="download_url"
                                                    value={form.download_url}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                                {formErrors.download_url && <div className="error-message">{formErrors.download_url}</div>}
                                            </div>
                                        </IonCol>
                                        <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                                            <div>
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}> Tipo</span>
                                                <IonSelect
                                                    className={`text-font ${formErrors.book_type_id ? 'error-input' : ''}`}
                                                    name="book_type_id"
                                                    placeholder="Seleccionar tipo de libro"
                                                    style={{ textAlign: 'center', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.18)', borderRadius: '5px', padding: '8px', fontSize: '13px' }}
                                                    value={form.book_type_id}
                                                    onIonChange={handleChange}
                                                    mode="ios"
                                                >
                                                    {bookTypes.map(type => (
                                                        <IonSelectOption className="text-font" key={type.id} value={type.id}>{type.name}</IonSelectOption>
                                                    ))}
                                                </IonSelect>

                                                {formErrors.book_type_id && <div className="error-message">{formErrors.book_type_id}</div>}
                                            </div>
                                        </IonCol>
                                        <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                                            <div style={{ textAlign: 'center' }}>
                                                <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>PNF</span>
                                                <IonSelect
                                                    className={`text-font ${formErrors.pnf_id ? 'error-input' : ''}`}
                                                    style={{ textAlign: 'center', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.18)', borderRadius: '5px', padding: '8px', fontSize: '13px' }}
                                                    name="pnf_id"
                                                    placeholder="Selecciona el PNF"
                                                    value={form.pnf_id}
                                                    onIonChange={handleChange}
                                                    mode="ios"
                                                >
                                                    {pnfs.map(pnf => (
                                                        <IonSelectOption style={{ fontSize: '13px' }} className="text-font" key={pnf.id} value={pnf.id}>{pnf.name}</IonSelectOption>
                                                    ))}
                                                </IonSelect>
                                                {formErrors.pnf_id && <div className="error-message">{formErrors.pnf_id}</div>}

                                            </div>
                                        </IonCol>
                                        <IonCol size='12'>
                                            <span className='text-font' style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '13px' }}>Descripción o reseña</span>
                                            <div>
                                                <IonTextarea
                                                    className={`text-font inputs-datos-usuario ${formErrors.description ? 'error-input' : ''}`}
                                                    placeholder="Reseña o sipnosis del libro"
                                                    name="description"
                                                    value={form.description}
                                                    onIonChange={handleChange}
                                                />
                                                {formErrors.description && <div className="error-message">{formErrors.description}</div>}
                                            </div>
                                        </IonCol>
                                    </IonRow>
                                    <div style={{ textAlign: 'center' }}>

                                        <IonButton color="secondary" type="submit" style={{ borderRadius: '10px', textTransform: "capitalize", fontSize: '13px' }} className="text-font" >Enviar</IonButton>
                                    </div>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </div>
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
                    message="Su libro ha sido añadido con éxito."
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
                    message="No se pudo añadir el libro. Por favor, intente de nuevo más tarde."
                    buttons={[{
                        text: 'Aceptar',
                        handler: () => setIsErrorModalOpen(false)
                    }]}
                    onDidDismiss={() => setIsErrorModalOpen(false)}
                    mode="ios"
                />
            </IonPage>
        </>
    );


}

export default SubirLibro