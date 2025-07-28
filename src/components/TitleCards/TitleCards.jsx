import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import Cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title,category}) => {
  const [apidata,setApidata] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGU4MjgxOWI2Zjk1MDBhZDNlODk2NDZlOGMyZTZlYiIsIm5iZiI6MTc1MzU0MTgwMC44MDE5OTk4LCJzdWIiOiI2ODg0ZWNhODA0OTk5YWYzZDQ1MmE5ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M331I1lHQlAh_Hi-fPNuDdA5HnA6AFshvWmKnAclIa8'
  }
};



const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaX;
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApidata(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handleWheel);
},[category]);

  return (
    <div className='titleCards'>
       <h2>{title?title:"Popular on Netflix"}</h2>
       <div className="card-list" ref={cardsRef}>
        {apidata.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
       </div>
    </div>
  )
}

export default TitleCards
