// src/PdfViewer.tsx
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

// Configura el worker de PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs`;
// Asegúrate de usar la versión correcta aquí
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;



const PdfViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Visualizar PDF</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {pdfUrl ? (
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                ) : (
                    <div>No se encontró el PDF.</div>
                )}
                <div>
                    <IonButton disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
                        Página Anterior
                    </IonButton>
                    <IonButton disabled={numPages === null || pageNumber >= (numPages || 0)} onClick={() => setPageNumber(pageNumber + 1)}>
                        Página Siguiente
                    </IonButton>
                </div>
                <p>Página {pageNumber} de {numPages}</p>
            </IonContent>
        </IonPage>
    );
};

export default PdfViewer;
