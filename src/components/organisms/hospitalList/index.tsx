import React from "react";

interface Hospital {
  id: number;
  name: string;
  location: string | null;
  address: string;
  tier_id: number;
  type_id: number;
  state: {
    id: number;
    name: string;
  };
  products: {
    id: number;
    name: string;
  }[];
}

interface GroupedData {
  [stateName: string]: Hospital[];
}

interface HospitalListProps {
  data: Hospital[];
}

const HospitalList: React.FC<HospitalListProps> = ({ data }) => {
  // Group the data by state names
  const groupedData: GroupedData = {};
  data.forEach((obj) => {
    const stateName = obj.state.name;

    if (!groupedData[stateName]) {
      groupedData[stateName] = [];
    }

    groupedData[stateName].push(obj);
  });

  return (
    <div className="w-full">
      {Object.entries(groupedData).map(([stateName, hospitals]) => (
        <div key={stateName}>
          <h2 className="text-xl font-bold text-sky-700 uppercase py-2 border-b border-gray-300">
            {stateName}
          </h2>

          <ul>
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="grid grid-cols-12 gap-6 items-center py-4"
              >
                <div className="col-span-6 flex flex-col space-y-2">
                  <h3 className="font-bold">{hospital.name}</h3>
                  <p className="font-normal ">{hospital.address}</p>
                </div>
                <div className="col-span-6">
                  <p className="">Red Beryl Plan</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
