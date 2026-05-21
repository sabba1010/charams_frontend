import React from 'react';
import { motion } from 'framer-motion';
// import { ShieldCheck, Home, Star } from 'lucide-react';
import safeHandsImg from '../../../assets/PHOTO FOR HOME PAGE (1).png';
import image66cb6f from '../../../assets/logo/Screenshot 2026-05-14 093706.png';
import petsittingImg from '../../../assets/logo/Screenshot 2026-05-14 094108.png';
import securitypetImg from '../../../assets/logo/Screenshot 2026-05-14 094319.png';


const features = [
  {
    title: "Verified & Vetted",
    description: "ID Verified & Background Checked.",
    icon: image66cb6f,
    iconColor: "text-[#a3a362]"
  },
  {
    title: "Home & Pet Care",
    description: "Pet Sitting, House Sitting & Security Sitters.",
    icon: petsittingImg,
    iconColor: "text-[#e57a55]"
  },
  {
    title: "Trusted Reviews",
    description: "Rated 5-star by Local Pet Owners.",
    icon: securitypetImg,
    iconColor: "text-[#1a2e35]"
  }
];

const SafeHandsSection = () => {
  return (
    <section className="bg-[#f5f2eb] py-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">

          {/* Left Content */}
          <div className="flex-1 max-w-xl py-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              /* Added a serif font-family to match image_66cb6f.jpg */
              className="text-4xl md:text-[2.75rem] font-serif font-bold text-[#1a2e35] mb-10 leading-[1.1]"
            >
              Your Pets & Home in Safe Hands
            </motion.h2>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 mt-1">
                    {/* Icons are now images instead of Lucide components */}
                    <img 
                      src={feature.icon} 
                      alt={feature.title} 
                      className="w-8 h-8 object-contain opacity-90"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a2e35] leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[#1a2e35]/50 text-sm mt-1 font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full flex items-stretch"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-sm w-full h-full">
              <img
                src={safeHandsImg}
                alt="Woman with Golden Retriever"
                /* min-h-[40vh] ensures it takes up 40% of the screen height */
                /* object-center ensures the woman and dog remain the focal point */
                className="w-full h-full object-cover min-h-[40vh] object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SafeHandsSection;