import { Link } from "react-router-dom";
import { getIpfsAddress } from "utils";
import styles from "./NFT.module.scss";
import ClipboardImage from "assets/images/icons/Clipboard.png";
import { useState } from "react";

type Props = {
	id: string;
	name: string;
	description: string;
	media: string;
	reference: string;
};

function NFT({ id, name, media, description, reference }: Props) {
	const [visible_clipboard, setvisible_clipboard] = useState(false);

	const to = `/nft/${id}`;
	const cidRef = reference;
	const text = `#${id}`;

	function clipboardSee() {
		navigator.clipboard.writeText(cidRef);
		setvisible_clipboard(true);
		setTimeout(() => {
			setvisible_clipboard(false);
		}, 2000);
	}
	return (
		<div className={styles.container_nft}>
			<Link className={styles.nft} to={to}>
				<h3 className={styles.nft_title}>{name}</h3>
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
			<button
				className={styles.clipboard_button}
				onClick={() => clipboardSee()}
			>
				<img className={styles.clipboard} src={ClipboardImage} alt="" />
			</button>
			<span
				className={`${styles.clipboard_text} ${
					visible_clipboard ? styles.visible : ""
				}`}
			>
				Ref Copied!
			</span>
		</div>
	);
}

export { NFT };
