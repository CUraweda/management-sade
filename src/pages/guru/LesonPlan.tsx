import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

const LesonPlan = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const students = [
    { name: "Sophia Carter", kelas: 1, mapel: 2 },
    { name: "Mia Thompson", kelas: 1, mapel: 2 },
    { name: "Charlotte Taylor", kelas: 1, mapel: 2 },
    { name: "Ella Clark", kelas: 1, mapel: 2 },
    { name: "Noah Johnson", kelas: 3, mapel: 4 },
    { name: "Ethan Wilson", kelas: 3, mapel: 4 },
    { name: "James Thomas", kelas: 3, mapel: 4 },
    { name: "Lucas Harris", kelas: 3, mapel: 4 },
    { name: "Ava Martinez", kelas: 1, mapel: 2 },
    { name: "Isabella Brown", kelas: 1, mapel: 2 },
    { name: "Amelia Anderson", kelas: 1, mapel: 2 },
    { name: "Grace White", kelas: 1, mapel: 2 },
  ];

  return (
    <div className="p-6">
      <div className="text-center text-2xl ">Leson Plan</div>
      <div className="mt-6 flex items-center gap-5">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <div>
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd MMM yyyy"
              className="w-full py-2 pl-10 pr-8 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <AiOutlineCalendar className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" />
            <IoIosArrowDown className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>-</div>

        <div>
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd MMM yyyy"
              className="w-full py-2 pl-10 pr-8 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <AiOutlineCalendar className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" />
            <IoIosArrowDown className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200">
            <span className="text-sm font-medium text-gray-500">
              Total Guru
            </span>
            <span className="text-3xl font-semibold text-blue-600">16</span>
          </div>
          <div className="flex flex-col gap-4  border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200">
            <span className="text-sm font-medium text-gray-500">
              Total Mapel
            </span>
            <span className="text-3xl font-semibold text-blue-600">8</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-gray-500">
              Total Kelas
            </span>
            <span className="text-3xl font-semibold text-blue-600">10</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg text-gray-800 mb-6">{student.name}</h2>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    {student.kelas}
                  </div>
                  <div className="text-sm text-gray-500">Kelas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {student.mapel}
                  </div>
                  <div className="text-sm text-gray-500">Mapel</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default LesonPlan;
