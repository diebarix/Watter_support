import { Link } from "react-router-dom";
import LogoWater from "assets/images/Logo_water_support_sf_1.png";
import styles from "../Header.module.scss";

function Logo() {
	return (
		<Link to="/">
			<img className={styles.logo} src={LogoWater} alt="" />
		</Link>
	);
}

export { Logo };
