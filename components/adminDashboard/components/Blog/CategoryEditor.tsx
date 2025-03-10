import React, { useState } from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import slugify from 'slugify';

interface CategoryEditorProps {
  onBack: () => void;
}

export default function CategoryEditor({ onBack }: CategoryEditorProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const category = {
      name,
      slug: slugify(name, { lower: true }),
      description,
      createdAt: new Date().toISOString()
    };
    console.log('Saving category:', category);
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Categories
        </button>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg hover:bg-[#8E4730] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Category</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            placeholder="Enter category name"
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
            placeholder="Enter category description"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            The category slug will be automatically generated from the name.
          </p>
          {name && (
            <p className="text-sm text-gray-700 mt-1">
              Slug preview: <code className="bg-gray-100 px-2 py-1 rounded">{slugify(name, { lower: true })}</code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}