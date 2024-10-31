// import React, { useState } from "react";
// import {
//   IonContent,
//   IonHeader,
//   IonMenuButton,
//   IonButtons,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   IonButton,
// } from "@ionic/react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
// import Drawer from "./Drawer";
// import { Document, Page, pdfjs } from "react-pdf";

// // Configura el worker de PDF.js
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const PdfViewer: React.FC = () => {
//   const pdfUrl = localStorage.getItem("pdfUrl");
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const resetVariable = () => {
//     localStorage.removeItem("pdfUrl");
//   };

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <>
//       <Drawer />
//       <IonPage className="custom-background" id="main-content">
//         <IonHeader>
//           <IonToolbar>
//             <IonButtons slot="start">
//               <IonMenuButton />
//             </IonButtons>
//             <IonTitle className="text-font">Biblioteca Digital</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <Link to="/libros" className="no-underline">
//           <IonButton
//             className="boton-volver"
//             shape="round"
//             color="medium"
//             onClick={resetVariable}
//           >
//             <FontAwesomeIcon style={{ padding: "4px" }} icon={faAnglesLeft} />
//             <div className="text-font" style={{ textTransform: "capitalize" }}>
//               Atrás
//             </div>
//           </IonButton>
//         </Link>
//         <IonContent>
//           {pdfUrl ? (
//             <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//               <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
//             </Document>
//           ) : (
//             <div>No se encontró el PDF.</div>
//           )}
//         <p>
//             Página {pageNumber} de {numPages}
//           </p> 
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default PdfViewer;
import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonButtons,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonAlert
} from "@ionic/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faArrowLeft, faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import Drawer from "./Drawer";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import LoadingSpinner from "./LoadingSpinner";


// Configura el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer: React.FC = () => {
  const pdfUrl = localStorage.getItem("pdfUrl");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputPage, setInputPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const resetVariable = () => {
    localStorage.removeItem("pdfUrl");
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reiniciar a la primera página
    setInputPage(1);
  };

  // Funciones para cambiar de página
  const goToNextPage = () => {
    if (pageNumber < (numPages || 1)) {
      setPageNumber(pageNumber + 1);
      setInputPage(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setInputPage(pageNumber - 1);
    }
  };

  // Ir a una página específica
  const goToPage = () => {
    if (inputPage > 0 && inputPage <= (numPages || 1)) {
      setPageNumber(inputPage);
    }
  };

  const downloadPdf = async () => {
    if (pdfUrl) {
      setIsLoading(true); // Mostrar loading
      try {
        // Descargar el PDF como blob
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        const base64Data = await blobToBase64(blob);

        // Obtener el nombre del archivo del PDF desde la URL
        const fileName = pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1);

        // Guardar el archivo PDF en el dispositivo usando Capacitor
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents,
        });

        setAlertMessage("Archivo descargado con éxito. Revisa en tu dispositivo.");
      } catch (error) {
        console.error("Error al descargar el PDF", error);
        setAlertMessage("No se pudo descargar el PDF.");
      } finally {
        setIsLoading(false); // Ocultar loading
      }
    }
  };

  // Convertir Blob a Base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1]; // Quitar el prefijo
        resolve(base64String);
      };
      reader.readAsDataURL(blob);
    });
  };



  return (
    <>
      <Drawer />
      <IonPage className="custom-background" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle className="text-font">Biblioteca Digital</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Link to="/libros" className="no-underline">
          <IonButton
            className="boton-volver"
            shape="round"
            color="medium"
            onClick={resetVariable}
          >
            <FontAwesomeIcon style={{ padding: "4px" }} icon={faAnglesLeft} />
            <div className="text-font" style={{ textTransform: "capitalize" }}>
              Atrás
            </div>
          </IonButton>
        </Link>
        <IonContent>
          {isLoading && (
            <div className="spinner-overlay">
              <LoadingSpinner />
            </div>
          )}
          {pdfUrl ? (
            <>

              <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={window.innerWidth} />
              </Document>
              <IonButton color='dark'
                  size="small"
                  style={{ textTransform: 'capitalize', fontSize: '10px', paddingLeft:'15px' }}
                  className="text-font" onClick={downloadPdf} disabled={isLoading}>
                <FontAwesomeIcon icon={faDownload}  /> Descargar PDF
              </IonButton>
              <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <IonInput
                  style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: "50px", marginRight: "5px" }}
                  type="number"
                  value={inputPage}
                  onBlur={() => goToPage()}
                  onIonChange={e => setInputPage(parseInt(e.detail.value!, 10) || 1)}
                />
                <IonButton onClick={goToPage} color='dark'
                  size="small"
                  style={{ textTransform: 'capitalize', fontSize: '10px' }}
                  className="text-font"
                  disabled={isLoading}>
                    
                  Ir a Página
                </IonButton>
              </div>
              <div className="align-items-center justify-content-center d-flex">
                <p className="text-center text-font" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  Página {pageNumber} de {numPages}
                </p>
              </div>


              <div className="pagination-controls" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingBottom: '10px' }}>
                <IonButton color='dark'
                  size="small"
                  style={{ textTransform: 'capitalize', fontSize: '10px' }}
                  className="text-font" onClick={goToPreviousPage} disabled={pageNumber <= 1}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Anterior
                </IonButton>
                <IonButton color='dark'
                  size="small"
                  style={{ textTransform: 'capitalize', fontSize: '10px' }}
                  className="text-font" onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>
                  Siguiente <FontAwesomeIcon icon={faArrowRight} />
                </IonButton>
              </div>
             
            </>
          ) : (
            <div>No se encontró el PDF.</div>
          )}
        </IonContent>
        {/* Mostrar alert cuando se complete la descarga */}
        <IonAlert
          className="text-font"
          isOpen={!!alertMessage}
          onDidDismiss={() => setAlertMessage(null)}
          header={'Notificación'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonPage>
    </>
  );
};

export default PdfViewer;
