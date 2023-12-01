// import sharp from "sharp"

// const ProcessImage = async (req, res) => {
//     try {
//         if (req.method === 'POST') {
//             console.log(req.body, "\n")

//             // const image = await sharp(req.body).webp({ quality: 70 }).toFile()
//             const image = await sharp(req.body).webp({ quality: 70 }).toBuffer();

//             res.status(200).json({
//                 success: true,
//                 image
//             })
//         }
//         else { res.status(405).json({ success: false, msg: "bad request, you are using wrong request method!" }) }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
//     }
// }
// export default ProcessImage

import sharp from "sharp";
import multer from "multer";

const upload = multer();

const ProcessImage = async (req, res) => {
  try {
    if (req.method === "POST") {
      // Check if an image is provided in the FormData
      if (!req.body) {
        return res
          .status(400)
          .json({ success: false, msg: "No image provided" });
      }

      const imageBuffer = req.body.buffer;

      // Process the image using Sharp
      const processedImageBuffer = await sharp(imageBuffer)
        .webp({ quality: 70 })
        .toBuffer();

      // Set response headers for image download
      res.setHeader("Content-Type", "image/webp");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="compressed-image.webp"'
      );

      // Send the processed image in the response
      res.status(200).end(processedImageBuffer);
    } else {
      res
        .status(405)
        .json({
          success: false,
          msg: "Bad request, you are using the wrong request method!",
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal server error, please try again later",
      });
  }
};

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle FormData
  },
};

export default upload.any()(ProcessImage);
