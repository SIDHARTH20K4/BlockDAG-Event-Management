// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract EventContract is ERC721URIStorage, ERC2981, Ownable, ReentrancyGuard, Pausable {
    struct Ticket {
        address owner;
        string eventDetails;
        uint256 originalPrice;
        uint256 expirationDate;
        uint256 maxResalePrice;
        string metadataURI;
        address[] ownershipHistory;
    }

    mapping(string => Ticket) public tickets;
    uint256 public royaltyPercentage = 5; // 5% default royalty

    event TicketMinted(
        string indexed uniqueID,
        address indexed owner,
        string eventDetails,
        uint256 originalPrice,
        uint256 expirationDate
    );

    event TicketTransferred(
        string indexed uniqueID,
        address indexed from,
        address indexed to,
        uint256 resalePrice
    );

    event TicketMetadataUpdated(uint256 indexed tokenId, string newURI);
    event RoyaltyInfoChanged(address receiver, uint96 feeBasisPoints);
    event RoyaltyPercentageChanged(uint256 newPercentage);

    constructor() ERC721("EventTicket", "ET") Ownable(msg.sender) {}

    function _getTokenId(string memory uniqueID) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(uniqueID)));
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function mintTicket(
        address to,
        string memory uri,
        string memory eventDetails,
        uint256 originalPrice,
        uint256 expirationDate,
        string memory uniqueID
    ) public onlyOwner whenNotPaused {
        require(bytes(uniqueID).length > 0, "Empty ID");
        require(bytes(uri).length > 0, "Empty URI");
        require(expirationDate > block.timestamp, "Invalid expiration");
        require(to != address(0), "Zero address");

        uint256 tokenId = _getTokenId(uniqueID);
        require(!exists(tokenId), "Token exists");

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        address[] memory history;
        tickets[uniqueID] = Ticket({
            owner: to,
            eventDetails: eventDetails,
            originalPrice: originalPrice,
            expirationDate: expirationDate,
            maxResalePrice: originalPrice,
            metadataURI: uri,
            ownershipHistory: history
        });
        tickets[uniqueID].ownershipHistory.push(to);

        emit TicketMinted(uniqueID, to, eventDetails, originalPrice, expirationDate);
    }

    function transferTicket(
        string memory uniqueID,
        address to,
        uint256 resalePrice
    ) public payable nonReentrant whenNotPaused {
        require(to != address(0), "Zero address");
        Ticket storage ticket = tickets[uniqueID];
        require(ticket.owner == msg.sender, "Not owner");
        require(block.timestamp < ticket.expirationDate, "Expired");
        require(resalePrice <= ticket.maxResalePrice, "Price too high");
        require(msg.value >= resalePrice, "Insufficient payment");

        uint256 tokenId = _getTokenId(uniqueID);
        uint256 royaltyAmount = (resalePrice * royaltyPercentage) / 100;
        
        // State changes before external calls
        ticket.owner = to;
        ticket.ownershipHistory.push(to);
        _transfer(msg.sender, to, tokenId);

        // Safe transfers
        (bool sentRoyalty, ) = payable(owner()).call{value: royaltyAmount}("");
        (bool sentPayment, ) = payable(msg.sender).call{value: resalePrice - royaltyAmount}("");
        require(sentRoyalty && sentPayment, "Transfer failed");

        // Return excess payment
        if (msg.value > resalePrice) {
            (bool sentExcess, ) = payable(msg.sender).call{value: msg.value - resalePrice}("");
            require(sentExcess, "Excess return failed");
        }

        emit TicketTransferred(uniqueID, msg.sender, to, resalePrice);
    }

    function mintPaidTicket(
        address to,
        string memory uri,
        string memory eventDetails,
        uint256 price,
        uint256 expirationDate,
        string memory uniqueID
    ) public payable nonReentrant whenNotPaused {
        require(msg.value >= price, "Insufficient payment");
        require(bytes(uniqueID).length > 0, "Empty ID");
        require(bytes(uri).length > 0, "Empty URI");
        require(to != address(0), "Zero address");
        require(expirationDate > block.timestamp, "Invalid expiration");

        uint256 tokenId = _getTokenId(uniqueID);
        require(!exists(tokenId), "Token exists");

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        address[] memory history;
        tickets[uniqueID] = Ticket({
            owner: to,
            eventDetails: eventDetails,
            originalPrice: price,
            expirationDate: expirationDate,
            maxResalePrice: price,
            metadataURI: uri,
            ownershipHistory: history
        });
        tickets[uniqueID].ownershipHistory.push(to);

        (bool sent, ) = payable(owner()).call{value: price}("");
        require(sent, "Payment failed");

        if (msg.value > price) {
            (bool sentExcess, ) = payable(msg.sender).call{value: msg.value - price}("");
            require(sentExcess, "Excess return failed");
        }

        emit TicketMinted(uniqueID, to, eventDetails, price, expirationDate);
    }

    // Admin functions
    function updateTokenURI(uint256 tokenId, string memory newURI) public onlyOwner {
        require(exists(tokenId), "Nonexistent token");
        _setTokenURI(tokenId, newURI);
        emit TicketMetadataUpdated(tokenId, newURI);
    }

    function setRoyaltyInfo(address receiver, uint96 feeBasisPoints) external onlyOwner {
        _setDefaultRoyalty(receiver, feeBasisPoints);
        emit RoyaltyInfoChanged(receiver, feeBasisPoints);
    }

    function setRoyaltyPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage <= 20, "Max 20%");
        royaltyPercentage = _percentage;
        emit RoyaltyPercentageChanged(_percentage);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    
}