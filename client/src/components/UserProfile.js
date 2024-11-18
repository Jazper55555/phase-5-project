import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import AddReview from "./AddReview";
import Sponsors from "./Sponsors";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newContent, setNewContent] = useState("");


  useEffect(() => {
    const fetchTestimonials = async () => {
      if (user && user.sub) {  // Check if user and user.sub are available
        try {
          const response = await fetch(`https://iac-api-fv75.onrender.com/users/${user.sub}/testimonials`);
          const testimonials = await response.json();
          setTestimonials(testimonials);
        } catch (error) {
          console.error('Error fetching testimonials:', error);
        }
      }
    };

    if (isAuthenticated) {
      fetchTestimonials();
    }
  }, [isAuthenticated, user]);

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial.id);
    setNewContent(testimonial.content); // Pre-fill with existing content
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://iac-api-fv75.onrender.com/testimonials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (response.ok) {
        // Update the testimonial in the state
        setTestimonials((prev) =>
          prev.map((testimonial) =>
            testimonial.id === id ? { ...testimonial, content: newContent } : testimonial
          )
        );
        setEditingTestimonial(null); // Close edit mode
      } else {
        console.error("Failed to update testimonial");
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://iac-api-fv75.onrender.com/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the testimonial from the state
        setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
      } else {
        console.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleAddTestimonial = (newTestimonial) => {
    console.log(newTestimonial)
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <div className="profile-container">
          <div className="profile-header">
              <img src={user.picture} alt={user.name} className="avatar-image"/>
              <h5 className="profile-headers">Name:</h5>
              <p className="profile-content">{user.nickname}</p>
              <h5 className="profile-headers">Email:</h5>
              <p className="profile-content">{user.email}</p>
              <h5 className="profile-headers">Reviews</h5>
              <div className="profile-testimonials">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-container">
                    <div className="profile-testimonials-content">
                      {editingTestimonial === testimonial.id ? (
                        <div className="edit-testimonial-box">
                          <textarea
                            type="text"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                          />
                        </div>
                      ) : (
                        <p>{testimonial.content}</p>
                      )}
                      <div className="button-group">
                        <button onClick={() => handleEdit(testimonial)} className="profile-buttons">
                          Edit
                        </button>
                        <button onClick={() => handleUpdate(testimonial.id)} className="profile-buttons">
                          Save
                        </button>
                        <button onClick={() => handleDelete(testimonial.id)} className="profile-buttons">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            <h5 className="profile-headers">Add a Review</h5>
            <br/>
            <AddReview user={user} onAddTestimonial={handleAddTestimonial} />
          </div>
        </div>
        <Sponsors />
      </div>
    )
  );
};

export default Profile;
