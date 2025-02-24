import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { addOutline, alert, checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTracking } from "../context/TrackingContext";
import { getPatients } from "../services/patientService";
import { Patient } from "../types/Patient";

export const PatientDetails = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { trackedPatients, addToTracking } = useTracking();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    getPatients().then(async (data) => {
      setPatient(data.find((p: Patient) => p.id.toString() === id));
    });
  }, [id]);

  const addPatient = (patientId: number) => {
    if (!trackedPatients.some((p: number) => p === patientId)) {
      setToastMessage(
        "Paciente adicionado com sucesso à lista de acompanhamento"
      );
      addToTracking(patientId);
      history.goBack();
    } else {
      setToastMessage("Paciente já cadastrado na lista de acompanhamento");
    }
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Detalhes do Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {patient ? (
          <>
            <IonItem>
              <IonLabel className="bold">Nome:</IonLabel>
              <p className="ion-text-capitalize">
                {patient.name.firstname} {patient.name.lastname}
              </p>
            </IonItem>
            <IonItem>
              <IonLabel className="bold">E-mail:</IonLabel>
              <p>{patient.email}</p>
            </IonItem>
            <IonItem>
              <IonLabel className="bold">Telefone:</IonLabel>
              <p>{patient.phone}</p>
            </IonItem>
            <IonItem>
              <IonLabel className="bold">Endereço:</IonLabel>
              <p className="ion-text-capitalize">
                {patient.address.city}, {patient.address.street}
              </p>
            </IonItem>

            <IonToast
              isOpen={showToast}
              icon={toastMessage.includes("sucesso") ? checkmark : alert}
              color={toastMessage.includes("sucesso") ? "success" : "danger"}
              onDidDismiss={() => setShowToast(false)}
              message={toastMessage}
              duration={2000}
              position="top"
              swipeGesture="vertical"
            />
          </>
        ) : (
          <IonLoading isOpen={!patient} message="Carregando..." />
        )}
        <IonButton
          className="ion-margin-bottom ion-padding"
          expand="block"
          fill="solid"
          slot="fixed"
          style={{ bottom: 0, right: 0, left: 0 }}
          onClick={() => addPatient(patient!.id)}
        >
          <IonIcon icon={addOutline} slot="start" />
          Marcar como "Em acompanhamento"
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
