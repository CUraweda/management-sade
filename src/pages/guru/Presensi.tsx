import { useState, useEffect } from "react";
import { Guru } from "../../midleware/Api";
import Store from "../../store/Store";
import { IoMdOptions } from "react-icons/io";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import "../../index.css";

const Presensi = () => {
  const [fetchDataTable, setFetchDataTable] = useState<any[]>([]);
  const [fetchDataCard, setFetchDataCard] = useState<any>();
  const [filter, setFilter] = useState<any>({
    page: 0,
    limit: 0,
    search: "",
  });
  const [transport, setTransport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = Store();
  const [paginate, setPaginate] = useState<IpageMeta>({
    page: 0,
    limit: 0,
  });

  const FetchData = async () => {
    setLoading(true);
    try {
      const responseTable = await Guru.GetDataTablePresensi(
        token,
        transport,
        startDate,
        endDate,
        { ...filter }
      );
      const responseCard = await Guru.GetDataCardPresensi(
        token,
        transport,
        startDate,
        endDate,
        { ...filter }
      );

      const transformedData = responseCard.data.data.reduce(
        (acc: any, curr: any) => {
          acc[curr.remark] = curr.total_data;
          return acc;
        },
        {}
      );

      const { result, ...data } = responseTable.data.data;
      setPaginate(data);
      setFetchDataTable(result);
      setFetchDataCard(transformedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, [transport, startDate, endDate, filter]);

  return (
    <div className="p-6">
      <div className="text-center text-2xl">Presensi</div>

      {/* filter */}
      <div className="flex flex-wrap items-center justify-end gap-4 mt-4">
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              required
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="transport-select"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Transportasi
          </label>
          <div className="relative">
            <select
              id="transport-select"
              onChange={(e) => setTransport(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih Transportasi</option>
              <option value="jalan kaki">Jalan Kaki</option>
              <option value="kendaraan umum">Kendaraan Umum</option>
              <option value="antar jemput">Antar Jemput</option>
              <option value="sepeda">Sepeda</option>
            </select>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoMdOptions />
            </div>
          </div>
        </div>

        <div id="date-range-picker" className="flex items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-range-start"
              name="start"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 appearance-none"
              placeholder="Select date start"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="mx-4 text-gray-500">-</span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-range-end"
              name="end"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 appearance-none"
              placeholder="Select date end"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* card section 1 */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white rounded-lg shadow-lg p-6">
          {loading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 animate-pulse border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200"
                  >
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                ))
            : [
                {
                  name: "Jalan Kaki",
                  color: "text-red-500",
                  data: fetchDataCard?.["🚶‍♂️jalan kaki"] || 0,
                },
                {
                  name: "Kendaraan Umum",
                  color: "text-yellow-500",
                  data: fetchDataCard?.["🚌kendaraan umum"] || 0,
                },
                {
                  name: "Antar Jemput",
                  color: "text-blue-500",
                  data: fetchDataCard?.["🚗antar jemput"] || 0,
                },
                {
                  name: "Sepeda",
                  color: "text-green-500",
                  data: fetchDataCard?.["🚲sepeda"] || 0,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200`}
                >
                  <span className={`text-sm font-medium ${item.color}`}>
                    {item.name}
                  </span>
                  <span className={`text-3xl font-semibold ${item.color}`}>
                    {item.data}
                  </span>
                </div>
              ))}
        </div>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="h-6 bg-gray-300 rounded"></div>
              ))}
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-[#3B86F6] bg-[#DBEAFE]">
              <tr>
                <th scope="col" className="px-4 py-1 text-center">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  NIS
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Kelas
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Presensi
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Transportasi
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchDataTable.map((item, index) => (
                <tr className="bg-white" key={index}>
                  <th className="px-4 py-1 text-center text-[#404040] font-light">
                    {filter.page * 10 + index + 1}
                  </th>
                  <td className="px-6 py-4 text-center text-[#404040] font-light">
                    {item?.studentclass?.student?.full_name}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.studentclass?.student?.nis}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.studentclass?.student?.class}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.status}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.remark || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* pagination */}
      <div className="mx-4 mb-6">
        <PaginationBar
          meta={paginate}
          onNextClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          onPrevClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          onLimitChange={(limit) => setFilter({ ...filter, limit })}
        />
      </div>
    </div>
  );
};

export default Presensi;
