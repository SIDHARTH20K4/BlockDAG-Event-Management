import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import CreateEventForm from './components/CreateEventForm';
import './App.css';

function App() {
  const initialEvents = [
    {
      id: 1,
      title: 'Blockchain Summit',
      description: 'Learn Blockchain and networking.',
      date: '2025-08-01',
      location: 'Bangalore',
      price: '0.02',
      Host:'John Doe',
      contact:'9841023456',
      image: 'https://imgs.search.brave.com/JX9SHTTxtvR9fslKuK4IPf_V62mIr-g8NyxfIETkY0g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93b3Js/ZGJsb2NrY2hhaW5z/dW1taXQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzEx/LzMucG5n',
    },
    {
      id: 2,
      title: 'NFT Workshop',
      description: 'Create and understand NFTs deeply.',
      date: '2025-08-05',
      location: 'Hyderabad',
      price: '0.03',
      Host:'John Doe',
      contact:'9841023456',
      image: 'https://imgs.search.brave.com/qgl0d3BAQ4l0r0xOxSuYr47B0PgZyQvBPFHN0s6mBj8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9qdXN0/Y3JlYXRpdmUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzA1L3dlYjMtbmZ0/cy1uZXdiaWVzLnBu/Zy53ZWJw',
    },
    {
      id: 3,
      title: 'NFT Workshop',
      description: 'Create and understand NFTs deeply.',
      date: '2025-08-05',
      location: 'Chennai',
      price: '0.03',
      Host:'John Doe',
      contact:'9841023456',
      image: 'https://imgs.search.brave.com/CuQ9yTteMuQRdWZgXWYEV8yA2b8hncEbcKrzCeCAbtc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9uZnRl/dmVuaW5nLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/OS90aHVtYm5haWwt/d2hhdC1hcmUtbmZ0/LWdhbWVzLTc2OHg0/MzIuanBn',
    },
    {
      id: 4,
      title: 'Wagmi',
      description: 'Understand Wagmi.',
      date: '2025-08-05',
      location: 'Delhi',
      price: '0.03',
      Host:'John Doe',
      contact:'9841023456',
      image: 'https://imgs.search.brave.com/jdw_69Zf4YJD4Ez5PK5rNpYsRV5m6yb6WVfFgmXbYJ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbmdl/bGhhY2suY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9pbWFnZTEt/MS5qcGc',
    },
    {
      id: 5,
      title: 'Music Festival',
      description: 'Enjoy and live music.',
      date: '2025-08-05',
      location: 'Hyderabad',
      price: '0.03',
      Host:'John Doe',
      contact:'9841023456',
      image: 'https://imgs.search.brave.com/DVA2AnYXk5KoOtLMuMB3-5nphXAtFwecGs7hr1YL18A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/MzE1LzIxMy9zbWFs/bC9jcm93ZC1yYWlz/aW5nLWhhbmRzLWF0/LXRoZS1yb2NrLXNo/b3ctYXVkaWVuY2Ut/aW4tZnJvbnQtb2Yt/dGhlLXN0YWdlLWxp/dmUtcm9jay1jb25j/ZXJ0LXJvY2stbXVz/aWNpYW5zLW9uLXRo/ZS1zdGFnZS1waG90/by5qcGc',
    },
  ];

  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : initialEvents;
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  const handlePay = () => {
    alert('Blockchain payment integration will be added here.');
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <EventList events={events} />
            </>
          }
        />
        <Route
          path="/create"
          element={<CreateEventForm addEvent={addEvent} />}
        />
        <Route
          path="/event/:id"
          element={<EventDetails events={events} onPay={handlePay} />}
        />
      </Routes>
    </div>
  );
}

export default App;
