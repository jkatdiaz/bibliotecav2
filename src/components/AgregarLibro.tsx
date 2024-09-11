import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { IonContent, IonButtons, IonMenuButton,IonButton, IonItem,IonLabel,IonInput, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { IonHeader, IonAlert, IonCard, IonCardContent, IonToolbar, IonRow, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage, IonInput, IonSelect, IonSelectOption, IonButton, IonLabel, IonItem, IonTextarea, IonCol } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
}

const SubirLibro: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verifica que todos los campos estén llenos
        if (!form.name || !form.publication_year || !form.author || !form.download_url || !form.book_type_id || !form.pnf_id || !form.description) {
            console.error('All fields must be filled');
            return;
        }

        try {
            const response = await axios.post('https://library-0a07.onrender.com/book/', form)
            if (response.data) {
                setIsModalOpen(true); // Abre el modal si la respuesta es exitosa
            } else {
               
                console.error('Error al añadir el libro');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }

        // axios.post('https://library-0a07.onrender.com/book/', form)
        //     .then(response => {
        //         console.log('Book added successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error adding book:', error);
        //     });
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        history.push('/libros'); // Redirige a la página de libros
        window.location.reload()
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
                    <IonButton className="boton-volver" shape="round" color="medium">
                        <FontAwesomeIcon style={{ padding: '4px' }} icon={faAnglesLeft} />
                        <div className="text-font" style={{ textTransform: 'capitalize' }}>
                            Atrás
                        </div>
                    </IonButton>
                </Link>
                <div>
                    <div className="text-font card-datos-usuario">
                        <IonCard className='carddos-datos-usuario'>
                            <IonCardContent>
                                <form onSubmit={handleSubmit}>
                                    <IonRow>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div style={{ marginBottom: '12px' }}>
                                                <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}> Nombre del Libro</span>
                                                <IonInput
                                                    type="text"
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Nombre del Libro"
                                                    name="name"
                                                    value={form.name}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div style={{ marginBottom: '12px' }}>
                                            <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}> Año de publicación</span>
                                                <IonInput
                                                    type="number"
                                                    className="text-font inputs-datos-usuario"
                                                    name="publication_year"
                                                    placeholder="Año de publicación"
                                                    value={form.publication_year}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div style={{ marginBottom: '12px' }}>
                                            <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}>Autor</span>
                                                <IonInput
                                                    type="text"
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Autor"
                                                    name="author"
                                                    value={form.author}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                                            <div style={{ marginBottom: '12px' }}>
                                            <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}>Adjuntar libro</span>
                                                <IonInput
                                                    type="text"
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Adjuntar archivo"
                                                    name="download_url"
                                                    value={form.download_url}
                                                    onIonChange={handleChange}
                                                ></IonInput>
                                            </div>
                                        </IonCol>
                                        <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                                            <div>
                                            <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}> Tipo</span>
                                                <IonSelect
                                                    className="text-font"
                                                    name="book_type_id"
                                                    placeholder="Seleccionar tipo de libro"
                                                    style={{ textAlign: 'center', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.18)', borderRadius: '5px', padding: '8px' }}
                                                    value={form.book_type_id}
                                                    onIonChange={handleChange}
                                                    mode="ios"
                                                >
                                                    {bookTypes.map(type => (
                                                        <IonSelectOption className="text-font" key={type.id} value={type.id}>{type.name}</IonSelectOption>
                                                    ))}
                                                </IonSelect>
                                            </div>
                                        </IonCol>
                                        <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                                            <div style={{ textAlign: 'center' }}>
                                            <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}>PNF</span>
                                                <IonSelect
                                                    className="text-font"
                                                    style={{ textAlign: 'center', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.18)', borderRadius: '5px', padding: '8px' }}
                                                    name="pnf_id"
                                                    placeholder="Selecciona el PNF"
                                                    value={form.pnf_id}
                                                    onIonChange={handleChange}
                                                    mode="ios"
                                                >
                                                    {pnfs.map(pnf => (
                                                        <IonSelectOption className="text-font" key={pnf.id} value={pnf.id}>{pnf.name}</IonSelectOption>
                                                    ))}
                                                </IonSelect>
                                            </div>
                                        </IonCol>
                                        <IonCol size='12'>
                                        <span className='text-font' style={{textAlign:'center',color:'black',fontWeight:'500'}}>Descripción o reseña</span>
                                            <div>
                                                <IonTextarea
                                                    className="text-font inputs-datos-usuario"
                                                    placeholder="Reseña o sipnosis del libro"
                                                    name="description"
                                                    value={form.description}
                                                    onIonChange={handleChange}
                                                />
                                            </div>
                                        </IonCol>
                                    </IonRow>
                                    <div style={{ textAlign: 'center' }}>

                                        <IonButton color="secondary" type="submit" style={{ borderRadius: '10px', textTransform: "capitalize" }} className="text-font" >Enviar</IonButton>
                                    </div>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </div>
                </div>
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
            </IonPage>
        </>
    );


}

export default SubirLibro