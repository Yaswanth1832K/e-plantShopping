import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container glass-morphism animate-fade-in" style={{ padding: '40px', borderRadius: '24px' }}>
      <p className="about-us-description serif" style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'white' }}>
        Where Nature Meets Luxury
      </p>
      <p className="about-us-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9, color: 'white' }}>
        At Evergreen Luxury, we curate more than just plants; we craft experiences of tranquility.
        Our selection of high-end greenery is designed to transform your space into a sanctuary
        of peace and sophistication. Join us in our mission to bring the elegance of nature
        directly to your sophisticated lifestyle.
      </p>
    </div>
  );
}

export default AboutUs;
