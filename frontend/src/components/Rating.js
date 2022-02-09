import React from 'react';
// import PropTypes from 'prop-types';

const Rating = ({ comps, archs, color }) => {
    return (
        <div className='rating'>
            <span>
                <i style={{color}} className={comps.length >= 1 || archs.length >= 1 || (comps.length + archs.length ) >= 1 ? 'fas fa-star' : comps.length >= 0.5 || archs.length >= 0.5 || (comps.length + archs.length ) >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={comps.length >= 4 || archs.length >= 4 || (comps.length + archs.length ) >= 4 ? 'fas fa-star' : comps.length >= 1.5 || archs.length >= 1.5 || (comps.length + archs.length ) >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={comps.length >= 8 || archs.length >= 8 || (comps.length + archs.length ) >= 8 ? 'fas fa-star' : comps.length >= 4.5 || archs.length >= 4.5 || (comps.length + archs.length ) >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={comps.length >= 12 || archs.length >= 12 || (comps.length + archs.length ) >= 12 ? 'fas fa-star' : comps.length >= 8.5 || archs.length >= 8.5 || (comps.length + archs.length ) >= 8.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={comps.length >= 16 || archs.length >= 16 || (comps.length + archs.length ) >= 16 ? 'fas fa-star' : comps.length >= 12.5 || archs.length >= 12.5 || (comps.length + archs.length ) >= 12.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: 'orange',
}

// Rating.propTypes = {
//     comps: PropTypes.array.isRequired,
//     archs: PropTypes.array.isRequired,
//     color: PropTypes.string,
// }

export default Rating
