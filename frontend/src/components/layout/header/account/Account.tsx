import { useState } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { ReactComponent as userSVG } from "assets/images/icons/login.svg";
import { Button } from "@gear-js/ui";
import { AccountsModal } from "./accounts-modal";
import { Wallet } from "./wallet";
import styles from "./Account.module.scss";

function Account() {
	const { account, accounts } = useAccount();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{account ? (
				<Wallet
					balance={account.balance}
					address={account.address}
					name={account.meta.name}
					onClick={openModal}
				/>
			) : (
				<Button
					className={styles.style_button}
					text="Sign in"
					onClick={openModal}
				/>
			)}
			{isModalOpen && (
				<AccountsModal /* accounts={accounts} */ close={closeModal} />
			)}
		</>
	);
}

export { Account };
