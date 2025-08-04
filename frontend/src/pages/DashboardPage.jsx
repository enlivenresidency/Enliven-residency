import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = ({ user, setUser }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editError, setEditError] = useState(null);

  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const token = localStorage.getItem('token');
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    fetch(`${API_BASE_URL}/api/bookings`, {
  headers: { Authorization: `Bearer ${token}` },
})

      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load bookings');
        }
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'An error occurred while fetching bookings.');
        setLoading(false);
      });
  }, [token, user, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {

        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert('Failed to delete booking.');
        return;
      }

      setBookings(prev => prev.filter(booking => booking._id !== id));
    } catch (err) {
      alert('Failed to delete booking.');
      console.error(err);
    }
  };

  // Open modal to edit a booking
  const openEditModal = (booking) => {
    setCurrentBooking({
      ...booking,
      checkin: booking.checkin ? new Date(booking.checkin).toISOString().substr(0, 10) : '',
      checkout: booking.checkout ? new Date(booking.checkout).toISOString().substr(0, 10) : '',
      totalAmount: booking.totalAmount.toString(),
      remark: booking.remark || "",
    });
    setEditError(null);
    setIsEditing(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentBooking(null);
    setEditError(null);
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking(prev => ({ ...prev, [name]: value }));
  };

  // Submit edited booking to backend, including remark
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError(null);

    if (
      !currentBooking.name ||
      !currentBooking.phone ||
      !currentBooking.checkin ||
      !currentBooking.checkout
    ) {
      setEditError('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: currentBooking.name,
        phone: currentBooking.phone,
        checkin: currentBooking.checkin,
        checkout: currentBooking.checkout,
        adults: Number(currentBooking.adults),
        children: Number(currentBooking.children),
        rooms: Number(currentBooking.rooms),
        location: currentBooking.location,
        totalAmount: parseFloat(currentBooking.totalAmount),
        ...(isAdmin && { remark: currentBooking.remark || "" }),
      };

      const res = await fetch(`${API_BASE_URL}/api/bookings/${currentBooking._id}`, {

        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setEditError(data.error || 'Failed to update booking.');
        return;
      }

      const updatedBooking = await res.json();
      setBookings(prev => prev.map(b => (b._id === updatedBooking._id ? updatedBooking : b)));
      closeEditModal();
    } catch (err) {
      setEditError('Failed to update booking.');
      console.error(err);
    }
  };

  return (
    <div className="p-2 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-8 items-center">
        <h1 className="text-2xl text-primary font-heading text-heading sm:text-3xl font-bold mb-3 sm:mb-0">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {loading && <div>Loading bookings...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && bookings.length === 0 && <div>No bookings found.</div>}

      {!loading && bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-[800px] sm:min-w-full border border-gray-300 text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-3 py-2">Name</th>
                <th className="border px-2 sm:px-3 py-2">Phone</th>
                <th className="border px-2 sm:px-3 py-2">Check-in</th>
                <th className="border px-2 sm:px-3 py-2">Check-out</th>
                <th className="border px-2 sm:px-3 py-2">Adults</th>
                <th className="border px-2 sm:px-3 py-2">Children</th>
                <th className="border px-2 sm:px-3 py-2">Rooms</th>
                <th className="border px-2 sm:px-3 py-2">Location</th>
                <th className="border px-2 sm:px-3 py-2">Amount (₹)</th>
                <th className="border px-2 sm:px-3 py-2">Remark</th>
                {isAdmin && <th className="border px-2 sm:px-3 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id} className="even:bg-gray-50">
                  <td className="border px-2 sm:px-3 py-1">{booking.name}</td>
                  <td className="border px-2 sm:px-3 py-1">{booking.phone}</td>
                  <td className="border px-2 sm:px-3 py-1">{new Date(booking.checkin).toLocaleDateString()}</td>
                  <td className="border px-2 sm:px-3 py-1">{new Date(booking.checkout).toLocaleDateString()}</td>
                  <td className="border px-2 sm:px-3 py-1">{booking.adults}</td>
                  <td className="border px-2 sm:px-3 py-1">{booking.children}</td>
                  <td className="border px-2 sm:px-3 py-1">{booking.rooms}</td>
                  <td className="border px-2 sm:px-3 py-1">{booking.location}</td>
                  <td className="border px-2 sm:px-3 py-1">{parseFloat(booking.totalAmount).toFixed(2)}</td>
                  <td className="border px-2 sm:px-3 py-1 max-w-[180px] truncate" title={booking.remark || ""}>
                    {booking.remark || ""}
                  </td>
                  {isAdmin && (
                    <td className="border px-2 sm:px-3 py-1">
                      <div className="flex flex-row flex-wrap gap-2">
                        <button
                          onClick={() => openEditModal(booking)}
                          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && isAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-2 overflow-y-auto">
          <div className="bg-white rounded p-4 sm:p-6 max-w-lg w-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
            {editError && <div className="mb-4 text-red-600 font-semibold">{editError}</div>}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentBooking.name}
                  onChange={handleEditChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={currentBooking.phone}
                  onChange={handleEditChange}
                  pattern="\d{10}"
                  title="Enter 10 digit phone number"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Check-in</label>
                  <input
                    type="date"
                    name="checkin"
                    value={currentBooking.checkin}
                    onChange={handleEditChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Check-out</label>
                  <input
                    type="date"
                    name="checkout"
                    value={currentBooking.checkout}
                    onChange={handleEditChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Adults</label>
                  <input
                    type="number"
                    name="adults"
                    value={currentBooking.adults}
                    onChange={handleEditChange}
                    min="1"
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Children</label>
                  <input
                    type="number"
                    name="children"
                    value={currentBooking.children}
                    onChange={handleEditChange}
                    min="0"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Rooms</label>
                  <input
                    type="number"
                    name="rooms"
                    value={currentBooking.rooms}
                    onChange={handleEditChange}
                    min="1"
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={currentBooking.location}
                  onChange={handleEditChange}
                  required
                  className="w-full border p-2 rounded"
                  disabled // Location not editable
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Total Amount (₹)</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={currentBooking.totalAmount}
                  onChange={handleEditChange}
                  step="0.01"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              {/* REMARK FIELD (editable for admin only) */}
              <div>
                <label className="block font-semibold mb-1">Remark</label>
                <textarea
                  name="remark"
                  value={currentBooking.remark || ""}
                  onChange={handleEditChange}
                  rows={2}
                  className="w-full border p-2 rounded resize-vertical"
                  placeholder="Add remark here"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
