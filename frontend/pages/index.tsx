import { GetStaticProps } from "next";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

import Products from "../Components/Products/Products";
import axios from "../axiosInstance";
import { Errors } from "../messages/Errors";
import { ProductsInterface } from "../interfaces/Products";

const Home: React.FC<ProductsInterface> = ({ products, error }) => {
  return (
    <>
      <Head>
        <title>Oferty</title>
      </Head>
      <Products products={products} error={error} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let products: string | null = null;
  let error: string | null = null;
  try {
    const { data, status } = await axios.get("http://localhost:5000/");
    if (status === 500) error = data;
    else if (status === 200) products = data;
  } catch {
    error = Errors.STH_WENT_WRONG;
  }
  return {
    props: {
      error,
      products,
    },
    revalidate: 1,
  };
};

export default Home;
