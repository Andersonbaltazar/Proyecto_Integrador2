import React from 'react';

const UserProfile = ({ provider }) => {

  return (
    <section className="user-profile-section">
        <img src={provider.avatar} alt="Avatar del usuario" className="user-avatar" />
        <h2 className="user-name">{provider.name}</h2>
    </section>
  );
};

export default UserProfile;