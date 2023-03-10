import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import StarBox from './StarBox.jsx';

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  const getReviewData = async () => {
    //Product ID should be dynamic here, will grab from other widget
    try {
      var response = await axios.get('/reviews/', {params: {sort: 'relevance', product_id: 71697}})
      setAllReviews(response.data.results);
    } catch(err) {
      console.log(err);
    }
  }

  const sortReviews = async (sortParam) => {
    console.log(sortParam)
    try {
      var response = await axios.get('/reviews/', {params: {sort: sortParam, product_id: 71697}})
      console.log(response.data.results);
      setAllReviews(response.data.results);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getReviewData()
  }, [setAllReviews]);

  return (
    <div id='reviews'>
    <StarBox
      allReviews={allReviews}
    />
    <ReviewList
      allReviews={allReviews}
      sortReviews={sortReviews}
    />
    </div>
  )
}

export default Reviews;