export type RandomUserAPI = {
  phone: string;
  email: string;
  picture: { large: string };
  login: { password: string };
  name: { first: string; last: string };
  dob: { age: number };
  location: { street: { number: number; name: string } };
};

export type ResponsePersonData = {
  results: RandomUserAPI[];
};

export type Person = {
  image: string;
  phone: string;
  email: string;
  password: string;
  age: number;
  street: string;
  name: string;
};
