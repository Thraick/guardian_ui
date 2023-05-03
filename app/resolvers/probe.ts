import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createProbe =  createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("create_probe", ctx)
        return res
    }
})


export const updateProbe =  createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("_update_probe", ctx)
        return res
    }
})





export const deleteProbe =  createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("delete_probe", ctx)
        return res
    }
})

