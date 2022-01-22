import { Component } from "react";
import Web3 from "web3";

//services
import { AlertsService } from './alerts.service';
import { ContractsService } from './contracts.service';
import { ProfilesService } from './profiles.service';
import { RequestsService } from './requests.service';

let web3;
const alert = new AlertsService();
const contracts = new ContractsService();
const profiles = new ProfilesService();
const requests = new RequestsService();

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
                .deploy({ data: contract.bytecode, arguments: [data.firstName, data.lastName, data.email] })
                .send({ from: accounts[0], gas: '10000000' });

            //persist profile contract address data in db
            var payload = {
                address: result.options.address
            }

            const res = await profiles.createProfile(payload);
            alert.success('🦄  Profile Created!');
            return res;
        } catch (error) {
            if (error.code === 4001) {
                alert.error('You need to accept the transaction in order to create a profile');
                return;
            }
            alert.error('Unexpected error ocurred: ' + error);
        }
    };


    async verify(address) {
        try {
            //get contract abi & byte code to deploy
            const contract = await contracts.getContract();
            //get user accounts
            const accounts = await web3.eth.getAccounts();
            //create contract instance
            const contractInstance = new web3.eth.Contract(JSON.parse(contract.abi), address);
            //call verify account
            await contractInstance.methods
                .verifyOwnership()
                .send({ from: accounts[0], gas: '10000000' })
                .on('receipt', (receipt) => {
                    console.log("ON receipt:", receipt);
                })
                .on('error', (err) => {
                    alert.error('Only the owner of the contract can login');
                });
            alert.success('🦄  You logged in successfully!');
        } catch (error) {
            alert.error(error);
        }
    }

    async requestAccess(data) {
        try {
            //get contract abi & byte code to deploy
            const contract = await contracts.getContract();
            //get user accounts
            const accounts = await web3.eth.getAccounts();
            //create contract instance
            const contractInstance = new web3.eth.Contract(JSON.parse(contract.abi), data.address);
            //call access request for a profile contract
            await contractInstance.methods
                .requestAccess(web3.utils.toWei(data.amount, 'ether'), data.message)
                .send({ from: accounts[0], gas: '10000000' })
                .on('receipt', (receipt) => {
                    console.log("ON receipt:", receipt);
                })
                .on('error', (err) => {
                    alert.error(err);
                });
            //persist request data in db
            var payload = {
                requester_address: accounts[0],
                profile_address: data.address,
                amount: data.amount,
                message: data.message
            }
            const res = await requests.createRequest(payload);
            alert.success('🦄  Access requested!');
            return res;
        } catch (error) {
            alert.error(error);
        }
    }

    async acceptRequest(data) {
        try {
            //get contract abi & byte code to deploy
            const contract = await contracts.getContract();
            //get user accounts
            const accounts = await web3.eth.getAccounts();
            //create contract instance
            const contractInstance = new web3.eth.Contract(JSON.parse(contract.abi), data.address);
            //accept a request from an address
            await contractInstance.methods
                .approveAccess(data.requester_address)
                .send({ from: accounts[0], gas: '10000000' })
                .on('receipt', (receipt) => {
                    console.log("ON receipt:", receipt);
                })
                .on('error', (err) => {
                    alert.error('Only the owner of the profile can accept the request.');
                });
            //persist request data in db
            const res = await requests.acceptRequestById(data.id);
            alert.success('🦄  Request accepted!');
            return res;
        } catch (error) {
            alert.error(error);
        }
    }

}
