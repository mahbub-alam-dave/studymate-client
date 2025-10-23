import React from 'react';
import { X, Award, Clock, DollarSign, Calendar, Users, BookOpen, MessageCircle, Video } from 'lucide-react';

const TutorDetailsModal = ({ tutor, isOpen, onClose, onBookSession, onMessage }) => {
  if (!isOpen || !tutor) return null;

  const hasPersonalSessions = tutor.sessions?.personal?.enabled && tutor.sessions?.personal?.slots?.length > 0;
  const hasBatchSessions = tutor.sessions?.batch?.enabled && tutor.sessions?.batch?.slots?.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center t-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Photo */}
        <div className="relative bg-gradient-to-r from-[var(--color-primary)] to-blue-400 p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={tutor.photo}
              alt={tutor.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center sm:text-left text-white">
              <h2 className="text-3xl font-bold mb-2">{tutor.name}</h2>
              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <Award size={16} />
                  {tutor.qualification}
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <Clock size={16} />
                  {tutor.experience}
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  <DollarSign size={16} />
                  ৳{tutor.fee}/hour
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                onBookSession();
                onClose();
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-blue-400 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition font-semibold"
            >
              <Video size={20} />
              Book Session
            </button>
            <button
              onClick={onMessage}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-semibold"
            >
              <MessageCircle size={20} />
              Send Message
            </button>
          </div>

          {/* About / Bio */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="text-blue-500" size={24} />
              About Me
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {tutor.description}
            </p>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {tutor.expertise?.map((subject, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Calendar className="text-blue-500" size={24} />
              Availability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Weekdays */}
              {tutor.availability?.weekdays?.length > 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Weekdays</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tutor.availability.weekdays.map((day, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                  {tutor.availability.weekdayStartTime && tutor.availability.weekdayEndTime && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 ">
                      <Clock size={14} className="inline mr-1" />
                      {tutor.availability.weekdayStartTime} - {tutor.availability.weekdayEndTime}
                    </p>
                  )}
                </div>
              )}

              {/* Weekends */}
              {tutor.availability?.weekends?.length > 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Weekends</h4>
                  <div className="flex flex-wrap gap-1">
                    {tutor.availability.weekends.map((day, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Session Types & Slots */}
          {(hasPersonalSessions || hasBatchSessions) && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Users className="text-purple-500" size={24} />
                Available Sessions
              </h3>
              <div className="space-y-4">
                {/* Personal Sessions */}
                {hasPersonalSessions && (
                  <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <Users size={20} />
                        Personal Coaching (1-on-1)
                      </h4>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ৳{tutor.sessions.personal.fee}/week
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Available Time Slots:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tutor.sessions.personal.slots.map((slot, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700"
                        >
                          <Clock size={16} className="text-blue-500" />
                          <div>
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                              {slot.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{slot.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Batch Sessions */}
                {hasBatchSessions && (
                  <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <Users size={20} />
                        Batch Coaching (Group)
                      </h4>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ৳{tutor.sessions.batch.fee}/month
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Max Students: {tutor.sessions.batch.maxStudents || 10} per batch
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Available Batches:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tutor.sessions.batch.slots.map((slot, idx) => {
                        const remaining = (tutor.sessions.batch.maxStudents || 10) - (slot.bookedCount || 0);
                        const isFull = remaining <= 0;

                        return (
                          <div
                            key={idx}
                            className={`flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border ${
                              isFull
                                ? 'border-red-200 dark:border-red-800 opacity-60'
                                : 'border-blue-200 dark:border-blue-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-blue-500" />
                              <div>
                                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                  {slot.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{slot.time}</p>
                              </div>
                            </div>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                isFull
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              }`}
                            >
                              {isFull ? 'Full' : `${remaining} left`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ready to start your learning journey with {tutor.name}?
            </p>
            <button
              onClick={() => {
                onBookSession();
                onClose();
              }}
              className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-blue-400 text-white rounded-lg hover:from-[var(--color-primary)] hover:to-blue-500 transition font-semibold inline-flex items-center gap-2"
            >
              <Video size={20} />
              Book Your First Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsModal;