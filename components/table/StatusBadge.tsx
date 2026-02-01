import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active';
  
  return (
    <Badge variant={isActive ? 'active' : 'inactive'} className="gap-1 min-w-[70px]">
      <div className="relative size-4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle 
            cx="8" 
            cy="8" 
            fill={isActive ? '#3BA66D' : '#8E8B86'} 
            r="4" 
          />
          {isActive && (
            <circle 
              cx="8" 
              cy="8" 
              fill="url(#paint0_linear)" 
              fillOpacity="0.16" 
              r="4" 
            />
          )}
        </svg>
        <svg className="hidden">
          <defs>
            <linearGradient 
              gradientUnits="userSpaceOnUse" 
              id="paint0_linear" 
              x1="8" 
              x2="8" 
              y1="4" 
              y2="12"
            >
              <stop stopColor="#3BA66D" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="capitalize font-sans  font-medium text-sm leading-5 tracking-normal  text-center align-middle">{status}</span>
    </Badge>
  );
}
