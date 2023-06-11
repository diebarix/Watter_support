import { GearApi } from "@gear-js/api";
import { useEffect, useState } from "react";

function SubscribeBlocks() {
  const [blocknumber, setBlocknumber] = useState();
  const [hashblock, setHashblock] = useState();

  const subscribeblocks = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const unsub = await gearApi.gearEvents.subscribeToNewBlocks(
      (header: any) => {
        setBlocknumber(header.number.toNumber());
        setHashblock(header.hash.toHex());
        console.log(
          `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`
        );
      }
    );
  };

  useEffect(() => {
    subscribeblocks();
  });
  return (
    <div className="subscribeblocks">
      <h3>Block Number</h3>
      <p>{blocknumber}</p>
      <h3>Block hash</h3>
      <p>{hashblock}</p>
    </div>
  );
}

export { SubscribeBlocks };
