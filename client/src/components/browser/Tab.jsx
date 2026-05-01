import React from 'react';

const Tab = ({ title, onClick, isActive, closable, onClose }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer select-none transition-all duration-200
        ${isActive 
          ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
        }
      `}
    >
      <span className="text-sm font-medium max-w-[150px] truncate">
        {title || "New Tab"}
      </span>

      {closable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`
            rounded-full opacity-70 hover:opacity-100 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors
            ${isActive ? 'hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30' : ''}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Tab;