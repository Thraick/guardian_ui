import { useState } from "react";

const _config = {
    token: 'ef43fa17f8c71f84b709a3125b710cf12beb8ee8d7812507d40fa231bfc48b85',
    url: 'http://0.0.0.0:8001',
    snt: "urn:uuid:84108875-3d79-41e6-ad21-758c389ece0e"
}


export async function httpRequest(name: string, ctx: Record<string,any>) {
    let apiUrl = _config.url + "/js/walker_run";
    let res = await fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${_config.token}`
        },
        method: "POST",
        body: JSON.stringify({
            name: name,
            ctx: ctx
        }),
    });

    let data = await res.json();
    return data;
}
