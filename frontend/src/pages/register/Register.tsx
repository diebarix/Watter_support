import { Button, Input } from "@gear-js/ui";
import { useState } from "react";
// import { useAlert } from "@gear-js/react-hooks";
import { useForm } from "react-hook-form";
import { useIPFS, useSendNFTMessage, /* useWasmMetadata */ } from "hooks";
import fs from "fs";
import { getMintPayload } from "utils";
import styles from "./Register.module.scss";

type Values = { waterFlow: number; ph: number; residence: String };
const defaultValues = { water_flow: 0, ph: 0, residence: "" };

function getCurrentDate(): string {
	const currentDate = new Date();

	const day = String(currentDate.getDate()).padStart(2, "0");
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const year = String(currentDate.getFullYear());

	return `${day}-${month}-${year}`;
}

function Register() {
	const { formState, register, handleSubmit, reset } = useForm<Values>({
		defaultValues,
	});
	const { errors } = formState;

	// const alert = useAlert();
	const ipfs = useIPFS();
	// console.log(ipfs);
	const sendMessage = useSendNFTMessage();
	// console.log(sendMessage);

/* 	const metadata = useWasmMetadata("assets/wasm/nft.meta.wasm");

	console.log(metadata); */

	const onSubmit = async (data: Values) => {
		const { waterFlow, ph, residence } = data;

		const jsonObject = {
			wh: waterFlow,
			ph_data: ph,
			res: residence,
			date: getCurrentDate(),
		};

		const JSONstring = JSON.stringify(jsonObject);

		const details = "";
		ipfs
			.add(JSONstring)
			.then(({ cid }: { cid: any }) => cid)
			.then(async (jsonCid: any) =>
				/* details */ JSONstring
					? { detailsCid: (await ipfs.add(details)).cid, jsonCid }
					: { jsonCid }
			)
			.then(({ jsonCid, detailsCid }: { jsonCid: any; detailsCid?: any }) =>
				getMintPayload("Test 1", "This is a test", jsonCid, detailsCid)
			)
			.then((payload: any) => sendMessage(payload, { onSuccess: reset }));
		// .catch(({ message }: Error) => alert.error(message));
	};

	return (
		<>
			<h2 className={styles.heading}>Record</h2>
			<div className={styles.main}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.item}>
						<Input
							label="Water Flow"
							className={styles.input}
							{...register("waterFlow", { required: "Water flow is required" })}
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

					<Button type="submit" text="Submit" className={styles.button} block />
				</form>
			</div>
		</>
	);
}
export { Register };
