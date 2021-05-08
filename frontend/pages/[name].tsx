import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import xml from "xml2js";
import { useRouter } from "next/router";

import axios from "../axiosInstance";
import { Errors } from "../messages/Errors";
import { ProductPageInterface } from "../interfaces/ProductPage";
import { Product } from "../../types/Product";
import ProductPageComponent from "../Components/ProductPage/ProductPage";

const ProductPage: React.FC<ProductPageInterface> = ({ product, error }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {" "}
          {router.isFallback ? "Ładowanie..." : router.query.name}{" "}
        </title>
      </Head>
      <ProductPageComponent product={product} error={error} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  let products: Product[] = [];

  xml.parseString(data, function (err, results) {
    if (!err) products = results.products.product;
  });

  const paths = products.map((product: Product) => ({
    params: { name: product.name.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let product: Product | null = null;
  let error: string | null = null;
  try {
    const { data, status } = await axios.get(
      `http://localhost:5000/products/${encodeURIComponent(
        (params as { name: string }).name
      )}`
    );
    if (status === 500) error = data.error;
    else if (status === 200) {
      xml.parseString(data, function (err, results) {
        if (!err) product = results.product;
        else error = Errors.STH_WENT_WRONG;
      });
    }
  } catch {
    error = Errors.STH_WENT_WRONG;
  }
  return {
    props: {
      error,
      product,
    },
    revalidate: 1,
  };
};

export default ProductPage;
