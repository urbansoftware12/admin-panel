import axios from "axios"

const uploadImage = async (file, fileName="zero", folder) => {
    try {
        const { data } = await axios.get(`${process.env.HOST}/api/S3/signed-url?folder=${folder}&fileName=${fileName}`)
        await axios.put(data.uploadUrl, file)
        return `https://urban-fits.s3.eu-north-1.amazonaws.com/${folder}/${fileName}`
    } catch (error) { console.log(error); }
}
export default uploadImage