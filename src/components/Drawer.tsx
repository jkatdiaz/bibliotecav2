import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToolbar, IonButtons,IonMenuButton,IonTitle,IonContent,IonHeader, IonPage,IonMenu} from "@ionic/react"
import React from "react"
function Drawer() {
    return (

        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">This is the menu content.</IonContent>
            </IonMenu>


            {/* <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle className='text-font'>Biblioteca Virtual</IonTitle>
                </IonToolbar>
            </IonHeader> */}
        </>
    )
};

export default Drawer