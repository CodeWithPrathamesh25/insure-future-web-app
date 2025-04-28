
import { useState, useEffect } from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix?: string;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  suffix = "", 
  color,
  delay = 0 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const increment = value / (duration / 50); // Increment per step
    let timer: number;
    let currentCount = 0;
    
    // Add delay before starting animation
    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= value) {
          clearInterval(timer);
          setCount(value);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, 50);
    }, delay);
    
    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
    };
  }, [value, delay]);

  return (
    <div className={`glass-card rounded-xl p-6 relative overflow-hidden group ${
      color === 'blue' ? 'shadow-blue-500/20' : 
      color === 'green' ? 'shadow-green-500/20' : 'shadow-purple-500/20'
    }`}>
      <div className={`absolute top-0 left-0 h-1 w-full ${
        color === 'blue' ? 'bg-insurance-blue' : 
        color === 'green' ? 'bg-insurance-green' : 'bg-purple-500'
      }`}></div>
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-insurance-blue-dark">
              {count}
            </span>
            {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
          </div>
        </div>
        <div className={`rounded-full p-3 ${
          color === 'blue' ? 'bg-insurance-blue/10 text-insurance-blue' : 
          color === 'green' ? 'bg-insurance-green/10 text-insurance-green' : 
          'bg-purple-500/10 text-purple-500'
        } transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      
      <div className={`absolute bottom-0 right-0 h-20 w-20 rounded-full -mr-10 -mb-10 opacity-10 ${
        color === 'blue' ? 'bg-insurance-blue' : 
        color === 'green' ? 'bg-insurance-green' : 'bg-purple-500'
      } transform transition-all duration-300 group-hover:scale-150`}></div>
    </div>
  );
};

export default StatCard;
