import React, { useState, useEffect } from 'react';

const AddReview = ({ user, onAddTestimonial }) => {
  const [newTestimonialContent, setNewTestimonialContent] = useState('');
  const [selectedShowId, setSelectedShowId] = useState('');
  const [shows, setShows] = useState([]); // To store available shows

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/shows');
        const shows = await response.json();
        setShows(shows);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  const handleCreateTestimonial = async () => {
    if (!selectedShowId || !newTestimonialContent.trim()) {
      console.error('Please select a show and enter some content');
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newTestimonialContent,
          show_id: selectedShowId,
          user_id: user.sub, // Ensure you're using the correct user ID
        }),
      });

      if (response.ok) {
        const newTestimonial = await response.json();
        onAddTestimonial(newTestimonial); // Pass the new testimonial to the parent component
        setNewTestimonialContent(''); // Clear the input field
        setSelectedShowId(''); // Reset the selected show
      } else {
        console.error('Failed to create testimonial');
      }
    } catch (error) {
      console.error('Error creating testimonial:', error);
    }
  };

  return (
    <div className="add-testimonial-container">
      <div className="profile-testimonials-content">
        <select
          value={selectedShowId}
          onChange={(e) => setSelectedShowId(e.target.value)}
          className="add-review-select"
        >
          <option value="">Select Show</option>
          {shows.map((show) => (
            <option key={show.id} value={show.id}>
              {show.name}
            </option>
          ))}
        </select>
        <textarea
          value={newTestimonialContent}
          onChange={(e) => setNewTestimonialContent(e.target.value)}
          placeholder="Write your review here..."
          className="edit-testimonial-box"
        />
        <div className="button-group">
          <button onClick={handleCreateTestimonial} className="profile-buttons">
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;