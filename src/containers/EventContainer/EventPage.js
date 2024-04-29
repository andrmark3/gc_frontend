import './EventPage.css';
import React, { useEffect, useState } from 'react';
import EventCard from '../../components/Events/EventCard';
import { axiosInstance } from '../../services/axiosInterceptor';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('api/events/'); // Use your Axios instance for making requests
        setEvents(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-container">
      <h1 className="event-title">Event page</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-list-item"> {/* Use event.id as key */}
              <EventCard
                id={event.id}
                title={event.title}
                short_description={event.short_description}
                long_description={event.long_description}
                location={event.location}
                imageUrl={event.image}
                launch_date={event.launch_date}
                register_end_date={event.register_end_date}
                register_start_date={event.register_start_date}
              />
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
