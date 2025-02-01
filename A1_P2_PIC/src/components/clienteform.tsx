interface clientei {
  id: number;
  nombre: string;
  correo: string;
}

interface PropsClienteForm {
  clientes: clientei[];
  setClientes: React.Dispatch<React.SetStateAction<clientei[]>>;
  nombrec: string;
  setNombrec: React.Dispatch<React.SetStateAction<string>>;
  correoc: string;
  setCorreoc: React.Dispatch<React.SetStateAction<string>>;
  act_flag: boolean;
  setAct_flag: React.Dispatch<React.SetStateAction<boolean>>;
  act_id: number;
  setAct_id: React.Dispatch<React.SetStateAction<number>>;
  etiqueta: string;
  setEtiqueta: React.Dispatch<React.SetStateAction<string>>;
}

export const Cliente_form: React.FC<PropsClienteForm> = ({
  clientes,
  setClientes,
  nombrec,
  setNombrec,
  correoc,
  setCorreoc,
  act_flag,
  setAct_flag,
  act_id,
  setAct_id,
  etiqueta,
  setEtiqueta,
}) => {

    
  const validar_clientes = () => {
    //Validación de correo electrónico con expresión regular
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z]+$/;

    return nombrec.trim() && correoc.trim() && regex.test(correoc);
  };

  //Se manejan las actualizaciones con el mismo formulario para agregar clientes
  const AgregarCliente = () => {
    if (validar_clientes() && !act_flag) {
      setClientes([
        ...clientes,
        { id: clientes.length + 1, nombre: nombrec, correo: correoc },
      ]);
      setNombrec("");
      setCorreoc("");
    } else if (validar_clientes() && act_flag && act_id !== 0) {
      setClientes((clientes) =>
        clientes.map((cli) =>
          cli.id === act_id ? { ...cli, nombre: nombrec, correo: correoc } : cli
        )
      );
      setNombrec("");
      setCorreoc("");
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
        <h2>Crear un nuevo cliente</h2>
        <nav>Nombre</nav>
        <input
          type="text"
          value={nombrec}
          placeholder="nombre"
          onChange={(e) => setNombrec(e.target.value)}
        />
        <nav>Correo</nav>
        <input
          type="email"
          value={correoc}
          placeholder="email"
          onChange={(e) => setCorreoc(e.target.value)}
        />
        <button
          className="mybtn btn btn-success border-white border-2"
          onClick={AgregarCliente}
        >
          {etiqueta}
        </button>
      </div>
    </>
  );
};
