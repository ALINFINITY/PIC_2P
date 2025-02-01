import { useEffect, useState } from "react";
import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Cliente } from "./components/cliente";
import { Menu } from "./components/menu";
import { Inicio } from "./components/inicio";
import { Habitacion } from "./components/habitacion";
import { Reserva } from "./components/reservas";

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

const App: React.FC = () => {
  const [clientes, setClientes] = useState<clientei[]>([]);
  const [habitaciones, setHabitaciones] = useState<habitacion[]>([]);
  const [reservas, setReservas] = useState<reserva[]>([]);

  //Recuperar del LocalStorange
  useEffect(() => {
    const Storeclientes = localStorage.getItem("clientes");
    const Storehabitaciones = localStorage.getItem("habitaciones");
    const Storereservas = localStorage.getItem("reservas");

    if (Storeclientes) {
      setClientes(JSON.parse(Storeclientes));
    }
    if (Storehabitaciones) {
      setHabitaciones(JSON.parse(Storehabitaciones));
    }
    if (Storereservas) {
      setReservas(JSON.parse(Storereservas));
    }
  }, []);

  //Almacenar en el LocalStorange
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);

  useEffect(() => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }, [reservas]);

  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="clientes"
            element={<Cliente clientes={clientes} setClientes={setClientes} />}
          />
          <Route
            path="habitaciones"
            element={
              <Habitacion
                habitaciones={habitaciones}
                setHabitaciones={setHabitaciones}
              />
            }
          />
          <Route
            path="reservas"
            element={
              <Reserva
                clientes={clientes}
                habitaciones={habitaciones}
                setHabitaciones={setHabitaciones}
                reservas={reservas}
                setReservas={setReservas}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
