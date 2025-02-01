import React from "react";
import { Link } from "react-router-dom";

export const Menu: React.FC = () => {
  return (
    <>
      <nav className="mymenu">
        <Link to={"/"}>Inicio</Link>
        <Link to={"/clientes"}>Clientes</Link>
        <Link to={"/habitaciones"}>Habitaciones</Link>
        <Link to={"/reservas"}>Reservas</Link>
      </nav>
    </>
  );
};
