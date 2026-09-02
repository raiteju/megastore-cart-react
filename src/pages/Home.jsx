import { products } from '../data/product';
import ProductCard from '../components/ProductCard'; 

export default function Home() {
  return (
    <div className="flex flex-wrap items-center justify-between px-4 gap-2 w-full mx-auto my-24 xl:w-10/12">
        {products.map((item) => (
        <ProductCard key={item.id} product={item} />  
      ))}
    </div>
  );
}