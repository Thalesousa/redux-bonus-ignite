import { useEffect, useState } from "react"

import { IProduct } from "../store/modules/cart/types"
import api from "../services/api";
import {CatalogItem} from "./CatalogItem";

export function Catalog() {
  const [catalog, setCatolog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatolog(response.data);
    })
  }, []);



  return (
    <>
      <h1>Catalog</h1>
      <div className="list">
        {catalog.map(product => (
          <CatalogItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}