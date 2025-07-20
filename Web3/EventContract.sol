// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IEventChainContract.sol";

contract EventContract is ERC721, ERC721URIStorage, ERC721Burnable, Ownable, IEventChainContract {

    // Counter to keep track of token IDs
    uint256 private ticketIdCounter;

    // Stores details of each ticket by ID
    struct TicketInfo {
        string eventInfo;               // Description of the event
        uint256 basePrice;              // Original price of the ticket
        uint256 expiryTimestamp;        // Timestamp after which the ticket is invalid
        address[] pastOwners;           // List of all previous ticket holders
        bool usedStatus;                // Marks whether ticket was validated at the event
    }

    // Maps tokenId to its ticket details
    mapping(uint256 => TicketInfo) private ticketRecords;

    // Maps tokenId to its maximum allowed resale price
    mapping(uint256 => uint256) public resalePriceLimit;

    constructor(address contractOwner)
        ERC721("EventChainTickets", "ECT")
        Ownable(contractOwner)
    {}

    /**
     * @notice Mints a new ticket with given data
     * @param recipient Address that will own the ticket
     * @param metadataURI Token metadata URI
     * @param eventInfo Description of the event
     * @param basePrice Price set for the ticket
     * @param expiryTimestamp Expiry time after which ticket is invalid
     */
    function safeMint(address recipient, string memory metadataURI, string memory eventInfo, uint256 basePrice, uint256 expiryTimestamp) public override {
        uint256 newTicketId = ticketIdCounter;
        ticketIdCounter += 1;
        _safeMint(recipient, newTicketId);
        _setTokenURI(newTicketId, metadataURI);

        address[] memory emptyOwners;

        ticketRecords[newTicketId] = TicketInfo({
            eventInfo: eventInfo,
            basePrice: basePrice,
            expiryTimestamp: expiryTimestamp,
            pastOwners: emptyOwners,
            usedStatus: false
        });

        ticketRecords[newTicketId].pastOwners.push(recipient);

        emit TicketMinted(newTicketId, recipient, eventInfo, basePrice, expiryTimestamp);
    }

    /**
     * @notice Validates a ticket for entry to the event
     * @param ticketId ID of the ticket to be validated
     */
    function validateTicket(uint256 ticketId) public override {
        _requireOwned(ticketId);
        require(!ticketRecords[ticketId].usedStatus, "Ticket already used");
        require(_isTicketValid(ticketId), "Ticket has expired");

        ticketRecords[ticketId].usedStatus = true;
        emit TicketValidated(ticketId, msg.sender);
    }

    /**
     * @notice Returns previous owners of a ticket
     * @param ticketId ID of the ticket
     */
    function getTicketHistory(uint256 ticketId) public view override returns (address[] memory) {
        _requireOwned(ticketId);
        return ticketRecords[ticketId].pastOwners;
    }

    /**
     * @notice Returns both used and validity status of the ticket
     * @param ticketId ID of the ticket
     */
    function getTicketStatus(uint256 ticketId) public view override returns (bool used, bool valid) {
        _requireOwned(ticketId);
        used = ticketRecords[ticketId].usedStatus;
        valid = _isTicketValid(ticketId);
    }

    /**
     * @notice Allows the contract owner to update ticket event info and metadata
     * @param ticketId ID of the ticket
     * @param updatedEventInfo New description of the event
     * @param updatedURI New metadata URI
     */
    function updateTicketMetadata(uint256 ticketId, string memory updatedEventInfo, string memory updatedURI) public override onlyOwner {
        _requireOwned(ticketId);
        ticketRecords[ticketId].eventInfo = updatedEventInfo;
        _setTokenURI(ticketId, updatedURI);
        emit TicketMetadataUpdated(ticketId, updatedEventInfo, updatedURI);
    }

    /**
     * @notice Allows the contract owner to set a maximum resale price
     * @param ticketId ID of the ticket
     * @param limitPrice New price limit
     */
    function setMaxResalePrice(uint256 ticketId, uint256 limitPrice) public override onlyOwner {
        _requireOwned(ticketId);
        resalePriceLimit[ticketId] = limitPrice;
        emit TicketMaxResalePriceSet(ticketId, limitPrice);
    }

    /**
     * @notice Burns a ticket if it has expired
     * @param ticketId ID of the ticket
     */
    function burnExpiredTickets(uint256 ticketId) public override onlyOwner {
        _requireOwned(ticketId);
        require(!_isTicketValid(ticketId), "Ticket is still valid");
        _burn(ticketId);
        emit TicketExpired(ticketId);
    }

    /**
     * @notice Transfers ticket and updates its ownership history
     * @param sender Current owner
     * @param receiver New owner
     * @param ticketId ID of the ticket
     */
    function transferWithHistoryUpdate(address sender, address receiver, uint256 ticketId) public override onlyOwner {
        _requireOwned(ticketId);
        require(sender != address(0) && receiver != address(0), "Invalid address");
        require(sender == ownerOf(ticketId), "Not the token owner");

        ticketRecords[ticketId].pastOwners.push(receiver);
        _transfer(sender, receiver, ticketId);
        emit TicketTransferred(ticketId, sender, receiver);
    }

    /**
     * @notice Checks if a ticket is still valid (not expired or used)
     * @param ticketId ID of the ticket
     */
    function _isTicketValid(uint256 ticketId) internal view returns (bool) {
        return (block.timestamp <= ticketRecords[ticketId].expiryTimestamp && !ticketRecords[ticketId].usedStatus);
    }

    /**
     * @dev Overrides tokenURI function from inherited contracts
     */
    function tokenURI(uint256 ticketId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(ticketId);
    }

    /**
     * @dev Overrides supportsInterface for interface detection
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function approve(address to, uint256 tokenId) public virtual override(ERC721, IERC721)  {
        revert("Approvals are disabled");
    }

    function setApprovalForAll(address operator, bool approved) public virtual override(ERC721, IERC721)  {
        revert("Approvals are disabled");
    }

}
