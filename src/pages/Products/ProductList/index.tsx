import React, { lazy, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addProduct, getProducts } from "services";
import { Product } from "types/Product";
import ProductItem from './components/ProductItem';

import styles from './styles.module.scss';
// import ProductFormView from '../ProductForm/components/ProductFormView';
import { Link } from 'react-router-dom';

const ProductFormPage = lazy(() => import('../ProductForm'))


const ProductList = () => {

    const { data: products, error, isLoading, refetch } = useQuery<Product[], AxiosError>({
        queryKey: ['products'],
        queryFn: getProducts,
        refetchOnWindowFocus: false,
        // cacheTime: 10000
        staleTime: Infinity
    });


    const queryClient = useQueryClient();

    const { mutate } = useMutation<Product, AxiosError, Product>(addProduct, {
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['products'] })
            refetch()
        },
    })

    const [showAddForm, setShowAddForm] = useState(false);

    const refreshList = () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
    }

    const handleShowAddForm = () => {
        setShowAddForm(prev => !prev);
    }

    // if (isLoading) return <>Loading...</>;
    // if (error) return <>{error.message}</>;

    return (
        <React.Suspense fallback={<h1>Loading ...</h1>}>
            <Link to={'/products/add'}>Add Product</Link>
            <button type='button' className={styles.btn} onClick={handleShowAddForm}>{showAddForm ? 'Hide Add Form' : 'Show Add Form'}</button>
            <button type='button' className={styles.btn} onClick={refreshList}>Refresh list</button>
            {showAddForm && <ProductFormPage  />}
            <div className={styles.productContainer}>
                {products?.map(product => (<ProductItem key={product.id} product={product} />))}
            </div>
        </React.Suspense>
    )
};

export default ProductList;
