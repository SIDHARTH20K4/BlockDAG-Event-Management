import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';
import NFTQRCode from './QrCodeGenerator';
import { FaTrash } from 'react-icons/fa';

function EventDetails({ events, setEvents, onPay }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const event = events.find(e => e.id === id || e.id === parseInt(id, 10));

  if (!event) return <p>Event not found</p>;

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${event.title}"?`);
    if (confirmDelete) {
      const updatedEvents = events.filter(e => e.id !== event.id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      navigate('/');
    }
  };

  return (
    <>
      <div className="event-details-container">
        <div className="delete-icon" onClick={handleDelete}>
          <FaTrash />
        </div>
        <div className="event-details-image-wrapper full-width">
          <img
            src={event.image}
            alt={event.title}
            className="event-detail-image"
            onClick={() => setShowModal(true)}
            style={{ cursor: 'zoom-in' }}
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
        </div>

        <div className="qr-code-wrapper">
          <NFTQRCode
            ipfsHash={event.ipfsCid}
            eventName={event.title}
            eventEndsEpoch={event.epochEnd}
          />
        </div>

        <div className="event-details-buttons">
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={onPay}>Pay & Register</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>
            <img src={event.image} alt={event.title} className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default EventDetails;
