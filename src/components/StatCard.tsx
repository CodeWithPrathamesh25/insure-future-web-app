
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  suffix?: string;
  color?: 'blue' | 'green' | 'purple' | 'amber';
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, suffix = '', color = 'blue', delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let animationTimeout: NodeJS.Timeout | null = null;
    
    // Delay the animation based on the delay prop
    if (delay) {
      animationTimeout = setTimeout(() => {
        if (typeof value === 'number') {
          let start = 0;
          const duration = 1000; // ms
          const step = Math.max(1, Math.floor((value as number) / (duration / 16))); // 60 fps ideally
          
          const timer = setInterval(() => {
            start += step;
            if (start > value) {
              setDisplayValue(value as number);
              clearInterval(timer);
            } else {
              setDisplayValue(start);
            }
          }, 16);
        } else {
          setDisplayValue(value as unknown as number);
        }
      }, delay);
    }
    
    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [value, delay]);
  
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'text-insurance-blue bg-insurance-blue/10';
      case 'green': return 'text-insurance-green bg-insurance-green/10';
      case 'purple': return 'text-purple-500 bg-purple-500/10';
      case 'amber': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-insurance-blue bg-insurance-blue/10';
    }
  };

  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold flex items-baseline">
            {typeof value === 'number' ? displayValue : value}
            {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
          </h3>
        </div>
        <div className={`p-3 rounded-full ${getColorClass()} transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
