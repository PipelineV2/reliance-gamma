import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import { fetchProvidersData, fetchProductsData } from "../api";
import MultiSelectDropdown from "components/organisms/multiSelect";
import Nav from "components/organisms/nav";
import Header from "components/organisms/header";
import { ProductsProp, ProvidersProp } from "src/utils/types";
import { responseSuccessStatus } from "../constants";
import { StateWidget } from "@todak2000/nigeria-state-lga-react-component";
import { filterByStateAndProduct } from "../utils";

const App = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductsProp[]>([]);
  const [providers, setProviders] = useState<ProvidersProp[]>([]);
  const [error, setError] = useState<string>("");
  const [searchState, setSearchState] = useState<string[]>([]);

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
  return (
    <main className={styles.main}>
      <Nav />
      <Header />
      <div className="grid grid-cols-12">
        <MultiSelectDropdown
          selectClassName="col-span-8"
          options={products}
          selected={selected}
          onChange={onChange}
        />
        <StateWidget
          isMultipleSelect
          setState={setSearchState}
          className="col-span-4"
        />
      </div>
      <footer className="text-sm text-gray-600 text-center">
        <a href="https://github.com/PipelineV2/reliance-gamma">
          TalentQL Pipeline Team Gamma @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
};

export default App;
