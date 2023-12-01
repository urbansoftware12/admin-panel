import axios from "axios"
import { compress, downloadFile } from "image-conversion"

const uploadImage = async (file, fileName = "0", folder, quality = 75) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/S3/signed-url?folder=${folder}&fileName=${fileName}.webp`)
        const compressedImageBlob = await compress(file, { quality: quality / 100, type: "image/webp" })
        // downloadFile(compressedImageBlob, "compressed-blob-image0.webp")
        await axios.put(data.uploadUrl, compressedImageBlob)

        return `/${folder}/${fileName}.webp`
    } catch (error) { console.log(error); }
}
export default uploadImage