import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';

const initialValues = {
    searchText: '',
};

type SearchValues = typeof initialValues;

export const Search = () => {
    const onSubmitSearch = (
        values: SearchValues,
        actions: FormikHelpers<SearchValues>
    ) => {
        console.log(values);
    };

    return (
        <div className="header__search">
            <Formik initialValues={initialValues} onSubmit={onSubmitSearch}>
                <Form className="header__search__form" autoComplete="off">
                    <Field
                        type="text"
                        className="header__search__input"
                        placeholder="Search"
                        name="searchText"
                    />
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </Form>
            </Formik>
        </div>
    );
};
