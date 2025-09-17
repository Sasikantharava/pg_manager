import React from 'react';
import './RoomCard.css';

const RoomCard = ({ room, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return 'badge bg-success';
      case 'occupied':
        return 'badge bg-danger';
      case 'maintenance':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card room-card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">Room {room.roomNumber}</h5>
            <span className={getStatusBadge(room.status)}>{room.status}</span>
          </div>
          <p className="card-text">
            <strong>Capacity:</strong> {room.capacity} persons<br />
            <strong>Occupancy:</strong> {room.currentOccupancy} persons<br />
            <strong>Rent:</strong> ₹{room.rent}/month<br />
            {room.amenities && room.amenities.length > 0 && (
              <>
                <strong>Amenities:</strong>
                <ul className="amenities-list">
                  {room.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </>
            )}
          </p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEdit(room)}
            >
              Edit
            </button>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(room._id)}
              disabled={room.currentOccupancy > 0}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;