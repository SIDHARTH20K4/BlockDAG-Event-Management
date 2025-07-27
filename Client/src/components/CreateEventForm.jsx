import React, { useState } from 'react';
import './CreateEventForm.css';
import { useCreateEvent } from '../constants/Connections'; // ✅ Adjust path as needed

const CreateEventForm = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    hostName: '',
    hostContact: '',
    imageFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { createEvent, isPending, isSuccess, error } = useCreateEvent();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageFile) {
      setMessage('❌ Please select an image.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Upload image to IPFS
      const imageData = new FormData();
      imageData.append('file', formData.imageFile);

      const response = await fetch('http://localhost:5000/upload-to-ipfs', {
        method: 'POST',
        body: imageData,
      });

      const data = await response.json();
      if (!data.ipfsHash) throw new Error('IPFS upload failed');

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${data.ipfsHash}`;
      const epochEnd = Math.floor(new Date(`${formData.date}T23:59:59`).getTime() / 1000);

      // ✅ Pass ONLY the required 4 fields to smart contract
      createEvent({
        title: formData.title,
        location: formData.location,
        date: formData.date,
        price: (formData.price),
      });

      // ✅ Keep the rest of the fields (optional) for frontend/display/IPFS
      console.log('Extra metadata (frontend/IPFS only):', {
        description: formData.description,
        hostName: formData.hostName,
        hostContact: formData.hostContact,
        image: imageUrl,
        ipfsCid: data.ipfsHash,
        epochEnd,
      });
      const eventData = {
        ...formData,
        image: imageUrl,
        ipfsCid: data.ipfsHash,
        epochEnd,
      };
      addEvent(eventData);
      setMessage(' Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        hostName: '',
        hostContact: '',
        imageFile: null,
      });
      setMessage('📤 Event submitted to blockchain!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        hostName: '',
        hostContact: '',
        imageFile: null,
      });
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('❌ Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <h2 className="form-title">Create New Event</h2>
        {message && <p className="text-center mb-4 font-medium text-purple-600">{message}</p>}
        {isPending && <p className="text-yellow-500 text-sm">⏳ Waiting for transaction...</p>}
        {isSuccess && <p className="text-green-600 text-sm">✅ Event created on-chain!</p>}
        {error && <p className="text-red-500 text-sm">❌ {error.message}</p>}

        <form onSubmit={handleSubmit} className="create-event-form">
          {[
            { label: 'Title', name: 'title' },
            { label: 'Description', name: 'description' },
            { label: 'Date', name: 'date', type: 'date' },
            { label: 'Location', name: 'location' },
            { label: 'Price (ETH)', name: 'price' },
            { label: 'Host Name', name: 'hostName' },
            { label: 'Host Contact', name: 'hostContact' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
          ))}

          <div>
            <label className="block font-semibold">Event Image</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading || isPending}>
            {loading ? 'Uploading...' : isPending ? 'Creating on-chain...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
