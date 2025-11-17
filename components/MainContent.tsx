
import React from 'react';
import { Tool } from '../types';
import ToolCard from './ToolCard';
import ProductOfTheDay from './ProductOfTheDay';
import Pagination from './Pagination';

interface MainContentProps {
  tools: Tool[];
  productOfTheDay: Tool | null;
  searchTerm: string;
  onSearch: (term: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalTools: number;
}

const MainContent: React.FC<MainContentProps> = ({
  tools,
  productOfTheDay,
  searchTerm,
  onSearch,
  sortOrder,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
  totalTools
}) => {
  return (
    <div className="space-y-8">
      {productOfTheDay && <ProductOfTheDay tool={productOfTheDay} />}

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-auto md:flex-1">
          <input
            type="text"
            placeholder="Search for tools..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="popular">Popularity</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-gray-500 mb-4">Showing {tools.length} of {totalTools} tools</p>
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">No tools found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default MainContent;
