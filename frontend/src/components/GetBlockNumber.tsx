import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function GetBlockNumber() {
  const [blocknumber, setBlocknumber] = useState<any | undefined>(0);
  const [blockhash, setBlockhash] = useState<any | undefined>("");

  const subscribeblocks = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const unsub = await gearApi.gearEvents.subscribeToNewBlocks(
      (header: any) => {
        console.log(
          `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`
        );
      }
    );
  };

  const getBlocknumber = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const hash = await gearApi.blocks.getBlockNumber(blockhash);
    console.log(hash.toNumber());
    setBlocknumber(hash.toNumber());
  };

  const AmountInputChange = async (event: any) => {
    setBlockhash(event.target.value);
  };

  return (
    <>
      <div className="card">
        <center>Get Blocknumber with Hash</center>
        <Input type="text" value={blockhash} onChange={AmountInputChange} />
        <div className="horizontal">
          <Button text="Subscribe blocks" onClick={subscribeblocks} />
          <Button text="Get Blocknumber" onClick={getBlocknumber} />
        </div>
      </div>
      <div className="subscribeblocks">
        <center>Blocknumber:</center>
        <center>{blocknumber}</center>
      </div>
    </>
  );
}

export {GetBlockNumber };
