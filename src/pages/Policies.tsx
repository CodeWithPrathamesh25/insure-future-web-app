
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PolicyCard from '@/components/PolicyCard';
import { Search } from 'lucide-react';

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock policy data
  const policiesData = [
    {
      id: 'health-1',
      title: 'Basic Health Insurance',
      description: 'Affordable health coverage for individuals with essential medical benefits.',
      premium: 99,
      duration: '1 Year',
      popular: false,
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'health-2',
      title: 'Premium Health Cover',
      description: 'Comprehensive health insurance with coverage for critical illnesses and regular check-ups.',
      premium: 149,
      duration: '1 Year',
      popular: true,
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'life-1',
      title: 'Term Life Insurance',
      description: 'Protect your family's financial future with our term life insurance plan.',
      premium: 75,
      duration: '10 Years',
      popular: false,
      category: 'Life',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'life-2',
      title: 'Whole Life Insurance',
      description: 'Lifetime coverage with investment benefits and cash value accumulation.',
      premium: 195,
      duration: 'Lifetime',
      popular: true,
      category: 'Life',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'vehicle-1',
      title: 'Basic Auto Insurance',
      description: 'Liability coverage for damages and injuries in auto accidents.',
      premium: 59,
      duration: '1 Year',
      popular: false,
      category: 'Vehicle',
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'vehicle-2',
      title: 'Complete Auto Protection',
      description: 'Full coverage for your vehicle with roadside assistance and accident protection.',
      premium: 89,
      duration: '1 Year',
      popular: true,
      category: 'Vehicle',
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'home-1',
      title: 'Home Insurance',
      description: 'Protect your home and belongings against damage, theft, and liability.',
      premium: 120,
      duration: '1 Year',
      popular: false,
      category: 'Home',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'home-2',
      title: 'Premium Home Protection',
      description: 'Comprehensive coverage for your home with additional protections for valuables.',
      premium: 175,
      duration: '1 Year',
      popular: true,
      category: 'Home',
      imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=500&auto=format&fit=crop'
    }
  ];
  
  // Filter policies based on search term and category
  const filteredPolicies = policiesData.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Available categories
  const categories = [
    { id: 'all', name: 'All Policies' },
    { id: 'Health', name: 'Health' },
    { id: 'Life', name: 'Life' },
    { id: 'Vehicle', name: 'Vehicle' },
    { id: 'Home', name: 'Home' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-insurance-blue-dark mb-4">
            Browse Our Insurance Policies
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of insurance options designed to protect what matters most to you.
            Find the perfect coverage that fits your needs and budget.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="sticky top-20 z-30 bg-white shadow-md rounded-xl p-4 mb-8 opacity-0 animate-fade-in animate-delay-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search policies..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category filter */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 whitespace-nowrap md:justify-start">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-insurance-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Policies Grid */}
        {filteredPolicies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPolicies.map((policy, index) => (
              <div key={policy.id} className={`opacity-0 animate-fade-in`} style={{ animationDelay: `${200 + index * 50}ms` }}>
                <PolicyCard
                  id={policy.id}
                  title={policy.title}
                  description={policy.description}
                  premium={policy.premium}
                  duration={policy.duration}
                  popular={policy.popular}
                  category={policy.category}
                  imageUrl={policy.imageUrl}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No policies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-insurance-blue-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our insurance policies and coverage options.</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-insurance-blue-dark mb-2">How do I choose the right insurance policy?</h3>
              <p className="text-gray-600">Consider your specific needs, budget, and the level of coverage required. Our insurance experts can help you compare options and find the perfect fit for your situation.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-insurance-blue-dark mb-2">What factors affect my insurance premium?</h3>
              <p className="text-gray-600">Premium amounts are determined by various factors including your age, health condition, coverage amount, policy duration, and sometimes your occupation or lifestyle choices.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-insurance-blue-dark mb-2">How do I file a claim?</h3>
              <p className="text-gray-600">You can file a claim through your account dashboard, our mobile app, or by contacting our claims department directly. We aim to process claims quickly and efficiently.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-insurance-blue-dark mb-2">Can I modify my policy after purchase?</h3>
              <p className="text-gray-600">Yes, in most cases you can make changes to your policy. Contact our customer service or log in to your account to request modifications to your coverage.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Policies;
