import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-900 dark:border-gray-700 border-b-gray-800 dark:border-b-gray-100"></div>
    </div>
  );
};

export default Spinner;