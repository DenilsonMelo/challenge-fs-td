"use client";

import { db } from "@/services/firebase";
import {
  collection,
  addDoc,
  query,
  getDocs
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { mask } from "../helpers";

interface UserType {
  name: string,
  phone: string,
  city: string
}

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, "usuarios"));
        const querySnapshot = await getDocs(q);

        let data: any = Array();
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          setUser(data);
        });
      } catch (err) {
        throw new Error("error!");
      }
    }

    fetchData();
  }, [user]);

  async function record(event: FormEvent) {
    event.preventDefault();

    await addDoc(collection(db, "usuarios"), {
      name,
      phone,
      city,
    });

    setName("");
    setPhone("");
    setCity("");
  }

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <form className="w-96 mr-4 text-center mr-9" onSubmit={record}>
          <h1 className="text-2xl mb-4">Talentus Digital Contatos</h1>
          <input
            type="text"
            placeholder="Nome"
            className="w-full my-2 p-4 border rounded-md border-solid border-black"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          ></input>
          <input
            type="text"
            placeholder="Telefone"
            className="w-full my-2 p-4 border rounded-md border-solid border-black"
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
          ></input>
          <input
            type="text"
            placeholder="Cidade"
            className="w-full my-2 p-4 border rounded-md border-solid border-black"
            onChange={(event) => setCity(event.target.value)}
            value={city}
          ></input>
          <button
            type="submit"
            className="p-3 w-2/5 bg-sky-600 hover:bg-sky-700 rounded-md cursor-pointer"
          >
            Salvar Contato
          </button>
        </form>
        <div className="w-96 p-4 text-center rounded-md max-h-2/3 bg-sky-200">
          {user.map((item: UserType, index) => {
            return (
              <div
                key={index}
                className="bg-sky-300 rounded-md text-left max-h-52 box-content mb-2 p-2"
              >
                <p className="text-xl pl-2">{item.name}</p>
                <p className="pl-2">{mask(item.phone)}</p>
                <p className="pl-2">{item.city}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
