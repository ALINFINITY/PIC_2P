import React, { Dispatch, SetStateAction, useState } from "react";
import { Habitacion_form } from "./habitacionform";

interface habitacion {
  id: number;
  tipo_habitacion: string;
  precio_noche: number;
  esta_ocupada: boolean;
}

interface PropsHabitacion {
  habitaciones: habitacion[];
  setHabitaciones: Dispatch<SetStateAction<habitacion[]>>;
}

export const Habitacion: React.FC<PropsHabitacion> = ({
  habitaciones,
  setHabitaciones,
}) => {
  const [tipo_hab, setTipo_hab] = useState<string>("");
  const [precio_noch, setPrecio_noch] = useState<number>(0);
  const [act_flag, setAct_flag] = useState<boolean>(false);
  const [act_id, setAct_id] = useState<number>(0);
  const [etiqueta, setEtiqueta] = useState<string>("Agregar");

  const Eliminar = (id: number) => {
    const habitacion = habitaciones.find((hab) => hab.id === id);
    if (act_flag) {
      alert(
        "Una habitación se esta actualizando, finaliza esa operación primero"
      );
    } else if (habitacion?.esta_ocupada) {
      alert("No se puede eliminar una habitación ocupada");
    } else {
      setHabitaciones(habitaciones.filter((hab) => hab.id !== id));
    }
  };

  const Actualizar = (id: number) => {
    const datoshab = habitaciones.find((hab) => hab.id === id);
    if (datoshab) {
      setTipo_hab(datoshab.tipo_habitacion);
      setPrecio_noch(datoshab.precio_noche);
      setAct_flag(true);
      setAct_id(id);
      setEtiqueta("Actualizar");
    }
  };

  return (
    <>
      <h1>Habitaciones</h1>
      <Habitacion_form
        habitaciones={habitaciones}
        setHabitaciones={setHabitaciones}
        tipo_hab={tipo_hab}
        setTipo_hab={setTipo_hab}
        precio_noch={precio_noch}
        setPrecio_noch={setPrecio_noch}
        act_flag={act_flag}
        setAct_flag={setAct_flag}
        act_id={act_id}
        setAct_id={setAct_id}
        etiqueta={etiqueta}
        setEtiqueta={setEtiqueta}
      />
      <h2>Lista habitaciones</h2>
      <p>Número de habitaciones: {habitaciones.length}</p>
      <table className="mytabla">
        <thead>
          <tr className="bg-primary">
            <th>id</th>
            <th>tipo</th>
            <th>precio por noche</th>
            <th>acción</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((hab) => (
            <tr key={hab.id}>
              <td>{hab.id}</td>
              <td>{hab.tipo_habitacion}</td>
              <td>{hab.precio_noche} $</td>
              <td>
                <button
                  className="mybtn btn btn-danger border-white border-2"
                  onClick={() => Eliminar(hab.id)}
                >
                  Eliminar
                </button>
                <button
                  className="mybtn btn btn-success border-white border-2"
                  onClick={() => Actualizar(hab.id)}
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
