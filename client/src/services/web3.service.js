import { Component } from "react";
import Web3 from "web3";
import { AlertsService } from './alerts.service';
import { ContractsService } from './contracts.service';
import { ProfilesService } from './profiles.service';

let web3;
const alert = new AlertsService();
const contracts = new ContractsService();
const profiles = new ProfilesService();

export class Web3Service extends Component {

    async connect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return true;
        } catch (error) {
            if (error.code === 4001) {
                alert.warn('You need to connect');
                return false;
            } else if (error.code === -32002) {
                alert.warn('You already have an active connection request');
                return false;
            }
            alert.error('Unexpected error ocurred, please try again later');
            return false;
        }
    }


    async checkConnection() {
        // Check if browser is running Metamask
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }

        try {
            // Check if User is already connected by retrieving the accounts
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            alert.error('Unexpected error ocurred, please try again');
        }
    }


    async deploy(data) {
        try {
            //get contract abi & byte code to deploy
            const contract = await contracts.getContract();
            //get user accounts
            const accounts = await web3.eth.getAccounts();
            //propmt metamask to deploy contract
            const result = await new web3.eth.Contract(JSON.parse(contract.abi))
                .deploy({ data: contract.bytecode, arguments: ['Ceres Test'] })
                .send({ from: accounts[0], gas: '10000000' });

            //persist game data in db
            var payload = {
                address: result.options.address
            }

            const res = await profiles.createProfile(payload);
            alert.success('🦄  Profile Created!');
            return res;
        } catch (error) {
            if (error.code === 4001) {
                alert.error('You need to accept the transaction in order to create a game.');
                return;
            }
            alert.error('Unexpected error ocurred: ' + error);
        }
    };

}
