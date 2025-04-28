
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface PolicyCardProps {
  id: string;
  title: string;
  description: string;
  premium: number;
  duration: string;
  popular?: boolean;
  category: string;
  imageUrl?: string;
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  id,
  title,
  description,
  premium,
  duration,
  popular = false,
  category,
  imageUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform scale-[1.03] shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className="h-40 bg-gradient-to-r from-insurance-blue-light/50 to-insurance-blue/30 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${imageUrl})`, opacity: 0.7 }}
          />
          {popular && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-insurance-blue text-white font-semibold py-1 px-3">
                Most Popular
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-insurance-blue-dark">{title}</h3>
          <Badge variant="outline" className="text-xs font-medium bg-insurance-gray-light text-insurance-gray-dark">
            {category}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mb-5 text-sm">
          <div className="font-semibold">
            <span className="text-xs text-gray-500">Premium</span>
            <p className="text-lg text-insurance-blue-dark">${premium}<span className="text-xs">/month</span></p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Duration</span>
            <p className="text-insurance-blue-dark font-medium">{duration}</p>
          </div>
        </div>
        
        <Link 
          to={`/policies/${id}/purchase`}
          className="block w-full bg-gradient-to-r from-insurance-blue to-insurance-blue-dark hover:from-insurance-blue-dark hover:to-insurance-blue text-white text-center py-2.5 rounded-md font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default PolicyCard;
