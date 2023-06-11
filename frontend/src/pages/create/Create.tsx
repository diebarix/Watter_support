import { Button, Input } from "@gear-js/ui";
import { useAlert } from "@gear-js/react-hooks";
import { useForm } from "react-hook-form";
import genericReport from "assets/images/Generic water parameters report.jpg";
import { useIPFS, useSendNFTMessage } from "hooks";
import { getMintPayload } from "utils";
import styles from "./Create.module.scss";

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

	const alert = useAlert();
	const ipfs = useIPFS();
	// console.log(ipfs);
	const sendMessage = useSendNFTMessage();
	// console.log(sendMessage);

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

		ipfs
			.add(genericReport)
			.then(({ cid } /* : { cid: any } */) => cid)
			.then(async (imageCid /* : any */) =>
				jsonString
					? { jsonStringCid: (await ipfs.add(jsonString)).cid, imageCid }
					: { imageCid /* , jsonStringCid: undefined */ }
			)
			.then(
				(
					{
						imageCid,
						jsonStringCid,
					} /* : { imageCid: any; jsonStringCid: any } */
				) => getMintPayload(name, description, imageCid, jsonStringCid)
			)
			.then((payload/* : any */) => sendMessage(payload, { onSuccess: resetForm }))
			.catch(({ message }: Error) => alert.error(message));
	};

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
