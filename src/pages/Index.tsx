
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Banknote, Shield, Heart, Home } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-hero-pattern bg-cover bg-center py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-insurance-blue-dark/70 to-insurance-blue-dark/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white opacity-0 animate-fade-in">
              Secure Your Future Today
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto md:mx-0 opacity-0 animate-fade-in animate-delay-100">
              Comprehensive insurance solutions tailored to protect what matters most to you. Experience peace of mind with our expert coverage options.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0 animate-fade-in animate-delay-200">
              <Link to="/login" className="btn-primary px-8 py-3 text-lg">
                Login
              </Link>
              <Link to="/register" className="btn-secondary px-8 py-3 text-lg">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-insurance-blue-dark">Why Choose InsureProtect</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive insurance solutions tailored to your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 animate-fade-in">
              <div className="bg-insurance-blue/10 p-4 rounded-full inline-block mb-4">
                <Shield size={28} className="text-insurance-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-insurance-blue-dark">Complete Protection</h3>
              <p className="text-gray-600">
                Comprehensive coverage options that protect what matters most to you and your family.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 animate-fade-in animate-delay-100">
              <div className="bg-insurance-green/10 p-4 rounded-full inline-block mb-4">
                <Banknote size={28} className="text-insurance-green" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-insurance-blue-dark">Affordable Plans</h3>
              <p className="text-gray-600">
                Flexible and affordable insurance plans designed to fit any budget without compromising quality.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 animate-fade-in animate-delay-200">
              <div className="bg-purple-500/10 p-4 rounded-full inline-block mb-4">
                <Heart size={28} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-insurance-blue-dark">Health Priority</h3>
              <p className="text-gray-600">
                Health insurance plans that ensure you and your loved ones receive the best medical care.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 animate-fade-in animate-delay-300">
              <div className="bg-amber-500/10 p-4 rounded-full inline-block mb-4">
                <Home size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-insurance-blue-dark">Property Security</h3>
              <p className="text-gray-600">
                Protect your home and belongings with our comprehensive property insurance solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-insurance-blue-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-insurance-blue to-insurance-blue-dark p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Ready to secure your future?</h2>
                <p className="mb-8 text-white/90">
                  Join thousands of satisfied customers who trust InsureProtect for their insurance needs. 
                  Our expert team is ready to help you find the perfect coverage.
                </p>
                <Link to="/register" className="inline-block bg-white text-insurance-blue font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5">
                  Get Started Now
                </Link>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-2xl font-bold mb-6 text-insurance-blue-dark">Why our customers love us</h3>
                
                {/* Testimonial */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-insurance-blue mr-3">
                      JD
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">Life Insurance Customer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The process was incredibly easy, and the rates were much better than competitors. Highly recommend!"
                  </p>
                </div>
                
                {/* Testimonial */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-insurance-blue mr-3">
                      AS
                    </div>
                    <div>
                      <p className="font-medium">Anna Smith</p>
                      <p className="text-sm text-gray-500">Health Insurance Customer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "InsureProtect made finding the right health coverage for my family simple. Outstanding service!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
