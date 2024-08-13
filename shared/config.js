export default {
    // Configuración de la conexión peer to peer
    url: null, // url del servidor de señalización
    localRoom: null, // sala de chat
    userName: 'user', // nombre de usuario
    iseServers: null, // servidores de resolución de ip para ice
    callbackConfig:null, // configuración de la conexión peer to peer
    //--- Events ---
    callbackReady:null, // cuando el socket esta listo
    callbackConnected:null, //(id, alias) cuando el usuario entra a la sala
    callbackJoined:null, // cuando un usuario se une a la sala
    callbackConfigReady:null, // cuando la configuración de la conexión peer to peer esta lista
    messageLib:false, // Mensajes de la librería
};