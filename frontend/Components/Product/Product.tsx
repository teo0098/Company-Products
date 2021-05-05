import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import { Product as ProductType } from "../../types/Product";

const Product: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Card key={product.name[0]}>
      <CardImg top width="100%" src={product.picture[0]} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h4">{product.name[0]}</CardTitle>
        <CardSubtitle tag="h5" className="mb-2 text-muted">
          {product.price[0]} zł
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Kategoria: {product.category[0]}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Wydawca: {product.vendor[0]}
        </CardSubtitle>
        <Button>Szczegóły</Button>
      </CardBody>
    </Card>
  );
};

export default Product;
