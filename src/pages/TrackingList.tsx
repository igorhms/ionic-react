import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useTracking } from "../context/TrackingContext";
import { useEffect, useState } from "react";
import { getPatients } from "../services/patientService";
import { useIonAlert } from "@ionic/react";
import { Patient } from "../types/Patient";
import { trash } from "ionicons/icons";

export const TrackingList = () => {
  const { trackedPatients, removeFromTracking } = useTracking();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    getPatients().then((data: Patient[]) => {
      const tracked = data.filter((p: Patient) =>
        trackedPatients.includes(p.id)
      );
      setPatients(tracked);
    });
  }, [trackedPatients]);

  const confirmRemove = (patient: Patient) => {
    presentAlert({
      header: "Remover Paciente",
      message: `Tem certeza que deseja remover o paciente da lista de acompanhamento?`,
      buttons: [
        { text: "Cancelar", role: "cancel" },
        { text: "Remover", handler: () => handleRemove(patient) },
      ],
    });
  };

  const handleRemove = (patient: Patient) => {
    removeFromTracking(patient.id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acompanhamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {patients.length > 0 ? (
          <IonList>
            {patients.map((p) => (
              <IonItem key={p.id}>
                <IonLabel>
                  <h2 className="ion-text-capitalize">
                    {p.name.firstname} {p.name.lastname}
                  </h2>
                  <p>{p.email}</p>
                  <p>{p.phone}</p>
                </IonLabel>
                <IonButton
                  size="large"
                  color="danger"
                  onClick={() => confirmRemove(p)}
                >
                  <IonIcon slot="icon-only" icon={trash} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Nenhum paciente em acompanhamento.
          </p>
        )}
      </IonContent>
    </IonPage>
  );
};
