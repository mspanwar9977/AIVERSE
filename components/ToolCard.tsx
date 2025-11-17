
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const Tag: React.FC<{ text: string; color: string }> = ({ text, color }) => (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
        {text}
    </span>
);

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="bg-white p-4 rounded-lg shadow-sm h-full flex items-start space-x-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
        <img
          src={tool.logoUrl}
          alt={`${tool.name} logo`}
          className="w-16 h-16 rounded-md object-contain flex-shrink-0"
          onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')}
        />
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition">{tool.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
          <div className="mt-3 flex items-center gap-2">
            {tool.tags.includes('deal') && <Tag text="Deal" color="bg-green-100 text-green-800" />}
            {tool.tags.includes('popular') && <Tag text="Popular" color="bg-yellow-100 text-yellow-800" />}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ToolCard;
