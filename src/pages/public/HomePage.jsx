import React, { useState } from 'react'
import ScrollToTop from '../../components/general/ScrollToTop'
import Button from '../../components/general/Button'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'

import tracking from '../../assets/tracking.png'
import saving from '../../assets/saving.png'
import analysis from '../../assets/analysis.png'
import reporting from '../../assets/reporting.png'

const HomePage = () => {
    const [currentIndex,setCurrentIndex] = useState(0);

    const slides = [
        {
            url:tracking,
            main:'Tracking',
            sub:'This is a tracking feature available in Expense Tracker'
        },
        {
            url:saving,
            main:'Saving',
            sub:'This is a Saving feature available in Expense Tracker'
        },
        {
            url:analysis,
            main:'Analysis',
            sub:'This is a analyzing feature available in Expense Tracker'
        },
        {
            url:reporting,
            main:'Reporting',
            sub:'This is a reporting feature available in Expense Tracker'
        }
    ];

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
                <div className='w-full flex justify-center text-5xl font-bold p-1 mb-5'>SERVICES</div>
                <div className='h-4/5 w-full flex flex-row gap-10 justify-center items-center'>
                    <div className='h-full w-1/4 flex flex-col justify-center items-center'>
                        <div className='w-full h-2/4 flex justify-center items-center'>
                            <div style={{backgroundImage: `url(${slides[0].url})`}} className='w-[200px] h-[200px] bg-center bg-cover duration-500'></div>
                        </div>
                        <div className='w-full h-2/4'>
                            <h1></h1>
                        </div>
                    </div>
                    <div className='h-full w-1/4 flex flex-col'>
                        <div className='w-full h-2/4 flex justify-center items-center'>
                            <div style={{backgroundImage: `url(${slides[3].url})`}} className='w-[200px] h-[200px] bg-center bg-cover duration-500'></div>
                        </div>
                        <div className='w-full h-2/4'></div>
                    </div>
                    <div className='h-full w-1/4 flex flex-col'>
                        <div className='w-full h-2/4 flex justify-center items-center'>
                            <div style={{backgroundImage: `url(${slides[2].url})`}} className='w-[200px] h-[200px] bg-center bg-cover duration-500'></div>
                        </div>
                        <div className='w-full h-2/4'></div>
                    </div>
                </div>
                {/* Left Arrow */}
                <div className='absolute top-[150%] left-10 -translate-x-0 translate-y-[-50%] text-2xl bg-[#fff] rounded-3xl p-2 cursor-pointer'>
                    <BsChevronCompactLeft size={30} onClick={prevIndex} />
                </div>
                {/* Right Arrow */}
                <div className='absolute top-[150%] right-10 -translate-x-0 translate-y-[-50%] text-2xl bg-[#fff] rounded-3xl p-2 cursor-pointer'>
                    <BsChevronCompactRight size={30} onClick={nextIndex} />
                </div>
                <div className='flex absolute top-[185%] justify-center py-2'>
                    {
                        slides.map(() => (
                            <div className='text-2xl cursor-pointer'>
                                <RxDotFilled />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='pageTemplate5'>ABOUT</div>
            <div className='pageTemplate4'>CONTACT</div>
            <div className='pageTemplate5'>BOTTOM</div>
        </div>
    )
}

export default HomePage