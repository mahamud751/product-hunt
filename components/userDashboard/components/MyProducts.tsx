import React, { useState } from 'react';
import {
  Search,
  Edit,
  Trash2,
  BarChart2,
  Copy,
  Trophy,
  Star,
  Rocket,
  Filter,
  ChevronDown,
  AlertCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import clsx from 'clsx';

type Product = {
  id: string;
  name: string;
  headline: string;
  status: 'active' | 'pending' | 'rejected';
  upvotes: number;
  views: number;
  badges: Array<'featured' | 'product-of-day' | 'trending'>;
  launchDate: string;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ProductX',
    headline: 'The next generation of product management',
    status: 'active',
    upvotes: 1250,
    views: 45000,
    badges: ['featured', 'product-of-day'],
    launchDate: '2024-03-15',
  },
  {
    id: '2',
    name: 'LaunchPro',
    headline: 'Launch your product with confidence',
    status: 'active',
    upvotes: 890,
    views: 32000,
    badges: ['trending'],
    launchDate: '2024-03-10',
  },
  {
    id: '3',
    name: 'DevFlow',
    headline: 'Streamline your development workflow',
    status: 'pending',
    upvotes: 0,
    views: 0,
    badges: [],
    launchDate: '2024-03-20',
  },
];

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800', icon: Rocket },
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={clsx('px-3 py-1 rounded-full flex items-center gap-1 w-fit', config.color)}>
      <Icon className="w-4 h-4" />
      <span className="capitalize">{status}</span>
    </span>
  );
};

const ProductBadges = ({ badges }: { badges: Product['badges'] }) => {
  const badgeConfig = {
    featured: { icon: Star, label: 'Featured on Launchap', color: 'text-yellow-600' },
    'product-of-day': { icon: Trophy, label: '#1 Product of the Day', color: 'text-orange-600' },
    trending: { icon: Rocket, label: 'Trending Product', color: 'text-blue-600' },
  };

  return (
    <div className="flex gap-2">
      {badges.map((badge) => {
        const config = badgeConfig[badge];
        const Icon = config.icon;
        return (
          <div
            key={badge}
            className="flex items-center gap-1 text-sm"
            title={config.label}
          >
            <Icon className={clsx('w-4 h-4', config.color)} />
          </div>
        );
      })}
    </div>
  );
};

const EmbedCodeModal = ({ isOpen, onClose, product }: { isOpen: boolean; onClose: () => void; product: Product }) => {
  if (!isOpen) return null;

  const embedCode = `<a href="https://launchap.com/p/${product.id}" target="_blank">
  <img src="https://launchap.com/badges/featured-on-launchap.svg" alt="Featured on Launchap" />
</a>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">Embed Code for {product.name}</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">{embedCode}</pre>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={copyToClipboard}
            className="btn-secondary flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Code
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyProducts() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'rejected'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  const tabs = [
    { id: 'active', label: 'Active', count: 2 },
    { id: 'pending', label: 'Pending', count: 1 },
    { id: 'rejected', label: 'Rejected', count: 0 },
  ] as const;

  const filteredProducts = MOCK_PRODUCTS.filter(
    (product) =>
      product.status === activeTab &&
      (searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.headline.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Products</h1>
          <button className="btn-primary">Add New Product</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex p-4 gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'px-4 py-2 rounded-lg flex items-center gap-2',
                    activeTab === tab.id
                      ? 'bg-gray-50 text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {tab.label}
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-sm">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">Product Name</th>
                  <th className="text-left p-4 font-medium text-gray-600">Headline</th>
                  <th className="text-left p-4 font-medium text-gray-600">Launch Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Upvotes</th>
                  <th className="text-left p-4 font-medium text-gray-600">Views</th>
                  <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{product.name}</span>
                        <ProductBadges badges={product.badges} />
                      </div>
                    </td>
                    <td className="p-4">{product.headline}</td>
                    <td className="p-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="p-4">{product.upvotes.toLocaleString()}</td>
                    <td className="p-4">{product.views.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          title="Edit"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          title="View Analytics"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <BarChart2 className="w-4 h-4" />
                        </button>
                        <button
                          title="Get Embed Code"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEmbedModalOpen(true);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          title="Delete"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <p>No products found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <EmbedCodeModal
          isOpen={isEmbedModalOpen}
          onClose={() => {
            setIsEmbedModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
}