import { useAccount } from "@gear-js/react-hooks";
import { Logo } from "./logo";
import { Account } from "./account";
import styles from "./Header.module.scss";
import { Enlace } from "../../../Enlace";
import { CreateLink } from "./create-link";

type Props = {
	isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
	const { account } = useAccount();

	return (
		<header className={styles.header}>
			<Logo />
			{isAccountVisible && <Account />}
		</header>
	);
}

export { Header };
