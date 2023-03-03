import React, { lazy, useState } from 'react'
import { Link } from 'react-router-dom';
import { useIsFetching, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, getCategory, getPriceRanges, getSubCategories } from 'services';
import ProductFormView from './components/ProductFormView';
import { Product } from 'types/Product';
import { AxiosError } from 'axios';

const ProductFormViewPage = lazy(() => import('./components/ProductFormView'))


const ProductForm = () => {

  const isFetching = useIsFetching()


  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation<Product, AxiosError, Product>(addProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  });

  const [categoryId, setCategoryId] = useState<number | null>(null)

  // const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategory });
  // const { data: priceRanges } = useQuery({ queryKey: ['priceRanges'], queryFn: getPriceRanges });

  const [categories, priceRanges] = useQueries({
    queries: [
      { queryKey: ['categories'], queryFn: getCategory, staleTime: Infinity },
      { queryKey: ['priceRanges'], queryFn: getPriceRanges, staleTime: Infinity }
    ]
  })

  const { data: subCategories } = useQuery({ queryKey: ['subcategories', categoryId], queryFn: () => getSubCategories(categoryId), enabled: !!categoryId });

  // const isAnyLoading = results.some(result => result.isLoading);

  return (
    <>
      {/* {isLoading && <span>Loading...</span>} */}
      <Link to={'../'}>Back to List</Link>
      {error && <span>{error.message}</span>}
      <ProductFormView categories={categories.data} subCategories={subCategories} priceRanges={priceRanges.data} handleChangeCategory={setCategoryId} handleAddProduct={mutate} />
    </>
  )
};

const ProductFormWithSuspense = () => {
  return (
    <React.Suspense fallback={<h1>Loading form ...</h1>}>
      {/* {isLoading && <span>Loading...</span>} */}
      {/* <ProductFormView categories={categories.data} subCategories={subCategories} priceRanges={priceRanges.data} handleChangeCategory={setCategoryId} handleAddProduct={mutate} /> */}
    <ProductForm />
    </React.Suspense>
  )
}

export default ProductFormWithSuspense;