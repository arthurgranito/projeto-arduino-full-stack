import { useState } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contatosFiltrados, setContatosFiltrados] = useState(contacts);

  const urlApi = "http://localhost:8080/contatos";

  useEffect(() => {
    const fetchContatos = async () => {
      const response = await axios.get(urlApi);
      setContacts(response.data);
    }

    fetchContatos();
  }, []);

  return (
    <>
      <Nav contacts={contacts} filtrarContatos={setContatosFiltrados} />
      <Home contacts={contatosFiltrados} />
    </>
  );
}

export default App;
