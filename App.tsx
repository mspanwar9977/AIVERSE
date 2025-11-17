
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { tools as allTools } from './data/tools';
import { Tool } from './types';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    // Simulate fetching and shuffling data on mount
    setTools(allTools.sort(() => 0.5 - Math.random()));
  }, []);

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'popular') {
      filtered.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
    } else if (sortOrder === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [tools, selectedCategory, searchTerm, sortOrder]);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTools.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTools, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedTools.length / itemsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSidebarOpen(false);
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const productOfTheDay = useMemo(() => {
      if(tools.length === 0) return null;
      // Find a tool with a good popularity score to feature
      return [...tools].sort((a,b) => (b.popularityScore || 0) - (a.popularityScore || 0))[0];
  }, [tools]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 container mx-auto px-4 py-8">
        <Sidebar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 lg:pl-8">
          <MainContent
            tools={paginatedTools}
            productOfTheDay={productOfTheDay}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalTools={filteredAndSortedTools.length}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
