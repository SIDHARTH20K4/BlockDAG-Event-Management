import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateEventForm from './components/CreateEventForm';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const initialEvents = [
    {
      id: 1,
      title: 'Blockchain Summit',
      description: 'Learn Blockchain and networking.',
      date: '2025-08-01',
      location: 'Bangalore',
      price: '0.02',
      hostName: 'John Doe',
      hostContact: '9841023456',
      image: 'https://via.placeholder.com/300',
      ipfsCid: 'QmPlaceholderCID',
      epochEnd: 1754303400,
    },
  ];

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const fullEvent = {
      id: uuidv4(),
      ...newEvent,
    };
    setEvents((prev) => [...prev, fullEvent]);
  };

  const deleteEvent = (idToDelete) => {
    const filtered = events.filter((event) => event.id !== idToDelete);
    setEvents(filtered);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <EventList events={events} deleteEvent={deleteEvent} />
            </>
          }
        />
        <Route path="/event/:id" element={<EventDetails events={events} />} />
        <Route path="/create" element={<CreateEventForm addEvent={addEvent} />} />
      </Routes>
    </>
  );
};

export default App;
