import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';
import clsx from 'clsx';
import _debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { searchProducts } from '../../../services/productApiService';
import { IProduct } from '../../../store/interfaces';

export const Search = () => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [previewProducts, setPreviewProducts] = useState<IProduct[]>([]);

    const resetForm = () => {
        setSearchText('');
        setPreviewProducts([]);
    };

    const searchProductsByText = async (text: string) => {
        if (!text) {
            setPreviewProducts([]);

            return;
        }

        try {
            const { data } = await searchProducts(text);

            setPreviewProducts(data.slice(0, 5));
        } catch (error) {
            toast.error(requestErrorMessage(error));
        }
    };

    const onSubmitSearch: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();

        navigate(`${URL.SEARCH}?searchText=${searchText}`);
        resetForm();
    };

    const searchProductsByTextDebounce = useCallback(
        _debounce(searchProductsByText, 200),
        []
    );

    const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setSearchText(e.currentTarget.value);

        searchProductsByTextDebounce(e.currentTarget.value);
    };

    useEffect(() => {
        return () => {
            searchProductsByTextDebounce.cancel();
        };
    }, []);

    return (
        <div className="header__search">
            <form
                className="header__search__form"
                autoComplete="off"
                onSubmit={onSubmitSearch}
            >
                <input
                    type="text"
                    className={clsx('header__search__input', {
                        ['header__search__input_hints']:
                            !!previewProducts.length,
                    })}
                    placeholder="Search"
                    name="searchText"
                    onChange={onChangeSearchText}
                    value={searchText}
                />
                <IconButton type="submit">
                    <SearchIcon />
                </IconButton>
                {!!previewProducts.length && (
                    <div className="header__search__hints">
                        {previewProducts.map((product) => (
                            <Link
                                key={product.id ?? product._id}
                                to={`${URL.CATEGORY}${URL.PRODUCT}?id=${
                                    product.id ?? product._id
                                }&type=${product.category.toLowerCase()}`}
                                onClick={resetForm}
                            >
                                <MenuItem>{product.title}</MenuItem>
                            </Link>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};
