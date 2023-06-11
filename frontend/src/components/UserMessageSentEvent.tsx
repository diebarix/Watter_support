import { Button } from "@gear-js/ui";
import { GearApi, getProgramMetadata, GearKeyring } from "@gear-js/api";
import { useAlert } from "@gear-js/react-hooks";

function UserMessageSent() {
  const alert = useAlert();

  const Usermessagesent = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const codeId =
      "0x109ffa89f6886b0ff2a8dad5c62ef45a838c78e063f998f85e0cd069b20f49dd";
    const programId =
      "0x3536201e1a84aa283ce1d4a72f0aa0c643f27d39b264a883f05480a5f82d8ce8";

    const somePayload = "0x676574"; // get "0x676574" inc: '0x696E63'
    const meta: any = getProgramMetadata(programId);
    const keyring = await GearKeyring.fromSuri("//Alice");

    const message: any = {
      destination: programId, // programId
      payload: somePayload,
      gasLimit: 899819245,
      value: 1000,
    };

    const extrinsic: any = gearApi.message.send(message, meta);
    await extrinsic.signAndSend(keyring, (event: any) => {
      console.log(event.toHuman());
      alert.success(Object.keys(event.toHuman().status));
    });

    // Usermessagesent subscribtion
    const unsub = gearApi.gearEvents.subscribeToGearEvent(
      "UserMessageSent",
      ({
        data: {
          message: { id, source, destination, payload, value },
        },
      }) => {
        console.log(`
        messageId: ${id.toHex()}
        source: ${source.toHex()}
        payload: ${payload.toHuman()}
        `);
      }
    );
  };

  return (
    <div className="container">
      <h1>User Message Sent Event</h1>
      <p className="mnemonic">Subscription: </p>
      <Button text="Usermessagesent" onClick={Usermessagesent} />
    </div>
  );
}

export { UserMessageSent };