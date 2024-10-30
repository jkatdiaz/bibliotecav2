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
} from "@ionic/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Drawer from "./Drawer";
import { Document, Page, pdfjs } from "react-pdf";

// Configura el worker de PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer: React.FC = () => {
  const pdfUrl = localStorage.getItem("pdfUrl");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const resetVariable = () => {
    localStorage.removeItem("pdfUrl");
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
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
          {pdfUrl ? (
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
            </Document>
          ) : (
            <div>No se encontró el PDF.</div>
          )}
          {/* <p>
            Página {pageNumber} de {numPages}
          </p> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default PdfViewer;
