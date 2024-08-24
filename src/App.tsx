import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Register from './components/Registro';
import Menu from './components/Menu'
import Valores from './components/Valores'
import Carreras from './components/Carreras';
import Mision from './components/Mision';
import Vision from './components/Vision';
import Reseña from './components/Reseña';
import Objetivos from './components/Objetivos';
import Bienvenida from './components/Bienvenida';
import PerfilUsuario from './components/PerfilUsuario';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/valores" component={Valores} />
        <Route exact path="/carreras" component={Carreras} />
        <Route exact path="/mision" component={Mision} />
        <Route exact path="/vision" component={Vision} />
        <Route exact path="/reseña" component={Reseña} />
        <Route exact path="/objetivos" component={Objetivos} />
        <Route exact path="/bienvenida" component={Bienvenida} />
        <Route exact path="/perfilusuario" component={PerfilUsuario} />
        
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
