import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ isOpen, onClose, user, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({ name:'', email:'', username:'', company:{name:''} });

  useEffect(()=>{ if(user) setFormData(user); }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    if(name==='company') setFormData(prev=>({...prev, company:{name:value}}));
    else setFormData(prev=>({...prev, [name]:value}));
  }

  const handleSubmit = e => { e.preventDefault(); onSubmit(formData); }

  if(!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required/>
          <input name="company" value={formData.company.name} onChange={handleChange} placeholder="Company" required/>
          <div className="modal-buttons">
            <button type="submit">{isEditing ? 'Update':'Add'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
