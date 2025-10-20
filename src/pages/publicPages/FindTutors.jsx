import React, { useState, useEffect } from 'react';
import { Search, Filter, DollarSign, Clock, Award } from 'lucide-react';

// Mock data - replace with actual API call
const mockTutors = [
  {
    _id: "1",
    name: "Mahbub Alam",
    email: "koolman@gmail.com",
    role: "tutor",
    photo: "https://i.postimg.cc/cJ6DGJh2/man-1.png",
    createdAt: "2025-10-19T05:21:34.886Z",
    availability: {
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      weekdayStartTime: "11:19",
      weekdayEndTime: "00:20",
      weekends: ["Saturday", "Sunday"]
    },
    description: "Expert in computer science and programming fundamentals.",
    experience: "2 years",
    expertise: ["English", "Programming", "Physics"],
    fee: "5000",
    qualification: "BSC in Computer Science"
  },
  {
    _id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/FF6B6B/ffffff?text=SJ",
    createdAt: "2025-10-18T08:15:22.456Z",
    availability: {
      weekdays: ["Monday", "Wednesday", "Friday"],
      weekdayStartTime: "14:00",
      weekdayEndTime: "18:00",
      weekends: ["Saturday"]
    },
    description: "Passionate mathematics tutor with a focus on making complex concepts simple and engaging.",
    experience: "5 years",
    expertise: ["Mathematics", "Physics", "Science"],
    fee: "3500",
    qualification: "MSc in Mathematics Education"
  },
  {
    _id: "3",
    name: "David Chen",
    email: "david.chen@outlook.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/4ECDC4/ffffff?text=DC",
    createdAt: "2025-10-17T12:30:45.789Z",
    availability: {
      weekdays: ["Tuesday", "Thursday"],
      weekdayStartTime: "16:00",
      weekdayEndTime: "20:00",
      weekends: ["Sunday"]
    },
    description: "Full-stack developer turned educator. Specializing in web development.",
    experience: "3 years",
    expertise: ["Web Development", "Programming"],
    fee: "4500",
    qualification: "BSc in Software Engineering"
  },
  {
    _id: "4",
    name: "Emily Rodriguez",
    email: "emily.rod@yahoo.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/95E1D3/ffffff?text=ER",
    createdAt: "2025-10-16T09:45:12.123Z",
    availability: {
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      weekdayStartTime: "09:00",
      weekdayEndTime: "12:00",
      weekends: []
    },
    description: "Literature enthusiast and English language expert.",
    experience: "7 years",
    expertise: ["English", "Literature"],
    fee: "3000",
    qualification: "MA in English Literature"
  },
  {
    _id: "5",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@gmail.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/F38181/ffffff?text=AH",
    createdAt: "2025-10-15T14:20:33.567Z",
    availability: {
      weekdays: ["Wednesday", "Thursday", "Friday"],
      weekdayStartTime: "17:00",
      weekdayEndTime: "21:00",
      weekends: ["Saturday", "Sunday"]
    },
    description: "Physics professor with a knack for breaking down complex concepts.",
    experience: "10 years",
    expertise: ["Physics", "Mathematics", "Science"],
    fee: "6000",
    qualification: "PhD in Physics"
  },
  {
    _id: "6",
    name: "Lisa Park",
    email: "lisa.park@hotmail.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/AA96DA/ffffff?text=LP",
    createdAt: "2025-10-14T11:00:00.890Z",
    availability: {
      weekdays: ["Monday", "Friday"],
      weekdayStartTime: "15:00",
      weekdayEndTime: "19:00",
      weekends: ["Saturday"]
    },
    description: "Science educator specializing in biology and chemistry.",
    experience: "4 years",
    expertise: ["Science", "Mathematics"],
    fee: "3800",
    qualification: "BSc in Biology, BEd"
  },
  {
    _id: "7",
    name: "James Miller",
    email: "james.miller@gmail.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/FCBAD3/ffffff?text=JM",
    createdAt: "2025-10-13T16:35:28.234Z",
    availability: {
      weekdays: ["Tuesday", "Wednesday", "Thursday"],
      weekdayStartTime: "18:00",
      weekdayEndTime: "22:00",
      weekends: ["Sunday"]
    },
    description: "Coding bootcamp instructor with industry experience.",
    experience: "6 years",
    expertise: ["Programming", "Web Development"],
    fee: "5500",
    qualification: "BSc in Computer Science, AWS Certified"
  },
  {
    _id: "8",
    name: "Nina Patel",
    email: "nina.patel@gmail.com",
    role: "tutor",
    photo: "https://via.placeholder.com/150/FFFFD2/333333?text=NP",
    createdAt: "2025-10-12T07:50:15.345Z",
    availability: {
      weekdays: ["Monday", "Tuesday", "Wednesday"],
      weekdayStartTime: "13:00",
      weekdayEndTime: "17:00",
      weekends: ["Saturday", "Sunday"]
    },
    description: "Experienced tutor in mathematics and English with patient approach.",
    experience: "8 years",
    expertise: ["Mathematics", "English", "Science"],
    fee: "4200",
    qualification: "MSc in Education"
  }
];

