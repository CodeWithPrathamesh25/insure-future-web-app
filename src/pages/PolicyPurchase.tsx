
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Shield, Info } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PolicyPurchase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock policy data - in a real app, this would come from an API
  const policy = {
    id: 'health-2',
    name: 'Premium Health Cover',
    type: 'Health',
    premium: 149,
    duration: '1 Year',
    description: 'Comprehensive health insurance with coverage for critical illnesses and regular check-ups.'
  };

  const handlePurchase = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Purchase Successful!",
        description: "Your policy has been successfully purchased.",
      });
      navigate('/my-policies');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/insurance-bg-pattern.svg')] opacity-[0.07]" />
      </div>

      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto">
          <Card className="w-full shadow-lg animate-fade-in">
            <CardHeader className="text-center space-y-2">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-insurance-blue opacity-20" />
              </div>
              <h1 className="text-2xl font-bold text-insurance-blue-dark">
                {policy.name}
              </h1>
              <Badge variant="secondary" className="w-fit mx-auto">
                {policy.type}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center items-baseline gap-4">
                <div className="text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-insurance-blue-dark">
                          ${policy.premium}
                        </span>
                        <span className="text-sm text-gray-500">/month</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Monthly premium amount for this policy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1">
                        <span className="text-lg font-semibold text-gray-600">
                          {policy.duration}
                        </span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Duration of policy coverage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <p className="text-center text-gray-600 max-w-md mx-auto">
                {policy.description}
              </p>

              <div className="text-center">
                <a 
                  href="#terms" 
                  className="text-sm text-gray-500 hover:text-insurance-blue underline"
                >
                  View Terms & Conditions
                </a>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="destructive"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={() => navigate('/policies')}
              >
                Cancel
              </Button>
              <Button
                className="w-full sm:w-auto min-w-[140px] bg-insurance-green hover:bg-insurance-green-dark"
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Purchase'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PolicyPurchase;
