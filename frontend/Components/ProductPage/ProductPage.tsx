import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import { ProductPageInterface } from "../../interfaces/ProductPage";

const ProductPage: React.FC<ProductPageInterface> = ({ product, error }) => {
  return (
    <div>
      {error === null ? (
        <Card key={product!.name[0]}>
          <CardImg
            top
            width="100%"
            src={product!.picture[0]}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h4">{product!.name[0]}</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">
              {product!.price[0]} zł
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Kategoria: {product!.category[0]}
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Wydawca: {product!.vendor[0]}
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Opis: {product!.description[0]}
            </CardSubtitle>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
};

export default ProductPage;
