import ProductCard from '../../../components/ProductCard';
import products from '../../../data/judaica_items.json';

export default function BestProductsSection() {
  return (
    <div className='py-5 bg-[#EAE0D6]'>
      <h2 className='text-[#22333B] text-3xl font-bold text-center'>
        Best Products
      </h2>
      <div>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