const ITEMS_PER_PAGE = 6;

const subjects = ["English", "Mathematics", "Web Development", "Literature", "Science", "Programming", "Physics"];

export default function FindTutorPage() {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [feeRange, setFeeRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  // Simulated API call - Replace with actual fetch
  useEffect(() => {
    // In real app: fetch from your API
    // const response = await fetch('/api/tutors');
    // const data = await response.json();
    setTutors(mockTutors);
    setFilteredTutors(mockTutors);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...tutors];

    // Search filter (name, expertise, qualification)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tutor => 
        tutor.name.toLowerCase().includes(query) ||
        tutor.expertise.some(exp => exp.toLowerCase().includes(query)) ||
        tutor.qualification.toLowerCase().includes(query)
      );
    }

    // Subject filter
    if (selectedSubject) {
      result = result.filter(tutor => 
        tutor.expertise.includes(selectedSubject)
      );
    }

    // Experience filter
    if (experienceFilter) {
      result = result.filter(tutor => {
        const years = parseInt(tutor.experience);
        switch(experienceFilter) {
          case '0-2': return years <= 2;
          case '3-5': return years >= 3 && years <= 5;
          case '6-10': return years >= 6 && years <= 10;
          case '10+': return years > 10;
          default: return true;
        }
      });
    }

    // Fee range filter
    result = result.filter(tutor => {
      const fee = parseInt(tutor.fee);
      return fee >= feeRange[0] && fee <= feeRange[1];
    });

    setFilteredTutors(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, selectedSubject, experienceFilter, feeRange, tutors]);

  // Pagination
  const totalPages = Math.ceil(filteredTutors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTutors = filteredTutors.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setExperienceFilter('');
    setFeeRange([0, 10000]);
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Perfect Tutor</h1>
          <p className="text-gray-600">Browse through our qualified tutors and find the best match for your learning needs</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-base-100 rounded-lg shadow-md p-6 mb-6">
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, subject, or qualification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline gap-2"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">All Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
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
        <div className="mb-4 text-gray-600">
          Showing {currentTutors.length} of {filteredTutors.length} tutors
        </div>

        {/* Tutor Cards Grid */}
        {currentTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTutors.map((tutor) => (
              <div key={tutor._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <figure className="px-6 pt-6">
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="rounded-xl w-32 h-32 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">{tutor.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{tutor.description}</p>
                  
                  <div className="space-y-2 my-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award size={16} className="text-primary" />
                      <span className="font-medium">{tutor.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>{tutor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-primary" />
                      <span className="font-semibold">৳{tutor.fee}/hour</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 my-2">
                    {tutor.expertise.slice(0, 3).map((subject, idx) => (
                      <span key={idx} className="badge badge-primary badge-sm">
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
                    <button className="btn btn-primary btn-sm">View Profile</button>
                    <button className="btn btn-outline btn-sm">Book Session</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500 mb-2">No tutors found</p>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
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
              disabled={currentPage === totalPages}
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