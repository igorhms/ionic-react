export interface Patient {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

interface Geolocation {
  lat: string;
  long: string;
}

interface Name {
  firstname: string;
  lastname: string;
}
