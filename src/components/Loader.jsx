/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400/50 p-4">
      <div className="w-full max-w-[20rem] h-[0.45rem] bg-blue-300 rounded-full overflow-hidden relative">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
      </div>
    </div>
  );
};

export default Loader;