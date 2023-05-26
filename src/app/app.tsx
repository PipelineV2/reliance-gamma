import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchProvidersData, fetchProductsData } from "../api";
import MultiSelectDropdown from "components/organisms/multiSelect";
import Nav from "components/organisms/nav";
import Header from "components/organisms/header";
import { ProductsProp, ProvidersProp } from "src/utils/types";
import { responseSuccessStatus } from "../constants";
import { useStatesApi } from "@todak2000/nigeria-state-lga-react-component";
import {
  filterByStateAndProduct,
  getShareableLink,
  searchResultFunc,
} from "../utils";
// import Search from "components/organisms/search";
import { MdOutlineManageSearch } from "react-icons/md";
import HospitalList from "../components/organisms/hospitalList";
import { Hospital } from "src/utils/types";
import Share from "../components/organisms/share";
import Spinner from "components/atoms/spinner";

const AppHome = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductsProp[]>([]);
  const [providers, setProviders] = useState<ProvidersProp[]>([]);
  const [error, setError] = useState<string>("");
  const [searchState, setSearchState] = useState<string[]>([]);
  const [result, setResult] = useState<Hospital[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const states = useStatesApi();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {

    if (location.pathname === '/search') {
      setSearch(searchResultFunc(window.location.href));
    }

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
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (providers.length > 0 && products.length > 0) {
      if (location.pathname === '/search') {
        if (search[0]?.length > 0 || search[1]?.length > 0){
          setSelected(search[0]);
          setSearchState(search[1]);
        }
        else{
          navigate('/')
        }
        
      }
      const x = filterByStateAndProduct(
        products,
        providers,
        selected,
        searchState
      );
      setResult(x);
      setLoading(false);
    }
  }, [products, providers,window.location.href, loading, search, selected, searchState,]);


  const onChange = (item: string, type: string) => {
    let setState: React.Dispatch<React.SetStateAction<any>> = () => null;
    if (type === "plan") {
      setState = setSelected;
    } else {
      setState = setSearchState;
    }
    setState((prevSelected: string[]) => {
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

  const handleShareLink = () => {
    let link: string;
    if (selected.length <= 0 && searchState.length <= 0) {
      link = window.location.href;
    } else {
      link = getShareableLink(selected, searchState);
      searchResultFunc(link);
    }
    return link;
  };

  return (
    <>
      <main className={styles.main}>
        <Nav />

        <Header />
        <div
          className={`grid ${
            result.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"
          } grid-cols-1 gap-3 md:px-[20%]`}
        >
          {/* <Search /> */}
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
            onChange={onChange}
            type="state"
          />
          {result.length > 0 && <Share onCopy={handleShareLink} />}
        </div>

        {loading ? (
          <Spinner />
        ) : result.length > 0 && error === "" ? (
          <HospitalList data={result} />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center md:px-20">
              <>
                <MdOutlineManageSearch className="text-6xl text-gray-400 my-4" />
                <p className="text-sm text-gray-400">
                  {error !== ""
                    ? error
                    : "Begin your search by selecting your Health plan of interest"}
                </p>
              </>
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

export default AppHome;
