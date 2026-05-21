import React from 'react';
import { motion } from 'framer-motion';

// Import images from assets/logo
import petSittingImg from '../../assets/logo/remov iocns/Pet_Sitting-removebg-preview.png';
import dogWalkingImg from '../../assets/logo/remov iocns/Dog_Walking-removebg-preview.png';
import dogBoardingImg from '../../assets/logo/remov iocns/Dog_Boarding-removebg-preview.png';
import doggyDayCareImg from '../../assets/logo/remov iocns/Doggy_Day_Care-removebg-preview.png';
import houseSittingImg from '../../assets/logo/remov iocns/House_Sitting-removebg-preview.png';
import securityChecksImg from '../../assets/logo/remov iocns/Security_Checks-removebg-preview.png';
import plantCareImg from '../../assets/logo/remov iocns/Plant_Care-removebg-preview.png';
import petTaxiImg from '../../assets/logo/remov iocns/Pet_Taxi-removebg-preview.png';

const offers = [
  {
    title: "Pet Sitting",
    description: "In-home care so pets stay relaxed in familiar surroundings.",
    image: petSittingImg
  },
  {
    title: "Dog Walking",
    description: "Daily walks tailored to your dog's pace and personality.",
    image: dogWalkingImg
  },
  {
    title: "Dog Boarding",
    description: "Your dog stays in a vetted sitter's loving home.",
    image: dogBoardingImg
  },
  {
    title: "Doggy Day Care",
    description: "Drop-off care while you work, with playtime included.",
    image: doggyDayCareImg
  },
  {
    title: "House Sitting",
    description: "Trusted carers stay over to keep your home lived-in.",
    image: houseSittingImg
  },
  {
    title: "Security Checks",
    description: "Scheduled visits to check locks, lights and post.",
    image: securityChecksImg
  },
  {
    title: "Plant Care",
    description: "Watering and basic plant care while you're away.",
    image: plantCareImg
  },
  {
    title: "Pet Taxi",
    description: "Safe rides to vets, groomers and play dates.",
    image: petTaxiImg
  }
];

const WhatWeOfferSection = () => {
  return (
    <section className="w-full bg-[#fbf8f3] pt-24 pb-24 px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#111] mb-6">
            What we offer
          </h4>
          <h2 className="text-[40px] md:text-[48px] font-serif font-medium text-[#111] mb-6 leading-tight">
            Care for every part of life at home
          </h2>
          <p className="text-[17px] text-[#666] max-w-2xl mx-auto leading-relaxed">
            From a quick walk around the block to a week of house sitting, find the right help for your home and pets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-[#f9f6f1] rounded-3xl p-6 pt-5 w-full h-[285px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm border border-[#eee9df] group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Number Badge centered horizontally */}
              <div className="w-8 h-8 rounded-full bg-[#c28876] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 z-20 mb-2">
                {index + 1}
              </div>

              {/* Title and Description at the Top */}
              <div className="relative z-10">
                <h3 className="text-base font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[200px] mx-auto">
                  {offer.description}
                </p>
              </div>

              {/* Icon Container with Mountain Background - Large, Visually Strong Icon at the Bottom */}
              <div className="mt-auto w-full h-24 relative z-10 flex justify-center items-center">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-20 h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                />
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
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
