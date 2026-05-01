const ManualSection = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {title}
    </h2>
    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </section>
);

export default ManualSection