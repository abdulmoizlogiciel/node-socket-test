
(async function () {
    const { access_token } = require("./token.json");
    const symbols = require("./symbols.json");
    const { baseUrl } = require("./config.json");
    const { default: fetch } = await import("node-fetch");


    async function sub(symbol) {
        // const resp = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/sub?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } });
        const resp = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/subscribe?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } });
        if (resp.status === 200 || resp.status == 400) {
            console.log(await resp.text());
        }
        else {
            console.log(resp, symbol);
        }
    }

    async function unSub(symbol) {
        const resp = await fetch(`http://${baseUrl}/int/mkt/api/v1/marketData/L1/unsubscribe?symbol=${symbol}`, { headers: { "Authorization": "Bearer " + access_token } });
        if (resp.status === 200 || resp.status === 400) {
            console.log(await resp.text(), symbol);
        }
        else {
            console.log(resp, symbol);
        }
    }

    async function both(symbol) {
        sub(symbol);
        await waitFor(3000);
        unSub(symbol);
        await waitFor(3000);
        sub(symbol);
    }


    try {
        for (const symbol of symbols) {
            both(symbol);
        }
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