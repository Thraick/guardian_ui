import axios from "axios";
import { useState } from "react";

const _config = {
    token: '047fba162d654c134434b24ae4e96e9f8437f1bb3351bf32f084b2edeea0501f',
    url: 'http://0.0.0.0:8000',
    snt: "urn:uuid:0907afb5-fa1d-439a-b43a-0b81ce838b74"
}


export async function httpRequest(name: string, ctx: Record<string, any>) {
    let apiUrl = _config.url + "/js/walker_run";
    try {
        let res = await axios.post(apiUrl, {
            name: name,
            ctx: ctx
        },
        {headers: {Authorization: "Token " + _config.token}}
        );
        if (!res.data) {
            console.log('error throw')
            throw new Error('Payload is null');
        }
        return res.data;
    } catch (error) {
        return error;
    }
}
