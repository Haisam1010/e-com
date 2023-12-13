import {FaStar,FaStarHalfAlt,FaRegStar} from 'react-icons/fa'

const Rating = ({values,text}) => {
  return (
    <div className='rating'>
    <span>
    {values >= 1 ? <FaStar/> : values >= 0.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
    </span>
    <span>
    {values >= 2 ? <FaStar/> : values >= 1.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
    </span>
    <span>
    {values >= 3 ? <FaStar/> : values >= 2.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
    </span>
    <span>
    {values >= 4 ? <FaStar/> : values >= 3.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
    </span>
    <span>
    {values >= 5 ? <FaStar/> : values >= 4.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
    </span>

    <span className='rating-text'>{text && text}</span>
    </div>
  )
}

export default Rating