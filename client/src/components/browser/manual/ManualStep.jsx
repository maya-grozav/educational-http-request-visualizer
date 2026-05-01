const ManualStep = ({ number, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 h-7 w-7 rounded-full text-white text-sm flex items-center justify-center">
      {number}.
    </div>
    <div>
      <div className="font-medium text-gray-900 dark:text-gray-100">
        {title}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  </div>
);

export default ManualStep