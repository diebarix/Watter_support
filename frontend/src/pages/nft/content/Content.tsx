import { HexString } from "@polkadot/util/types";
import { useAccount } from "@gear-js/react-hooks";
import { Button } from "@gear-js/ui";
import clsx from "clsx";
import { Addresses } from "../addresses";
// import { Attributes } from '../attributes';
import { Card } from "../card";
import styles from "./Content.module.scss";

type Props = {
	heading: string;
	image: string;
	ownerId: HexString;
	description: string;
	approvedAccounts: HexString[];
	waterFlow: number;
	ph: number;
	residence: string;
	onTransferButtonClick: () => void;
	onApproveButtonClick: () => void;
	onRevokeButtonClick: (address: HexString) => void;
};

function Content(props: Props) {
	const {
		heading,
		image,
		ownerId,
		description,
		approvedAccounts,
		waterFlow,
		ph,
		residence,
		onTransferButtonClick,
		onApproveButtonClick,
		onRevokeButtonClick,
	} = props;

	const { account } = useAccount();
	const isOwner = account?.decodedAddress === ownerId;
	const isAnyApprovedAccount = !!approvedAccounts.length;

	const detailsClassName = clsx(styles.main, styles.details);

	function waterHealth() {
		if (ph > 6.5 && ph < 9.5) {
			return (
				<>
					<Card heading="pH Health" text={"pH is healthy"} />
					<div className={`${styles.health_span} ${styles.green}`}>
						Is in the range of 6.5 to 9.5 healthy
					</div>
				</>
			);
		} else {
			return (
				<>
					<Card heading="pH Health" text={"pH is not healthy"} />
					<div className={`${styles.health_span} ${styles.red}`}>
						Not is in the range of 6.5 to 9.5 healthy
					</div>
				</>
			);
		}
	}

	return (
		<>
			<h2 className={styles.heading}>{heading}</h2>
			<div className={styles.main}>
				<section>
					<div>
						<Card heading="Owner" text={ownerId} />
						<Card heading="Description" text={description} />
						<Card heading="Water flow" text={waterFlow.toString()} />
						<Card heading="Ph" text={ph.toString()} />
						<Card heading="Residence" text={residence} />
						{waterHealth()}
					</div>
					{isAnyApprovedAccount && (
						<Addresses
							list={approvedAccounts}
							onAddressClick={onRevokeButtonClick}
							isOwner={isOwner}
						/>
					)}
				</section>
			</div>
		</>
	);
}

export { Content };
