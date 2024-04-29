import React from 'react'
import ScrollToTop from '../../components/general/ScrollToTop'

const HomePage = () => {
    return (
        <div className='w-full min-h-[calc(100vh-48px)] flex flex-col justify-center items-center mx-auto'>
            <ScrollToTop />
            <div className='pageTemplate5'>FEATURES</div>
            <div className='pageTemplate4'>SERVICES</div>
            <div className='pageTemplate5'>ABOUT</div>
            <div className='pageTemplate4'>CONTACT</div>
            <div className='pageTemplate5'>BOTTOM</div>
        </div>
    )
}

export default HomePage