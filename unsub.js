
(async function () {
    const { access_token } = require("./token.json");
    const symbols = require("./symbols.json");
    const { baseUrl } = require("./config.json");
    const { default: fetch } = await import("node-fetch");


    try {
        // for (const symbol of symbols) {
        //     const resp = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/unsubscribe?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } });
        //     console.log(resp);
        // }

        symbols.forEach(async symbol => {
            const a = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/unsubscribe?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } });
            if (a.status === 200 || a.status === 400) {
                console.log(await a.text(), symbol);
            }
            else {
                console.log(a, symbol);
            }

        });
    }
    catch (e) {
        console.log(e);
    }


})();
