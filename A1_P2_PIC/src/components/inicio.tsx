import { useState } from "react";

const Bienvenida: React.FC<{ nombre: string }> = ({ nombre }) => {
  if (nombre) {
    return (
      <>
        <h3>Bienvenido {nombre}, nuestro Hotel te da una cálida Bienvenida</h3>
      </>
    );
  }
  return <></>;
};

export const Inicio: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");


  return (
    <div className="inicio">
      <h1>Hola bienvenido al Hotel Mi Ecuador</h1>
      <p>¿Cómo te llamas?</p>
      <input
        type="text"
        placeholder="Tu nombre..."
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <Bienvenida nombre={nombre} />
    </div>
  );
};
