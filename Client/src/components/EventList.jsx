import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './EventList.css';

function EventList({ events, deleteEvent }) {
  const navigate = useNavigate();

  return (
    <div className="event-list">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <div className="event-card-header">
            <div
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevents navigating when clicking the trash icon
                deleteEvent(event.id); // 💥 Triggers delete
              }}
            >
              <FaTrash />
            </div>
            <img
              src={event.image}
              alt={event.title}
              className="event-image"
              onClick={() => navigate(`/event/${event.id}`)}
            />
          </div>

          <div
            className="event-card-body"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <h2 className="event-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>
            <p className="event-details">
              {event.date} - {event.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventList;
