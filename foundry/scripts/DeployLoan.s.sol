// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {LoanManager} from "../src/LoanManager.sol";

contract DeployLoan is Script {
    function run() external {
        // Requer variáveis de ambiente: SEPOLIA_RPC_URL e PRIVATE_KEY
        string memory privateKeyStr = vm.envString("PRIVATE_KEY");
        // Adiciona prefixo 0x se não existir
        if (bytes(privateKeyStr)[0] != "0" || bytes(privateKeyStr)[1] != "x") {
            privateKeyStr = string(abi.encodePacked("0x", privateKeyStr));
        }
        uint256 deployerPrivateKey = vm.parseUint(privateKeyStr);
        vm.startBroadcast(deployerPrivateKey);

        LoanManager loanManager = new LoanManager();

        console.log("LoanManager deployed at:", address(loanManager));

        vm.stopBroadcast();
    }
}