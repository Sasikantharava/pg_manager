import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import RoomForm from '../components/RoomForm';
import './Rooms.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/rooms');
      setRooms(res.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch rooms');
      setLoading(false);
    }
  };

  const handleCreateRoom = () => {
    setEditingRoom(null);
    setShowForm(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleSubmitRoom = async (roomData) => {
    try {
      if (editingRoom) {
        await axios.put(`/api/rooms/${editingRoom._id}`, roomData);
      } else {
        await axios.post('/api/rooms', roomData);
      }
      setShowForm(false);
      setEditingRoom(null);
      fetchRooms();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`/api/rooms/${roomId}`);
        fetchRooms();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete room');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRoom(null);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading rooms...</div>;
  }

  return (
    <div className="rooms-container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Room Management</h1>
        <button className="btn btn-primary" onClick={handleCreateRoom}>
          <i className="fas fa-plus me-2"></i>Add New Room
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm ? (
        <div className="card">
          <div className="card-body">
            <RoomForm
              room={editingRoom}
              onSubmit={handleSubmitRoom}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {rooms.map(room => (
              <RoomCard
                key={room._id}
                room={room}
                onEdit={handleEditRoom}
                onDelete={handleDeleteRoom}
              />
            ))}
          </div>
          {rooms.length === 0 && (
            <div className="text-center mt-5">
              <i className="fas fa-bed fa-3x text-muted mb-3"></i>
              <p>No rooms found. Add your first room to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rooms;