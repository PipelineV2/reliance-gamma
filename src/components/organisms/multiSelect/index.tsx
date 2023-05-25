import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp, BsSearch } from "react-icons/bs";
import "./index.scss";
import { SlClose } from "react-icons/sl";
import { SearchIcon, CloseIcon } from "components/atoms/icons";
import { toTitleCase } from "../../../utils/";

type multiProps = {
  options: any;
  selected: any;
  type: string;
  onChange: (state: any) => void;
  selectClassName?: string;
  selectStyle?: object;
  dropdownClassName?: string;
  dropdownStyle?: object;
  selectedItemClass?: string;
  selectedItemStyle?: object;

  optionsContainerClass?: string;
  optionsContainerStyle?: object;
  optionsClass?: string;
  optionsStyle?: object;
  searchClass?: string;
  searchStyle?: object;
  searchContainerClass?: string;
  searchContainerStyle?: object;
};

type optionsProps = {
  id: string;
  name?: string;
  state?: string;
  slogan?: string;
  lga?: string[];
};

function MultiSelectDropdown({
  options,
  selected,
  type,
  onChange,
  selectClassName = "defaultSelectClass",
  selectStyle,
  dropdownClassName = "defaultDropdownClass",
  dropdownStyle,
  selectedItemStyle,
  selectedItemClass = "selectedSpan",
  optionsContainerStyle,
  optionsContainerClass = "defaulfoptionsContainerClass",
  optionsStyle,
  optionsClass = "defaulfOptionsClass",
  searchStyle,
  searchClass = "defaulfSearchInput",
  searchContainerStyle,
  searchContainerClass = "defaultSearchContainer",
}: multiProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownOptions, setDropdownOptions] = useState<optionsProps[]>([]);
  useEffect(() => {
    if (searchQuery !== "" && typeof options[0] === "object") {
      setDropdownOptions(
        options?.filter(
          ({ id, name, state }: optionsProps) =>
            name
              ?.toLocaleLowerCase()
              ?.includes(searchQuery?.toLocaleLowerCase()) ||
            state
              ?.toLocaleLowerCase()
              ?.includes(searchQuery?.toLocaleLowerCase())
        )
      );
    } else if (searchQuery !== "" && typeof options[0] === "string") {
      setDropdownOptions(
        options?.filter((item: string) =>
          item?.toLocaleLowerCase()?.includes(searchQuery?.toLocaleLowerCase())
        )
      );
    } else {
      setDropdownOptions(options);
    }
  }, [options, searchQuery]);

  useEffect(() => {
    setDropdownOptions(options);
  }, [options, showDropdown]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  // console.log(dropdownOptions)
  return (
    <div className={`${selectClassName} flex items-start space-x-6`}>
      <div className="w-full">
        <div
          className="rounded-md flex items-center justify-between space-x-4 border-2 border-gray-400 p-3 mb-2 w-full"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <div className="text-gray-500 cursor-pointer text-xs">
            {selected.length > 0
              ? `${selected.length} ${type === "plan" ? "Plan" : "State"}${
                  selected.length > 1 ? "s" : ""
                } selected`
              : type === "plan"
              ? "Select Health Plan"
              : "Select Location"}
          </div>
          {!showDropdown ? (
            <BsChevronDown className="cursor-pointer" />
          ) : (
            <BsChevronUp className="cursor-pointer" />
          )}
        </div>
        {/* Selected Items */}
        <div className="grid grid-cols-4 gap-2">
          {selected.map((state: string, index: number) => {
            return (
              <span
                key={index}
                className="flex items-center justify-between space-x-2 rounded-md border border-sky-700 bg-sky-300/20 col-span-2 p-2 font-semibold text-xs"
              >
                {state}
                <SlClose
                  onClick={() => {
                    onChange(state);
                  }}
                  className="closeItem pl-1 w-10 cursor-pointer"
                />
              </span>
            );
          })}
        </div>

        {/* Actual Dropdown */}
        {showDropdown && (
          <>
            {/* Search Input */}
            <div className="rounded-md flex items-center border-2 border-gray-400 py-0.5 px-2 my-2">
              <SearchIcon color="text-gray-500" width="4" height="4" />
              <input
                type="text"
                className="placeholder:text-gray-500 border-0 p-0.5 focus:ring-0"
                placeholder="Quick search"
                onKeyDown={(e: any) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
            {/* Health Plan Dropdown Items */}
            <ul className="border-2 border-blue-800 rounded-md shadow-2xl p-2 h-36 overflow-auto">
              {typeof options[0] === "object" &&
                dropdownOptions.map(({ id, name, state }: optionsProps) => {
                  const isSelected =
                    type === "plan"
                      ? selected.includes(name)
                      : selected.includes(state);

                  return (
                    <li
                      key={id}
                      className="px-3 py-2"
                      onClick={() =>
                        type === "plan" ? onChange(name) : onChange(state)
                      }
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="rounded-md border-sky-800 w-4 h-4"
                      ></input>
                      <span className="pl-2 font-medium">
                        {/* {toTitleCase()} */}
                        {name || state}
                      </span>
                    </li>
                  );
                })}
              {typeof options[0] === "string" &&
                dropdownOptions.map((item: any, index: number) => {
                  const isSelected = selected.includes(item);

                  return (
                    <li
                      key={index}
                      className={`${optionsClass}`}
                      style={optionsStyle}
                      onClick={() => onChange(item)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="checkbox"
                      ></input>
                      <span>{item}</span>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
