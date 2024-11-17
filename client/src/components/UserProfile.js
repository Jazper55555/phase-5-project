import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import Sponsors from "./Sponsors";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (user && user.sub) {  // Check if user and user.sub are available
        try {
          const response = await fetch(`/users/${user.sub}/testimonials`);
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

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;  // Show a loading state until user data is available
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
                <p key={testimonial.id} className="profile-testimonials-content">
                  {testimonial.content}
                </p>
              ))}
              </div>
          </div>
        </div>
        <Sponsors />
      </div>
    )
  );
};

export default Profile;
