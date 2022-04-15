
(async function () {
    const { access_token } = require("./token.json");
    const { baseUrl } = require("./config.json");
    const symbols = require("./symbols.json");
    const { default: fetch } = await import("node-fetch");

    async function subs(symbol) {
        const resp = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/subscribe?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } });

        if (resp.status == 400) {
            console.log(await resp.text());
        }
        else if (resp.status === 200) {
            console.log(symbol, "subscribed");
        }
        else {
            console.log(resp);
        }
    }


    try {
        for (const symbol of symbols) {
            subs(symbol);
            // await waitFor(1500);
        }

        // symbols.forEach(async symbol => {
        //     fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/subscribe?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } }).then(console.log);
        // });
    }
    catch (e) {
        console.log(e);
    }


})();



function waitFor(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}