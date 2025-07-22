// EventDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';   // <-- Correct import
import './EventDetails.css';

function EventDetails({ events, onPay }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // Find event by numeric id
  const event = events.find(e => e.id === parseInt(id, 10));

  if (!event) {
    return <p>Event not found</p>;
  }

  // Make the QR value (e.g., link to IPFS or NFT unique hash)
  // Fallback hash is just for safety; replace with your real default as needed
  const qrValue = `https://ipfs.io/ipfs/${event.ipfsCid || "QmPlaceholderCID"}`;

  return (
    <div className="event-details-container">
      <div className="event-details-content">
        <div className="event-details-image-wrapper">
          <img
            src={event.image}
            alt={event.title}
            className="event-detail-image"
          />
        </div>

        <div className="event-details-text">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.date} - {event.location}</p>
          <p>Price: {event.price} ETH</p>
          <h4>Organizer Information:</h4>
          <p>Host: {event.hostName || "John Doe"}</p>
          <p>Contact: {event.hostContact || "9912348567"}</p>
          <div className="qr-code-wrapper">
            <QRCodeSVG value={qrValue} size={200} />
            <p>Scan this QR code at the venue</p>
          </div>
        </div>
      </div>

      <div className="event-details-buttons">
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={onPay}>Pay & Register</button>
      </div>
    </div>
  );
}

export default EventDetails;
