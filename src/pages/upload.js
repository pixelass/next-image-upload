import axios from "axios";
import Image from "next/image.js";
import React, { useState } from "react";

export default function Page() {
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);
	return (
		<div>
			{image && (
				<Image
					src={image.url}
					layout="responsive"
					height={image.height}
					width={image.width}
				/>
			)}
			{error && <div>{error.message}</div>}
			<form
				onSubmit={async event => {
					event.preventDefault();

					const formData = new FormData(event.target);
					try {
						const { data } = await axios.post("/api/upload", formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						});
						setImage(data);
					} catch (error) {
						setError(error);
					}
				}}
			>
				<input type="file" name="file" />
				<button type="submit">Upload</button>
			</form>
		</div>
	);
}
