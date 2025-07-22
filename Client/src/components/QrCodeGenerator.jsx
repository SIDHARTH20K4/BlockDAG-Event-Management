import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function NFTQRCode({ contractAddress, tokenId, ipfsHash }) {
  // Example: encode contract & token ID or IPFS hash
  const nftUrl = ipfsHash
    ? `https://ipfs.io/ipfs/${ipfsHash}`
    : `ethereum:${contractAddress}/${tokenId}`;

  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <h2>Your NFT Ticket QR Code</h2>
      <QRCodeSVG
        value={nftUrl}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
      <p style={{ marginTop: '1rem', wordBreak: "break-all" }}>{nftUrl}</p>
    </div>
  );
}

export default NFTQRCode;
