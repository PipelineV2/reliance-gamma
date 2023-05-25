import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import { fetchProvidersData, fetchProductsData } from "../api";
import MultiSelectDropdown from "components/organisms/multiSelect";
import Nav from "components/organisms/nav";
import Header from "components/organisms/header";
import { ProductsProp, ProvidersProp } from "src/utils/types";
import { responseSuccessStatus } from "../constants";
import { useStatesApi } from "@todak2000/nigeria-state-lga-react-component";
import { filterByStateAndProduct } from "../utils";
import Search from "components/organisms/search";
import { MdOutlineManageSearch } from "react-icons/md";
import HospitalList from "../components/organisms/hospitalList";
interface Hospital {
  name: string;
  address: string;
  products: string[];
}
const App = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductsProp[]>([]);
  const [providers, setProviders] = useState<ProvidersProp[]>([]);
  const [error, setError] = useState<string>("");
  const [searchState, setSearchState] = useState<string[]>([]);
  const [result, setResult] = useState<object[]>([]);
  const states = useStatesApi();

  useEffect(() => {
    fetchProvidersData().then((res) => {
      if (res.status === responseSuccessStatus) {
        setProviders(res?.data);
      } else {
        setError("Oops! an error occured");
      }
    });
    fetchProductsData().then((res) => {
      if (res.status === responseSuccessStatus) {
        setProducts(res?.data);
      } else {
        setError("Oops! an error occured");
      }
    });
  }, []);

  useEffect(() => {
    const x = filterByStateAndProduct(
      products,
      providers,
      selected,
      searchState
    );
    setResult(x);
    console.log(x, "result");
  }, [selected, searchState]);

  const onChange = (item: string) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(item)) {
        // return newArray
        return newArray.filter((filteredItem) => filteredItem != item);
        // else, add
      } else {
        newArray.push(item);
        return newArray;
      }
    });
  };

  const onChangeStates = (item: string) => {
    setSearchState((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(item)) {
        // return newArray
        return newArray.filter((filteredItem) => filteredItem != item);
        // else, add
      } else {
        newArray.push(item);
        return newArray;
      }
    });
  };

  return (
    <>
      <main className={styles.main}>
        <Nav />

        <Header />
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 md:px-20">
          <Search />
          <MultiSelectDropdown
            selectClassName="w-full"
            options={products}
            selected={selected}
            onChange={onChange}
            type="plan"
          />
          <MultiSelectDropdown
            selectClassName="w-full"
            options={states}
            selected={searchState}
            onChange={onChangeStates}
            type="state"
          />
        </div>

        {}

        {result.length > 0 && error === "" ? (
          <HospitalList data={result} />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center md:px-20">
              <MdOutlineManageSearch className="text-4xl text-red-400 my-4" />
              <p className="text-sm text-red-400">
                {error ? error : "Sorry! there is no result for your search"}
              </p>
            </div>
          </>
        )}
      </main>
      <footer className="text-sm text-gray-600 text-center flex flex-row justify-center w-full my-4">
        <a href="https://github.com/PipelineV2/reliance-gamma">
          TalentQL Pipeline Team Gamma @ {new Date().getFullYear()}
        </a>
      </footer>
    </>
  );
};

export default App;
