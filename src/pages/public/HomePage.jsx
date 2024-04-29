import React, { useState } from 'react'
import ScrollToTop from '../../components/general/ScrollToTop'
import Button from '../../components/general/Button'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'

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

    return (
        <div className='w-full min-h-[calc(100vh-48px)] flex flex-col justify-center items-center mx-auto'>
            <ScrollToTop />
            <div className='pageTemplate5 group'>
                {/* texture */}
                <div className='w-2/5 h-full flex flex-col justify-center items-start gap-3'>
                    <h1 className='text-6xl font-bold'>{slides[currentIndex].main}</h1>
                    <p className='text-2xl font-semibold'>{slides[currentIndex].sub}</p>
                    <Button
                        label='Details'
                        onClick={() => handelClick()}
                        type='button'
                        variant='secondary'
                    />
                </div>
                {/* images */}
                <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className='w-[450px] h-[400px] bg-center bg-cover duration-500'></div>
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] left-10 -translate-x-0 translate-y-[-50%] text-2xl bg-[#f5f5f5] rounded-3xl p-2 cursor-pointer'>
                    <BsChevronCompactLeft size={30} onClick={prevIndex} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] right-10 -translate-x-0 translate-y-[-50%] text-2xl bg-[#f5f5f5] rounded-3xl p-2 cursor-pointer'>
                    <BsChevronCompactRight size={30} onClick={nextIndex} />
                </div>
            </div>
            <div className='pageTemplate4'>SERVICES</div>
            <div className='pageTemplate5'>ABOUT</div>
            <div className='pageTemplate4'>CONTACT</div>
            <div className='pageTemplate5'>BOTTOM</div>
        </div>
    )
}

export default HomePage