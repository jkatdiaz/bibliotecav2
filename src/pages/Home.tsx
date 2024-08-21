import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton  } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Login from '../components/Login'



const Home: React.FC = () => {
  return (
   <IonPage>
        <Login />

    </IonPage>
  );
};

export default Home;


