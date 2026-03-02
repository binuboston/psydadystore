import { useParams, Navigate } from 'react-router';
import { useProductStore } from '../store/useProductStore';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInfo } from '../components/ProductInfo';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const getProductBySlug = useProductStore((state) => state.getProductBySlug);

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Product Gallery */}
        <ProductGallery images={product.images} />
        
        {/* Right Column - Product Info */}
        <ProductInfo
          productId={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          description={product.description}
          sizes={product.sizes}
          features={product.features}
          image={product.images[0]}
          inStock={product.inStock}
        />
      </div>
    </div>
  );
}
