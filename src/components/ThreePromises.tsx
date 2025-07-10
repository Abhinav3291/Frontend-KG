

const ThreePromises = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Three Promises</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Knowledge</h3>
            <p className="text-gray-600">
              We promise to deliver comprehensive and practical knowledge that will empower you to excel in your chosen field.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Certificate</h3>
            <p className="text-gray-600">
              We guarantee a well recognized certificate upon successful completion of our courses, adding value to your resume.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Placements</h3>
            <p className="text-gray-600">
              We are committed to helping you secure meaningful job opportunities through our extensive industry connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreePromises;
