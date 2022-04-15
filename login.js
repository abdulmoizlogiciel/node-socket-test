
(async function () {
    const { default: fetch } = await import("node-fetch");
    const fs = require("fs");
    const { baseUrl } = require("./config.json");

    try {
        const resp = await fetch(`http://${baseUrl}/int/is/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": "devtestuser101@mailinator.com",
                "password": "devtestuser101",
                "captcha": ""
            })

        });

        const result = await resp.json();

        const resp2 = await fetch(`http://${baseUrl}/int/is/api/login/tfa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                codeId: result.codeId,
                tfaCode: "123456",
            })
        });
        const result2 = await resp2.json();

        console.log(result2);

        fs.writeFileSync("./token.json", JSON.stringify(result2, null, 2));

    } catch (error) {
        console.log(error);
    }

})();
