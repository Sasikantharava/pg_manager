import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    totalTenants: 0,
    activeTenants: 0,
    totalRevenue: 0,
    pendingPayments: 0
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [roomsRes, tenantsRes, paymentsRes] = await Promise.all([
        axios.get('/api/rooms').catch(err => {
          console.error('Error fetching rooms:', err);
          return { data: [] };
        }),
        axios.get('/api/tenants').catch(err => {
          console.error('Error fetching tenants:', err);
          return { data: [] };
        }),
        axios.get('/api/payments').catch(err => {
          console.error('Error fetching payments:', err);
          return { data: [] };
        })
      ]);
      
      const rooms = roomsRes.data;
      const tenants = tenantsRes.data;
      const payments = paymentsRes.data;
      
      const totalRooms = rooms.length;
      const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
      const availableRooms = rooms.filter(room => room.status === 'available').length;
      const totalTenants = tenants.length;
      const activeTenants = tenants.filter(tenant => tenant.status === 'active').length;
      
      const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + payment.amount, 0);
      
      const pendingPayments = payments.filter(p => p.status === 'pending').length;
      
      setStats({
        totalRooms,
        occupiedRooms,
        availableRooms,
        totalTenants,
        activeTenants,
        totalRevenue,
        pendingPayments
      });
      
      setRecentPayments(payments.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger m-5" role="alert">
        <h4 className="alert-heading">Dashboard Error</h4>
        <p>{error}</p>
        <button 
          className="btn btn-outline-danger" 
          onClick={fetchDashboardData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="card-title text-muted">Total Rooms</h6>
                  <h3 className="card-text">{stats.totalRooms}</h3>
                </div>
                <div className="col-auto">
                  <i className="fas fa-bed fa-2x text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="card-title text-muted">Occupied Rooms</h6>
                  <h3 className="card-text">{stats.occupiedRooms}</h3>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-check fa-2x text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="card-title text-muted">Available Rooms</h6>
                  <h3 className="card-text">{stats.availableRooms}</h3>
                </div>
                <div className="col-auto">
                  <i className="fas fa-door-open fa-2x text-info"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="card-title text-muted">Active Tenants</h6>
                  <h3 className="card-text">{stats.activeTenants}</h3>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-warning"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="card-title text-muted">Total Revenue</h6>
                  <h3 className="card-text">₹{stats.totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="col-auto">
                  <i className="fas fa-money-bill-wave fa-2x text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="card-title text-muted">Pending Payments</h6>
                  <h3 className="card-text">{stats.pendingPayments}</h3>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clock fa-2x text-danger"></i>
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
              <h5>Recent Payments</h5>
            </div>
            <div className="card-body">
              {recentPayments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Tenant</th>
                        <th>Room</th>
                        <th>Amount</th>
                        <th>Month</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map(payment => (
                        <tr key={payment._id}>
                          <td>{payment.tenant?.name}</td>
                          <td>{payment.room?.roomNumber}</td>
                          <td>₹{payment.amount}</td>
                          <td>{payment.paymentForMonth}</td>
                          <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
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
              ) : (
                <p className="text-muted">No recent payments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;