'use client';
import Image from "next/image";

import { useState } from 'react';
import CheckoutModal from './components/CheckoutModal';
// import { SolanaProvider } from './context/SolanaProvider';

const products = [
  {
    id: 1,
    name: 'Nike Dunk Low',
    price: 115,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/W+NIKE+DUNK+LOW.png",
    description: "Women's Shoes, Size 8, Black",
  }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    alert('Payment successful! Thank you for your purchase.');
    setIsModalOpen(false);
  };

  return (
    // <SolanaProvider>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-gray-500">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                    </span>
                  </p>
                  <div className="flex justify-center p-3">
                    <Image src={product.image} alt={product.name} width={200} height={200}></Image>
                  </div>
                  <button
                    onClick={() => handleCheckout(product)}
                    className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Pay With Solana
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          amount={selectedProduct?.price || 0}
          description={selectedProduct?.description || ""}
          onSuccess={handleSuccess}
        />

        {/* {selectedProduct && (
          <CheckoutModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            amount={selectedProduct.price}
            description={`${selectedProduct.name} - ${selectedProduct.description}`}
            onSuccess={handleSuccess}
          />
        )} */}
      </div>
    // </SolanaProvider>
  );
}
