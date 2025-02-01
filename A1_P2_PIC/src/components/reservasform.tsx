import { Dispatch, SetStateAction, useState } from "react";

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

interface PropsReservaForm {
  clientes: clientei[];
  habitaciones: habitacion[];
  setHabitaciones: Dispatch<SetStateAction<habitacion[]>>;
  reservas: reserva[];
  setReservas: Dispatch<SetStateAction<reserva[]>>;
}

export const Reserva_form: React.FC<PropsReservaForm> = ({
  clientes,
  habitaciones,
  setHabitaciones,
  reservas,
  setReservas,
}) => {
  const [descripcion, setDescripcion] = useState<string>("");
  const [id_cli, setId_cli] = useState<number>(0);
  const [id_hab, setId_hab] = useState<number>(0);
  const [fecha_inicio, setFinicio] = useState<string>("");
  const [fecha_fin, setFfin] = useState<string>("");

  let mensaje_error: string = "";

  const ValidarFechas = () => {
    const f_inicio = new Date(fecha_inicio);
    const f_fin = new Date(fecha_fin);
    if (f_inicio >= f_fin) {
      mensaje_error =
        "La fecha de finalización debe ser mayor a la fecha de inicio de la reserva";
      return false;
    } else if (fecha_inicio.trim() && fecha_fin.trim()) {
      return true;
    } else {
      mensaje_error = "Error en las fechas";
      return false;
    }
  };

  const Impedir_solapamiento = () => {
    let inf_inicio = new Date(fecha_inicio);
    let inf_fin = new Date(fecha_fin);

    for (let res of reservas) {
      if (res.id_cliente === id_cli) {
        let res_fi = new Date(res.fecha.inicio);
        let res_ff = new Date(res.fecha.fin);
        if (
          (inf_inicio >= res_fi && inf_inicio <= res_ff) ||
          (inf_fin >= res_fi && inf_fin <= res_ff) ||
          (inf_inicio <= res_fi && inf_fin >= res_ff)
        ) {
          mensaje_error =
            "Ya existe una reserva para este cliente en ese rango de fechas, las fechas no se pueden solapar";
          return false;
        }
      }
    }

    return true;
  };

  const AgregarR = () => {
    if (id_cli > 0 && id_hab > 0 && ValidarFechas() && Impedir_solapamiento()) {
      //Bloqueo de habitación para que no se pueda borrar
      setHabitaciones((habitaciones) =>
        habitaciones.map((hab) =>
          hab.id === id_hab ? { ...hab, esta_ocupada: true } : hab
        )
      );

      setReservas([
        ...reservas,
        {
          id: reservas.length + 1,
          descripcion: descripcion || "N/A",
          id_cliente: id_cli,
          id_habitacion: id_hab,
          fecha: { inicio: fecha_inicio, fin: fecha_fin },
        },
      ]);

      setId_cli(0);
      setId_hab(0);
      setDescripcion("");
      setFinicio("");
      setFfin("");
    } else {
      alert(mensaje_error.trim() ? mensaje_error : "Ingresa datos válidos");
    }
  };

  return (
    <div className="myform">
      <h2>Crear nueva reserva</h2>
      <span>Seleccione el cliente</span>
      <select
        value={id_cli}
        onChange={(e) => setId_cli(parseInt(e.target.value))}
      >
        <option key={0} value={0}>
          -- Cliente --
        </option>
        {clientes.map((cli) => (
          <option key={cli.id} value={cli.id}>
            {cli.nombre}
          </option>
        ))}
      </select>
      <span>Seleccione la habitación</span>
      <select
        value={id_hab}
        onChange={(e) => setId_hab(parseInt(e.target.value))}
      >
        <option key={0} value={0}>
          -- Habitación --
        </option>
        {habitaciones
          .filter((hab) => !hab.esta_ocupada)
          .map((hab) => (
            <option value={hab.id} key={hab.id}>
              {hab.tipo_habitacion} {hab.precio_noche}$
            </option>
          ))}
      </select>
      <span>Descripción de la reserva</span>
      <input
        type="text"
        placeholder="Opcional"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <span>Fecha de inicio</span>
      <input
        type="date"
        value={fecha_inicio}
        onChange={(e) => setFinicio(e.target.value)}
      />
      <span>Fecha de fin</span>
      <input
        type="date"
        value={fecha_fin}
        onChange={(e) => setFfin(e.target.value)}
      />
      <button
        className="mybtn btn btn-success border-white border-2"
        onClick={AgregarR}
      >
        Crear reserva
      </button>
    </div>
  );
};
