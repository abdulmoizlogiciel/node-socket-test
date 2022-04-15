
(async function () {
    const { baseUrl } = require("./config.json");
    const { access_token } = require("./token.json");
    const { default: fetch } = await import("node-fetch");

    try {
        const resp = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/parallel`, { headers: { "Authorization": "Bearer " + access_token } });
        console.log(await resp.text());
    }
    catch (e) {
        console.log(e);
    }


})();
