import { getCourseListOfUser } from "@/services/pocketbase";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";

export default function Stats() {

  const [eventList, setEventList] = useState<RecordModel[]>();

  useEffect(() => {
    (async () => {
      const list = await getCourseListOfUser();
      setEventList(list)
    })();
  }, [])

  return (
    <dl className="grid grid-cols-1 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow md:grid-cols-2 md:divide-y-0 md:divide-x">

      <div key={"Fortbildungen"} className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900">Fortbildungen</dt>
        <dd className="flex items-baseline justify-between mt-1 md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
            {eventList?.length}
          </div>
        </dd>
      </div>
      <div key={"Fortbildungsstunden"} className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900">Fortbildungsstunden</dt>
        <dd className="flex items-baseline justify-between mt-1 md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
            {eventList?.reduce((r : any, c : any) => {
                  r = r + c.expand.course.points
                  return r
                }, {points: 0}.points)}
            <span className="ml-2 text-sm font-medium text-gray-500">von 20</span>
          </div>
        </dd>
      </div>
    </dl>
  );
}