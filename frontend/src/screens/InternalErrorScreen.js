import React from 'react'

const InternalErrorScreen = () => {
    document.title = "C9ForLife | Internal Error";
    return (
        <div className='container'>
            <h1>Sorry, an error occured and we are working to get it resolved. Please come back later</h1>
            <h4>Thank you!</h4>
        </div>
    )
}

export default InternalErrorScreen
