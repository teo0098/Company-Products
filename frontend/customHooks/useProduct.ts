const useProduct = () => {
  const handleRedirectToProductDetails = (productName: string) => {
    window.open(
      `http://localhost:3001/${productName}`,
      "_blank",
      "location=yes,height=1000,width=1000,scrollbars=yes,status=yes"
    );
  };

  return { handleRedirectToProductDetails };
};

export default useProduct;
