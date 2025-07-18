import React, { useState } from "react";
import { ethers } from "ethers";
import polaQuestAbi from "../abi/PolaQuest.json";

const contractAddress = "0xYourDeployedContractAddress"; // Replace this

function ClaimButton() {
  const [status, setStatus] = useState("");

  async function claimTokens() {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, polaQuestAbi, signer);
      const tx = await contract.claim();
      setStatus("Transaction sent: " + tx.hash);
      await tx.wait();
      setStatus("Claim successful ✅");
    } catch (err) {
      setStatus("❌ Error: " + err.message);
    }
  }

  return (
    <div>
      <button onClick={claimTokens} className="btn">
        Claim 100 $POLA
      </button>
      <p>{status}</p>
    </div>
  );
}

export default ClaimButton;
