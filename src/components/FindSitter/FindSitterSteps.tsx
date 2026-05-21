import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/WhatsApp-Image-search.svg';
import calendarIcon from '../../assets/WhatsApp-Image-calendar.svg';
import houseIcon from '../../assets/WhatsApp-Image-House.svg';

const FindSitterSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Search",
      text: "Post your stay or browse local sitters",
      icon: searchIcon
    },
    {
      number: "2",
      title: "Connect",
      text: "Message sitters and arrange a meet-and-greet",
      icon: calendarIcon
    },
    {
      number: "3",
      title: "Book",
      text: "Book with confidence through our secure platform",
      icon: searchIcon
    },
    {
      number: "4",
      title: "Relax",
      text: "Enjoy your trip while your pets are cared for",
      icon: houseIcon
    }
  ];

  return (
    <section className="bg-white py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[#1a2e35] mb-4 block">
            HOW IT WORKS
          </span>
          <h2 className="text-[44px] lg:text-[56px] font-bold text-[#1a2e35] font-serif leading-tight">
            Find a sitter in four simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-[#FDFCFB] rounded-2xl p-6 pt-8 w-[300px] h-[300px] overflow-hidden flex flex-col items-center text-center shadow-sm border border-[#eee9df]"
            >
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-full bg-[#c28876] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 mb-4">
                {step.number}
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-base font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35] font-extrabold text-[14px] leading-tight max-w-[200px] mx-auto opacity-80">
                  {step.text}
                </p>
              </div>

              {/* Icon Container with Mountain Background */}
              <div className="mt-auto w-full h-24 relative z-10 flex justify-center items-center">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-20 h-20 object-contain drop-shadow-md transition-all group-hover:scale-110"
                />
              </div>

              {/* Mountain Background Shapes */}
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
                <svg viewBox="0 0 400 150" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M0,150 L400,150 L400,80 C300,120 200,40 100,100 C50,130 0,90 0,110 Z"
                    fill="#f0e9df"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M0,150 L400,150 L400,100 C350,130 250,80 150,120 C100,140 50,110 0,130 Z"
                    fill="#eee9df"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/register" 
            className="bg-[#2d373b] text-white px-12 py-4 rounded-xl font-bold hover:bg-[#1a2e35] transition-all text-base shadow-lg"
          >
            Find a sitter now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindSitterSteps;
