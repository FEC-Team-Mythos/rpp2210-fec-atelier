import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import Reviews from './Reviews/Reviews.jsx';

import { changeRequestHook } from '../../changeRequestHook.js';

function App() {
  const request = (endpoint, params = {}, method = 'get') => axios({
    method,
    url: endpoint,
    params,
  });
  /* EXAMPLE REQUEST WITHIN WIDGET. MAKE SURE TO EITHER CALL props.request OR { request }
  ___________________________________________________________________________________________

  request('/products/71704', {product_id:71704}, 'get')
    .then(data=>{
      console.log(data.data);
    })
    .catch(err=>{
      console.log(err);
    })
    */

    const [outfits, setOutfits] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [totalReviewsPerProduct, setTotalReviewsPerProduct] = useState(0);
    const [starArr, setStars] = useState('');

  return (
    <>
      <div className="content">
        <ProductOverview request={request} outfits={outfits} setOutfits={setOutfits} changeRequestHook={changeRequestHook} starArr={starArr} totalReviewsPerProduct={totalReviewsPerProduct}/>
        <RelatedProducts request={request} changeRequestHook={changeRequestHook}/>
        <QuestionsAndAnswers  request={request}/>
        <Reviews  request={request} changeRequestHook={changeRequestHook} starArr={starArr} setStars ={setStars} avgRating={avgRating} setAvgRating={setAvgRating} setTotalReviewsPerProduct={setTotalReviewsPerProduct}/>
      </div>
    </>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
