import { Dispatch, SetStateAction } from "react";
import { Reserva_form } from "./reservasform";

interface clientei {
  id: number;
  nombre: string;
  correo: string;
}

interface habitacion {
  id: number;
  tipo_habitacion: string;
  precio_noche: number;
  esta_ocupada: boolean;
}

interface reserva {
  id: number;
  descripcion: string;
  id_cliente: number;
  id_habitacion: number;
  fecha: { inicio: string; fin: string };
}

interface PropsReserva {
  clientes: clientei[];
  habitaciones: habitacion[];
  reservas: reserva[];
  setHabitaciones: Dispatch<SetStateAction<habitacion[]>>;
  setReservas: Dispatch<SetStateAction<reserva[]>>;
}

export const Reserva: React.FC<PropsReserva> = ({
  clientes,
  habitaciones,
  setHabitaciones,
  reservas,
  setReservas,
}) => {
  
  const Eliminar = (id: number, id_habitacion: number) => {
    setHabitaciones((habitaciones) =>
      habitaciones.map((hab) =>
        hab.id === id_habitacion ? { ...hab, esta_ocupada: false } : hab
      )
    );
    setReservas(reservas.filter((res) => res.id !== id));
  };

  return (
    <>
      <h1>Reservas</h1>
      <Reserva_form
        clientes={clientes}
        habitaciones={habitaciones}
        setHabitaciones={setHabitaciones}
        reservas={reservas}
        setReservas={setReservas}
      />
      <h2>Reservas</h2>
      <p>Número de reservas: {reservas.length}</p>
      <div>
        <table className="mytabla">
          <thead>
            <tr className="bg-primary">
              <th>id</th>
              <th>cliente</th>
              <th>habitación</th>
              <th>descripción</th>
              <th>fecha inicio</th>
              <th>fecha fin</th>
              <th>acción</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>
                  {clientes.find((cli) => cli.id === res.id_cliente)?.nombre}
                </td>
                <td>
                  ID: {res.id_habitacion}{" "}
                  {
                    habitaciones.find((hab) => hab.id === res.id_habitacion)
                      ?.tipo_habitacion
                  }{" "}
                </td>
                <td>{res.descripcion}</td>
                <td>{res.fecha.inicio}</td>
                <td>{res.fecha.fin}</td>
                <td>
                  <button
                    className="mybtn btn btn-danger border-white border-2"
                    onClick={() => Eliminar(res.id, res.id_habitacion)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
