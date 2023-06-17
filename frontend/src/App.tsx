import { useApi, useAccount } from "@gear-js/react-hooks";
import { Routing } from "pages";
import { Header, Footer, ApiLoader } from "components";
import { withProviders } from "hocs";
import "App.scss";
import waves from "./assets/images/icons/water-waves.png";

function Component() {
	const { isApiReady } = useApi();
	const { isAccountReady } = useAccount();

	const isAppReady = isApiReady && isAccountReady;
	return (
		<>
			<div className="app_container">
				<Header isAccountVisible={isAccountReady} />
				<main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
				<Footer />
			</div>
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
			<img className="waves" src={waves} alt="" />
		</>
	);
}
export const App = withProviders(Component);
