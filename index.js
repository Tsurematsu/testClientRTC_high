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
    });
    await peerConector.start();
    getButton.addEventListener('click', async () => {console.log('connections ->', connections);});
}
main()

async function agregarMediaAlPeerConnection(peerClient, tipoMedia) {
    try {
      const constraints = tipoMedia === 'audio'  ? {audio: true, video: false} : {audio: false, video: true};
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach(track => {
        peerClient.addTrack(track, stream);
      });
    } catch (error) {}
  }