import { Link } from 'react-router';

function ProductCard({ product }) {
  return (
    <div className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all w-full max-w-sm'>
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4 space-y-2'>
        <h2 className='text-xl font-semibold'>{product.name}</h2>
        <p className='text-gray-500 text-sm'>{product.category}</p>
        <p className='text-lg font-bold text-green-600'>
          ${product.price.toFixed(2)}
        </p>
        <p className='text-sm text-gray-700'>In stock: {product.count}</p>
        <Link
          to={`/product/${product.id}`}
          className='inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition'
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
