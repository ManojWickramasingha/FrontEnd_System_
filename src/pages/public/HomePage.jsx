import React, { useState } from 'react'
import ScrollToTop from '../../components/general/ScrollToTop'
import Button from '../../components/general/Button'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'
import { slides } from '../../constant/carousel';

import {Swiper,SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import {FreeMode,Pagination} from 'swiper/modules';

import {RxArrowTopRight} from 'react-icons/rx';
import { ServiceData } from '../../constant/services'

const HomePage = () => {
    const [currentIndex,setCurrentIndex] = useState(0);

    const prevIndex = () => {
        const nextIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(nextIndex);
    }

    const nextIndex = () => {
        const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <div className='w-full min-h-[calc(100vh-48px)] flex flex-col justify-center items-center mx-auto'>
            <ScrollToTop />
            <div className='pageTemplate5 group'>
                {/* texture */}
                <div className='w-2/5 p-2 h-full flex flex-col justify-center items-start gap-3'>
                    <h1 className='text-6xl font-bold duration-500'>{slides[currentIndex].main}</h1>
                    <p className='text-2xl font-semibold duration-500'>{slides[currentIndex].sub}</p>
                    <Button
                        label='Details'
                        onClick={() => handelClick()}
                        type='button'
                        variant='secondary'
                    />
                </div>
                {/* images */}
                <div className='w-2/5 flex justify-center items-center'>
                    <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className='w-[475px] h-[450px] bg-center bg-cover duration-500'></div>
                </div>
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] left-10 -translate-x-0 translate-y-[-50%] text-2xl bg-[#f5f5f5] rounded-3xl p-2 cursor-pointer'>
                    <BsChevronCompactLeft size={30} onClick={prevIndex} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] right-10 -translate-x-0 translate-y-[-50%] text-2xl bg-[#f5f5f5] rounded-3xl p-2 cursor-pointer'>
                    <BsChevronCompactRight size={30} onClick={nextIndex} />
                </div>
                <div className='flex absolute top-[90%] justify-center py-2'>
                    {
                        slides.map((slides,slideIndex) => (
                            <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
                                <RxDotFilled />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='pageTemplate4'>
                <div className='w-full flex justify-center text-4xl font-bold p-1 mb-1'>SERVICES</div>
                <div className='w-full flex justify-center text-2xl font-semibold p-1 mb-3'>We provide a variety of services</div>
                <div className='h-4/5 w-full flex flex-col justify-center items-center'>
                    <Swiper
                        breakpoints={{
                            340: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            700: {
                                slidesPerView: 3,
                                spaceBetween:20
                            }
                        }}
                        freeMode={true}
                        pagination={{
                            clickable: true
                        }}
                        modules={[FreeMode, Pagination]}
                        className='max-w-[95%] lg:max-w-[92%]'
                    >
                        {ServiceData.map((item) => (
                            <SwiperSlide key={item.title}>
                                <div className='flex flex-col gap-6 group relative shadow-lg text-[#fff] rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] cursor-pointer'>
                                    <div style={{backgroundImage: `url(${item.backgroundImage})`}} className='rounded-xl absolute inset-0 bg-center bg-cover' />
                                    <div className='absolute inset-0 bg-black rounded-xl opacity-0 group-hover:opacity-20' />
                                    <div className='relative flex flex-col gap-3'>
                                        <item.icon className='text-green-500 group-hover:text-green-300 w-[32px] h-[32px]' />
                                        <h1 className='text-xl lg:text-2xl'>{item.title}</h1>
                                        <p className='lg:text-[18px]'>{item.content}</p>
                                    </div>
                                    <RxArrowTopRight className='absolute bottom-5 left-5 w-[35px] h-[35px] text-[#fff] group-hover:text-green-300 group-hover:rotate-45 duration-100' />
                                </div>                                                    
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
                
            </div>
            <div className='pageTemplate5'>ABOUT</div>
            <div className='pageTemplate4'>CONTACT</div>
            <div className='pageTemplate5'>BOTTOM</div>
        </div>
    )
}

export default HomePage