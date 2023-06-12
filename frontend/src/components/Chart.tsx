import { getProgramMetadata } from "@gear-js/api";
import { useEffect, useState } from "react";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import { AnyJson } from "@polkadot/types/types";
import { getIpfsAddress } from "utils";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Get program state

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Your Stastics",
			padding: {
				top: 10,
				bottom: 30,
			},
			font: { size: 26 },
		},
	},
};
ChartJS.defaults.borderColor = "#0C2650";
ChartJS.defaults.color = "#ECECEC";

function GetState() {
	const { api } = useApi();

	const alert = useAlert();

	const [fullState, setFullState] = useState<AnyJson>();

	const codeId =
		"0x109ffa89f6886b0ff2a8dad5c62ef45a838c78e063f998f85e0cd069b20f49dd";

	const programId =
		"0x3536201e1a84aa283ce1d4a72f0aa0c643f27d39b264a883f05480a5f82d8ce8";

	const meta =
		"010000000000010c0000000112000000000000000001140000002d198c0008186e66745f696f1c496e69744e465400001001106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120626173655f757269040118537472696e67000124726f79616c746965730801444f7074696f6e3c526f79616c746965733e00000400000502000804184f7074696f6e040454010c0108104e6f6e6500000010536f6d6504000c00000100000c1020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e24726f79616c7469657324526f79616c7469657300000801206163636f756e74731001185061796f757400011c70657263656e742c010c753136000010042042547265654d617008044b011404560120000400240000001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d000018000003200000001c001c000005030020000005070024000002280028000004081420002c00000504003008186e66745f696f244e4654416374696f6e000114104d696e740801387472616e73616374696f6e5f696434010c753634000138746f6b656e5f6d65746164617461380134546f6b656e4d65746164617461000000104275726e0801387472616e73616374696f6e5f696434010c753634000120746f6b656e5f69643c011c546f6b656e4964000100205472616e736665720c01387472616e73616374696f6e5f696434010c753634000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e4964000200144f776e6572040120746f6b656e5f69643c011c546f6b656e496400030014436c6561720401407472616e73616374696f6e5f686173684401104832353600040000340000050600381020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e14746f6b656e34546f6b656e4d6574616461746100001001106e616d65040118537472696e6700012c6465736372697074696f6e040118537472696e670001146d65646961040118537472696e670001247265666572656e6365040118537472696e6700003c083c7072696d69746976655f74797065731055323536000004004001205b7536343b20345d00004000000304000000340044083c7072696d69746976655f74797065731048323536000004001801205b75383b2033325d00004808186e66745f696f204e46544576656e74000108205472616e7366657204004c012c4e46545472616e73666572000000144f776e65720801146f776e657214011c4163746f724964000120746f6b656e5f69643c011c546f6b656e4964000100004c1020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e08696f2c4e46545472616e7366657200000c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e496400005008186e66745f696f14496f4e46540000100114746f6b656e540128496f4e46545374617465000120746f6b656e5f69643c011c546f6b656e49640001146f776e657214011c4163746f7249640001307472616e73616374696f6e738401545665633c28483235362c204e46544576656e74293e00005408186e66745f696f28496f4e4654537461746500002001106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120626173655f757269040118537472696e6700012c6f776e65725f62795f696458015c5665633c28546f6b656e49642c204163746f724964293e00013c746f6b656e5f617070726f76616c736001705665633c28546f6b656e49642c205665633c4163746f7249643e293e000150746f6b656e5f6d657461646174615f62795f69646c01945665633c28546f6b656e49642c204f7074696f6e3c546f6b656e4d657461646174613e293e000140746f6b656e735f666f725f6f776e65727801705665633c284163746f7249642c205665633c546f6b656e49643e293e000124726f79616c746965730801444f7074696f6e3c526f79616c746965733e0000580000025c005c000004083c140060000002640064000004083c68006800000214006c000002700070000004083c74007404184f7074696f6e04045401380108104e6f6e6500000010536f6d650400380000010000780000027c007c00000408148000800000023c008400000288008800000408444800";

	useEffect(() => {
		const getState = async () => {
			try {
				const metadata = getProgramMetadata("0x" + meta);
				const result = await api.programState.read({ programId }, metadata);
				setFullState(result.toJSON());
				// alert.success("Successful state");
			} catch (error) {
				alert.success("Error state");
			}
		};
		getState();
	}, []);

	return fullState;
}

// Check if a user has NFTs
function findKeyByValue<T>(
	obj: Record<string, T[]>,
	value: T
): string | undefined {
	const keys = Object.keys(obj);

	for (const key of keys) {
		if (obj[key].includes(value)) {
			return key;
		}
	}

	return undefined;
}

