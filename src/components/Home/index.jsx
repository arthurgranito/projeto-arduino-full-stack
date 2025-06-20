import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../animate-ui/radix/dialog";
import axios from "axios";
import {
  TabsList,
  TabsTrigger,
  Tabs,
  TabsContents,
  TabsContent,
} from "../animate-ui/radix/tabs";
import Cadastro from "../Cadastro";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Home = () => {
  const urlApi = "https://backend-arduino-damp-hill-3.fly.dev/contatos";

  const [fetchContacts, setFetchContacts] = useState([]);

  const fetchContactsAPI = async () => {
    try {
      const response = await fetch(urlApi);
      if (!response.ok) {
        throw new Error("Erro ao buscar contatos");
      }
      const data = await response.json();
      console.log(data);
      setFetchContacts(data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  useEffect(() => {
    fetchContactsAPI();
  }, []);

  const onDelete = async () => {
    await fetchContactsAPI();
  };

  const onEditar = async () => {
    await fetchContactsAPI();
  };

  // Estados para edição
  const [idEditando, setIdEditando] = useState(null);
  const [nomeAtualizado, setNomeAtualizado] = useState("");
  const [telefoneAtualizado, setTelefoneAtualizado] = useState("");
  const [descricaoAtualizada, setDescricaoAtualizada] = useState("");

  // Abrir o modal de edição e preencher com os dados do contato
  const abrirEditar = (contato) => {
    setIdEditando(contato.id);
    setNomeAtualizado(contato.nome);
    setTelefoneAtualizado(contato.telefone);
    setDescricaoAtualizada(contato.descricao);
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlApi}/${idEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idEditando,
          nome: nomeAtualizado,
          telefone: telefoneAtualizado,
          descricao: descricaoAtualizada,
        }),
      });
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      const dados = await response.json();
      console.log("Atualizado com sucesso:", dados);
      onEditar();
      Toastify({
        text: "Contato atualizado com sucesso!",
        duration: 3000,
        close: false,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "oklch(72.3% 0.219 149.579)",
        },
      }).showToast(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao editar contato:", error);
    } finally {
      // Limpa os estados
      setIdEditando(null);
      setNomeAtualizado("");
      setTelefoneAtualizado("");
      setDescricaoAtualizada("");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${urlApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      console.log("Contato deletado com sucesso");
      onDelete();
      Toastify({
        text: "Contato excluído com sucesso!",
        duration: 3000,
        close: false,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "oklch(63.7% 0.237 25.331)",
        },
      }).showToast();
    } catch (error) {
      console.error("Erro ao excluir contato:", error);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-lg ml-4">
        Meus contatos de emergência
      </h1>

      <Tabs defaultValue="contatos" className="m-4 rounded-lg">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contatos" onClick={fetchContactsAPI}>Contatos</TabsTrigger>
          <TabsTrigger value="cadastro">Cadastrar Contato</TabsTrigger>
        </TabsList>

        <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
          <TabsContent value="contatos" className="space-y-6 p-6">
            {fetchContacts.length === 0 ? (
              <div className="flex justify-center items-center">
                <p className="text-xl font-semibold">
                  Nenhum contato encontrado!
                </p>
              </div>
            ) : (
              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-center items-center">
                {fetchContacts.map((contato) => {
                  const fallback = contato.nome.split(" ");

                  return (
                    <Card key={contato.id} className="w-full">
                      <CardHeader>
                        <div className="flex flex-row items-center justify-between gap-2">
                          <CardTitle>{contato.nome}</CardTitle>
                          <Avatar>
                            <AvatarFallback>
                              {fallback[0].charAt(0).toUpperCase()}
                              {fallback[1]?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <CardDescription>{contato.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{contato.telefone}</p>
                      </CardContent>
                      <CardFooter className="flex gap-4 justify-center items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-[50%]"
                              variant="outline"
                              onClick={() => abrirEditar(contato)}
                            >
                              Editar
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Editar contato</DialogTitle>
                              <DialogDescription>
                                Preencha os campos abaixo para editar o contato.
                              </DialogDescription>
                            </DialogHeader>

                            <form
                              onSubmit={handleEditar}
                              className="flex flex-col gap-2"
                            >
                              <Label>Nome</Label>
                              <Input
                                type="text"
                                placeholder="João da Silva"
                                value={nomeAtualizado}
                                onChange={(e) =>
                                  setNomeAtualizado(e.target.value)
                                }
                              />
                              <Label>Telefone</Label>
                              <Input
                                type="text"
                                placeholder="(21) 99999-9999"
                                value={telefoneAtualizado}
                                onChange={(e) =>
                                  setTelefoneAtualizado(e.target.value)
                                }
                              />
                              <Label>Descrição</Label>
                              <Input
                                type="text"
                                placeholder="Amigo"
                                value={descricaoAtualizada}
                                onChange={(e) =>
                                  setDescricaoAtualizada(e.target.value)
                                }
                              />

                              <DialogFooter className="flex flex-row justify-between gap-2 mt-2">
                                <DialogClose asChild>
                                  <Button variant="outline" className="w-[50%]">
                                    Cancelar
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button type="submit" className="w-[50%]">
                                    Editar
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-[50%]" variant="destructive">
                              Excluir
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Deletar contato</DialogTitle>
                              <DialogDescription>
                                Tem certeza que deseja deletar este contato?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex flex-row gap-4 justify-center items-center">
                              <DialogClose asChild>
                                <Button className="w-[50%]" variant="outline">
                                  Cancelar
                                </Button>
                              </DialogClose>
                              <Button
                                className="w-[50%]"
                                variant="destructive"
                                onClick={() => handleDelete(contato.id)}
                              >
                                Excluir contato
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cadastro" className="space-y-6 p-6">
            <Cadastro />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </>
  );
};

export default Home;
