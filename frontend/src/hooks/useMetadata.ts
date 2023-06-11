import { useEffect, useState } from "react";
import { getProgramMetadata, ProgramMetadata } from "@gear-js/api";
import { Buffer } from "buffer";
// import { HexString } from "@polkadot/util/types";
import { useAlert } from "@gear-js/react-hooks";

export const useMetadata = (source: RequestInfo | URL /* source: string */) => {
	const [data, setData] = useState<ProgramMetadata>();
	// const alert = useAlert();

	useEffect(() => {
		fetch(source)
			.then(res => res.text() as Promise<string>)
			.then(raw => getProgramMetadata(`0x${raw}` /*  as HexString */))
			// .then(raw => console.log(raw));
			.then(meta => setData(meta));
		// .then(raw => console.log(raw));
		// .then(metahex => getProgramMetadata(metahex))
		// .then(meta => setData(meta))
		// .catch(({ message }: Error) => alert.error(message));
	}, [source]);

	return data;
};

export const useWasmMetadata = (source: RequestInfo | URL) => {
	const alert = useAlert();
	const [data, setData] = useState<Buffer>();

	useEffect(() => {
		if (source) {
			fetch(source)
				.then(response => response.arrayBuffer())
				.then(array => Buffer.from(array))
				.then(buffer => setData(buffer))
				.catch(({ message }: Error) => alert.error(`Fetch error: ${message}`));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [source]);

	return { buffer: data };
};
