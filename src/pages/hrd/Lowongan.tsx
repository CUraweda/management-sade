import { useEffect, useState } from "react";
import { LowonganJob } from "../../midleware/HrdApi";
import Store from "../../store/Store";

const Lowongan = () => {
  const [fetch, setFetch] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = Store();

  const FetchData = async () => {
    try {
      const response = await LowonganJob.showAll(token);
      setFetch(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="text-2xl text-center">Lowongan</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading
          ? // Skeleton loader
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white flex flex-col rounded-lg shadow-lg p-4 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))
          : fetch.map((item, index) => (
              <div
                className="bg-white flex flex-col rounded-lg shadow-lg p-4"
                key={index}
              >
                <h2 className="text-lg text-gray-800 mb-6">{item.name}</h2>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-blue-500">
                      {item.length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Lowongan;
