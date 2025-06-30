const Dashboard: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
        <div className="grid md:grid-cols-2 gap-6 ">
          {/* Left Side: Form */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add Product
            </h4>
            <form>
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="title"
                placeholder="Title"
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="description"
                placeholder="Description"
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="cost"
                placeholder="Cost"
                type="number"
                required
              />

              {/* Image Preview */}
              <div className="mb-3">
                {/* <img
                  src="#"
                  alt="Preview"
                  id="bannerPreview"
                  className="w-24 h-24 object-cover rounded-md"
                  style={{ width: "100%", height: "100%", display: "none" }}
                /> */}
              </div>

              <input
                className="w-full mb-3 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="file"
                id="bannerInput"
              />

              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                type="submit"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Right Side: Table */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Title</th>
                  <th className="px-4 py-2 border-b">Banner</th>
                  <th className="px-4 py-2 border-b">Cost</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">Sample Product</td>
                  <td className="px-4 py-2 border-b">
                    {/* <img
                      src="#"
                      alt="Product"
                      className="w-12 h-12 object-cover rounded"
                      style={{ width: "50%", height: "50%" }}
                    /> */}
                  </td>
                  <td className="px-4 py-2 border-b">$100</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button className="px-3 py-1 bg-yellow-400 text-white text-xs rounded hover:bg-yellow-500">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
