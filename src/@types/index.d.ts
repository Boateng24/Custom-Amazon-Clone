declare module "docs";

export type productType = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  hideButton : unknown;
};


export type Country = {
  country: {
    capital: string;
    currency: string;
    flag: string;
    geoname_id: number;
    iso_code: string;
    languages: Record<string, string>[];
    name: string;
    name_native: string;
    names: Record<string, string>;
    phone_code: string;
  };
}