/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import Reviews from './Reviews/Reviews.jsx';
import CheckOut from './CheckOut/CheckOut.jsx';

import { changeRequestHook } from '../../changeRequestHook';

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

  const [totalReviewsPerProduct, setTotalReviewsPerProduct] = useState(0);
  const [starArr, setStars] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState({}); // Product general information
  const [productInformation, setProductInformation] = useState({}); // Style information
  // eslint-disable-next-line no-unused-vars
  const [productId, setProductId] = useState(71702); // To be revised tonight. Default to 0.
  const [outfits, setOutfits] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <div className="content">
              <ProductOverview
                request={request}
                outfits={outfits}
                setOutfits={setOutfits}
                changeRequestHook={changeRequestHook}
                starArr={starArr}
                totalReviewsPerProduct={totalReviewsPerProduct}
                cartItems={cartItems}
                setCartItems={setCartItems}
                productId={productId}
                product={product}
                setProduct={setProduct}
                productInformation={productInformation}
                setProductInformation={setProductInformation}
              />
              <RelatedProducts
                request={request}
                changeRequestHook={changeRequestHook}
                productId={productId}
                product={product}
                productInformation={productInformation}
                outfits={outfits}
                setOutfits={setOutfits}
              />
              <QuestionsAndAnswers
                request={request}
                productId={productId}
                changeRequestHook={changeRequestHook}
              />
              <Reviews
                request={request}
                changeRequestHook={changeRequestHook}
                starArr={starArr}
                setStars={setStars}
                avgRating={avgRating}
                setAvgRating={setAvgRating}
                setTotalReviewsPerProduct={setTotalReviewsPerProduct}
                productId={productId}
              />
            </div>
          )}
        />
        <Route path="checkout" element={(<CheckOut />)} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
