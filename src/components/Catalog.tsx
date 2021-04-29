import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux";

import { IProduct } from "../store/modules/cart/types"
import { addProductToCart } from "../store/modules/cart/actions";
import api from "../services/api";

export function Catalog() {
  const dispatch = useDispatch();
  const [catalog, setCatolog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatolog(response.data);
    })
  }, []);

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product))
  }, [dispatch])

  return (
    <>
      <h1>Catalog</h1>

      {catalog.map(product => (
        <article key={product.id}>
          <strong>{product.title}</strong> {" - "}
          <span>{product.price}</span> {"  "}
          <button 
            type="button"
            onClick={() => handleAddProductToCart(product)}
          >
            Comprar
          </button>
        </article>
      ))}
    </>
  )
}