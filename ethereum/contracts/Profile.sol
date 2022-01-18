//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7;

/*
 * Author: Kevin Chen
 * Created date: 17.01.2022
 * Last updated: 18.01.2022 22:11
 * Description: standard smart contract for personal profile and verification of ownership
 */

contract Profiles {
    struct Profile {
        address account;
        string name;
        string surname;
        string email;
    }

    struct AccessRequest {
        address account;
        uint256 bid;
        string message;
    }

    struct Access {
        address account;
        uint256 fee;
        bool approved;
    }

    Profile private ownerProfile;
    AccessRequest[] public accessRequests;
    mapping(address => Access) private accessList;

    constructor(
        string memory _name,
        string memory _surname,
        string memory _email
    ) {
        //ask for small donation?
        ownerProfile = Profile({
            account: msg.sender,
            name: _name,
            surname: _surname,
            email: _email
        });
    }

    /*
     * User of the data needs to be approved and pays
     * the agreed fees when accessing the data.
     */
    function getProfile()
        external
        payable
        onlyApproved
        feeCheck
        returns (Profile memory)
    {
        Profile memory p;
        p = ownerProfile;
        payable(ownerProfile.account).transfer(msg.value);
        return p;
    }

    /*
     * Profile access request should be an auction where
     * an user raises a bid in ETH and a support message.
     */
    function requestAccess(uint256 _bid, string memory _message) external {
        accessRequests.push(AccessRequest(msg.sender, _bid, _message));
        accessList[msg.sender] = Access(msg.sender, _bid, false);
    }

    /*
     * Approve an access request and entering the address into the access
     * mapping.
     */
    function approveAccess(address _address) external onlyOwner {
        accessList[_address].approved = true;
    }

    /*
     * Function can be used by the owner to verify that he/she owns
     * the contract and the underlying the profile data.
     */
    function verifyOwnership() external view onlyOwner returns (bool) {
        return true;
    }

    modifier onlyOwner() {
        require(
            ownerProfile.account == msg.sender,
            "Only owner of the profile can call this"
        );
        _;
    }

    modifier onlyApproved() {
        require(
            accessList[msg.sender].approved == true,
            "Only approved accounts can call this"
        );
        _;
    }

    modifier feeCheck() {
        require(
            accessList[msg.sender].fee == msg.value,
            "Fee agreed is not the same as the fee offered"
        );
        _;
    }
}
