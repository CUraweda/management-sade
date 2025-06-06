import { useState, useEffect } from "react";
import Store from "../../store/Store";
import { PresensiEmployee, Employee } from "../../midleware/HrdApi";
import { IoMdOptions } from "react-icons/io";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";

const Presensi = () => {
  const [fetchData, setFetchData] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any[]>([]);
  const [fetchCard, setFetchCard] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { token } = Store();
  const [filter, setFilter] = useState<any>({
    search: "",
    start_date: "",
    end_date: "",
    page: 0,
    limit: 0,
    employee_id: null,
  });
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });

  const FetchData = async () => {
    setLoading(true);
    try {
      const response = await PresensiEmployee.showAll(token, { ...filter });
      const responseEmployee = await Employee.showAll(token);
      const responseCard = await PresensiEmployee.showCard(token, {
        ...filter,
      });
      setFetchCard(responseCard.data.data);
      setEmployee(responseEmployee.data.data.result);
      const { result, ...data } = response.data.data;
      setFetchData(result);
      setPaginate(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, [filter]);

  // Skeleton loader untuk card
  const renderSkeletonCard = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow-lg p-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200"
          >
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Skeleton loader untuk table
  const renderSkeletonTable = () => (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              Aktivitas
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Periode
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Tanggal Pelaksanaan
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Durasi
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="bg-white">
              <td className="px-4 py-1 text-center">
                <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
            Nama
          </label>
          <div className="relative">
            <select
              id="employee-select"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setFilter({ ...filter, employee_id: e.target.value })
              }
            >
              <option value="">Pilih Karyawan</option>
              {employee.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.full_name}
                </option>
              ))}
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
              onChange={(e) =>
                setFilter({ ...filter, start_date: e.target.value })
              }
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
              onChange={(e) =>
                setFilter({ ...filter, end_date: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* card section 1 */}
      {loading ? (
        renderSkeletonCard()
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200">
              <span className="text-sm font-medium text-red-500">
                Terlalu Cepat
              </span>
              <span className="text-3xl font-semibold text-red-500">
                {fetchCard?.["Terlalu Cepat"] || 0}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-yellow-500">
                Terlambat
              </span>
              <span className="text-3xl font-semibold text-yellow-500">
                {fetchCard?.["Terlambat"] || 0}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-green-500">
                Tepat Waktu
              </span>
              <span className="text-3xl font-semibold text-green-500">
                {fetchCard?.["Tepat Waktu"] || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* table */}
      {loading ? (
        renderSkeletonTable()
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-[#3B86F6] bg-[#DBEAFE]">
              <tr>
                <th scope="col" className="px-4 py-1 text-center">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Divisi
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Pukul
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Keterangan
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Tipe
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchData.map((item, index) => (
                <tr className="bg-white" key={index}>
                  <th className="px-4 py-1 text-center text-[#404040] font-light">
                    {filter.page * 10 + index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 text-center text-[#404040] font-light"
                  >
                    {item?.employee?.division?.name}
                  </th>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.employee?.full_name}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.worktime?.start_time} - {item?.worktime?.end_time}
                  </td>
                  <td className="px-6 py-4 text-[#404040] font-light text-center">
                    {item?.description}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      className={`btn btn-outline text-center btn-sm text-xs ${
                        item?.status === "Tepat Waktu"
                          ? "text-green-500 border-green-500 hover:text-green-500 hover:border-green-500"
                          : item?.status === "Terlalu Cepat"
                          ? "text-red-500 border-red-500 hover:text-red-500 hover:border-red-500"
                          : item?.status === "Terlambat"
                          ? "text-yellow-500 border-yellow-500 hover:text-yellow-500 hover:border-yellow-500"
                          : "-"
                      }`}
                    >
                      {item?.status || "-"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`btn btn-outline text-center btn-sm text-xs ${
                        item?.worktime?.type === "KELUAR"
                          ? "text-green-500 border-green-500 hover:text-green-500 hover:border-green-500"
                          : item?.worktime?.type === "MASUK"
                          ? "text-blue-500 border-blue-500 hover:text-blue-500 hover:border-blue-500"
                          : "-"
                      }`}
                    >
                      {item?.worktime?.type || "-"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
