import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import mime from "mime"

// Serves files from the /articles/images folder
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    const imagePath = params.path.join("/");
    const filePath = path.resolve(".", `images/${imagePath}`);

    const type = mime.getType(imagePath)

    if (!type || !fs.existsSync(filePath)) {
        return NextResponse.json({ message: "File Not Found" }, { status: 404 })
    }

    const imageBuffer = fs.readFileSync(filePath);
    return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
            'Content-Type': type
        }
    })
}