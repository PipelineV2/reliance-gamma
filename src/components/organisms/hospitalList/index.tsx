import React, { useState, useEffect } from "react";
import { HospitalListProps, GroupedData } from "../../../utils/types";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { toTitleCase } from "../../../utils";
const HospitalList: React.FC<HospitalListProps> = ({ data }) => {
  const [openObj, setOpenObj] = useState<any>({});
  // Group the data by state names
  const isOpen: any = {};
  const groupedData: GroupedData = {};
  data.forEach((obj) => {
    const stateName = obj.state.name;

    if (!groupedData[stateName]) {
      groupedData[stateName] = [];
    }

    groupedData[stateName].push(obj);

    if (!isOpen[stateName]) {
      isOpen[stateName] = true;
    }
  });

  useEffect(() => {
    setOpenObj(isOpen);
  }, []);

  const toggle = (stateName: string) => {
    setOpenObj({ ...openObj, [stateName]: !openObj[stateName] });
  };

  return (
    <div className="w-full">
      {Object.entries(groupedData).map(([stateName, hospitals]) => (
        <div key={stateName}>
          <h2 className="text-lg font-bold flex flex-row justify-between items-center text-sky-700 uppercase py-2 border-b border-gray-300">
            {stateName}
            {openObj[stateName] ? (
              <BsChevronUp
                className="cursor-pointer text-lg"
                onClick={() => toggle(stateName)}
              />
            ) : (
              <BsChevronDown
                className="cursor-pointer text-lg"
                onClick={() => toggle(stateName)}
              />
            )}
          </h2>

          {openObj[stateName] && (
            <ul className="overflow-y-auto max-h-[35vh]">
              {hospitals.map(({ id, name, address, products }) => (
                <div
                  key={id}
                  className="grid md:grid-cols-12  grid-cols-1 gap-1 items-center py-4"
                >
                  <div className="col-span-12 md:col-span-6 flex flex-col space-y-2">
                    <h3 className="font-semibold text-sm">{toTitleCase(name)}</h3>
                    <p className="font-normal text-xs">{toTitleCase(address)}</p>
                  </div>
                  <div className="flex flex-row flex-wrap items-center col-span-12 md:col-span-6">
                    {products.map(({ id, name }) => {
                      return (
                        <span
                          key={id}
                          className="text-xs bg-gray-200 py-1 px-2 md:px-3 m-1 rounded-full"
                        >
                          {toTitleCase(name)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
