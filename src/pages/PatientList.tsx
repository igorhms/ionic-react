import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getPatients } from "../services/patientService";
import { Patient } from "../types/Patient";

export const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getPatients().then(async (data: Patient[]) => {
      setPatients(data);
      setFilteredPatients(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((p: Patient) =>
        p.name.firstname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, patients]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          show-clear-button="focus"
          className="ion-padding"
          placeholder="Buscar paciente..."
          onIonInput={(e) => setSearch(e.detail.value!)}
        />
        {loading ? (
          <IonLoading isOpen={loading} message="Carregando..." />
        ) : (
          <IonList>
            {filteredPatients.map((p) => (
              <IonItem key={p.id} routerLink={`/patients/${p.id}`}>
                <IonLabel>
                  <h2 className="ion-text-capitalize">
                    {p.name.firstname} {p.name.lastname}
                  </h2>
                  <p>{p.email}</p>
                  <p>{p.phone}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/add-patient">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
