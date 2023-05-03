import axios from "axios";
import { useState } from "react";

const _config = {
    token: '6858a94d17349ed8ca2009e8835d2d3cb41e7bc1625c59e76946f5d587a20cea',
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
<<<<<<< HEAD
=======
        if (!res.data) {
            console.log('error throw')
            throw new Error('Payload is null');
        }
>>>>>>> a84ba05 (undo copy update)
        return res.data;
    } catch (error) {
        return error;
    }
}
