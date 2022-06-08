import process from "node:process";

import cloudinary from "cloudinary";
import formidable from "formidable";

export const config = {
	api: {
		bodyParser: false,
	},
};

/* eslint-disable camelcase */
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});
/* eslint-enable camelcase */

export default async function handler(request, response) {
	switch (request.method) {
		case "POST":
			await new Promise((resolve, reject) => {
				const form = formidable({});
				form.parse(request, async (error, fields, files) => {
					if (error) {
						reject(error);
					} else {
						const { file } = files;
						const { newFilename, filepath } = file;
						/* eslint-disable camelcase */
						const result = await cloudinary.v2.uploader.upload(filepath, {
							public_id: newFilename,
						});
						/* eslint-enable camelcase */
						response.status(201).json(result);
						resolve();
					}
				});
			});
			break;
		default:
			response.status(400).json({ message: "Method not implemented" });
			break;
	}
}
