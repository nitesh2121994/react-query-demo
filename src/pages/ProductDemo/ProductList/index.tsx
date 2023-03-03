import React, { lazy, useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getProducts } from "services";
import { Product } from "types/Product";

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import ProductItem from './components/ProductItem';

const ProductList = () => {

    const queryClient = useQueryClient();

    const { data: products, error, isLoading } = useQuery<Product[], AxiosError>({
        queryKey: ['products'],
        queryFn: getProducts
    });

    const refreshList = () => queryClient.invalidateQueries({ queryKey: ['products'] })

    if (isLoading) return <>Loading...</>;
    if (error) return <>{error.message}</>;

    return (
        <>
            <div className={styles.productHeader}>
                <Link to={'/products/add'}>Add Product</Link>
                <button type='button' style={{ marginLeft: 'auto' }} className={styles.btn} onClick={refreshList}>Refresh list</button>
            </div>
            <div className={styles.productContainer}>
                {products.map(product => (<ProductItem key={product.id} product={product} />))}
            </div>
        </>
    )
};

export default ProductList;
