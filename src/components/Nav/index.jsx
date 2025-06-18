import { Search } from "lucide-react";
import {
  InputButton,
  InputButtonAction,
  InputButtonInput,
  InputButtonProvider,
  InputButtonSubmit,
} from "../animate-ui/buttons/input";

function Nav() {
  return (
    <>
      <div className="flex flex-col items-center justify-center
      px-10 py-5">
        <InputButtonProvider>
          <InputButton>
            <InputButtonAction>Buscar por um contato</InputButtonAction>
            <InputButtonSubmit>
              <Search />
            </InputButtonSubmit>
          </InputButton>
          <InputButtonInput type="text" placeholder="Busque por um contato" />
        </InputButtonProvider>
      </div>
    </>
  );
}

export default Nav;
