import { GetStaticProps } from "next";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

import Products from "../Components/Products/Products";
import axios from "../axiosInstance";
import { Errors } from "../messages/Errors";
import { ProductsInterface } from "../interfaces/Products";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";
import { Vendor } from "../../types/Vendor";

const Home: React.FC<ProductsInterface> = ({ data, error }) => {
  return (
    <>
      <Head>
        <title>Oferty</title>
      </Head>
      <Products data={data} error={error} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: {
    products: Product[];
    categories: Category[];
    vendors: Vendor[];
  } = {
    products: [],
    categories: [],
    vendors: [],
  };
  let error: string | null = null;
  try {
    const { data: productsData, status: productsStatus } = await axios.get(
      "http://localhost:5000/products"
    );
    if (productsStatus === 500) error = productsData;
    else if (productsStatus === 200) data.products = productsData;
    const { data: categoriesData, status: categoriesStatus } = await axios.get(
      "http://localhost:5000/categories"
    );
    if (categoriesStatus === 500) error = categoriesData;
    else if (categoriesStatus === 200) data.categories = categoriesData;
    const { data: vendorsData, status: vendorsStatus } = await axios.get(
      "http://localhost:5000/vendors"
    );
    if (vendorsStatus === 500) error = vendorsData;
    else if (vendorsStatus === 200) data.vendors = vendorsData;
  } catch {
    error = Errors.STH_WENT_WRONG;
  }
  return {
    props: {
      error,
      data,
    },
    revalidate: 1,
  };
};

export default Home;
