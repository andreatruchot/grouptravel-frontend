import React, { useState } from 'react';

function InviteForm() {
  const [email, setEmail] = useState('');

  const handleInvite = (e) => {
    e.preventDefault();
    // Ici, ajoutez la logique pour envoyer l'invitation par e-mail
    console.log(`Invitation envoyée à ${email}`);
    // Reset du champ après l'envoi
    setEmail('');
  };

  return (
    <div className="inviteForm">
      <h2>Invite tes amis à participer</h2>
      <form onSubmit={handleInvite}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresse mail" 
          required 
        />
        <button type="submit">Envoyer l'invitation</button>
      </form>
    </div>
  );
}

export default InviteForm;
