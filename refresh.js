
(async function () {
    const { default: fetch } = await import("node-fetch");
    const fs = require("fs");
    const { refresh_token, access_token } = require("./token.json");
    const { baseUrl } = require("./config.json");


    try {
        const resp = await fetch(`http://${baseUrl}/int/is/api/login/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token
            },
            body: JSON.stringify({
                "refreshToken": refresh_token
            })
        });

        const result = await resp.json();

        console.log(result);


        fs.writeFileSync("./token.json", JSON.stringify(result, null, 2));

    } catch (error) {
        console.log(error);
    }

})();