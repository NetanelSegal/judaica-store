import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useParams } from "react-router";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>ProductPage</h1>
      <h1>{product?.name}</h1>
      <img src={product?.image} alt={product?.name} />
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <p>{product?.count}</p>
    </div>
  );
}
