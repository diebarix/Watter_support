import {
	GasInfo,
	GearApi,
	GearKeyring,
	getProgramMetadata,
} from "@gear-js/api";
import { useAlert } from "@gear-js/react-hooks";
import { Button } from "@gear-js/ui";
import { useState } from "react";

function SendMessage() {
	const [status, setStatus] = useState<any | undefined>("");
	const [gasValue, setGasValue] = useState<GasInfo | null>(null);
	const alert = useAlert();

	const sendmessage = async () => {
		const gearApi = await GearApi.create({
			providerAddress: "wss://rpc-node.gear-tech.io",
		});

		const codeId =
			"0x109ffa89f6886b0ff2a8dad5c62ef45a838c78e063f998f85e0cd069b20f49dd";
		const programId =
			"0x3536201e1a84aa283ce1d4a72f0aa0c643f27d39b264a883f05480a5f82d8ce8";
		const somePayload = "0x676574";
		const meta = getProgramMetadata(codeId);
		const keyring = await GearKeyring.fromSuri("//Alice");

		const gas = await gearApi.program.calculateGas.initCreate(
			"0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d",
			codeId,
			"0x00",
			0,
			true
		);

		try {
			const message: any = {
				destination: programId, // programId
				payload: somePayload,
				gasLimit: gasValue !== null ? gasValue : 40000000,
				value: 1000,
			};

			const extrinsic: any = gearApi.message.send(message, meta);
			await extrinsic.signAndSend(keyring, (event: any) => {
				console.log(event.toHuman());
				alert.success("Sending Message");
			});
		} catch (error: any) {
			console.error(`${error.name}: ${error.message}`);
		}
	};

	return (
		<div className="container">
			<h1>Send Message</h1>
			<p className="mnemonic">Status: {status} </p>
			<h4>Gas to use</h4>
			<Button text="Send Message" onClick={sendmessage} />
		</div>
	);
}

export { SendMessage };
