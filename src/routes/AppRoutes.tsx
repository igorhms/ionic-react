import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { heart, people } from "ionicons/icons";
import { useTracking } from "../context/TrackingContext";
import { AddUserForm } from "../pages/AddUserForm";
import { PatientDetails } from "../pages/PatientDetails";
import { PatientList } from "../pages/PatientList";
import { TrackingList } from "../pages/TrackingList";
import { Redirect, Route } from "react-router";

export const AppRoutes = () => {
  let { trackedPatients } = useTracking();

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <IonTabs key={trackedPatients.length}>
          <IonRouterOutlet>
            <Route exact path="/patients" component={PatientList} />
            <Route path="/add-patient" component={AddUserForm} exact />
            <Route exact path="/patients/:id" component={PatientDetails} />
            <Route exact path="/tracking" component={TrackingList} />
            <Route exact path="/" render={() => <Redirect to="/patients" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="patients" href="/patients">
              <IonIcon icon={people} />
              <IonLabel>Pacientes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tracking" href="/tracking">
              <IonIcon icon={heart} />
              <IonLabel>Acompanhamento</IonLabel>
              {trackedPatients.length > 0 && (
                <IonBadge color="danger">{trackedPatients.length}</IonBadge>
              )}
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
