import React, { useState } from "react";
import { Cliente_form } from "./clienteform";

interface clientei {
  id: number;
  nombre: string;
  correo: string;
}

interface PropsCliente {
  clientes: clientei[];
  setClientes: React.Dispatch<React.SetStateAction<clientei[]>>;
}

export const Cliente: React.FC<PropsCliente> = ({ clientes, setClientes }) => {
  const [nombrec, setNombrec] = useState<string>("");
  const [correoc, setCorreoc] = useState<string>("");
  const [act_flag, setAct_flag] = useState<boolean>(false);
  const [act_id, setAct_id] = useState<number>(0);
  const [etiqueta, setEtiqueta] = useState<string>("Agregar");


  //Eliminar cliente
  const Eliminar = (id: number) => {
    if (!act_flag) {
      setClientes(clientes.filter((cli) => cli.id !== id));
    } else {
      alert("Un cliente se esta actualizando, finaliza la operación primero");
    }
  };

  //Actualizar cliente
  const Actualizar = (id: number) => {
    const datoscli = clientes.find((cli) => cli.id === id);
    if (datoscli) {
      setAct_flag(true);
      setAct_id(id);
      setNombrec(datoscli.nombre);
      setCorreoc(datoscli.correo);
      setEtiqueta("Actualizar");
    }
  };

  return (
    <>
      <h1>Clientes</h1>
      <Cliente_form
        clientes={clientes}
        setClientes={setClientes}
        nombrec={nombrec}
        setNombrec={setNombrec}
        correoc={correoc}
        setCorreoc={setCorreoc}
        act_flag={act_flag}
        setAct_flag={setAct_flag}
        act_id={act_id}
        setAct_id={setAct_id}
        etiqueta={etiqueta}
        setEtiqueta={setEtiqueta}
      />
      <h2>Lista de clientes</h2>
      <p>Número de clientes: {clientes.length}</p>
      <table className="mytabla">
        <thead>
          <tr className="bg-primary">
            <th>id</th>
            <th>nombre</th>
            <th>correo</th>
            <th>acción</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cli) => (
            <tr key={cli.id}>
              <td>{cli.id}</td>
              <td>{cli.nombre}</td>
              <td>{cli.correo}</td>
              <td>
                <button
                  className="mybtn btn btn-danger border-white border-2"
                  onClick={() => Eliminar(cli.id)}
                >
                  Eliminar
                </button>
                <button
                  className="mybtn btn btn-success border-white border-2"
                  onClick={() => Actualizar(cli.id)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
