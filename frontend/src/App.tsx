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
		<div style={{ overflow: "hidden" }}>
			<Header isAccountVisible={isAccountReady} />
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
			<main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
			<Footer />
		</div>
	);
}
export const App = withProviders(Component);
