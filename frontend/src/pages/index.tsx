import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Register } from "./register";
import { Create } from "./create";
import { NFT } from "./nft";
import { Landing } from "./landing";
import { Login } from "./login";
import { useToken } from "../hooks";

const routes = [
	{ path: "/", Page: Landing, isPrivate: false },
	{ path: "/home", Page: Home, isPrivate: true },
	{ path: "/register", Page: Register, isPrivate: true },
	{ path: "nft/:id", Page: NFT, isPrivate: true },
	{ path: "/create", Page: Create, isPrivate: true },
];

// Pages with isPrivate set to true need the existence of a
// userToken in order to allow access, i. e. the user needs
// to login with their account.
function Routing() {
    const { token, setToken } = useToken();

	const getRoutes = () =>
		routes.map(({ path, Page, isPrivate }) => (
			<Route
                key={path}
                path={path}
                element={(token === null && isPrivate) ? <Login setToken={setToken} /> : <Page />}
            />
		));

	return <Routes>{getRoutes()}</Routes>;
}
export { Routing };
