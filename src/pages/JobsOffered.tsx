import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Clock, DollarSign, ChevronRight, Filter, Star, Loader2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  petType: string;
  petImages?: string[];
  budget: string;
  createdAt: string;
  owner?: {
    firstName: string;
    lastName: string;
    avatar?: string;
    isVerified?: boolean;
  };
}

const CATEGORIES = [
  'All Categories',
  'Pet Sitting',
  'Dog Walking',
  'Pet Boarding',
  'Pet Day Care',
  'Holiday Home Sitting',
  'Security Checks',
  'Drop-In Visits',
  'Pet Taxi'
];

const JobsOffered = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const { isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${apiUrl}/jobs/public`);
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error('Error fetching public jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Fallback to petType if serviceType is missing (for older entries)
    const jobCategory = job.serviceType || job.petType;
    const matchesCategory = categoryFilter === 'All Categories' || jobCategory === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getDaysAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    return days <= 0 ? 'Today' : `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-40 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-100">
          <div>
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-light text-slate-900 leading-none mb-4">Jobs Offered</h1>
            <p className="text-slate-500 text-lg max-w-xl font-light">
              Discover opportunities to provide pet, house, and security services for our trusted owners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-8 md:mt-0 tracking-[0.2em]">
            <span>Oppas Haven</span>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-slate-900 font-bold">Jobs Offered</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 p-4 mb-12 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by job title or location..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-[#1a282b]/10 transition-all text-slate-700 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-[#1a282b]/10 transition-all text-slate-700 appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex-1 md:flex-none">
              Find Jobs
            </button>
            <button className="p-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#c28876]" />
            <span className="font-medium">Loading opportunities...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Briefcase className="w-16 h-16 opacity-20 mb-4" />
            <span className="font-medium text-lg">No active jobs found.</span>
            <p className="text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 flex flex-col h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col h-full"
                  >
                    {/* Job Category Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-[#c28876]/10 text-[#c28876] text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {job.serviceType || job.petType || 'Pet Sitting'}
                      </span>
                      <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                        Posted {getDaysAgo(job.createdAt)}
                      </span>
                    </div>

                    {/* Pet Images */}
                    {job.petImages && job.petImages.length > 0 && (
                      <div className={`grid gap-2 mb-6 w-full ${job.petImages.length === 1 ? 'grid-cols-1' : job.petImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {job.petImages.slice(0, 3).map((img, idx) => (
                          <div key={idx} className={`w-full ${job.petImages!.length === 1 ? 'h-48' : 'h-24'} rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative`}>
                            <img src={img} alt={`${job.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                            {idx === 2 && job.petImages!.length > 3 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl backdrop-blur-[2px]">
                                +{job.petImages!.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#c28876] transition-colors leading-tight font-serif">
                      {job.title}
                    </h3>

                    {/* Job Meta Info */}
                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 opacity-70 text-[#c28876]/60 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4 opacity-70 text-[#c28876]/60 flex-shrink-0" />
                        <span>{job.startDate} → {job.endDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <DollarSign className="w-4 h-4 opacity-70 text-[#c28876] flex-shrink-0" />
                        <span className="font-bold text-slate-900">{job.budget}</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mt-4 line-clamp-3">
                        {job.description}
                      </p>
                    </div>

                    {/* Author & Apply Action */}
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.owner?.avatar || 'https://via.placeholder.com/150'}
                          alt={job.owner?.firstName || 'Owner'}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                          style={!isLoggedIn ? { filter: 'blur(5px) grayscale(100%)', transition: 'filter 0.5s ease' } : { transition: 'filter 0.5s ease' }}
                        />

                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                            {job.owner ? `${job.owner.firstName} ${job.owner.lastName}` : 'Unknown Owner'}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                              {job.owner?.isVerified ? 'Verified Owner' : 'Owner'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#c28876] text-white px-6 py-3 rounded-full text-xs font-bold hover:brightness-110 transition-all shadow-lg active:scale-95 group-hover:px-8 duration-300">
                        Apply Now
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State / Load More */}
        {!loading && filteredJobs.length > 0 && (
          <div className="mt-20 flex flex-col items-center">
            <p className="text-slate-400 text-sm mb-8 font-light italic">Showing {filteredJobs.length} active jobs</p>
            <button className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-sm hover:border-slate-900 transition-all active:scale-95 shadow-sm">
              Load More Opportunities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsOffered;
