import { useEffect, useState } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contatosFiltrados, setContatosFiltrados] = useState(contacts);

  const urlApi = "https://backend-arduino-damp-hill-3.fly.dev/contatos";

  const fetchContatos = async () => {
    try {
      const response = await fetch(urlApi);
      if(!response.ok){
        throw new Error("Erro ao buscar contatos");
      }
      const data = await response.json();
      console.log(data);
      setContacts(data);
      setContatosFiltrados(data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  return (
    <>
      <Nav contacts={contacts} filtrarContatos={setContatosFiltrados} />
      <Home />
    </>
  );
}

export default App;
