import { HexString } from "@polkadot/util/types";

type Params = {
	id: string;
};

type Token = {
	approvedAccountIds: HexString[];
	description: string;
	id: string;
	media: string;
	name: string;
	ownerId: HexString;
	reference: string;
	waterFlow: number;
	ph: number;
};

//Podemos quitarlo
type Attributes = {
	[key: string]: string;
};

type TokenDetails = {
	waterFlow: number;
	ph: number;
	residence: string;
};

export type { Params, Token, Attributes, TokenDetails };
