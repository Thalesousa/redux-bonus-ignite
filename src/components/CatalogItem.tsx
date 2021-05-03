import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';
import { IState } from '../store'

interface CatalogItemProps {
  product: IProduct
}

export function CatalogItem({product}: CatalogItemProps) {
  const dispatch = useDispatch();
  
  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id)
  })

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product))
  }, [dispatch, product])

  return (
    <>
    <article>
      <strong>{product.title}</strong>
      <span>R$ {product.price.toFixed(2)}</span>

      { hasFailedStockCheck ? (
        <button disabled >
        <img src="https://img.icons8.com/material-sharp/24/000000/delete-sign.png"/>
        </button>
      ): (
        <button
          type="button"
          onClick={handleAddProductToCart}
        >
          <img src="https://img.icons8.com/android/24/000000/buy.png"/>
        </button>
      )}

    </article>
    { hasFailedStockCheck && <span className="nostock">Falta no estoque</span>}
    </>
  )
}