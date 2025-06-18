import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

const Cadastro = ({ onCadastro }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [relacao, setRelacao] = useState("");

  const urlApi = "http://localhost:8080/contatos";

  const handleCadastro = (e) => {
    e.preventDefault();
    const contato = { nome, telefone, descricao: relacao };
    axios.post(urlApi, contato);
    setNome("");
    setTelefone("");
    setRelacao("");
    onCadastro();
  };

  return (
    <>
      <form onSubmit={handleCadastro} className="flex flex-col gap-2">
        <Label>Nome:</Label>
        <Input
          type="text"
          name="nome"
          placeholder="João da Silva"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Label>Telefone:</Label>
        <Input
          type="tel"
          name="telefone"
          placeholder="(21) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Label>Descrição:</Label>
        <Input
          type="text"
          name="relacao"
          placeholder="Amigo"
          value={relacao}
          onChange={(e) => setRelacao(e.target.value)}
        />
        <Button type="submit" className="mt-2">
          Cadastrar
        </Button>
      </form>
    </>
  );
};

export default Cadastro;
