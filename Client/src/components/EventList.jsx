import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

function EventList({ events }) {
  const navigate = useNavigate();

  return (
    <div className="event-list">
      {events.map(event => (
        <div
          key={event.id}
          className="event-card"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          <img src={event.image} alt={event.title} className="event-image" />
          <h2 className="event-title">{event.title}</h2>
          <p className="event-description">{event.description}</p>
          <p className="event-details">{event.date} - {event.location}</p>
        </div>
      ))}
    </div>
  );
}

export default EventList;
