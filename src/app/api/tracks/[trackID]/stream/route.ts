
import { mainApi } from "@/axios/mainApi";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    try {
        const { trackID } = await params
        const range = req.headers.get("range") || "bytes=0-";
        const res = await mainApi.get(`/tracks/${trackID}/stream`, {
            responseType: "stream",
            headers: {
                Range: range,
            },
        });

        return new Response(res.data, {
            status: res.status === 206 ? 206 : 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": String(res.headers["content-length"] ?? ""),
                "Accept-Ranges": "bytes",
                "Content-Range": String(res.headers["content-range"] ?? ""),
            },
        });
    } catch (err) {
        console.log('Error : ', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })
    }
}