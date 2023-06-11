import { CID } from 'ipfs-http-client';

const getMintPayload = (name: string, description: string, imgCid: CID, detailsCid?: CID) => {
  const tokenMetadata = {
    name,
    description,
    media: imgCid.toString(),
    reference: detailsCid ? detailsCid.toString() : '',
  };

  return { Mint: { tokenMetadata, transaction_id: Math.floor(Math.random() * 1000) } };
};

export { getMintPayload };