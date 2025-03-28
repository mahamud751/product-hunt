import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateAlternativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alternative: {
    name: string;
    description: string;
    slug: string;
    mainProduct: {
      id: string;
      name: string;
    };
  }) => void;
}

export default function CreateAlternativeModal({ isOpen, onClose, onSubmit }: CreateAlternativeModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mainProductName, setMainProductName] = useState('');

  if (!isOpen) return null;

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      slug: generateSlug(name),
      mainProduct: {
        id: `prod_${Date.now()}`, // This would normally come from a product lookup
        name: mainProductName
      }
    });
    setName('');
    setDescription('');
    setMainProductName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#1F1F1F]">Create New Alternative</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mainProduct" className="block text-sm font-medium text-gray-700 mb-1">
              Main Product
            </label>
            <input
              type="text"
              id="mainProduct"
              value={mainProductName}
              onChange={(e) => setMainProductName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              placeholder="Product this is an alternative to"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Alternative Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#AF583B] text-white rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
            >
              Create Alternative
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}