import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProduct } from '../../../store/interfaces';
import { ProductCard } from '../../Common/ProductCard';
import { ProductSkeleton } from '../../Common/ProductSkeleton';

interface IProps {
    title: string;
    products: IProduct[];
    isLoading: boolean;
    itemsAmount?: number;
    updateProductsRequest?: () => void;
}

export const ProductSection = ({
    title,
    products,
    updateProductsRequest,
    isLoading,
    itemsAmount = 8,
}: IProps) => {
    return (
        <div className="home-page__products">
            <h2 className="home-page__products__title">{title}</h2>
            <Swiper
                effect="cards"
                grabCursor
                slidesPerView={1}
                className="home-page__slider"
                breakpoints={{
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                }}
            >
                {isLoading
                    ? Array.from(
                          {
                              length: itemsAmount,
                          },
                          (_, index) => index
                      ).map((_, index) => (
                          <SwiperSlide key={index}>
                              <div className="home-page__slider__products-content">
                                  <ProductSkeleton itemsAmount={1} />
                              </div>
                          </SwiperSlide>
                      ))
                    : products.map((product) => (
                          <SwiperSlide key={product.id}>
                              <div className="home-page__slider__products-content">
                                  <ProductCard
                                      title={product.title}
                                      price={product.price}
                                      id={product.id}
                                      category={product.category}
                                      updateProductsList={updateProductsRequest}
                                      briefInformation={
                                          product.briefInformation
                                      }
                                      product={product}
                                      imageSrc={
                                          product.images.find(
                                              (image) => image.isMain
                                          )?.url
                                      }
                                  />
                              </div>
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
};
