import { Product } from "types/Product";

import styles from '../../styles.module.scss';

type ProductItemProps = {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {

    return (
        <div className={styles.productItemContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.title}>
                    {product.title}
                </div>
                <div className={styles.imageWrapper}>
                    <img src={product.image} alt="Product image" />
                </div>
            </div>
            <div className={styles.price}>
                <strong>$ {product.price}</strong>
            </div>
        </div>
    )
};

export default ProductItem;