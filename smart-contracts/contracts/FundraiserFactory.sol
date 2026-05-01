// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Fundraiser.sol";

/**
 * @title FundraiserFactory
 * @dev Factory contract to deploy and track individual Fundraiser contracts.
 */
contract FundraiserFactory {
    address[] public fundraisers;

    event FundraiserCreated(
        address indexed fundraiserAddress,
        address indexed creator,
        string title,
        uint256 goal
    );

    /**
     * @dev Deploys a new Fundraiser contract and stores its address.
     */
    function createFundraiser(
        string memory _title,
        string memory _description,
        uint256 _goal
    ) external {
        Fundraiser newFundraiser = new Fundraiser(
            msg.sender,
            _title,
            _description,
            _goal
        );
        
        fundraisers.push(address(newFundraiser));
        
        emit FundraiserCreated(
            address(newFundraiser),
            msg.sender,
            _title,
            _goal
        );
    }

    /**
     * @dev Returns all deployed fundraiser addresses.
     */
    function getFundraisers() external view returns (address[] memory) {
        return fundraisers;
    }
}
