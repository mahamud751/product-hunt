import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface NavDropdownProps {
  title: string;
  items?: NavItem[];
  isProducts?: boolean;
}

export default function NavDropdown({ title, items = [], isProducts = false }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { label: 'Work & Productivity', href: '#' },
    { label: 'Engineering & Development', href: '#' },
    { label: 'Design & Creative', href: '#' },
    { label: 'Finance', href: '#' },
    { label: 'Social & Community', href: '#' },
    { label: 'Marketing & Sales', href: '#' },
    { label: 'AI', href: '#' },
    { label: 'Health & Fitness', href: '#' },
    { label: 'Travel', href: '#' },
    { label: 'Platforms', href: '#' },
    { label: 'Product add-ons', href: '#' },
    { label: 'Web3', href: '#' },
    { label: 'Physical Products', href: '#' },
    { label: 'Ecommerce', href: '#' },
  ];

  const addOns = [
    { label: 'Chrome Extensions', href: '#' },
    { label: 'Figma Templates', href: '#' },
    { label: 'Slack apps', href: '#' },
    { label: 'Wordpress Plugins', href: '#' },
    { label: 'Figma Plugins', href: '#' },
    { label: 'Notion Templates', href: '#' },
    { label: 'Twitter apps', href: '#' },
    { label: 'Wordpress themes', href: '#' },
  ];

  const landscapes = [
    { label: 'AI notetakers', href: '#' },
    { label: 'Compliance software', href: '#' },
    { label: 'Hiring software', href: '#' },
    { label: 'Password managers', href: '#' },
    { label: 'Project management software', href: '#' },
    { label: 'See more', href: '#' },
  ];

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="inline-flex items-center text-gray-700 hover:text-[#AF583B] font-medium">
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className={`absolute left-0 mt-2 ${isProducts ? 'w-[800px]' : 'w-[400px]'} rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fadeIn`}>
          {isProducts ? (
            <div className="p-6">
              {/* Featured Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-[#e8f5e9] rounded-lg flex items-center justify-center">
                    <span className="text-lg">📈</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Shoutouts Leaderboard</h3>
                    <p className="text-sm text-gray-500">The most-loved products on Product Hunt</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Product Landscapes</h3>
                <div className="flex flex-wrap gap-2">
                  {landscapes.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-[#AF583B] whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Categories Column */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <a
                        key={category.label}
                        href={category.href}
                        className="block text-sm text-gray-600 hover:text-[#AF583B]"
                      >
                        {category.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Add-ons Column */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Product add-ons</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {addOns.map((addon) => (
                      <a
                        key={addon.label}
                        href={addon.href}
                        className="text-sm text-gray-600 hover:text-[#AF583B]"
                      >
                        {addon.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
                {items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    role="menuitem"
                  >
                    {item.icon && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gray-100 group-hover:bg-[#AF583B]/10 flex items-center justify-center text-gray-500 group-hover:text-[#AF583B]">
                        {item.icon}
                      </div>
                    )}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#AF583B]">
                        {item.label}
                      </p>
                      {item.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}