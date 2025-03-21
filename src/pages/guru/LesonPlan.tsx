import { useState, useEffect } from "react";
import { Guru } from "../../midleware/Api";
import Store from "../../store/Store";

interface LessonPlan {
  subject_id: number;
  class_id: number;
}

const LesonPlan = () => {
  const [fetchData, setFetchData] = useState<any[]>([]);
  const [mapelKelas, setMapelKelas] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = Store();

  const FetchData = async () => {
    try {
      const response = await Guru.GetDataLesonPlan(token);
      setFetchData(response.data.data.data);
      setMapelKelas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const formatLessonPlan = (lesson_plans: LessonPlan[]) => {
    let subjects: Record<number, number> = {};
    let classes: Record<number, number> = {};

    lesson_plans.forEach((data) => {
      subjects[data.subject_id] = 0;
      classes[data.class_id] = 0;
    });

    return {
      subject_length: Object.keys(subjects).length,
      class_length: Object.keys(classes).length,
    };
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center text-2xl">Lesson Plan</div>

      {/* card section 1 */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200">
            <span className="text-sm font-medium text-gray-500">
              Total Guru
            </span>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              <span className="text-3xl font-semibold text-blue-600">
                {fetchData.length}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 border-r sm:border-r-2 last:border-none sm:last:border-none border-gray-200">
            <span className="text-sm font-medium text-gray-500">
              Total Mapel
            </span>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              <span className="text-3xl font-semibold text-blue-600">
                {mapelKelas?.total?.subject_count}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-gray-500">
              Total Kelas
            </span>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              <span className="text-3xl font-semibold text-blue-600">
                {mapelKelas?.total?.class_count}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* card section 2 */}
      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fetchData.map((item, index) => {
              const { subject_length, class_length } = formatLessonPlan(
                item?.lessonplans
              );

              return (
                <div
                  key={index}
                  className="bg-white flex flex-col justify-between rounded-lg shadow-lg p-4"
                >
                  <h2 className="text-lg text-gray-800 mb-6">
                    {item?.full_name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-gray-900">
                        {class_length}
                      </div>
                      <div className="text-sm text-gray-500">Kelas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {subject_length}
                      </div>
                      <div className="text-sm text-gray-500">Mapel</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LesonPlan;
