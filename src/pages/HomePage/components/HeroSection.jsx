import heroImage from '../../../assets/menirah.jpg';

export default function HeroSection() {
  return (
    <div className='relative h-[85vh]'>
      <img
        className='size-full object-cover'
        src={heroImage}
        alt='siddur picture'
      />
      <div className='w-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white text-center text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)] px-5'>
        <h1 className='text-4xl md:text-5xl font-bold'>
          The best yudaika products
        </h1>
        <button className='bg-[#22333B] px-3 py-2 text-white mt-2 rounded-xl font-semibold'>
          See products
        </button>
      </div>
    </div>
  );
}
