import { useState } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";

const contacts = [
  {
    name: "Arthur Granito",
    phone: "(21) 97631-8326",
    description: "Filho",
  },
  {
    name: "Tiago Fernandes",
    phone: "(21) 99999-9999",
    description: "Amigo",
  },
  {
    name: "Guilherme Matias",
    phone: "(21) 98888-8888",
    description: "Amigo",
  },
  {
    name: "João da Silva",
    phone: "(21) 97777-7777",
    description: "Primo",
  }
];

function App() {
  const [contatosFiltrados, setContatosFiltrados] = useState(contacts);
  return (
    <>
      <Nav contacts={contacts} filtrarContatos={setContatosFiltrados} />
      <Home contacts={contatosFiltrados} />
    </>
  );
}

export default App;
