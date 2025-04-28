
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Loader2, Shield, Info, User, Mail, Phone,
  Home as HomeIcon, CalendarDays, FileText, Check, ArrowRight, ArrowLeft
} from 'lucide-react';
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  beneficiaryName: z.string().optional(),
  governmentId: z.string().optional(),
});

const PolicyPurchase = () => {
  const [purchaseStep, setPurchaseStep] = useState(1); // 1: Personal Info, 2: Review, 3: Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      address: "",
      beneficiaryName: "",
      governmentId: "",
    },
  });

  // Mock policy data - in a real app, this would come from an API
  const policy = {
    id: id || 'health-2',
    name: 'Premium Health Cover',
    type: 'Health',
    premium: 149,
    duration: '1 Year',
    description: 'Comprehensive health insurance with coverage for critical illnesses and regular check-ups.'
  };
  
  const isLifeInsurance = policy.type === 'Life';

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    setFormData(data);
    setPurchaseStep(2);
    window.scrollTo(0, 0);
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
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/insurance-bg-pattern.svg')] opacity-[0.07]" />
      </div>

      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  purchaseStep >= 1 ? 'bg-insurance-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <span>1</span>
                </div>
                <div className="hidden sm:block ml-3 text-sm font-medium text-gray-600">Personal Details</div>
              </div>
              <div className="flex-1 border-t border-gray-300 mx-4"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  purchaseStep >= 2 ? 'bg-insurance-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <span>2</span>
                </div>
                <div className="hidden sm:block ml-3 text-sm font-medium text-gray-600">Review</div>
              </div>
              <div className="flex-1 border-t border-gray-300 mx-4"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  purchaseStep >= 3 ? 'bg-insurance-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <span>3</span>
                </div>
                <div className="hidden sm:block ml-3 text-sm font-medium text-gray-600">Confirm</div>
              </div>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {purchaseStep === 1 && (
            <Card className="w-full shadow-lg animate-fade-in">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-12 h-12 text-insurance-blue opacity-20" />
                </div>
                <CardTitle className="text-2xl font-bold text-center text-insurance-blue-dark">
                  Let's get you covered!
                </CardTitle>
                <CardDescription className="text-center">
                  Fill in your details to proceed with your {policy.name} purchase.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="Enter your full name" 
                                  className="pl-10" 
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-10 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    <div className="relative w-full">
                                      <CalendarDays className="absolute -left-7 top-0.5 h-4 w-4 text-gray-400" />
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select your date of birth</span>
                                      )}
                                    </div>
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="Enter your mobile number" 
                                  className="pl-10" 
                                  type="tel"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="Enter your email address" 
                                  className="pl-10" 
                                  type="email"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Residential Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HomeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Textarea 
                                  placeholder="Enter your residential address" 
                                  className="min-h-[80px] pl-10" 
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {isLifeInsurance && (
                        <FormField
                          control={form.control}
                          name="beneficiaryName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Beneficiary Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter beneficiary name" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="governmentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Government ID Number (Optional)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="Enter your ID number (optional)" 
                                  className="pl-10" 
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Optional for faster processing
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button 
                        type="submit" 
                        className="w-full sm:w-auto bg-insurance-blue hover:bg-insurance-blue-dark"
                      >
                        Proceed to Review
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Review Details */}
          {purchaseStep === 2 && formData && (
            <Card className="w-full shadow-lg animate-fade-in">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <FileText className="w-12 h-12 text-insurance-blue opacity-20" />
                </div>
                <CardTitle className="text-2xl font-bold text-center text-insurance-blue-dark">
                  Review Your Details
                </CardTitle>
                <CardDescription className="text-center">
                  Please verify your details before confirming your purchase.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Personal Details</h3>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="font-medium">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date of Birth</p>
                        <p className="font-medium">{format(formData.dateOfBirth, "PPP")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Mobile Number</p>
                        <p className="font-medium">{formData.mobileNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Residential Address</h3>
                    <p className="font-medium mt-2">{formData.address}</p>
                  </div>
                  
                  {isLifeInsurance && formData.beneficiaryName && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Beneficiary Name</h3>
                        <p className="font-medium mt-2">{formData.beneficiaryName}</p>
                      </div>
                    </>
                  )}
                  
                  {formData.governmentId && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Government ID</h3>
                        <p className="font-medium mt-2">{formData.governmentId}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center"
                  onClick={() => setPurchaseStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Edit Details
                </Button>
                <Button
                  className="w-full sm:w-auto bg-insurance-blue hover:bg-insurance-blue-dark flex items-center"
                  onClick={() => setPurchaseStep(3)}
                >
                  Confirm and Continue
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Purchase Confirmation */}
          {purchaseStep === 3 && (
            <Card className="w-full shadow-lg animate-fade-in">
              <CardHeader className="text-center space-y-2">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-12 h-12 text-insurance-blue opacity-20" />
                </div>
                <CardTitle className="text-2xl font-bold text-insurance-blue-dark">
                  Almost there! Confirm your policy purchase.
                </CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  {policy.type}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex justify-center items-baseline gap-4 my-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1">
                        <span className="text-3xl font-bold text-insurance-blue-dark">
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

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-insurance-blue-dark mb-2">
                    {policy.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {policy.description}
                  </p>

                  <Separator className="my-4" />

                  <div className="text-sm text-gray-500">
                    <p className="mb-2">By proceeding, you accept our <a href="/terms" className="text-insurance-blue underline">Terms & Conditions</a> and authorise InsureProtect to issue your insurance policy.</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setPurchaseStep(2)}
                >
                  Back
                </Button>
                <Button
                  className="w-full sm:w-auto bg-insurance-green hover:bg-insurance-green-dark"
                  onClick={handlePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Buy Now'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PolicyPurchase;
