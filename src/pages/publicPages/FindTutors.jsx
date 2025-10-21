import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, DollarSign, Clock, Award, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_api_url || 'http://localhost:3000/api';
const ITEMS_PER_PAGE = 6;

const subjects = ["English", "Mathematics", "Web Development", "Literature", "Science", "Programming", "Physics"];

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function FindTutorPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalTutors: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [feeRange, setFeeRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch tutors from API
  const fetchTutors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (debouncedSearchQuery) params.append('search', debouncedSearchQuery);
      if (selectedSubject) params.append('subject', selectedSubject);
      if (experienceFilter) params.append('experience', experienceFilter);
      params.append('minFee', feeRange[0]);
      params.append('maxFee', feeRange[1]);
      params.append('page', currentPage);
      params.append('limit', ITEMS_PER_PAGE);

      const response = await fetch(`${API_BASE_URL}/api/tutors/find-tutors?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTutors(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.message || 'Failed to fetch tutors');
      }

    } catch (err) {
      console.error('Error fetching tutors:', err);
      setError(err.message || 'Failed to load tutors. Please try again.');
      setTutors([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery, selectedSubject, experienceFilter, feeRange, currentPage]);

  // Fetch tutors when filters or page changes
  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  // Reset to page 1 when filters change
  useEffect(() => {
  /*   if (currentPage !== 1) {
      setCurrentPage(1);
    } */
   setCurrentPage(1);
  }, [debouncedSearchQuery, selectedSubject, experienceFilter, feeRange]);

const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > pagination.totalPages) return;
  setCurrentPage(newPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


/*   const handlePageChange = async (newPage) => {
  if (newPage < 1 || newPage > pagination.totalPages) return;

  

  setLoading(true);
  try {

      const params = new URLSearchParams();
      
      if (debouncedSearchQuery) params.append('search', debouncedSearchQuery);
      if (selectedSubject) params.append('subject', selectedSubject);
      if (experienceFilter) params.append('experience', experienceFilter);
      params.append('minFee', feeRange[0]);
      params.append('maxFee', feeRange[1]);
      params.append('page', newPage);
      params.append('limit', ITEMS_PER_PAGE);


      const response = await fetch(`${API_BASE_URL}/api/tutors/find-tutors?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    const data = await response.json();

    if (data.success) {
      setTutors(data.data);
      setPagination(data.pagination);
      setCurrentPage(newPage);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}; */


  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setExperienceFilter('');
    setFeeRange([0, 10000]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Find Your Perfect Tutor</h1>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Browse through our qualified tutors and find the best match for your learning needs</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-lg shadow-md p-6 mb-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
          {/* Search Bar */}
          <div className="flex gap-4 mb-4 ">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]" size={20} />
              <input
                type="text"
                placeholder="Search by name, subject, or qualification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10 bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-dark)] gap-2 border border-[var(--color-border)] dark:border-[var(--color-border-dark)]  text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="select select-bordered w-full bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
                >
                  <option value="" className='bg-gray-100 dark:bg-gray-700'>All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className='bg-gray-100 dark:bg-gray-700'>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="select select-bordered w-full bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
                >
                  <option value="" className='bg-gray-100 dark:bg-gray-700'>All Experience</option>
                  <option value="0-2" className='bg-gray-100 dark:bg-gray-700'>0-2 years</option>
                  <option value="3-5" className='bg-gray-100 dark:bg-gray-700'>3-5 years</option>
                  <option value="6-10" className='bg-gray-100 dark:bg-gray-700'>6-10 years</option>
                  <option value="10+" className='bg-gray-100 dark:bg-gray-700'>10+ years</option>
                </select>
              </div>

              {/* Fee Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fee Range: ৳{feeRange[0]} - ৳{feeRange[1]}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={feeRange[1]}
                    onChange={(e) => setFeeRange([0, parseInt(e.target.value)])}
                    className="range range-primary range-sm"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <div className="md:col-span-3 flex justify-end">
                <button onClick={resetFilters} className="btn btn-sm btn-ghost">
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-4 text-gray-600">
            Showing {tutors.length} of {pagination.totalTutors} tutors
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
            <button onClick={fetchTutors} className="btn btn-sm">Retry</button>
          </div>
        )}

        {/* Tutor Cards Grid */}
        {!loading && !error && tutors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tutors.map((tutor) => (
              <div key={tutor._id} className="card bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] shadow-lg hover:shadow-xl transition-shadow">
                <figure className="px-6 pt-6">
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="rounded-xl w-32 h-32 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{tutor.name}</h2>
                  <p className="text-sm  line-clamp-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{tutor.description}</p>
                  
                  <div className="space-y-2 my-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                    <div className="flex items-center gap-2 text-sm">
                      <Award size={16} className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
                      <span className="font-medium">{tutor.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
                      <span>{tutor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
                      <span className="font-semibold">৳{tutor.fee}/hour</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 my-2">
                    {tutor.expertise.slice(0, 3).map((subject, idx) => (
                      <span key={idx} className="badge bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)] badge-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                        {subject}
                      </span>
                    ))}
                    {tutor.expertise.length > 3 && (
                      <span className="badge badge-ghost badge-sm">
                        +{tutor.expertise.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-gray-100 border-none btn-sm">View Details</button>
                    <button className="btn bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-none text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] btn-sm dark:hover:text-gray-300">Book Session</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && tutors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500 mb-2">No tutors found</p>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="btn btn-sm"
            >
              Previous
            </button>
            
            {[...Array(pagination.totalPages)].map((_, index) => {
              const page = index + 1;
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === pagination.totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${currentPage === page ? 'bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-gray-100' : 'btn-ghost'}`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


/* assalmu alaikum vai, I am from End Game Warriors team. Our team member Abu Bokor Siddik is not working concentrically.  He is not attending scrum regularly. Even was not present on the last presentation */