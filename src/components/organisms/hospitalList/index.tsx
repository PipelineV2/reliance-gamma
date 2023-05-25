import React from "react";
import { HospitalListProps, GroupedData } from "src/utils/types";


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
            {hospitals.map(({id, name, address, products}) => (
              <div
                key={id}
                className="grid md:grid-cols-12  grid-cols-1 gap-6 items-center py-4"
              >
                <div className="col-span-6 flex flex-col space-y-2">
                  <h3 className="font-bold">{name}</h3>
                  <p className="font-normal ">{address}</p>
                </div>
                <div className="col-span-6">
                  {products.map(({id, name})=>{
                    return <span key={id} className="text-xs bg-gray-200 py-1 px-3 m-1 rounded-full">{name}</span>
                  })}
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
