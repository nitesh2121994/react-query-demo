import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
// import ProductForm from './ProductForm';
// import ProductList from './ProductList';

const Products = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="list" replace />} />
            <Route path='list' element={<ProductList />} />
            <Route path='add' element={<ProductForm />} />
        </Routes>
    )
};

export default Products;