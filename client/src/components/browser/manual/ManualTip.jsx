const ManualTip = ({ children }) => (
  <div className="rounded-md bg-gray-50 dark:bg-gray-800/50 p-4 text-sm text-gray-700 dark:text-gray-300 my-5">
    <b>!</b>{"  "} {children}
  </div>
);

export default ManualTip