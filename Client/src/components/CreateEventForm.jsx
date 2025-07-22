import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEventForm.css'; // Import your CSS

function CreateEventForm({ addEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    image: '',
    hostName: '',
    hostContact: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    navigate('/');
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <h2 className="form-title">Create New Event</h2>
        <form onSubmit={handleSubmit} className="create-event-form">
          {[
            { name: 'title', type: 'text', placeholder: 'Event Title' },
            { name: 'description', type: 'text', placeholder: 'Description' },
            { name: 'date', type: 'date', placeholder: 'Date' },
            { name: 'location', type: 'text', placeholder: 'Location' },
            { name: 'price', type: 'number', placeholder: 'Price (ETH)' },
            { name: 'image', type: 'text', placeholder: 'Image URL' },
            { name: 'hostName', type: 'text', placeholder: 'Host Name' },
            { name: 'hostContact', type: 'tel', placeholder: 'Host Contact' },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventForm;
