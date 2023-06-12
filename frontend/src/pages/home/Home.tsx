import { useState } from "react";
import { InfoText, Loader } from "components";
// import { /* InfoText */ useNFTs } from "hooks/api";
import { FILTERS } from "consts";
import { Enlace } from "Enlace";
import { ReadState } from "components/Chart";
import { Link } from "react-router-dom";
import { GearApi } from "@gear-js/api";
import { Button } from "@gear-js/ui";
import {
	useNFTs,
	/* useWasmMetadata, */ useOwnerNFTs,
	useApprovedNFTs,
} from "hooks";
import { useAccount } from "@gear-js/react-hooks";
import faker from "faker";
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
import { TokenDetails } from "types";
import { Line } from "react-chartjs-2";
import { NFT } from "./nft";
import { Filter } from "./filter";
import arrow from "../../assets/images/arrow.png";
import styles from "./Home.module.scss";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options1 = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Pressure",
			padding: {
				top: 10,
				bottom: 30,
			},
			font: { size: 26 },
		},
	},
};

export const options2 = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "pH",
			padding: {
				top: 10,
				bottom: 30,
			},
			font: { size: 26 },
		},
		LinearScale: {
			y: {
				min: -25,
				max: 100,
			},
			x: {
				ticks: { color: "rgba(0, 220, 195)" },
			},
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
ChartJS.defaults.borderColor = "#0C2650";
ChartJS.defaults.color = "#ECECEC";
export const data1 = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "#0C2650",
			fill: true,
		},
		{
			label: "Dataset 2",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

export const data2 = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "#0C2650",
			fill: true,
		},
		{
			label: "Dataset 2",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

//-----------------------------------------------------------
// Empiza codigo del componente Home
function Home() {
	const [filter, setFilter] = useState("All");
	const { account } = useAccount();

	const nfts = useNFTs();
	const { ownerNFTs, isOwnerNFTsRead } = useOwnerNFTs();
	const { approvedNFTs, isApprovedNFTsRead } = useApprovedNFTs();
	const [details, setDetails] = useState<TokenDetails>();
	// const { waterFlow, ph, residence } = details || {};

	/* 	console.log("ph:", ph);
	console.log("waterflowssss:", ph); */
	const getList = () => {
		switch (filter) {
			case "My":
				return ownerNFTs;
			case "Approved":
				return approvedNFTs;
			default:
				return nfts;
		}
	};

	// const { nfts, isNftStateRead: isStateRead } = useNFTs();
	// const isAnyNft = nfts && nfts.length > 0;

	/* const getNFTs = () => {
		if (nfts) {
			return nfts.map(({ name, id, reference }) => (
				<li key={id}>
					<NFT id={id} name={name} reference={reference} />
				</li>
			));
		}
		return null;
	}; */
	const list = getList();
	// console.log("list:", list.);
	const getNFTs = () => {
		// const list = getList();
		// console.log("list:", list);
		if (Array.isArray(list)) {
			return list.map(({ id, name, media, reference, description }) => (
				<li key={id}>
					<NFT
						id={id}
						name={name}
						media={media}
						description={description}
						reference={reference}
					/>
				</li>
			));
		}
		return null;
	};

	/* 	const getNFTs = () =>
		getList()?.map(({ id, name, media, reference }) => (
			<li key={id}>
				<NFT id={id} name={name} media={media} reference={reference} />
			</li>
		)); */

	/* const myData = { date: "10-50-69", ph: 6, water_flow: 12 };
	const myDataJSON = JSON.stringify(myData); */
	const myDataJSON =
		'[{"date": "10-50-69", "ph": 6, "water_flow": 12}, {"date": "10-60-79", "ph": 7, "water_flow": 15},{"date": "10-60-79", "ph": 10, "water_flow": 25},{"date": "10-60-79", "ph": 2, "water_flow": 55},{"date": "10-60-79", "ph": 20, "water_flow": 5}]';
	// console.log(myDataJSON);

	const newData = JSON.parse(myDataJSON);
	// console.log(newData);
	/* 	const metadata = useWasmMetadata("assets/wasm/nft.meta.wasm");

	console.log(metadata); */
	const dateContent: string[] = [];
	const phContent: number[] = [];
	const waterFlowContent: number[] = [];

	for (let i = 0; i < newData.length; i += 1) {
		dateContent.push(newData[i].date);
		phContent.push(newData[i].ph);
		waterFlowContent.push(newData[i].water_flow);
		// console.log("the date is: " + newData[i].date);
		/* console.log("the ph is: ", newData[i].ph);
		console.log("the water_flow is: ", newData[i].water_flow);
		console.log(""); */
	}

	// console.log("Content1: " + dateContent);
	/* console.log("Content2: ", phContent.toString());
	console.log("Content3: ", waterFlowContent[1].toString()); */

	const labelsProof = dateContent;
	const dataProof = {
		labels: labelsProof,
		datasets: [
			{
				label: "ph",
				data: phContent,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "#0C2650",
			},
			{
				label: "water_flow",
				data: waterFlowContent /* labels.map(() =>
					faker.datatype.number({ min: -1000, max: 1000 })
				) */,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	/* console.log(newData.date);
	console.log(newData.ph);
	console.log(newData.water_flow); */
	const NFTs = getNFTs();
	const isEachNftLoaded =
		nfts && (account ? isOwnerNFTsRead && isApprovedNFTsRead : true);
	const isAnyNft = !!NFTs?.length;
	console.log(ownerNFTs);

	return (
		<>
			<Enlace title="Water NFT" />
			{account && (
				<div className={styles.fondo}>
					<div className={styles.container_btn_register}>
						<img className={styles.arrow} src={arrow} alt="" />
						<Link to="/create">
							{ownerNFTs?.length !== 0 && (
								<button className={styles.button} type="button">
									Add other NFT
								</button>
							)}
							{ownerNFTs?.length === 0 && (
								<button className={styles.button} type="button">
									Add your first NFT!!
								</button>
							)}
							{/* 							<button className={styles.button} type="button">
								Register
							</button> */}
						</Link>
					</div>
				</div>
			)}
			<div className="card">
				<h2 style={{ marginTop: "30px" }}>NFTs</h2>
				{account && (
					<Filter list={FILTERS} value={filter} onChange={setFilter} />
				)}
				{isEachNftLoaded ? (
					<>
						{isAnyNft && <ul className={styles.list}>{NFTs}</ul>}
						{!isAnyNft && <h2>There are no NFTs at the moment</h2>}
					</>
				) : (
					<Loader />
				)}
			</div>

			<Enlace title="Water Statistics" />
			{!account && <h2>Statistics not available without login</h2>}
			{account && <ReadState />}
		</>
	);
}

export { Home };
