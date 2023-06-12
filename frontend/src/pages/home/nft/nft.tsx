import { Link } from "react-router-dom";
import { getIpfsAddress } from "utils";
import styles from "./NFT.module.scss";

type Props = {
	id: string;
	name: string;
	description: string;
	media: string;
	reference: string;
};

function NFT({
	id,
	name,
	media,
	description,
	reference,
}: Props) {
	const to = `/nft/${id}`;
	const cidRef = reference;
	const text = `#${id}`;
	return (
		<div className={styles.container_nft}>
			<Link className={styles.nft} to={to}>
				<h3>{name}</h3>
				<p>
					<span className={styles.atribut}>Number:</span> {text}
				</p>
				<p>
					<span className={styles.atribut}>Description:</span> {description}
				</p>
				<p>
					<span className={styles.atribut}>Reference:</span> {cidRef}
				</p>
			</Link>
		</div>
	);
}

export { NFT };
