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

export const filterByStateAndProduct = (productsArr: ProductsProp[], providersArr: ProvidersProp[], selectedProductsArr: string[], statesArr: string[]) => {
    let result: any[] = [];
    let newProdArr: ProductsProp[] = []
    if (selectedProductsArr.length > 0) {
      newProdArr = productsArr.filter((product)=> selectedProductsArr.includes(product.name))
    }
    else {
      newProdArr = productsArr
    }
    providersArr.forEach(xItem => {
      if (statesArr && statesArr.includes(xItem?.state?.name)) {
          let products = xItem.products;
          let productsMatched = newProdArr.filter(yItem => {
              return products.includes(yItem.id.toString())
          }).map(ppItem => {return {id:ppItem.id,  name: ppItem.name}});
          if (productsMatched.length > 0) {
              result.push({
                  ...xItem,
                  products: productsMatched
              })
          }
      } else if (statesArr.length <= 0) {
          let products = xItem.products;
          let productsMatched = newProdArr.filter(yItem => {
              return products.includes(yItem.id.toString())
          }).map(ppItem => {return {id:ppItem.id,  name: ppItem.name}});
          if (productsMatched.length > 0) {
              result.push({
                  ...xItem,
                  products: productsMatched
              })
          }
      }
  });
    return result;
  
  }