import { ProviderProps } from "@gear-js/react-hooks";
import { ADDRESS } from "consts";
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { createContext, ReactNode, useRef } from "react";

type Props = {
	children: ReactNode;
};

const IPFSContext = createContext({} as IPFSHTTPClient);

function IPFSProvider({ children }: /* ProviderProps */ Props) {
	const ipfsRef = useRef(create({ url: ADDRESS.IPFS }));

	const { Provider } = IPFSContext;

	return (
		<Provider value={ipfsRef.current}>{children}</Provider>
	);
}

export { IPFSContext, IPFSProvider };
