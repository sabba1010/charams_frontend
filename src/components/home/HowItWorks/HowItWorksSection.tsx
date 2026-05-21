import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import searchIcon from '../../../assets/WhatsApp-Image-search.svg';
import calendarIcon from '../../../assets/WhatsApp-Image-calendar.svg';
import houseIcon from '../../../assets/WhatsApp-Image-House.svg';
import StarIcon from '../../../assets/logo/WhatsApp_Image_2026-05-12_at_8.30.56_AM__2_-removebg-preview.png';

const steps = [
  {
    number: "1",
    title: "Search for a sitter",
    description: "Find verified & vetted sitters in your area.",
    icon: searchIcon
  },
  {
    number: "2",
    title: "Book & Connect",
    description: "Message local sitters and arrange your stay.",
    icon: calendarIcon
  },
  {
    number: "3",
    title: "Travel with Peace of Mind",
    description: "Enjoy your trip while we care for your pets and home.",
    icon: houseIcon
  },
  {
    number: "4",
    title: "Rate & Review",
    description: "Share your experience to help the community grow.",
    icon: StarIcon
  }
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white pt-[80px] pb-[80px] font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e35] mb-4 font-serif">
            How Oppas Haven work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 justify-items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-[#f9f6f1] rounded-3xl p-6 pt-5 w-[280px] h-[285px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm border border-[#eee9df] group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Number Badge centered horizontally */}
              <div className="w-8 h-8 rounded-full bg-[#c28876] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 z-20 mb-2">
                {step.number}
              </div>

              {/* Title and Description at the Top */}
              <div className="relative z-10">
                <h3 className="text-base font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Icon Container with Mountain Background - Large, Visually Strong Icon at the Bottom */}
              <div className="mt-auto w-full h-24 relative z-10 flex justify-center items-center">
                {typeof step.icon === 'string' ? (
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-20 h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="drop-shadow-md group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                )}
              </div>

              {/* Mountain Background Shapes */}
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-0">
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
          <button className="bg-[#a3a362] hover:bg-[#8e8e56] text-white px-8 py-3 rounded-lg font-bold text-base shadow-lg transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
