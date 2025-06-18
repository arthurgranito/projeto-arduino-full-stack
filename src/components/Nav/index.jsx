import { Search } from "lucide-react";
import {
  InputButton,
  InputButtonAction,
  InputButtonInput,
  InputButtonProvider,
  InputButtonSubmit,
} from "../animate-ui/buttons/input";
import { useState } from "react";

function Nav({ contacts, filtrarContatos }) {
  const [busca, setBusca] = useState("");

  const handleBusca = (e) => {
    e.preventDefault();
    if (busca.trim() != "") {
      filtrarContatos(
        contacts.filter((contato) =>
          contato.name.toLowerCase().includes(busca.toLowerCase())
        )
      );
      setBusca("");
    } else {
      filtrarContatos(contacts);
      setBusca("");
    }
  };

  const buscarContato = () => {
    if (busca.trim() != "") {
      filtrarContatos(
        contacts.filter((contato) =>
          contato.name.toLowerCase().includes(busca.toLowerCase())
        )
      );
      setBusca("");
    } else {
      filtrarContatos(contacts);
      setBusca("");
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center
      px-10 py-5"
      >
        <form onSubmit={handleBusca}>
          <InputButtonProvider>
            <InputButton>
              <InputButtonAction>Buscar por um contato</InputButtonAction>
              <InputButtonSubmit type="submit">
                <Search />
              </InputButtonSubmit>
            </InputButton>
            <InputButtonInput
              type="text"
              placeholder="Busque por um contato"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                buscarContato();
              }}
            />
          </InputButtonProvider>
        </form>
      </div>
    </>
  );
}

export default Nav;
