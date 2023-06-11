import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function GetDataWithBlocknumber() {
  const [valueAmount, setValueAmount] = useState<any | undefined>(0);
 
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

  const getDataWithBlocknumber = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });
    const data = await gearApi.blocks.get(valueAmount);
    console.log(data.toHuman());
  };

  const AmountInputChange = async (event: any) => {
    setValueAmount(event.target.value);
  };

  return (
    <div className="card">
      <center>Introduce blocknumber</center>
      <Input type="text" value={valueAmount} onChange={AmountInputChange} />
      <div className="horizontal">
        <Button text="Subscribe blocks" onClick={subscribeblocks} />
        <Button
          text="Get Data with BlockNumber"
          onClick={getDataWithBlocknumber}
        />
      </div>
    </div>
  );
}

export { GetDataWithBlocknumber };

