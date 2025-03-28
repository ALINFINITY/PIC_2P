# Actividad 1 - App Reservas Hoteleras

# Integrantes: 

* Quilumbaquin Pillisa Alan David

* Luis Andres Lopez Mora

# Como clonar el proyecto

1: Ubíquese en la carpeta en donde desea guardar el proyecto

2: Ejecute el siguiente comando de Git para clonar el proyecto

git clone https://github.com/ALINFINITY/PIC_2P.git

3: Abra el proyecto dentro de un IDE de programación como VSCode

4: Ejecute el siguiente comando para instalar las dependencias del proyecto

npm install

5: Ejecute el siguiente comando para desplegar el proyecto

npm run dev

6: Ingrese al proyecto a través de localhost:5173

# Funcionalidades Implementadas

* El proyecto incluye un menu de navegación, para navegar por toda la aplicación, para implementar el menú se utilizo react-router-dom

* El proyecto incluye estilos propios y estilos de bootstrap.

* El componente APP es el eje central de la aplicación en donde se gestiona la creación de los arreglos de clientes, habitaciones y reservas, posteriormente estos elementos son enviados a sus componentes respectivos o componentes que los necesiten, adicionalmente estos arreglos son almacenados y recuperados del localStorange con ayuda de las funciones de JSON.

* Se implementaron rutas de navegación para que cada componente utilice su propia página.

* El componente clienteform utiliza funciones de validación para validar la creación de clientes sin campos vacíos, se utiliza también una expresión regular para validar los correos electrónicos de los clientes creados.

* El componente habitaciónform utiliza una función de validación para que las habitaciones tengan un tipo y precio diferente de vació y mayor a cero respectivamente.

* Los componentes form de habitación y cliente se utilizan tanto para registrar nuevos elementos como para actualizar los elementos existentes, por lo que, se utilizan ids de referencia y banderas de actualización para manejar las actualizaciones.

* Las habitaciones que han sido reservadas no se pueden eliminar hasta que la reserva se elimine o complete, este bloqueo de habitaciones se maneja en reservasform.

* Una habitación reservada por un cliente ya no la puede reservar otro cliente hasta que se desocupe, esta condición se la maneja en reservasform

* Las fechas de reserva de los clientes no pueden solaparse, estar vacías o ingresarse en el orden incorrecto, esto se valida con las funciones correspondientes en reservasform.

* En reservasform se manejan mensajes de error personalizados.

* La aplicación cuenta con una página de inicio.














