import { useState } from "react";
import { Loader } from "components";
import { FILTERS } from "consts";
import { Enlace } from "Enlace";
import { ReadState } from "components/Chart";
import { Link } from "react-router-dom";
import { useNFTs, useOwnerNFTs, useApprovedNFTs } from "hooks";
import { useAccount } from "@gear-js/react-hooks";
import { TokenDetails } from "types";
import { NFT } from "./nft";
import { Filter } from "./filter";
import arrow from "../../assets/images/arrow.png";
import styles from "./Home.module.scss";
import { PhInfo } from "components/PhInfo";

function Home() {
	const [filter, setFilter] = useState("All");
	const { account } = useAccount();

	const nfts = useNFTs();
	const { ownerNFTs, isOwnerNFTsRead } = useOwnerNFTs();
	const { approvedNFTs, isApprovedNFTsRead } = useApprovedNFTs();

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

	const list = getList();
	const getNFTs = () => {
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

	const NFTs = getNFTs();
	const isEachNftLoaded =
		nfts && (account ? isOwnerNFTsRead && isApprovedNFTsRead : true);
	const isAnyNft = !!NFTs?.length;

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
			{account &&
			ownerNFTs?.length &&
			ownerNFTs.length >= 0 &&
			ownerNFTs.length <= 3 ? (
				<div style={{ fontSize: "20px" }}>
					Add more NFTs{" "}
					<span style={{ color: "var(--main-bg-color)", fontWeight: "bold" }}>
						FOR MORE FUN
					</span>
				</div>
			) : null}
			{!account && <h2>Statistics not available without login</h2>}
			{account && <ReadState />}
			<Enlace title="Range and Parameters of Water Quality" />
			<PhInfo />
		</>
	);
}

export { Home };
