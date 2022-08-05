import { useState, useEffect, MouseEvent } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

import { Person, ResponsePersonData } from "./@types/person";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState<Person>({} as Person);
  const [title, setTitle] = useState<string>("name");
  const [value, setValue] = useState<string | number>("random person");

  async function getPerson() {
    setLoading(true);

    const response = await fetch(url);
    const data: ResponsePersonData = await response.json();
    const person = data.results[0];

    const { phone, email } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };

    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  }

  useEffect(() => {
    getPerson();
  }, []);

  function handleValue(e: MouseEvent) {
    const { classList, dataset } = e.target as HTMLButtonElement;

    if (classList.contains("icon")) {
      const newValue = dataset.label as keyof Person;

      setTitle(newValue);
      setValue(person[newValue]);
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />

          <p className="user-title">my {title}</p>
          <p className="user-value">{value}</p>

          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>

          <button type="button" className="btn" onClick={getPerson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