// Search all the NFTs id that belongs to the logged user
function findNFTsID<T>(obj: Record<string, T[]>, value: T): string[] {
	const keys = Object.keys(obj);
	let belongedNFTS: string[] = [];

	for (const key of keys) {
		if (obj[key].includes(value)) {
			belongedNFTS.push(key);
		}
	}

	return belongedNFTS;
}

// Search the NFTS for the logged user
function findNFTs(NFTmetadata: Record<string, any>, NFTsID: string[]): any[] {
	const NFTs: any[] = [];
	for (let i = 0; i < NFTsID.length; i += 1) {
		const id = NFTsID[i];
		NFTs.push(NFTmetadata[id]);
	}
	return NFTs;
}

// Separate the NFTs from their ids
function separateNFTId(NFTsWithId: string[]): any[] {
	const NFTs = [];
	for (let i = 0; i < NFTsWithId.length; i += 1) {
		const register = NFTsWithId[i];
		NFTs.push(register[1]);
	}
	return NFTs;
}

interface JsonObject {
	residence: string;
	ph: number;
	waterFlow: number;
}

async function extractInfo(NFTs: any[]) {
	const waterMetrics: JsonObject[] = [];
	for (let i = 0; i < NFTs.length; i += 1) {
		if (NFTs[i]["reference"] !== "") {
			const jsonObject: JsonObject = {} as JsonObject;
			const response = await fetch(getIpfsAddress(NFTs[i]["reference"]));
			const data = await response.json();
			jsonObject["residence"] = data["residence"];
			jsonObject["ph"] = data["ph"];
			jsonObject["waterFlow"] = data["waterFlow"];
			waterMetrics.push(jsonObject);
		}
	}
	return waterMetrics;
}

async function totalResult(NFTs: any[]): Promise<JsonObject[]> {
	const result = await extractInfo(NFTs);
	return result;
}

// Convertir en JSON el estado del programa.
function ReadState() {
	const [data, setData] = useState<JsonObject[] | never[]>([]);
	const state = GetState(); // The State as AnyJSON
	const CopyState = Object.assign({}, state); // Create a copy and no a reference for the state as AnyJSON
	const stateJSON = JSON.parse(JSON.stringify(CopyState)); // Change the state from AnyJSON to string
	const token = Object.assign({}, stateJSON.token); // Create a copy of the values for token
	const tokenMetadata = Object.assign({}, token.tokenMetadataById); // Create a copy of the values for tokenMetadataById
	const ownerId = Object.assign({}, token.ownerById); // Create a copy of the values for ownerById
	const { account } = useAccount(); // Get the account info
	const userId = account?.decodedAddress; // Get the userId that could be associated to a NFT ((The user logged)
	const ownerKey = findKeyByValue(ownerId, userId); // If this variable equals to null, it means that the user doesn't have any register

	if (ownerKey == null) {
		return (
			<div className="container">
				<center className="state">
					<p style={{ fontSize: "18px" }}>
						This user doesn't have NFT asociated to his account
					</p>
					<p style={{ fontSize: "18px" }}>
						Please add more NFTs{" "}
						<span
							style={{
								fontSize: "35px",
								color: "var(--main-bg-color)",
								fontWeight: "bold",
							}}
						>
							TO SEE THE MAGIC
						</span>{" "}
					</p>
				</center>
			</div>
		);
	}
	const NFTsById = findNFTsID(ownerId, userId); // Get all the NFTs ID that belongs to the logged user.
	const NFTsWithId = findNFTs(tokenMetadata, NFTsById); // Get the NFTs with their IDs for the logged user.
	const NFTs = separateNFTId(NFTsWithId); // Return an array with all the NFTs that belongs to the logged user

	// Función asincrónica para obtener y establecer los datos
	const fetchData = async () => {
		const result = await totalResult(NFTs);
		// console.log(result);
		setData(result);
	};

	fetchData(); // Llamada a la función para obtener los datos

	const phContent = data.map(item => {
		return item.ph;
	});
	const waterFlowContent = data.map(item => {
		return item.waterFlow;
	});
	const residenceContent = data.map(item => {
		return item.residence;
	});

	const dataProof = {
		labels: residenceContent,
		datasets: [
			{
				label: "ph",
				data: phContent,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "#0C2650",
			},
			{
				label: "water_flow",
				data: waterFlowContent,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	return (
		<div>
			<Line
				style={{ marginBottom: "200px" }}
				options={options}
				data={dataProof}
			/>
		</div>
	);
}

export { ReadState };
