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

const contacts = [
  {
    name: "Arthur Granito",
    phone: "(21) 97631-8326",
    description: "Filho",
  },
  {
    name: "Tiago Fernandes",
    phone: "(21) 99999-9999",
    description: "Amigo",
  },
  {
    name: "Guilherme Matias",
    phone: "(21) 98888-8888",
    description: "Amigo",
  },
  {
    name: "João da Silva",
    phone: "(21) 97777-7777",
    description: "Primo",
  },
];

const Home = () => {
  return (
    <>
      <h1 className="font-semibold text-lg ml-4">
        Meus contatos de emergência
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {contacts.map((contato) => {
          const fallback = contato.name.split(" ");
          return (
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle>{contato.name}</CardTitle>
                  <Avatar>
                    <AvatarFallback>
                      {fallback[0].charAt(0).toUpperCase()}
                      {fallback[1].charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardDescription>{contato.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{contato.phone}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="destructive">
                  Excluir contato
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Home;
