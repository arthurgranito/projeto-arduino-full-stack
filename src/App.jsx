import { useEffect, useState } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contatosFiltrados, setContatosFiltrados] = useState(contacts);

  const urlApi = "http://localhost:8080/contatos";

  const fetchContatos = async () => {
    const response = await axios.get(urlApi);
    setContacts(response.data);
    console.log(response.data);
    setContatosFiltrados(response.data);
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  return (
    <>
      <Nav contacts={contacts} filtrarContatos={setContatosFiltrados} />
      <Home contacts={contatosFiltrados} onDelete={fetchContatos()} />
    </>
  );
}

export default App;
