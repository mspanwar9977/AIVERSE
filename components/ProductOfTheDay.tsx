
import React from 'react';
import { Tool } from '../types';

interface ProductOfTheDayProps {
  tool: Tool;
}

const ProductOfTheDay: React.FC<ProductOfTheDayProps> = ({ tool }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-lg">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-2">✨ Product of the Day</h2>
      <a href={tool.link} target="_blank" rel="noopener noreferrer" className="group">
        <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              className="w-24 h-24 rounded-lg object-contain bg-white p-2 flex-shrink-0"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/96')}
            />
            <div>
              <h3 className="text-3xl font-bold group-hover:underline">{tool.name}</h3>
              <p className="mt-2 text-indigo-100 max-w-2xl">{tool.description}</p>
            </div>
        </div>
      </a>
    </div>
  );
};

export default ProductOfTheDay;
