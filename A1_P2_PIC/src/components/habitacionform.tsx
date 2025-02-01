import { Dispatch, SetStateAction } from "react";

interface habitacion {
  id: number;
  tipo_habitacion: string;
  precio_noche: number;
  esta_ocupada: boolean;
}

interface PropsHabitacionForm {
  habitaciones: habitacion[];
  setHabitaciones: Dispatch<SetStateAction<habitacion[]>>;
  tipo_hab: string;
  setTipo_hab: Dispatch<SetStateAction<string>>;
  precio_noch: number;
  setPrecio_noch: Dispatch<SetStateAction<number>>;
  act_flag: boolean;
  setAct_flag: React.Dispatch<React.SetStateAction<boolean>>;
  act_id: number;
  setAct_id: React.Dispatch<React.SetStateAction<number>>;
  etiqueta: string;
  setEtiqueta: React.Dispatch<React.SetStateAction<string>>;
}

export const Habitacion_form: React.FC<PropsHabitacionForm> = ({
  habitaciones,
  setHabitaciones,
  tipo_hab,
  setTipo_hab,
  precio_noch,
  setPrecio_noch,
  act_flag,
  setAct_flag,
  act_id,
  setAct_id,
  etiqueta,
  setEtiqueta,
}) => {
    
  //Función para validar las habitaciones
  const validar_habitaciones = () => tipo_hab !== "" && precio_noch > 0;

  //Se manejan las actualizaciones con el mismo formulario para agregar habitaciones
  const AgregarH = () => {
    if (validar_habitaciones() && !act_flag) {
      setHabitaciones([
        ...habitaciones,
        {
          id: habitaciones.length + 1,
          tipo_habitacion: tipo_hab,
          precio_noche: precio_noch,
          esta_ocupada: false,
        },
      ]);
      setTipo_hab("");
      setPrecio_noch(0);
    } else if (validar_habitaciones() && act_flag && act_id !== 0) {
      setHabitaciones((habitaciones) =>
        habitaciones.map((hab) =>
          hab.id === act_id
            ? { ...hab, tipo_habitacion: tipo_hab, precio_noche: precio_noch }
            : hab
        )
      );

      setTipo_hab("");
      setPrecio_noch(0);
      setAct_id(0);
      setAct_flag(false);
      setEtiqueta("Agregar");
      alert("Datos actualizados correctamente");
    } else {
      alert("Ingresa valores válidos");
    }
  };

  return (
    <>
      <div className="myform">
        <h2>Crear una nueva habitación</h2>
        <nav>Tipo de habitación</nav>
        <select value={tipo_hab} onChange={(e) => setTipo_hab(e.target.value)}>
          <option value={""}>--Tipo habitación--</option>
          <option value={"Individual"}>Individual</option>
          <option value={"Doble"}>Doble</option>
          <option value={"Suite 1"}>Suite 1</option>
          <option value={"Suite 2"}>Suite 2</option>
          <option value={"Presidencial 1"}>Presidencial 1</option>
          <option value={"Presidencial 2"}>Presidencial 2</option>
        </select>
        <nav>Precio por noche</nav>
        <input
          type="number"
          min={0}
          value={precio_noch}
          onChange={(e) => setPrecio_noch(parseFloat(e.target.value))}
        />
        <button
          className="mybtn btn btn-success border-white border-2"
          onClick={AgregarH}
        >
          {etiqueta}
        </button>
      </div>
    </>
  );
};
