import React from "react";
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
} from "../animate-ui/radix/dialog";
import axios from "axios";

const Home = ({ contacts, onDelete }) => {
  const urlApi = "http://localhost:8080/contatos";

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`${urlApi}/${id}`);
    onDelete();
  };
  return (
    <>
      <h1 className="font-semibold text-lg ml-4">
        Meus contatos de emergência
      </h1>
      {contacts.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-semibold">Nenhum contato encontrado!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {contacts.map((contato) => {
            const fallback = contato.nome.split(" ");
            return (
              <Card key={contato.id}>
                <CardHeader>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <CardTitle>{contato.nome}</CardTitle>
                    <Avatar>
                      <AvatarFallback>
                        {fallback[0].charAt(0).toUpperCase()}
                        {fallback[1].charAt(0).toUpperCase()}
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
                      <Button className="w-[50%]" variant="outline">
                        Editar Contato
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                        <DialogDescription>
                          Please read the following terms of service carefully.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quia autem minima iusto sed quas omnis, itaque
                          earum, accusantium architecto, aliquam eum quisquam
                          vel! Quod libero eius voluptatum, placeat quam
                          molestias.
                        </p>
                      </div>

                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button type="submit">Accept</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="w-[50%]"
                    variant="destructive"
                    onClick={() => handleDelete(contato.id)}
                  >
                    Excluir contato
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
