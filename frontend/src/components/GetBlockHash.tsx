import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function GetBlockhash() {
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

  const getBlockhash = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const hash = await gearApi.blocks.getBlockHash(blocknumber);
    console.log(hash.toHex());
    setBlockhash(hash.toHex());
  };

  const AmountInputChange = async (event: any) => {
    setBlocknumber(event.target.value);
  };

  return (
    <>
      <div className="card">
        <center>Get Blockhash</center>
        <Input type="text" value={blocknumber} onChange={AmountInputChange}/>
        <div className="horizontal">
          <Button text="Subscribe blocks" onClick={subscribeblocks} />
          <Button text="Get Blockhash" onClick={getBlockhash} />
        </div>
      </div>
      <div className="subscribeblocks">
        <center>Blockhash:</center>
        <center>{blockhash}</center>
      </div>
    </>
  );
}

export { GetBlockhash };
