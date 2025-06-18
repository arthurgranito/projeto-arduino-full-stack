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
          contato.nome.toLowerCase().includes(busca.toLowerCase())
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
          contato.nome.toLowerCase().includes(busca.toLowerCase())
        )
      );
    } else {
      filtrarContatos(contacts);
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center
      px-10 py-5"
      >
        <form onSubmit={handleBusca}>
          <InputButtonProvider className="w-full">
            <InputButton className="w-full">
              <InputButtonAction className="w-full">Buscar por um contato</InputButtonAction>
              <InputButtonSubmit type="submit">
                <Search />
              </InputButtonSubmit>
            </InputButton>
            <InputButtonInput
              className="w-full"
              type="text"
              placeholder="Buscar"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
              }}
            />
          </InputButtonProvider>
        </form>
      </div>
    </>
  );
}

export default Nav;
