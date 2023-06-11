import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Register } from "./register";
import { Create } from "./create";
import { NFT } from "./nft";

const routes = [
	{ path: "/", Page: Home },
	{ path: "/register", Page: Register },
	{ path: "nft/:id", Page: NFT },
	{ path: "/create", Page: Create, isPrivate: true },
];

function Routing() {
	const getRoutes = () =>
		routes.map(({ path, Page, isPrivate }) => (
			<Route
				key={path}
				path={path}
				element={
					/* isPrivate ? (
					<OnLogin fallback={<InfoText text="In order to use all features, please login" />}>
						<Page />
					</OnLogin>
				) : (
					<Page />
				) */
					<Page />
				}
			/>
		));

	return <Routes>{getRoutes()}</Routes>;
}
export { Routing };
