
module.exports = (io, socket) => {
   
    const disconnect = () => {
        console.log("disconnected");
    };

    socket.on("disconnect", disconnect);
}