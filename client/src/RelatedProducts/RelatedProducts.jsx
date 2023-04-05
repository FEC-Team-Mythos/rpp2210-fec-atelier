import React, { useState, useEffect } from 'react';
import RelatedList from './Components/RelatedList.jsx';
import OutfitList from './Components/OutfitList.jsx';
import Modal from './Components/Modal.jsx';

// this is the parent component for the Related Products widget
function RelatedProducts({ request, outfits, setOutfits, changeRequestHook, productId, product, productInformation}) {
  const [showModal, setShowModal] = useState(false);
  const [comparedProduct, setComparedProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();
  //const [clickedElement, clickedTime] = changeRequestHook('related');

  useEffect(() => {
    request(`/products/${productId}`, { product_id: productId }, 'get')
      .then((data) => {
        setCurrentProduct(data.data);
      })
      .then(() => (
        request(`/products/${productId}/styles`, { product_id: productId }, 'get')
      ))
      .then((data) => {
        setCurrentProduct((prevState) => ({
          ...prevState,
          styles: data.data,
        }));
      })
      .catch((err) => {
        console.log('Could not get: ', err);
      });
  }, []);

  return (
    <div id="related-products">
      <RelatedList setShowModal={setShowModal} setComparedProduct={setComparedProduct} productId={productId}/>
      <OutfitList outfits={outfits} setOutfits={setOutfits} currentProduct={currentProduct} product={product} productInformation={productInformation}/>
      <Modal showModal={showModal} setShowModal={setShowModal} comparedProduct={comparedProduct} currentProduct={currentProduct} />
    </div>
  );
}

export default RelatedProducts;