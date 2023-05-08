
import { ProvidersResponseProp, ProductsResponseProp } from "../utils/types";
import { providersUrl, productsUrl } from "../constants";

export const fetchProvidersData = async (): Promise<ProvidersResponseProp|any> => {
    try {
      const response = await fetch(providersUrl);
      return response.json();
    } catch (error) {
      console.log(error);
    }
}

export const fetchProductsData = async (): Promise<ProductsResponseProp|any> => {
    try {
      const response = await fetch(productsUrl);
      return response.json();
    } catch (error) {
      console.log(error);
    }
}