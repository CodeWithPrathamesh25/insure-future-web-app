
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Clock, Bell, X, Check, ArrowRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import PolicyCard from '@/components/PolicyCard';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const { toast } = useToast();
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);
  
  // Mock data for recently viewed policies
  const recentPolicies = [
    {
      id: 'health-1',
      title: 'Premium Health Cover',
      description: 'Comprehensive health insurance with coverage for critical illnesses and regular check-ups.',
      premium: 149,
      duration: '1 Year',
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'vehicle-1',
      title: 'Complete Auto Protection',
      description: 'Full coverage for your vehicle with roadside assistance and accident protection.',
      premium: 89,
      duration: '1 Year',
      category: 'Vehicle',
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=500&auto=format&fit=crop'
    }
  ];
  
  // Mock notification data
  const notifications = [
    { id: 1, message: 'Your Health Insurance policy is expiring in 30 days', time: '2 hours ago' },
    { id: 2, message: 'New recommended policy: Home Insurance Plus', time: '1 day ago' },
    { id: 3, message: 'Payment confirmed for Vehicle Insurance', time: '3 days ago' }
  ];

  const dismissNotification = (id: number) => {
    // In a real app, this would call an API to dismiss the notification
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed from your list."
    });
    
    if (notificationCount > 0) {
      setNotificationCount(notificationCount - 1);
    }
  };
  
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'payment':
        toast({
          title: "Make a Payment",
          description: "Payment feature will be available soon."
        });
        break;
      case 'claim':
        toast({
          title: "File a Claim",
          description: "Claim filing will be available soon."
        });
        break;
      case 'documents':
        toast({
          title: "View Documents",
          description: "Document management will be available soon."
        });
        break;
      case 'support':
        toast({
          title: "Contact Support",
          description: "Redirecting you to our support team."
        });
        break;
      default:
        break;
    }
  };

  const handleLearnMore = () => {
    toast({
      title: "Premium Family Health Plan",
      description: "Learn more about our comprehensive family coverage."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8 opacity-0 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-insurance-blue-dark">
                {greeting}, John!
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome to your insurance dashboard
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-insurance-red text-white text-xs flex items-center justify-center rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-auto p-1 text-xs"
                      onClick={() => setNotificationCount(0)}
                    >
                      Mark all as read
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="bg-gray-50 p-3 rounded-lg flex justify-between items-start"
                      >
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <Button
                      variant="link"
                      size="sm"
                      className="w-full justify-center text-insurance-blue"
                      onClick={() => setShowAllNotifications(true)}
                    >
                      View All Notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="mb-10 opacity-0 animate-fade-in animate-delay-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              icon={<Shield size={24} />} 
              title="Total Policies Available" 
              value={42} 
              color="blue"
              delay={100}
            />
            <StatCard 
              icon={<Users size={24} />} 
              title="Policies Purchased" 
              value={3} 
              color="green"
              delay={200}
            />
            <StatCard 
              icon={<Clock size={24} />} 
              title="Active Policies" 
              value={2} 
              suffix="/ 3"
              color="purple"
              delay={300}
            />
          </div>
        </section>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recently Viewed Policies */}
          <div className="lg:col-span-2 opacity-0 animate-fade-in animate-delay-200">
            <h2 className="text-xl font-bold mb-4 text-insurance-blue-dark">Recently Viewed Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPolicies.map((policy) => (
                <PolicyCard 
                  key={policy.id}
                  id={policy.id}
                  title={policy.title}
                  description={policy.description}
                  premium={policy.premium}
                  duration={policy.duration}
                  category={policy.category}
                  imageUrl={policy.imageUrl}
                />
              ))}
            </div>
          </div>
          
          {/* Notifications */}
          <div className="opacity-0 animate-fade-in animate-delay-300">
            <h2 className="text-xl font-bold mb-4 text-insurance-blue-dark">Recent Notifications</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="py-3 border-b border-gray-100 last:border-0">
                    <p className="text-gray-800 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-3 text-center">
                <button 
                  className="text-insurance-blue text-sm font-medium hover:text-insurance-blue-dark"
                  onClick={() => {
                    setShowAllNotifications(true);
                    toast({
                      title: "Notifications",
                      description: "All notifications page will be available soon."
                    });
                  }}
                >
                  View All Notifications
                </button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-insurance-blue-dark">Quick Actions</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                  <button 
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleQuickAction('payment')}
                  >
                    <p className="font-medium text-insurance-blue-dark">Make a Payment</p>
                  </button>
                  <button 
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleQuickAction('claim')}
                  >
                    <p className="font-medium text-insurance-blue-dark">File a Claim</p>
                  </button>
                  <button 
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleQuickAction('documents')}
                  >
                    <p className="font-medium text-insurance-blue-dark">View Documents</p>
                  </button>
                  <button 
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleQuickAction('support')}
                  >
                    <p className="font-medium text-insurance-blue-dark">Contact Support</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommended For You Section */}
        <section className="mt-12 opacity-0 animate-fade-in animate-delay-400">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-insurance-blue-dark">Recommended For You</h2>
            <Link to="/policies" className="text-insurance-blue hover:text-insurance-blue-dark text-sm font-medium">
              View All Policies
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-insurance-blue-light/30 to-insurance-blue/10 p-6 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-6 md:w-1/3">
                <h3 className="text-lg font-bold text-insurance-blue-dark mb-2">Premium Family Health Plan</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive coverage for your entire family with special benefits and wellness programs.
                </p>
                <div className="text-insurance-blue-dark font-bold text-lg mb-4">$299<span className="text-sm font-normal text-gray-600">/month</span></div>
                <Button 
                  className="btn-primary flex items-center"
                  onClick={handleLearnMore}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="md:w-2/3 bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-medium text-gray-800 mb-2">Key Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete coverage for hospitalization and surgeries</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>24/7 telemedicine access with zero copay</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Wellness programs and preventive care benefits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insurance-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Coverage for pre-existing conditions after waiting period</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
