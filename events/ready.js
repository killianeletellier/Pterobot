const { default: axios } = require("axios");
const closeConnections = require("../functions/closeConnections");

module.exports = client => {
    /*axios.post("https://panel.fixynhosting.com/api/client/servers/690d2973/power", {
        "signal": "kill"
    }, {
        headers: {
            Authorization: "Bearer LhoHOe16PUmYiTJECJdCdMVDwIa3R4Bn7aacfxYqrt6i7zYc"
        }
    })*/

    setInterval(() => {
        closeConnections(client)
    }, 1000);
}