import { join } from "path";
import { stat, mkdir, writeFile, rm } from "fs/promises";
import mime from "mime"
import sharp from "sharp";

export const saveArticleImage = async (file: File, id: number): Promise<{ success: boolean, filePath?: string }> => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/images/articles/${id}`;
    const uploadDir = join(process.cwd(), relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error("Error while trying to create directory when uploading a file\n", e);
            return { success: false }
        }
    }

    try {
        const originalFileName = `original.${mime.getExtension(file.type)}`;

        // Save Original Image
        await writeFile(`${uploadDir}/${originalFileName}`, buffer);

        //Save Cover
        await sharp(buffer).resize(1280, 720).toFile(`${uploadDir}/cover.webp`)

        //Save Thumbnail
        await sharp(buffer).resize(576, 324).toFile(`${uploadDir}/thumbnail.webp`)

        //Save Badge
        await sharp(buffer).resize(100, 100).toFile(`${uploadDir}/badge.webp`)

        return { success: true, filePath: `/api${relativeUploadDir}/${originalFileName}` }
    } catch (e) {
        return { success: false }
    }
}

export const deleteArticleDirectory = async (id: number) => {
    await rm(`${process.cwd()}/images/articles/${id}`, { recursive: true, force: true })
}