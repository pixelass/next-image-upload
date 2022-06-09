import axios from "axios";
import Image from "next/image.js";
import React, { useState } from "react";

export default function Page() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	return (
		<div>
			{data && (
				<>
					<h2>{data.name}</h2>
					<div style={{ position: "relative", width: 200 }}>
						<Image
							src={data.image.url}
							height={data.image.height}
							width={data.image.width}
						/>
					</div>
					<p>{data.description}</p>
					<pre>{JSON.stringify(data, null, 4)}</pre>
				</>
			)}
			{error && <div>{error.message}</div>}
			<form
				onSubmit={async event => {
					event.preventDefault();

					const formData = new FormData(event.target);
					const { file, ...formValues } = Object.fromEntries(formData);
					try {
						const response = await axios.post(
							"/api/upload",
							{ file },
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						);
						setData({
							...formValues,
							image: {
								url: response.data.url,
								height: response.data.height,
								width: response.data.width,
							},
						});
					} catch (error) {
						setError(error);
					}
				}}
			>
				<label>
					Name: <br />
					<input type="text" name="name" />
				</label>
				<br />
				<label>
					Image: <br />
					<input type="file" name="file" />
				</label>
				<br />
				<label>
					Description: <br />
					<textarea name="description" />
				</label>
				<br />
				<br />
				<button type="submit">Save</button>
			</form>
		</div>
	);
}
