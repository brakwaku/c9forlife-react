import React from 'react'
import { useScrollToTop } from '../utilities/scrollToTop';

const InternalErrorScreen = () => {
    document.title = "C9ForLife | Internal Error";
    useScrollToTop();
    return (
        <div className='container'>
            <h1>Sorry, an error occured and we are working to get it resolved. Please come back later</h1>
            <h4>Thank you!</h4>
        </div>
    )
}

export default InternalErrorScreen
