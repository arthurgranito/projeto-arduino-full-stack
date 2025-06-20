import { useEffect, useState } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contatosFiltrados, setContatosFiltrados] = useState(contacts);

  const urlApi = "https://backend-arduino-damp-hill-3.fly.dev/contatos";

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
      <Home contacts={contatosFiltrados} onDelete={fetchContatos} onCadastro={fetchContatos} onEditar={fetchContatos} />
    </>
  );
}

export default App;
