import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports.css';

const Reports = () => {
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tenantsRes, paymentsRes, roomsRes] = await Promise.all([
        axios.get('/api/tenants'),
        axios.get('/api/payments'),
        axios.get('/api/rooms')
      ]);
      setTenants(tenantsRes.data);
      setPayments(paymentsRes.data);
      setRooms(roomsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const filteredPayments = payments.filter(payment => {
    if (!filter.startDate && !filter.endDate) return true;
    
    const paymentDate = new Date(payment.paymentDate);
    const start = filter.startDate ? new Date(filter.startDate) : null;
    const end = filter.endDate ? new Date(filter.endDate) : null;
    
    if (start && paymentDate < start) return false;
    if (end && paymentDate > end) return false;
    
    return true;
  });

  const totalRevenue = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = filteredPayments.filter(p => p.status === 'pending');

  const activeTenants = tenants.filter(tenant => tenant.status === 'active');
  const vacantRooms = rooms.filter(room => room.status === 'available');

  if (loading) {
    return <div className="text-center mt-5">Loading reports...</div>;
  }

  return (
    <div className="reports-container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Reports & Analytics</h1>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Date Filter</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={filter.startDate}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={filter.endDate}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="card-title">Total Revenue</h6>
              <h3 className="card-text text-success">₹{totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="card-title">Pending Payments</h6>
              <h3 className="card-text text-warning">{pendingPayments.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Occupancy Summary</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-6">
                  <h6>Total Rooms</h6>
                  <h3>{rooms.length}</h3>
                </div>
                <div className="col-md-6">
                  <h6>Vacant Rooms</h6>
                  <h3>{vacantRooms.length}</h3>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '20px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ 
                    width: `${((rooms.length - vacantRooms.length) / rooms.length * 100)}%` 
                  }}
                  aria-valuenow={((rooms.length - vacantRooms.length) / rooms.length * 100)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {Math.round((rooms.length - vacantRooms.length) / rooms.length * 100)}% Occupied
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Tenant Summary</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-6">
                  <h6>Total Tenants</h6>
                  <h3>{tenants.length}</h3>
                </div>
                <div className="col-md-6">
                  <h6>Active Tenants</h6>
                  <h3>{activeTenants.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Payment History</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Tenant</th>
                      <th>Room</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>For Month</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map(payment => (
                      <tr key={payment._id}>
                        <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                        <td>{payment.tenant?.name}</td>
                        <td>Room {payment.room?.roomNumber}</td>
                        <td>₹{payment.amount}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>{payment.paymentForMonth}</td>
                        <td>
                          <span className={`badge ${
                            payment.status === 'completed' ? 'bg-success' : 
                            payment.status === 'pending' ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredPayments.length === 0 && (
                <p className="text-muted text-center">No payments found for the selected period</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;