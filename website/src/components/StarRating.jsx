import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

const StarRating = ({rating}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalf} className="text-warning" />);
    } 
  }
  return (
    <>
      {stars}
    </>
  )
}

export default StarRating