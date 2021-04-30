import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import useProducts from "../../customHooks/useProducts";
import { ProductsInterface } from "../../interfaces/Products";
import { Product } from "../../types/Product";
import styles from "./Products.module.css";

const Products: React.FC<ProductsInterface> = ({ error, products }) => {
  const { state } = useProducts(products, error);

  return (
    <div className={styles.Products}>
      {state.data !== null ? (
        <div className={styles.Products__offers}>
          {(state.data as Product[]).map((product) => (
            <Card key={product.name}>
              <CardImg
                top
                width="100%"
                src={product.picture[0]}
                alt="Card image cap"
              />
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
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Products;
