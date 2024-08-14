import configConector from "./configConector.js";
// import webRTC from "http://localhost:3050";
// import webRTC from "http://192.168.80.16:3050";
import webRTC from "https://socket.mtedaj.com";
const sendButton = document.getElementById('ButtonEnviar');
const inputRoom = document.getElementById('inputRoom');
const getButton = document.getElementById('getButton');
async function main() {
    inputRoom.value = 'room1';
    const peerConector = new webRTC({
      localRoom: inputRoom.value,
      callbackReady: (e) => { console.log("Connected for socket"); sendButton.addEventListener('click', e)},
      callbackConfig: configConector,
      callbackConfigReady:async (peerClient) => {
        await agregarMediaAlPeerConnection(peerClient, 'audio');
        await agregarMediaAlPeerConnection(peerClient, 'video');
      },
      onClosedClient:liberarStreams,
      leaveAction:false,
    });
    await peerConector.start();
    getButton.addEventListener('click', async () => {console.log('connections ->', connections);});
}
main()
const  streamUser = {};

async function liberarStreams(peerClient, idClient) {
  try {
    const videoClient = document.getElementById(idClient)
    videoClient.srcObject = null;
    videoClient.remove();
    // const senders = peerClient.getSenders();
    // senders.forEach(sender => {
    //   if (sender.track) {
    //     sender.track.stop();
    //   }
    // });
  } catch (error) {
    console.error('Error al liberar los streams:', error);
  }
}

async function agregarMediaAlPeerConnection(peerClient, tipoMedia) {
    try {
      const constraints = tipoMedia === 'audio'  ? {audio: true, video: false} : {audio: false, video: true};
      if (streamUser[tipoMedia] == undefined) {
        streamUser[tipoMedia] = await navigator.mediaDevices.getUserMedia(constraints);
        if (tipoMedia === 'video') {
          if (document.getElementById('MainId') !== null) {document.getElementById('MainId').remove();  }
          const video = document.createElement('video');
          video.autoplay = true;
          video.muted = true;
          video.style.width = '200px';
          video.style.height = '200px';
          video.style.margin = '10px';
          video.id = 'MainId';
          video.style.backgroundColor = 'white';
          video.srcObject = streamUser[tipoMedia];
          document.body.appendChild(video);
        }
      }
      streamUser[tipoMedia].getTracks().forEach(track => {
        peerClient.addTrack(track, streamUser[tipoMedia]);
      });
    } catch (error) {}
  }