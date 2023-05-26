import { ProductsProp, ProvidersProp } from "./types";

/**
 * filterByStateAndProduct
 *
 * Filters an array of objects by state and product
 *
 * @param {Array<Object>} productsArr - An array of product objects to filter as obtained from the api
 * @param {Array<Object>} providersArr - An array of provider objects as obtained from the api
 * @param {Array<String>} selectedProductsArr - An array of strings representing selected products to filter by
 * @param {Array<String>} statesArr - An array of strings representing states to filter by
 *
 * @returns {Array<Object>} - An array of filtered objects
 */

export const filterByStateAndProduct = (
  productsArr: ProductsProp[],
  providersArr: ProvidersProp[],
  selectedProductsArr: string[],
  statesArr: string[]
) => {
  let result: any[] = [];
  let newProdArr: ProductsProp[] = [];
  if (selectedProductsArr.length > 0) {
    newProdArr = productsArr.filter((product) =>
      selectedProductsArr.includes(product.name)
    );
  } else {
    newProdArr = productsArr;
  }
  providersArr.forEach((xItem) => {
    if (statesArr && statesArr.includes(xItem?.state?.name)) {
      let products = xItem.products;
      let productsMatched = newProdArr
        .filter((yItem) => {
          return products.includes(yItem.id.toString());
        })
        .map((ppItem) => {
          return { id: ppItem.id, name: ppItem.name };
        });
      if (productsMatched.length > 0) {
        result.push({
          ...xItem,
          products: productsMatched,
        });
      }
    } else if (statesArr.length <= 0) {
      let products = xItem.products;
      let productsMatched = newProdArr
        .filter((yItem) => {
          return products.includes(yItem.id.toString());
        })
        .map((ppItem) => {
          return { id: ppItem.id, name: ppItem.name };
        });
      if (productsMatched.length > 0) {
        result.push({
          ...xItem,
          products: productsMatched,
        });
      }
    }
  });
  return result;
};

export const toTitleCase = (str: string | any) => {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match: string) {
    return match.toUpperCase();
  });
};

export const getShareableLink = (
  selectedProductsArr: string[],
  statesArr: string[]
) => {
  const x = selectedProductsArr
    .map((plan) => {
      return `itemPlan=${plan.replace(/ /g, "%20")}`;
    })
    .join("&");
  const y = statesArr
    .map((state) => {
      return `itemState=${state.replace(/ /g, "%20")}`;
    })
    .join("&");

  const url = `${window.location.href}search?${x}&${y}`;

  return url;
};

export const searchResultFunc = (url: string) => {
  const z = url?.split("?")[1];
  let x: any[] = [];
  let y: any[] = []; 
  if (z){
    x = z
    .split("&")
    .map((item) => {
      let [key, value] = item.split("=");

      if (key === "itemPlan") {
        return value.replace(/%20/g, " ");
      }
    })
    .filter(Boolean);

    y = z
      .split("&")
      .map((item) => {
        let [key, value] = item.split("=");

        if (key === "itemState") {
          return value.replace(/%20/g, " ");
        }
      })
      .filter(Boolean);
  }
  

  return [x, y];
};
