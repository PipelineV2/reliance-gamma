export type ProvidersResponseProp = {
    status: string;
    data: ProvidersProp[];
}

export type ProductsResponseProp = {
    status: string;
    data: ProductsProp[];
}
export type ProvidersProp = {
    id: number;
    name: string;
    location: string;
    address: string;
    tier_id: number;
    type_id: number;
    state: StateProp;
    products: string[];
}

export type ProductsProp = {
    id: number;
    name: string;
    type: string;
    extension: any;
    product_plan_type: string;
    description: string;
    tiers: number[];
    price: PriceProp;
}
type StateProp = {
    id: number;
    name: string;
}

type PriceProp = {
    monthly: number;
    quaterly: number;
    yearly: number;
}


export interface Hospital {
    id: number;
    name: string;
    location: string | null;
    address: string;
    tier_id: number;
    type_id: number;
    state: StateProp;
    products: {
      id: number;
      name: string;
    }[];
  }
  
export interface GroupedData {
    [stateName: string]: Hospital[];
  }
  
export interface HospitalListProps {
    data: Hospital[];
  }