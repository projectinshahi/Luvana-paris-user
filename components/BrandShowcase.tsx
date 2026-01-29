"use client";

const brands = [
  {
    id: 1,
    name: "L'Oréal",
    logo: "https://images.unsplash.com/photo-1596462502278-af242a95ab2b?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "MAC",
    logo: "https://images.unsplash.com/photo-1522338242992-e1a54900f60e?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Estée Lauder",
    logo: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Urban Decay",
    logo: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Maybelline",
    logo: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "NARS",
    logo: "https://images.unsplash.com/photo-1631214174585-fe5582efa1c3?w=200&h=200&fit=crop",
  },
];

export default function BrandShowcase() {
  return (
    <div className="w-full py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Brands
          </h2>
          <p className="text-gray-400 text-lg">
            Shop from the world's most trusted beauty brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-center h-32 hover:bg-[#2a2a2a] transition cursor-pointer group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-20 h-20 object-cover rounded-lg group-hover:scale-110 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
