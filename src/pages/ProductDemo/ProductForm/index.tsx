import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, getCategory, getPriceRanges, getSubCategories } from 'services';
import ProductFormView from './components/ProductFormView';
import { Product } from 'types/Product';
import { AxiosError } from 'axios';


const ProductForm = () => {

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation<Product, AxiosError, Product>(addProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  });

  const [categoryId, setCategoryId] = useState<number | null>(null)

  const [categories, priceRanges] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: getCategory
      },
      {
        queryKey: ['priceRanges'],
        queryFn: getPriceRanges
      }
    ]
  })

  const { data: subCategories } = useQuery({ queryKey: ['subcategories', categoryId], queryFn: () => getSubCategories(categoryId), enabled: !!categoryId });

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {error && <span>{error.message}</span>}

      <Link to={'../'}>Back to List</Link>
      <ProductFormView categories={categories.data} subCategories={subCategories} priceRanges={priceRanges.data} handleChangeCategory={setCategoryId} handleAddProduct={mutate} />
    </>
  )
};

export default ProductForm;