import React from 'react'
import Select from 'react-select'
import { Path, useForm, UseFormRegister, SubmitHandler, Controller } from "react-hook-form";
import { Category, PriceRange, Product } from 'types/Product';

import styles from '../../styles.module.scss'
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getProducts } from 'services';

type InputProps = {
    label: Path<Product>;
    register: UseFormRegister<Product>;
    required: boolean;
    type?: string;
};

const Input = ({ label, type = 'text', register, required }: InputProps) => (
    <>
        <label>{label}</label>
        <input type={type} {...register(label, { required })} />
    </>
);


const defaultValues: Product = {
    id: 0,
    title: '',
    image: '',
    price: '',
    category: null,
    subCategory: null,
    priceRange: null
};

type ProductFormViewProps = {
    priceRanges?: PriceRange[];
    categories?: Category[];
    subCategories?: Category[];
    handleAddProduct: (data: Product) => void;
    handleChangeCategory: (id: number) => void;
}

const ProductFormView = ({ categories, subCategories, priceRanges, handleAddProduct, handleChangeCategory }: ProductFormViewProps) => {

    const { data } = useQuery<Product[], AxiosError>({
        queryKey: ['products'],
        queryFn: getProducts,
        refetchOnWindowFocus: false,
        // cacheTime: 10000
    });
    console.log('data', data);
    

    const { control, register, handleSubmit } = useForm({ defaultValues });

    return (
        <form>
            <div className={styles.productFormViewContainer}>
                <Input label="title" register={register} required />
                <Input label="price" type="number" register={register} required />
                <Controller
                    name="priceRange"
                    control={control}
                    render={({ field }) => <Select
                        {...field}
                        value={field.value}
                        options={priceRanges || []}
                    />}
                />
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => <Select
                        {...field}
                        value={field.value}
                        options={categories || []}
                        onChange={value => {
                            handleChangeCategory(value?.value as number);
                            field.onChange(value);
                        }}
                    />}
                />
                <Controller
                    name="subCategory"
                    control={control}
                    render={({ field }) => <Select
                        {...field}
                        value={field.value}
                        options={subCategories || []}
                    />}
                />
            </div>
            <button type="button" onClick={handleSubmit(handleAddProduct)}>Submit</button>
        </form>
    );
};


export default ProductFormView;