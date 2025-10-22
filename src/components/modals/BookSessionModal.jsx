import React, { useState, useEffect, useContext } from 'react';
import { X, Clock, Users, Calendar, DollarSign } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ContextValue } from '../../Contextes/AllContexts';

const BookSessionModal = ({ tutor, isOpen, onClose }) => {
  const { user } = useContext(ContextValue);
  const [sessionType, setSessionType] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState('');
  const [previewPrice, setPreviewPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiURL = import.meta.env.VITE_api_url;

  // Duration options based on session type
  const personalDurations = [
    { label: '1 Week', value: '1week', weeks: 1 },
    { label: '2 Weeks', value: '2weeks', weeks: 2 },
    { label: '1 Month', value: '1month', weeks: 4 },
    { label: '2 Months', value: '2months', weeks: 8 },
  ];

  const batchDurations = [
    { label: '1 Month', value: '1month', months: 1 },
    { label: '2 Months', value: '2months', months: 2 },
    { label: '3 Months', value: '3months', months: 3 },
  ];

  // Calculate preview price (client-side estimation)
  useEffect(() => {
    if (!sessionType || !selectedSlot || !duration) {
      setPreviewPrice(0);
      return;
    }

    const basePrice = sessionType === 'personal' 
      ? tutor.sessions.personal.fee 
      : tutor.sessions.batch.fee;

    let multiplier = 0;
    if (sessionType === 'personal') {
      const durationObj = personalDurations.find(d => d.value === duration);
      multiplier = durationObj?.weeks || 0;
    } else {
      const durationObj = batchDurations.find(d => d.value === duration);
      multiplier = (durationObj?.months || 0) * 4; // Convert months to weeks
    }

    setPreviewPrice(basePrice * multiplier);
  }, [sessionType, selectedSlot, duration, tutor]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSessionType('');
      setSelectedSlot(null);
      setDuration('');
      setPreviewPrice(0);
    }
  }, [isOpen]);

  // Handle payment/booking
  const handleBooking = async () => {
    if (!user) {
      Swal.fire('Error', 'Please login to book a session', 'error');
      return;
    }

    if (!sessionType || !selectedSlot || !duration) {
      Swal.fire('Warning', 'Please complete all fields', 'warning');
      return;
    }

    const confirmed = await Swal.fire({
      title: 'Confirm Booking',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Tutor:</strong> ${tutor.name}</p>
          <p><strong>Session:</strong> ${sessionType === 'personal' ? 'Personal Coaching' : 'Batch Coaching'}</p>
          <p><strong>Slot:</strong> ${selectedSlot.name} (${selectedSlot.time})</p>
          <p><strong>Duration:</strong> ${duration.replace(/(\d+)/, '$1 ').replace('week', 'Week').replace('month', 'Month')}</p>
          <p class="text-lg font-bold text-green-600 mt-3">Estimated Price: ৳${previewPrice}</p>
          <p class="text-sm text-gray-500 mt-2">Final price will be calculated at checkout</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment',
      confirmButtonColor: '#10b981',
    });

    if (!confirmed.isConfirmed) return;

    setLoading(true);

    try {
      const bookingData = {
        tutorId: tutor._id,
        tutorName: tutor.name,
        studentId: user._id || user.email,
        studentName: user.displayName || user.name,
        studentEmail: user.email,
        sessionType,
        slotInfo: {
          id: selectedSlot.id,
          name: selectedSlot.name,
          time: selectedSlot.time
        },
        duration,
        estimatedPrice: previewPrice,
      };

      const response = await axios.post(`${apiURL}/bookings/create`, bookingData);

      if (response.data.success) {
        Swal.fire({
          title: 'Booking Successful!',
          html: `
            <p>Your booking has been created.</p>
            <p class="font-bold text-lg mt-2">Final Price: ৳${response.data.finalPrice}</p>
            <p class="text-sm text-gray-500 mt-2">Booking ID: ${response.data.bookingId}</p>
          `,
          icon: 'success',
        });
        onClose();
      }
    } catch (error) {
      console.error('Booking error:', error);
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Failed to create booking. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !tutor) return null;

  const availablePersonal = tutor.sessions?.personal?.enabled && tutor.sessions?.personal?.slots?.length > 0;
  const availableBatch = tutor.sessions?.batch?.enabled && tutor.sessions?.batch?.slots?.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book Session</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">with {tutor.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1: Session Type Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
              1. Select Session Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availablePersonal && (
                <button
                  onClick={() => {
                    setSessionType('personal');
                    setSelectedSlot(null);
                    setDuration('');
                  }}
                  className={`p-4 border-2 rounded-lg text-left transition ${
                    sessionType === 'personal'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Personal Coaching</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">One-on-one sessions</p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                        ৳{tutor.sessions.personal.fee}/week
                      </p>
                    </div>
                  </div>
                </button>
              )}

              {availableBatch && (
                <button
                  onClick={() => {
                    setSessionType('batch');
                    setSelectedSlot(null);
                    setDuration('');
                  }}
                  className={`p-4 border-2 rounded-lg text-left transition ${
                    sessionType === 'batch'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Batch Coaching</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Group sessions</p>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                        ৳{tutor.sessions.batch.fee}/month
                      </p>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Step 2: Slot Selection */}
          {sessionType && (
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                2. Choose {sessionType === 'personal' ? 'Time Slot' : 'Batch'}
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sessionType === 'personal' &&
                  tutor.sessions.personal.slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition ${
                        selectedSlot?.id === slot.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{slot.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{slot.time}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}

                {sessionType === 'batch' &&
                  tutor.sessions.batch.slots.map((slot) => {
                    const remaining = (tutor.sessions.batch.maxStudents || 10) - (slot.bookedCount || 0);
                    const isFull = remaining <= 0;

                    return (
                      <button
                        key={slot.id}
                        onClick={() => !isFull && setSelectedSlot(slot)}
                        disabled={isFull}
                        className={`w-full p-4 border-2 rounded-lg text-left transition ${
                          isFull
                            ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 opacity-50 cursor-not-allowed'
                            : selectedSlot?.id === slot.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-green-500" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{slot.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{slot.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-sm font-semibold ${
                                isFull ? 'text-red-500' : 'text-green-600 dark:text-green-400'
                              }`}
                            >
                              {isFull ? 'Full' : `${remaining} spots left`}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Step 3: Duration Selection */}
          {selectedSlot && (
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                3. Select Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(sessionType === 'personal' ? personalDurations : batchDurations).map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDuration(d.value)}
                    className={`p-3 border-2 rounded-lg text-center transition ${
                      duration === d.value
                        ? sessionType === 'personal'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{d.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Preview */}
          {previewPrice > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Estimated Price:</span>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">৳{previewPrice}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                * Final price will be calculated at checkout
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={!sessionType || !selectedSlot || !duration || loading}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              !sessionType || !selectedSlot || !duration || loading
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600'
            }`}
          >
            {loading ? 'Processing...' : `Pay ৳${previewPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSessionModal;