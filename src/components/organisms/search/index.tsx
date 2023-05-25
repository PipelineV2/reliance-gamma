import React, { useState, useEffect } from "react";


function Search() {

  return (
    <div>
        <input
          className="text-xs rounded-md flex items-center justify-between border-[0.5px] border-gray-400 p-3 placeholder:text-gray-500 w-full"
          type="text"
          placeholder="Enter Hospital Name"
        />
      </div>
  );
}

export default Search;
