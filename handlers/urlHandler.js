const axios = require('axios');

module.exports = (io, socket) => {

    const URL_STATE = "";
    const operationId = "";
    const resolvedData = {};

    const receiveUrl = (payload) => {
        let response = await uploadToAzure(payload);
        await updateUrlState(response);

        let resolvedImage = await resolveImage();
        await processData(resolvedImage);
        sendBackData();
    };

    const uploadToAzure = (payload) => {

        try {

            let url = payload.url;
            let requestBody = {
                url: url
            };

            return axios.post(`${process.env.AZURE_URL}/api/urls`, requestBody)
                .then((response) => {
                    return response.data;
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (err) {
            console.log(err);
            return err;
        }

    }

    const updateUrlState = (payload) => {
        URL_STATE = payload.state;
        operationId = payload.operationId;
    }

    const resolveImage = () => {

        try {
            let operationId = payload.operationId;
            return axios.get(`${process.env.AZURE_URL}/api/urls/${operationId}`)
                .then((response) => {
                    return response.data;
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
            return error;
        }

    }

    const processData = (payload) => {
        this.resolvedData = payload;
        //Add result to database and cache
        //=> operationId, path, generalResult specificResult 
        return;
    }

    const sendBackData = () => {
        console.log(resolvedData); //io.emit("receiveUrl", payload);
    }

    const resolveUrl = (payload) => {
        //resolve 
        //look up result in database
    }

    socket.on("url:receive", receiveUrl);
    socket.on("url:resolve", resolveUrl);
}