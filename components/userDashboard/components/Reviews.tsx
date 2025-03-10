import React, { useState } from 'react';
import {
  Star,
  StarHalf,
  Edit,
  Trash2,
  MessageSquare,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  Calendar,
} from 'lucide-react';
import clsx from 'clsx';

type Review = {
  id: string;
  reviewerName: string;
  productName: string;
  rating: number;
  date: string;
  content: string;
  type: 'received' | 'submitted';
  hasReplied?: boolean;
};

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    reviewerName: 'John Smith',
    productName: 'ProductX',
    rating: 5,
    date: '2024-03-15',
    content: 'This product has completely transformed our workflow. The interface is intuitive and the features are exactly what we needed.',
    type: 'received',
    hasReplied: true,
  },
  {
    id: '2',
    reviewerName: 'Sarah Johnson',
    productName: 'LaunchPro',
    rating: 4,
    date: '2024-03-10',
    content: 'Great product overall. Would love to see more customization options in future updates.',
    type: 'received',
  },
  {
    id: '3',
    reviewerName: 'You',
    productName: 'DevFlow',
    rating: 4.5,
    date: '2024-03-08',
    content: 'Excellent development tool. The automation features save hours of work.',
    type: 'submitted',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );
};

const ReplyModal = ({ isOpen, onClose, review }: { isOpen: boolean; onClose: () => void; review: Review }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Reply to Review</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.reviewerName}</span>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Reply
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
              placeholder="Write your response..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="btn-primary">
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Reviews() {
  const [activeTab, setActiveTab] = useState<'all' | 'received' | 'submitted'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');

  const tabs = [
    { id: 'all' as const, label: 'All', count: MOCK_REVIEWS.length },
    { id: 'received' as const, label: 'Received', count: MOCK_REVIEWS.filter(r => r.type === 'received').length },
    { id: 'submitted' as const, label: 'Submitted', count: MOCK_REVIEWS.filter(r => r.type === 'submitted').length },
  ];

  const dateRanges = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'Last 7 Days' },
    { id: 'month', label: 'Last Month' },
    { id: 'custom', label: 'Custom Range' },
  ];

  const filteredReviews = MOCK_REVIEWS.filter(
    (review) => {
      const matchesTab = activeTab === 'all' || review.type === activeTab;
      const matchesSearch = searchTerm === '' ||
        review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = selectedRating === null || review.rating === selectedRating;
      
      return matchesTab && matchesSearch && matchesRating;
    }
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Reviews</h1>
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
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                />
              </div>
              <select
                value={selectedRating?.toString() || ''}
                onChange={(e) => setSelectedRating(e.target.value ? Number(e.target.value) : null)}
                className="border border-gray-200 rounded-lg px-4 py-2"
              >
                <option value="">All Ratings</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="1">⭐️</option>
              </select>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">Reviewer</th>
                  <th className="text-left p-4 font-medium text-gray-600">Product</th>
                  <th className="text-left p-4 font-medium text-gray-600">Rating</th>
                  <th className="text-left p-4 font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">Review</th>
                  <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-100">
                    <td className="p-4">
                      <span className="font-medium">{review.reviewerName}</span>
                    </td>
                    <td className="p-4">{review.productName}</td>
                    <td className="p-4">
                      <StarRating rating={review.rating} />
                    </td>
                    <td className="p-4">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-4">
                      <p className="line-clamp-2 text-gray-600">{review.content}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        {review.type === 'received' && !review.hasReplied && (
                          <button
                            title="Reply"
                            onClick={() => {
                              setSelectedReview(review);
                              setIsReplyModalOpen(true);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        )}
                        {review.type === 'submitted' && (
                          <button
                            title="Edit"
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
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
                {filteredReviews.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <p>No reviews found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedReview && (
        <ReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => {
            setIsReplyModalOpen(false);
            setSelectedReview(null);
          }}
          review={selectedReview}
        />
      )}
    </div>
  );
}