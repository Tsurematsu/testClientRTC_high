const exampleConfig = (peerClient)=>{
    const chat = peerClient.createDataChannel('chat');
    chat.addEventListener('open', async () => {
        console.log('chat abierto');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        chat.send("Hola k tal esta es una prueba");
    });
    
    peerClient.addEventListener('datachannel', (event) => {
        event.channel.addEventListener('message', (input) => {
            console.log('Mensaje recibido:', input.data);
        })
    });
}
export default exampleConfig;