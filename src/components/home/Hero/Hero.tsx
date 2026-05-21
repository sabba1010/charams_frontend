import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, MapPin } from 'lucide-react';
import banner from '../../../assets/banner (1).png';

const Hero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const [dbListings, setDbListings] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const keywordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/listings`);
        const data = await res.json();
        if (data.success) {
          setDbListings(data.data);
        }
      } catch (err) {
        console.error('Error fetching listings for Hero suggestions:', err);
      }
    };
    fetchListings();
  }, []);

  const getSuggestions = () => {
    if (!keyword.trim()) return [];
    const searchVal = keyword.toLowerCase();
    const suggestionsSet = new Set<string>();

    dbListings.forEach((listing) => {
      if (listing.title && listing.title.toLowerCase().includes(searchVal)) {
        suggestionsSet.add(listing.title);
      }
      if (listing.category && listing.category.toLowerCase().includes(searchVal)) {
        suggestionsSet.add(listing.category.charAt(0).toUpperCase() + listing.category.slice(1).replace('-', ' '));
      }
      if (listing.type && listing.type.toLowerCase().includes(searchVal)) {
        suggestionsSet.add(listing.type.charAt(0).toUpperCase() + listing.type.slice(1));
      }
      if (listing.keywords) {
        const kwList = listing.keywords.split(/[,;\s]+/).map((k: string) => k.trim());
        kwList.forEach((kw: string) => {
          if (kw && kw.toLowerCase().includes(searchVal)) {
            suggestionsSet.add(kw.charAt(0).toUpperCase() + kw.slice(1));
          }
        });
      }
    });

    return Array.from(suggestionsSet).slice(0, 6);
  };

  const suggestions = getSuggestions();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (keywordRef.current && !keywordRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.append('keyword', keyword.trim());
    if (location.trim()) params.append('location', location.trim());
    if (category) params.append('category', category);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative h-[800px] min-h-[800px] flex items-start pt-30 overflow-hidden font-sans">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={banner}
          alt="Trusted Sitter Background"
          className="w-full h-full object-cover object-center md:object-[center_right]"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-10 w-full max-w-6xl"
        >
          <h1 className="font-serif text-[50px] mt-10 font-bold text-white  tracking-tight drop-shadow-xl whitespace-nowrap overflow-visible">
            Find Trusted Pet, House & Security Sitters Near You.
          </h1>
          <div className="w-full flex justify-center max-w-6xl">
            <p className="font-sans text-base sm:text-lg text-[#D1D1D1] font-medium text-center text-[20px]">
              Reliable care for your pets and home while you travel.
            </p>
          </div>
        </motion.div>

        {/* Search Bar Container - Pill Shape */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mb-12"
        >
          <div className="bg-white p-1.5 rounded-full shadow-2xl flex flex-col md:flex-row items-center overflow-hidden">
            <div className="flex-[1.8] px-6 py-3 border-b md:border-b-0 md:border-r border-slate-200 w-full md:w-auto relative" ref={keywordRef}>
              <input
                type="text"
                placeholder="Type..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-1 max-h-60 overflow-y-auto">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setKeyword(sug);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 border-b border-gray-50 last:border-b-0"
                    >
                      <span className="text-gray-400 text-xs">🔍</span>
                      <span className="font-medium text-gray-800">{sug}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 px-6 py-3 border-b md:border-b-0 md:border-r border-slate-200 flex items-center gap-3 text-slate-500 w-full md:w-auto">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Location (e.g. Cape Town)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
              />
            </div>
            <div className="flex-1 px-6 py-3 flex items-center justify-between gap-2 text-slate-500 w-full md:w-auto relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-700 text-sm font-medium appearance-none cursor-pointer pr-8 focus:ring-0 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="house-sitting">House Sitting</option>
                <option value="dog-walking">Dog Walking</option>
                <option value="boarding">Dog Boarding</option>
                <option value="day-care">Doggy Day Care</option>
                <option value="pet-taxi">Pet Taxi</option>
                <option value="plant-care">Plant Care</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-6 pointer-events-none" />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#c88d7d] hover:bg-[#b87d6d] text-white px-10 py-3 rounded-full font-bold transition-all text-sm shadow-lg w-full md:w-auto mt-2 md:mt-0 active:scale-95"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Features & CTA - Left aligned list with CTA button */}
        <div className="w-full max-w-6xl flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            {[
              'Verified & Vetted Sitters',
              'Real Reviews from Pet Owners',
              'Trusted by Thousands',
              'Quality Care Guaranteed'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#a3a362] flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white font-semibold tracking-wide text-sm drop-shadow-md">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/become-sitter"
              className="inline-flex items-center justify-center bg-[#a3a362] hover:bg-[#b8b875] text-slate-900 px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-black/30 transition-all hover:-translate-y-1"
            >
              Find a Sitter
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </section>
  );
};

export default Hero;
