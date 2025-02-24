import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { alert, checkmark } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { createPatient } from "../services/patientService";

export const AddUserForm = () => {
  const [formData, setFormData] = useState({
    email: "teste@gmail.com",
    username: "teste",
    firstname: "Nome",
    lastname: "Teste",
    city: "Uberlândia",
    street: "Rua 1",
    number: "2",
    zipcode: "38400000",
    phone: "3440028922",
  });

  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userPayload = {
      email: formData.email,
      username: formData.username,
      password: "123124324",
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      address: {
        city: formData.city,
        street: formData.street,
        number: Number(formData.number),
        zipcode: formData.zipcode,
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: formData.phone,
    };

    try {
      setIsLoading(true);
      const response = await createPatient(userPayload);
      if (!response) throw new Error("Erro ao adicionar paciente.");

      setToastMessage("Paciente adicionado com sucesso!");
      setIsLoading(false);
      setShowToast(true);
      history.push("/patients");
    } catch (error) {
      setToastMessage("Erro ao adicionar paciente.");
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Adicionar Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Nome</IonLabel>
            <IonInput
              name="firstname"
              value={formData.firstname}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Sobrenome</IonLabel>
            <IonInput
              name="lastname"
              value={formData.lastname}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">E-mail</IonLabel>
            <IonInput
              type="email"
              name="email"
              value={formData.email}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Telefone</IonLabel>
            <IonInput
              name="phone"
              value={formData.phone}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Cidade</IonLabel>
            <IonInput
              name="city"
              value={formData.city}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Rua</IonLabel>
            <IonInput
              name="street"
              value={formData.street}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Número</IonLabel>
            <IonInput
              type="number"
              name="number"
              value={formData.number}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">CEP</IonLabel>
            <IonInput
              name="zipcode"
              value={formData.zipcode}
              onIonChange={handleChange}
              required
            />
          </IonItem>
        </form>
        <IonButton
          className="ion-margin-bottom ion-padding"
          expand="block"
          fill="solid"
          onClick={handleSubmit}
          slot="fixed"
          style={{ color: "white", bottom: 0, right: 0, left: 0 }}
          id="submit"
        >
          Adicionar paciente
        </IonButton>

        <IonToast
          position="top"
          isOpen={showToast}
          icon={toastMessage.includes("sucesso") ? checkmark : alert}
          color={toastMessage.includes("sucesso") ? "success" : "danger"}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          swipeGesture="vertical"
        />
        <IonLoading isOpen={isLoading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};
