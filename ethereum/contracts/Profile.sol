//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7;

contract Profiles {

    struct Profile {
        address account;
        string name;
        string surname;
        uint256 dob;
    }

    struct Access {
        address account;
        bool approved;
    }

    Profile private ownerProfile;
    address[] public accessRequests;
    mapping(address => Access) private accessList;

    constructor(string memory _name, string memory _surname, uint256 _dob) {
        ownerProfile = Profile(
            {
                account: msg.sender, 
                name: _name, 
                surname: _surname,
                dob: _dob            
            });
    }

    function getProfile() external view onlyApproved returns (Profile memory) {
        Profile memory p;
        p = ownerProfile;
        return p;
    }

    function requestAccess() external {
        accessRequests.push(msg.sender);
        accessList[msg.sender] = Access(msg.sender, false);
    }

    function approveAccess(address _address) external onlyOwner {
        accessList[_address] = Access(_address, true);
    }

    function rejectAccess(address _address) external onlyOwner {
        accessList[_address] = Access(_address, false);
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

}