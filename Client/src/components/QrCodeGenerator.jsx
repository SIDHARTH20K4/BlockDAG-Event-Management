import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function NFTQRCode({ ipfsHash, contractAddress, tokenId, eventName, eventEndsEpoch }) {
  let displayUrl = '';
  let label = 'NFT Ticket';

  if (ipfsHash) {
    displayUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
    label = eventName ? `${eventName} Ticket` : label;
  } else if (contractAddress && tokenId) {
    displayUrl = `ethereum:${contractAddress}/${tokenId}`;
  }

  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <h2>{label} QR Code</h2>
      <QRCodeSVG
        value={displayUrl}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
      <p style={{ marginTop: '1rem', wordBreak: "break-all" }}>{displayUrl}</p>
      {eventEndsEpoch && (
        <p style={{ fontSize: '0.85rem', color: 'gray' }}>
          Expires on: {new Date(eventEndsEpoch * 1000).toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default NFTQRCode;
