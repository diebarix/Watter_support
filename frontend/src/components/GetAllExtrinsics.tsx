import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function GetAllExtrinsics() {
  const [allextrinsics, setAllextrinsics] = useState<any | undefined>(0);
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

  const getallextrinsics = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const extrinsics = await gearApi.blocks.getExtrinsics(blockhash);
    extrinsics.forEach((extrinsic) => {
      setAllextrinsics(extrinsic.toHuman());
      console.log(extrinsic.toHuman());
    });
  };

  const AmountInputChange = async (event: any) => {
    setBlockhash(event.target.value);
  };

  return (
    <div className="card">
      <center>Get All Extrinsics with Hash</center>
      <Input type="text" value={blockhash} onChange={AmountInputChange} />
      <div className="horizontal">
        <Button text="Subscribe blocks" onClick={subscribeblocks} />
        <Button text="Get All Extrinsics" onClick={getallextrinsics} />
      </div>
    </div>
  );
}

export { GetAllExtrinsics };
