let PublicMyID=null;
const connections = {};
const exampleConfig = (peerClient, idClient, ready, myId="")=>{ 
    PublicMyID = PublicMyID||myId;
    connections[idClient] = connections[idClient] || {};
    connections[idClient].peerClient = peerClient;
    const chat = peerClient.createDataChannel('chat');
    peerClient.addEventListener('datachannel', (event) => {
        event.channel.addEventListener('message', (input) => {
            const Input = JSON.parse(input.data);
            connections[idClient].event = (callback)=>{ callback(Input.message);};
        })
    });
    chat.addEventListener('open', async () => {
        connections[idClient].send = (message)=>{ 
            chat.send(JSON.stringify({
                type: 'chat',
                idClient: myId,
                message: message
            }));
        };
        ready(idClient);    
    });
}
connections.send = (message)=>{
    for (const key in connections) {if (key !== 'send') {
        connections[key].send(JSON.stringify({
            type: 'chat',
            idClient: PublicMyID,
            message: message
        }));}
    }
};
export default exampleConfig;
export {connections};
// chat.send("Hola k tal esta es una prueba");


// peerClient.addEventListener('iceconnectionstatechange', () => {
//   if (peerClient.iceConnectionState === 'disconnected') {
//       console.log('-------> El cliente se ha desconectado.');
//   } else if (peerClient.iceConnectionState === 'failed') {
//       console.log('-------> La conexión ha fallado.');
//   } else if (peerClient.iceConnectionState === 'closed') {
//       console.log('-------> La conexión se ha cerrado.');
//   }
// });