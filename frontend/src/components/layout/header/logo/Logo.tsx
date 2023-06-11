import { Link } from "react-router-dom";
// import { ReactComponent as SVG } from "assets/images/logo.svg";
import LogoWater from "assets/images/Logo_water_support_sf_1.png";
import styles from "../Header.module.scss";

function Logo() {
	return (
		<Link to="/">
			{/* <h1 className={styles.logo}>WATTER SUPPORT</h1> */}
			<img className={styles.logo} src={LogoWater} alt="" />
		</Link>
	);
}

export { Logo };
