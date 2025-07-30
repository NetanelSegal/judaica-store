import { useParams } from "react-router";

export default function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>ProductPage</h1>
      <h1>{id}</h1>
    </div>
  );
}
