# App de Ecommerce de vino (Proyecto final - Curso MOBILE) 

Este proyecto es una app interactiva de Ecommerce que incluye varias funcionalidades como `carrito`, creación de `perfiles` con toma de fotografía -utilizando la cámara del dispositivo-. Utiliza `REDUX TOOLKIT`, `SQLite` para guardar la sesión por más que se reinicie la app o el dispositivo, `Device Features: Cámara` (Como ya dijimos, para las fotos del perfil del usuario), ocupamos `Firebase` tanto para persistencia de los datos (Vinos, precios, carrito, etc) utilizando `Realtime Data Base`, como también para la autenticación para crear una experiencia de usuario dinámica y responsiva.

## Tabla de Contenidos

- [1. Descripción](#descripcion)
- [1.1. Pantalla Categorías](#catego)
- [1.2. Pantalla 'Carrito'](#carro)
- [1.3. Pantalla 'MyProfile'](#profi)
- [Instalación](#instalación)
- [Uso](#uso)
- [REDUX, SQLite y Firebase](#persis)
- [Servicios relacionados a Firebase](#fire)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Contacto](#contacto)


<h2 id="descripcion">1. Descripción</h2>

Una vez logueado, este proyecto consta de tres 'solapas' ('tabs') principales:

<h2 id="catego">1.1. Pantalla Categorías.</h2>

        Aqui, a través de fetchear todos los vinos de la BD de firebase, se identifican las categorias
    de estos y se crea un botón para cada categoría encontrada. Usted podrá seleccionar una cate-
    goria y ahí elegir un vino de su preferencia para agregar al carrito. Como se ve en la siguien-
    te ilustración:
![Pantalla Categorias](./gitHubIllustrations/SolapaA.jpg)


<h2 id="carro">1.2. Pantalla 'Carrito'.</h2>

        Aqui, a través de fetchear todos los 'id' y 'cantidades' de los items que integran el carrito 
    del usuario, se fetchean los vinos por id y la interfaz calcula el precio (Precio x Cantidad).
        Además, la interfaz incluye dos simpáticos botones '+' y '-' que, al presionarlos modifican
    en la BD de firebase la cantidad de ese elemento que hay en el carrito. Luego, más abajo, se puede
    ver el resultado de la compra y el botón de finalizar compra.

![Pantalla 'Carrito'](./gitHubIllustrations/SolapaB.jpg)


<h2 id="profi">1.3. Pantalla 'My Profile'.</h2>

        Esta pantalla fetcheará del usuario, su imagen de perfil, que se encuentra en la BD de firebase
    en un String de formato base64.
        La pantalla cuenta con 'Device Features' (Puntualmente, la cámara y la galeria), donde el 
    usuario podrá cargar la foto de su preferencia para el perfil.    
        Además, la interfaz incluye un simpático icono de 'Pirata' para el caso que no se encuentre en
    la BD, alguna imagen cargada anteriormente por el usuario.
        

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/NicoToledoJAVA/curso-mobile.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd curso-mobile
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```
### NOTE
Cuando clonas un proyecto que utiliza Node.js, es común que las dependencias necesarias para que el 
proyecto funcione no estén incluidas en el repositorio, ya que suelen estar listadas en el archivo
`'package.json'`. Para instalar estas dependencias, se utiliza el comando `'npm install'`. Este 
comando lee el archivo `'package.json'` y descarga todas las dependencias especificadas en la 
sección dependencies, almacenándolas en una carpeta llamada `'node_modules'` dentro del directorio del 
proyecto. 
Por lo tanto, después de clonar un proyecto, ejecutar `'npm install'` es el paso necesario para instalar 
las dependencias requeridas y asegurar que el proyecto funcione correctamente en tu entorno local. 
Este proceso se conoce comúnmente como `"instalar las dependencias del proyecto"`.

## Uso

1. **CATEGORIAS Y SELECCIÓN DEL VINO**: Elige una de las categorias y podrás navegar entre los vinos de
esas categorias y así poder agregarlos al Carrito.
2. **CARRITO**: Una vez elegido el o los vino/s de tu preferencia, podés manipular la cantidad de ese vino
que será incluido en el pedido. NOTA QUE EL PRECIO SUBE al aumentar las cantidades de las unidades incluidas
en el pedido.
3. **PERFIL**: Accederás a esta sección a través de la barra de navegación abajo a la derecha y allí podrás 
seleccionar una foto de la galeria o tomarte una con la Cámara de tu dispositivo.

 
<h2 id="persis">REDUX, SQLite y Firebase</h2>

### REDUX

El proyecto utiliza `REDUX` para almacenar información de estados y funcionalidades de la `navigation`  
entre las diferentes solpas (`'tab'`) del proyecto, además se alamacena en `REDUX` tanto lo que 
obtenemos de `SQLite`, como lo que fetcheamos de `firebase`. Esto permite mantener 
la información del paciente entre las diferentes páginas del proyecto.

### SQLite

Para cumplir con la consigna, gestionamos la sesión de un `usuario` en la app `React Native` utilizando 
la biblioteca `expo-sqlite` para interactuar con una base de datos `SQLite local`. A continuación, 
se detallan las funciones implementadas:

**1. `init`: Inicializa la base de datos y crea la `tabla sessionUser` si no existe:**
   Abre la base de datos llamada `'session.db'`.
   Establece el modo de registro en `WAL (Write-Ahead Logging)` para mejorar el rendimiento en 
   operaciones de escritura.
   Crea la `tabla sessionUser` con las columnas `localId`, `email` e `idToken`.
   

**2. `insertSession`: Inserta una nueva sesión de usuario en la base de datos:**
    Abre la base de datos `session.db`.
    Inserta un nuevo registro en la `tabla sessionUser` con los valores proporcionados
    para `localId`, `email` e `idToken`.


**3. `fetchSession`: Recupera la primera sesión de usuario almacenada en la base de datos:**
    Abre la base de datos `session.db`.
    Obtiene el primer registro de la `tabla sessionUser`.

**4. `deleteSesion`: Elimina todas las sesiones de usuario de la base de datos:**
    Abre la base de datos `session.db`.
    Elimina todos los registros de la `tabla sessionUser`.
    Sirve para desloguearse.

 
<h2 id="fire">Servicios relacionados a Firebase</h2>

<h3>Servicio user (Ruta: <code style="background-color: #fbe928; padding: 2px 4px;">/services/user.js</code>)</h3>

 **`userApi`. Propósito:** Proporciona un conjunto de endpoints para gestionar la 
 información del `usuario` en `Firebase`. Permite actualizar la imagen de perfil, 
 ubicación y carrito de compras de un usuario específico.
 
 **Métodos:**
 `patchImageProfile`: Actualiza la imagen de perfil de un usuario con un `PATCH` a la base de datos.
 `patchLocation`: Actualiza la dirección y ubicación de un usuario con un `PATCH`.
 `patchCart`: Actualiza el carrito de compras de un usuario con un `PATCH`.
 `getUser`: Obtiene los datos del usuario con un GET.
 `getCart`: Obtiene solo el carrito de un usuario con un GET.
 
 **Uso:** Se exportan los hooks generados por `Redux Toolkit` para hacer llamadas 
 a estos endpoints desde componentes de `React Native`.
 `fireBaseUrl`: Es la URL base que conecta con Firebase y se importa desde un archivo de configuración (fetchInfo.js).
 
 
 <h3>Servicio de vinos (Ruta: <code style="background-color: #fbe928; padding: 2px 4px;">/services/shop.js</code>)</h3>

  **`shopApi`. Propósito:** Gestiona la información relacionada con los vinos. 
 Proporciona endpoints para obtener una lista de vinos y para obtener información detallada de un vino por su ID.
 
 **Métodos:**
 `getWines`: Obtiene todos los vinos.
 `getWineById`: Obtiene un vino específico por su ID.
 **Uso:** Se exportan los hooks generados para consumir estos endpoints en los componentes de la aplicación.
 `fireBaseUrl`: Al igual que en el primer archivo, se usa para conectar con la base de datos de Firebase.


 <h3>Servicio de carrito (Ruta: <code style="background-color: #fbe928; padding: 2px 4px;">/services/cart.js</code>)</h3>
 
 **`cartApi`. Propósito:** Gestiona el carrito de compras de los usuarios. Permite obtener el carrito y actualizarlo.
 **Métodos:**
 `getCart`: Obtiene el carrito de un usuario específico.
 `patchCart`: Actualiza el carrito de un usuario con un PUT.
 **Uso:** Los hooks generados se usan para interactuar con la API en los componentes, permitiendo que el carrito 
 de un usuario se actualice o recupere según sea necesario.

  ## Tecnologías

- React Native
- Node.js
- JavaScript
- Redux
- Firebase RealTimeDataBase
- Firebase Authentication
- SQLite


## Estructura del Proyecto

1. **/NAVIGATION**: 
    - Dentro de esta encontrará `/STACKS` por un lado y `SCREENS`, por el otro lados.
    - Tenemos un navigation container personalizado llamado `/navigation/PersonalRouter.js`.

2. **/services**: 
    - Aqui encontrará todo lo relacionado con la persistencia y conexión a Firebase.
    - También se encuentra aquí el sistema de fetcheo de la autenticación.
    
3. **/contexts/deviceDB/dbSqlite.js**: 
    - Aquí encontrará la `conexión`, por así decirlo de la app con la base de datos inter-
    na de `SQLite` .
    
## Calificación:

Si deseas calificar a este proyecto, sigue estos pasos:

1. Abre tu panel de docente en Coder House.
2. Ve a las correciones pendientes.
3. Corrige a Nico TOLEDO con un 10 (DIEZ).
4. ¡Tené un buen día!

## Contacto

Para cualquier consulta o sugerencia, puedes contactar a:

- **Nombre:** Nico TOLEDO
- **Email:** nicotole@gmail.com
- **GitHub:** [NicoToledoJAVA](https://github.com/NicoToledoJAVA)
