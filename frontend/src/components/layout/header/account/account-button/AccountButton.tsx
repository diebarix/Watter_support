import Identicon from "@polkadot/react-identicon";
import clsx from "clsx";
import { buttonStyles } from "@gear-js/ui";
import styles from "./AccountButton.module.scss";

type Props = {
	address: string;
	name: string | undefined;
	onClick: () => void;
	isActive?: boolean;
	block?: boolean;
};

function AccountButton({ address, name, onClick, isActive, block }: Props) {
	const className = clsx(
		buttonStyles.button,
		styles.button,
		isActive ? buttonStyles.primary : buttonStyles.primary,
		block && buttonStyles.block
	);

	return (
		<button type="button" className={className} onClick={onClick}>
			<Identicon
				value={address}
				className={buttonStyles.icon}
				theme="polkadot"
				size={28}
			/>
			{name}
		</button>
	);
}

export { AccountButton };
