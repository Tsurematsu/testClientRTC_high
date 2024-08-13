const groupVideo = document.getElementById('group-video');
const connections = {};
let counterPing = 0;
let statusPing = false
export default async function configConector(peerClient, idClient, ready, myId, reSync){
  try {
    peerClient.addTransceiver('audio');
    peerClient.addTransceiver('video');
    const chat = peerClient.createDataChannel('chat');
    peerClient.ontrack = (event) => { addTrackToVideo(idClient, event.track); };
    
    peerClient.addEventListener('iceconnectionstatechange', () => {
        if (peerClient.iceConnectionState === 'disconnected') {
            console.log('[Función de peer] -------> El cliente se ha desconectado.');
        }
    });

    peerClient.addEventListener('datachannel', (event) => {
        event.channel.addEventListener('message', (input) => {
          console.log('-------> Mensaje recibido:', input.data);
        })
    });

    chat.onopen = async ()=>{
      if (connections[idClient]==undefined){ 
        connections[idClient] = {};
        connections[idClient].chat = chat;
        connections[idClient].send = (message)=>{  
          chat.send(JSON.stringify({ type: 'chat', idClient: myId, message: message }));
        };
        groupVideo.appendChild(initializeVideoElement(idClient));
        await ready(peerClient);
        reSync();
      }
    };
    
  } catch (error) {}

  connections.send = (message)=>{
    for (const key in connections) {if (key !== 'send') {
        connections[key].send(JSON.stringify({
            type: 'chat',
            idClient: PublicMyID,
            message: message
        }));}
    }
};
}

function addTrackToVideo(idClient, track) {
  const video = document.getElementById(idClient);
  if (video && video.srcObject) {
    video.srcObject.addTrack(track); // Añadir el track al MediaStream
  }  
}

function initializeVideoElement(idClient) {
  const video = document.createElement('video');
  video.autoplay = true;
  video.style.width = '200px';
  video.style.height = '200px';
  video.style.margin = '10px';
  video.id = idClient;
  video.style.backgroundColor = 'white';
  video.srcObject = new MediaStream(); // Asignar un MediaStream vacío
  return video;
}






















            // document.getElementById(idClient).remove();
            // delete connections[idClient];
            // peerClient.close();



                 // const message = JSON.parse(input.data);
          // if (message.event === 'ping' && message.type === 'send') {
          //   try {chat.send(JSON.stringify({ event:'ping', type:'response'}));} catch (error) {}
          //   return;         
          // }
          // if (message.event === 'ping' && message.type === 'response') {
          //   statusPing = false;
          //   counterPing = 0;
          //   return;
          // }
        
        // setTimeout(() => {
        //   console.log('------> Enviando mensaje');
        //   chat.send("Hola, random number: " + Math.random());
        // }, 8000);
        
        // const timer = setInterval(() => {
        //   if (statusPing==false) {
        //     statusPing = true;
        //     counterPing = 0;
        //     try {chat.send(JSON.stringify({ event:'ping', idClient: myId, type:'send'}));} catch (error) {}
        //   }else{
        //     counterPing++;
        //     if (counterPing > 1) {
        //       console.log('[Función personalizada] -------> El cliente se ha desconectado.');
        //       clearInterval(timer);
        //       // document.getElementById(idClient).remove();
        //       // delete connections[idClient];
        //       // peerClient.close();
        //     }
        //   }
        // }, 500);
