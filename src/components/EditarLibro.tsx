import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonHeader,
  IonAlert,
  IonCard,
  IonCardContent,
  IonToolbar,
  IonRow,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonPage,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  IonItem,
  IonTextarea,
  IonCol,
} from "@ionic/react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";

import Drawer from "./Drawer";
import "./styles.css";

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
  user_id: number;
}

const EditarLibro: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoadingPDF, setLoadingPDF] = useState(false);
  const [isNetworkErrorModalOpen, setIsNetworkErrorModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [bookTypes, setBookTypes] = useState<BookType[]>([]);
  const [isPdfValid, setIsPdfValid] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [bookName, setBookName] = useState<string>(""); // Nombre del libro desde el servicio
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showButtonUpdate, setShowButtonUpdate] = useState<boolean>(true);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [pnfs, setPnfs] = useState<PNF[]>([]);
  const [form, setForm] = useState<FormState>({
    name: "",
    publication_year: "",
    author: "",
    download_url: "",
    book_type_id: 0,
    pnf_id: 0,
    description: "",
    user_id: 0,
  });

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // useEffect(() => {
  //   console.log("ID:", id);
  //   console.log("=============USE EFFECT============");
  //   fetchData();
  // }, [id, location.pathname]); // Dependencia en el ID
  useEffect(() => {
    // Extrae el ID desde el pathname
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/');
    const id = pathSegments[pathSegments.length - 1]; // Asume que el ID es el último segmento

    // Lista de rutas que no deben ser consideradas como ID
    const invalidIds = [
      'register',
      'menu',
      'valores',
      'carreras',
      'mision',
      'vision',
      'reseña',
      'objetivos',
      'bienvenida',
      'perfilusuario',
      'libros',
      'subirlibro',
      'visualizarlibro',
      'login',
      'register'
    ];

    // Verifica que el id sea válido (no vacío y no en la lista de IDs inválidos)
    const isValidId = id && !invalidIds.includes(id);

    // Si el id es válido, llama a fetchData
    if (isValidId) {
      console.log(`Consultando el libro con ID: ${id}`);
      fetchData(id); // Llama a tu función para obtener los datos
    }
  }, [location.pathname]); // Escucha cambios en el pathname

  const clearForm = () => {
    setIsModalOpen(false);
    setIsLoading(false);
    setIsErrorModalOpen(false);
    setIsNetworkErrorModalOpen(false);
    setFormErrors({});
    setIsPdfValid(true);
    setSelectedFile(null);
    setBookName("");
    setShowInput(false);
    setShowAlert(false);
    setDownloadUrl("");
  };

  const fetchData = async (id) => {
    const storedUserId = localStorage.getItem("userData");
    const encontrado = JSON.parse(storedUserId);
    const user_id = encontrado ? encontrado.id : 0;

    setIsLoading(true);
    try {
      // Fetch book types

      const bookTypesResponse = await axios.get<BookType[]>(
        "https://library-0a07.onrender.com/book_type/"
      );
      setBookTypes(bookTypesResponse.data);
      //   console.log("aqui", bookTypesResponse.data);
      //   console.log(bookTypes);

      // Fetch PNFs
      const pnfsResponse = await axios.get<PNF[]>(
        "https://library-0a07.onrender.com/pnf/"
      );
      setPnfs(pnfsResponse.data);

      // Fetch book details for editing
      const bookResponse = await axios.get<FormState>(
        `https://library-0a07.onrender.com/book/${id}/`
      );
      const { book_type, ...bookDetails } = bookResponse.data;

      const { download_url } = bookResponse.data; // Ajusta según la estructura de tu respuesta

      setBookName(download_url); // Guardar la URL directamente

      // Extraer el nombre del archivo de la URL
      const name = download_url.substring(download_url.lastIndexOf("/") + 1);
      setBookName(name); // Actualiza con el nombre extraído

      setForm({
        ...bookDetails,
        book_type_id:
          bookTypesResponse.data.find((type) => type.name === book_type)?.id ||
          0, // Obtener el ID del tipo
        user_id: Number(user_id),
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setIsNetworkErrorModalOpen(true);
    }
  };
  const handleEditPdf = () => {
    setShowAlert(true); // Muestra el alerta
  };


  console.log(bookName)

  const handleConfirmEdit = () => {
    setShowInput(true); // Muestra el input para el archivo
    setShowAlert(false);
    setShowButtonUpdate(false);
  };

  const handleCancelEdit = () => {
    setShowAlert(false);
    setShowButtonUpdate(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === "book_type_id" || name === "pnf_id" ? Number(value) : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));

    // Validación en tiempo real
    const errors: { [key: string]: string } = {};
    if (name === "name" && !newValue) errors.name = "Este campo es obligatorio";
    if (name === "publication_year" && !newValue) errors.publication_year = "Este campo es obligatorio";
    if (name === "author" && !newValue) errors.author = "Este campo es obligatorio";
    if (name === "book_type_id" && !newValue) errors.book_type_id = "Este campo es obligatorio";
    if (name === "pnf_id" && !newValue) errors.pnf_id = "Este campo es obligatorio";
    if (name === "description" && !newValue) errors.description = "Este campo es obligatorio";

    setFormErrors(errors);
  };

  // const handleChange = (e: CustomEvent) => {
  //   const target = e.target as
  //     | HTMLInputElement
  //     | HTMLTextAreaElement
  //     | HTMLSelectElement;
  //   const { name, value } = target;

  //   // Convert number inputs to numbers
  //   const newValue =
  //     name === "book_type_id" || name === "pnf_id" ? Number(value) : value;

  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: newValue,
  //   }));
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setIsPdfValid(true); // El PDF es válido
    } else {
      setSelectedFile(null);
      setIsPdfValid(false); // El PDF no es válido
    }
  };

  //   console.log(form);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected.");
      return false; // Retornar falso si no hay archivo
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoadingPDF(true);
    try {
      const response = await axios.post(
        "https://library-0a07.onrender.com/book/upload/",
        formData
      );
      if (response.data) {
        console.log("File uploaded successfully:", response.data);
        setDownloadUrl(response.data.url);
        setIsUploadSuccess(true);
        setShowButtonUpdate(true);
        setLoadingPDF(false);
        return true;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoadingPDF(false);
      setShowButtonUpdate(true);
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log("¡El botón se ha presionado!");
    // Verifica que todos los campos estén llenos
    const errors: { [key: string]: string } = {};
    if (!form.name) errors.name = "Este campo es obligatorio";
    if (!form.publication_year)
      errors.publication_year = "Este campo es obligatorio";
    if (!form.author) errors.author = "Este campo es obligatorio";
    // if (!selectedFile ) errors.download_url = "Adjuntar PDF es obligatorio";
    // Validación del PDF solo si showInput es falso
    if (showInput && !selectedFile) {
      errors.download_url = "Adjuntar PDF es obligatorio";
    }
    if (!form.book_type_id) errors.book_type_id = "Este campo es obligatorio";
    if (!form.pnf_id) errors.pnf_id = "Este campo es obligatorio";
    if (!form.description) errors.description = "Este campo es obligatorio";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // const updatedForm = {
    //   ...form,
    //   download_url: downloadUrl, // Asegúrate de que downloadUrl tenga un valor válido
    // };
    // Construye el objeto actualizado del formulario
    const updatedForm = {
      ...form,
      ...(!showInput ? { bookName: form.download_url } : { download_url: downloadUrl }),
    };
    setIsLoading(true);

    try {
      const response = await axios.put(
        `https://library-0a07.onrender.com/book/${id}/`,
        updatedForm
      );
      if (response.data) {
        setIsModalOpen(true); // Abre el modal si la respuesta es exitosa
      } else {
        console.error("Error updating the book");
        debugger;
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Error in the request:", error);
      setIsErrorModalOpen(true);
    } finally {
      setIsLoading(false); // Oculta el spinner
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    history.push("/libros"); // Redirige a la página de libros
    clearForm();
  };

  const handleNetworkErrorClose = () => setIsNetworkErrorModalOpen(false);

  const handleRetry = async () => {
    setIsNetworkErrorModalOpen(false); // Close the error modal
    await fetchData(id); // Retry fetching data
  };

  const handleCancel = () => {
    setIsNetworkErrorModalOpen(false); // Just close the modal
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
            <IonTitle className="text-font">Biblioteca Digital</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Link to="/libros" className="no-underline">
          <IonButton
            className="boton-volver"
            shape="round"
            color="medium"
            onClick={() => {
              setFormErrors({}); // Limpiar los errores del formulario
              clearForm();
            }}
          >
            <FontAwesomeIcon style={{ padding: "4px" }} icon={faAnglesLeft} />
            <div className="text-font" style={{ textTransform: "capitalize" }}>
              Atrás
            </div>
          </IonButton>
        </Link>
        <div className="scroll-container">
          {isLoading ? (
            // <p>Cargando ...</p>
            <LoadingSpinner />
          ) : (
            <div className="text-font card-datos-usuario">
              <IonCard className="carddos-datos-usuario">
                <IonCardContent>
                  <form>
                    <IonRow>
                      <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                        <div>
                          <span
                            className="text-font"
                            style={{
                              textAlign: "center",
                              color: "black",
                              fontWeight: "500",
                              fontSize: "13px",
                            }}
                          >
                            Nombre del Libro
                          </span>
                          <IonInput
                            type="text"
                            className={`text-font inputs-datos-usuario ${formErrors.name ? "error-input" : ""
                              }`}
                            placeholder="Nombre del Libro"
                            name="name"
                            value={form.name}
                            onIonChange={handleChange}
                          />
                          {formErrors.name && (
                            <div className="error-message">
                              {formErrors.name}
                            </div>
                          )}
                        </div>
                      </IonCol>
                      <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                        <div>
                          <span
                            className="text-font"
                            style={{
                              textAlign: "center",
                              color: "black",
                              fontWeight: "500",
                              fontSize: "13px",
                            }}
                          >
                            Año de publicación
                          </span>
                          <IonInput
                            type="number"
                            className={`text-font inputs-datos-usuario ${formErrors.publication_year ? "error-input" : ""
                              }`}
                            name="publication_year"
                            placeholder="Año de publicación"
                            value={form.publication_year}
                            onIonChange={handleChange}
                          />
                          {formErrors.publication_year && (
                            <div className="error-message">
                              {formErrors.publication_year}
                            </div>
                          )}
                        </div>
                      </IonCol>
                      <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                        <div>
                          <span
                            className="text-font"
                            style={{
                              textAlign: "center",
                              color: "black",
                              fontWeight: "500",
                              fontSize: "13px",
                            }}
                          >
                            Autor
                          </span>
                          <IonInput
                            type="text"
                            className={`text-font inputs-datos-usuario ${formErrors.author ? "error-input" : ""
                              }`}
                            placeholder="Autor"
                            name="author"
                            value={form.author}
                            onIonChange={handleChange}
                          />
                          {formErrors.author && (
                            <div className="error-message">
                              {formErrors.author}
                            </div>
                          )}
                        </div>
                      </IonCol>

                      <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                        <div>
                          <span
                            className="text-font"
                            style={{
                              textAlign: "center",
                              color: "black",
                              fontWeight: "500",
                              fontSize: "13px",
                            }}
                          >
                            Tipo
                          </span>
                          <IonSelect
                            className={`text-font ${formErrors.book_type_id ? "error-input" : ""
                              }`}
                            name="book_type_id"
                            placeholder="Seleccionar tipo de libro"
                            style={{
                              textAlign: "center",
                              width: "100%",
                              backgroundColor: "rgba(0, 0, 0, 0.18)",
                              borderRadius: "5px",
                              padding: "8px",
                              fontSize: "13px",
                            }}
                            value={form.book_type_id}
                            onIonChange={handleChange}
                            mode="ios"
                          >
                            {bookTypes &&
                              bookTypes.map((type) => (
                                <IonSelectOption
                                  className="text-font"
                                  key={type.id}
                                  value={type.id}
                                >
                                  {type.name}
                                </IonSelectOption>
                              ))}
                          </IonSelect>
                          {formErrors.book_type_id && (
                            <div className="error-message">
                              {formErrors.book_type_id}
                            </div>
                          )}
                        </div>
                      </IonCol>

                      <IonCol size="6" size-sm="6" size-md="4" size-lg="3">
                        <div style={{ textAlign: "center" }}>
                          <span
                            className="text-font"
                            style={{
                              textAlign: "center",
                              color: "black",
                              fontWeight: "500",
                              fontSize: "13px",
                            }}
                          >
                            PNF
                          </span>
                          <IonSelect
                            className={`text-font ${formErrors.pnf_id ? "error-input" : ""
                              }`}
                            style={{
                              textAlign: "center",
                              width: "100%",
                              backgroundColor: "rgba(0, 0, 0, 0.18)",
                              borderRadius: "5px",
                              padding: "8px",
                              fontSize: "13px",
                            }}
                            name="pnf_id"
                            placeholder="Selecciona el PNF"
                            value={form.pnf_id}
                            onIonChange={handleChange}
                            mode="ios"
                          >
                            {pnfs.map((pnf) => (
                              <IonSelectOption
                                style={{ fontSize: "13px" }}
                                className="text-font"
                                key={pnf.id}
                                value={pnf.id}
                              >
                                {pnf.name}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                          {formErrors.pnf_id && (
                            <div className="error-message">
                              {formErrors.pnf_id}
                            </div>
                          )}
                        </div>
                      </IonCol>
                      <IonCol size="12">
                        <span
                          className="text-font"
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontWeight: "500",
                            fontSize: "13px",
                          }}
                        >
                          Descripción o reseña
                        </span>
                        <div>
                          <IonTextarea
                            className={`text-font inputs-datos-usuario ${formErrors.description ? "error-input" : ""
                              }`}
                            placeholder="Reseña o sinopsis del libro"
                            name="description"
                            value={form.description}
                            onIonChange={handleChange}
                          />
                          {formErrors.description && (
                            <div className="error-message">
                              {formErrors.description}
                            </div>
                          )}
                        </div>
                      </IonCol>
                      {/* add upload pdf */}
                      <IonCol size="12">
                        <span
                          className="text-font"
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontWeight: "500",
                            fontSize: "13px",
                          }}
                        >
                          Adjuntar PDF
                        </span>
                        {!showInput && (
                          <IonItem>
                            <IonInput
                              value={bookName}
                              readonly
                              style={{ fontSize: "12px" }}
                            />
                            <IonButton
                              style={{ textTransform: "capitalize" }}
                              onClick={handleEditPdf}
                            >
                              Editar PDF
                            </IonButton>
                          </IonItem>
                        )}
                        {showInput && (
                          <IonItem className="text-font bg-white">
                            <input
                              className="text-font bg-white"
                              style={{ fontSize: "12px" }}
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                            />
                          </IonItem>
                        )}
                        {!isPdfValid && (
                          <div className="error-message">
                            Adjuntar PDF es obligatorio.
                          </div>
                        )}{" "}
                        {/* Mensaje de error */}
                        {showInput && (
                          <div style={{ textAlign: "center" }}>
                            <IonButton
                              color="dark"
                              style={{
                                borderRadius: "10px",
                                textTransform: "capitalize",
                                fontSize: "13px",
                              }}
                              className="text-font"
                              onClick={handleUpload}
                              disabled={!selectedFile}
                            >
                              Cargar
                            </IonButton>
                          </div>
                        )}
                      </IonCol>
                    </IonRow>

                    <div style={{ textAlign: "center" }}>
                      <IonButton
                        color="secondary"
                        onClick={() => handleSubmit()}
                        disabled={!showButtonUpdate}
                        style={{
                          borderRadius: "10px",
                          textTransform: "capitalize",
                          fontSize: "13px",
                        }}
                        className="text-font"
                      >
                        Actualizar
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
        {isLoadingPDF && (
          <div className="spinner-overlay">
            <LoadingSpinner />
          </div>
        )}
        <IonAlert
          className="text-font"
          isOpen={isModalOpen}
          header="Éxito"
          message="Su libro ha sido actualizado con éxito."
          buttons={[
            {
              text: "Aceptar",
              handler: handleModalClose,
            },
          ]}
          onDidDismiss={() => setIsModalOpen(false)}
          mode="ios"
        />
        <IonAlert
          className="text-font"
          isOpen={isErrorModalOpen}
          header="Error"
          message="No se pudo actualizar el libro. Por favor, intente de nuevo más tarde."
          buttons={[
            {
              text: "Aceptar",
              handler: () => setIsErrorModalOpen(false),
            },
          ]}
          onDidDismiss={() => setIsErrorModalOpen(false)}
          mode="ios"
        />
        <IonAlert
          className="text-font"
          isOpen={isNetworkErrorModalOpen}
          header="Error de Red"
          message="No se pudo conectar al servidor. ¿Desea intentar nuevamente?"
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: handleCancel,
            },
            {
              text: "Reintentar",
              handler: handleRetry,
            },
          ]}
          onDidDismiss={() => setIsNetworkErrorModalOpen(false)}
          mode="ios"
        />
        <IonAlert
          isOpen={showAlert}
          className="text-font"
          onDidDismiss={() => setShowAlert(false)}
          header={"Editar PDF"}
          message={"¿Estás seguro de que deseas editar el PDF?"}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: handleCancelEdit,
            },
            {
              text: "Aceptar",
              handler: handleConfirmEdit,
            },
          ]}
        />
      </IonPage>
    </>
  );
};

export default EditarLibro;
