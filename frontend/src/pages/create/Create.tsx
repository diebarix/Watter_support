import { Button, Input } from "@gear-js/ui";
import { useAlert } from "@gear-js/react-hooks";
import { useForm } from "react-hook-form";
import genericReport from "assets/images/Generic water parameters report.jpg";
import { useIPFS, useSendNFTMessage } from "hooks";
import { getMintPayload } from "utils";
import styles from "./Create.module.scss";

//Define inputs types
type Values = {
	name: string;
	description: string;
	waterFlow: number;
	ph: number;
	residence: string;
};

const defaultValues = {
	name: "",
	description: "",
	waterFlow: 0,
	ph: 0,
	residence: "",
};

function Create() {
	const { formState, register, handleSubmit, reset } = useForm<Values>({
		defaultValues,
	});
	const { errors } = formState;

    // Hooks for displaying errors,
    // Uploading files to IPFS
    // and sending NFTCreate message to smartcontract
	const alert = useAlert();
	const ipfs = useIPFS();
	const sendMessage = useSendNFTMessage();

	const resetForm = () => {
		reset();
	};

	const onSubmit = async (data: Values) => {
		const { name, description, waterFlow, ph, residence } = data;

		const jsonObj = {
			waterFlow,
			ph,
			residence,
		};

		const jsonString = JSON.stringify(jsonObj);

        // Upload an image (genericReport) to IPFS,
        // retrieve the CID (content identifier) of the uploaded file,
        // add an optional jsonString (user's inputs) to IPFS,
        // retrieve its CID if provided, generate a payload
        // (for creating a NFT) using the retrieved CIDs and other
        // parameters, send the payload using sendMessage,
        // and handle any errors that occur during this process.
		ipfs
			.add(genericReport)
			.then(({ cid }) => cid)
			.then(async (imageCid) =>
				jsonString
					? { jsonStringCid: (await ipfs.add(jsonString)).cid, imageCid }
					: { imageCid }
			)
			.then(
				(
					{
						imageCid,
						jsonStringCid,
					}
				) => getMintPayload(name, description, imageCid, jsonStringCid)
			)
			.then((payload) => sendMessage(payload, { onSuccess: resetForm }))
			.catch(({ message }: Error) => alert.error(message));
	};

    // Form made with react-hook-form and Input component
    // from @gear-js/ui library
	return (
		<>
			<h2 className={styles.heading}>Register Data</h2>
			<div className={styles.main}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.item}>
						<Input
							label="Name"
							className={styles.input}
							{...register("name", { required: "Name is required" })}
						/>
						<p className={styles.error}>{errors.name?.message}</p>
					</div>

					<div className={styles.item}>
						<Input
							label="Description"
							className={styles.input}
							{...register("description", {
								required: "Description is required",
							})}
						/>
						<p className={styles.error}>{errors.description?.message}</p>
					</div>

					<div className={styles.item}>
						<Input
							label="Water Flow"
							className={styles.input}
							{...register("waterFlow", { required: "Water Flow is required" })}
						/>
						<p className={styles.error}>{errors.waterFlow?.message}</p>
					</div>

					<div className={styles.item}>
						<Input
							label="Ph"
							className={styles.input}
							{...register("ph", { required: "Ph is required" })}
						/>
						<p className={styles.error}>{errors.ph?.message}</p>
					</div>

					<div className={styles.item}>
						<Input
							label="Residence"
							className={styles.input}
							{...register("residence", { required: "Residence is required" })}
						/>
						<p className={styles.error}>{errors.residence?.message}</p>
					</div>

					<Button type="submit" text="Create" className={styles.button} block />
				</form>
			</div>
		</>
	);
}

export { Create };
