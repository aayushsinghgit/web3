// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Fundraiser
 * @dev Individual fundraiser contract for the Vaulta platform.
 */
contract Fundraiser {
    address public creator;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public totalRaised;
    bool public isWithdrawn;

    event DonationReceived(address indexed donor, uint256 amount);
    event FundsWithdrawn(address indexed creator, uint256 amount);

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can perform this action");
        _;
    }

    constructor(
        address _creator,
        string memory _title,
        string memory _description,
        uint256 _goal
    ) {
        creator = _creator;
        title = _title;
        description = _description;
        goal = _goal;
    }

    /**
     * @dev Allows users to donate ETH to the fundraiser.
     */
    function donate() external payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(!isWithdrawn, "Fundraiser has already been finalized");
        
        totalRaised += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * @dev Allows the creator to withdraw the raised funds.
     */
    function withdraw() external onlyCreator {
        require(totalRaised > 0, "No funds to withdraw");
        require(!isWithdrawn, "Funds already withdrawn");

        uint256 amount = address(this).balance;
        isWithdrawn = true;
        
        (bool success, ) = payable(creator).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(creator, amount);
    }

    /**
     * @dev Returns the current status and metadata of the fundraiser.
     */
    function getDetails() external view returns (
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _totalRaised,
        bool _isWithdrawn,
        address _creator
    ) {
        return (title, description, goal, totalRaised, isWithdrawn, creator);
    }
}
