import { useTheme } from "@/contexts/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: "h-6 w-auto",
    md: "h-8 w-auto", 
    lg: "h-12 w-auto"
  };

  // Para o tema claro, usar a logo_light.svg
  if (theme === "light") {
    return (
      <img 
        src="/logo_light.svg" 
        alt="ZK Finance" 
        className={`${sizeClasses[size]} ${className}`}
      />
    );
  }

  // Para o tema escuro, usar a logo inline SVG (original)
  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`} 
      viewBox="0 0 442 149" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M183.51 17.6662L137.39 73.6984C136.202 75.1416 136.238 77.2343 137.476 78.6349L183.51 130.726H145.26L104.084 80.8508C101.865 78.1628 101.895 74.2696 104.155 71.6164L150.12 17.6662H183.51Z" 
        fill="url(#paint0_linear_logo)" 
      />
      <path 
        d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z" 
        fill="url(#paint1_linear_logo)" 
      />
      <text 
        fill="white" 
        style={{ whiteSpace: "pre" }} 
        fontFamily="Inter, sans-serif" 
        fontSize="54.7487" 
        fontWeight="600" 
        letterSpacing="0em"
      >
        <tspan x="199.152" y="94.2104">FINANCE</tspan>
      </text>
      <defs>
        <linearGradient 
          id="paint0_linear_logo" 
          x1="114.487" 
          y1="150.065" 
          x2="160.147" 
          y2="0.214775" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00D7CC" />
          <stop offset="0.975962" stopColor="#004EF6" />
        </linearGradient>
        <linearGradient 
          id="paint1_linear_logo" 
          x1="20.414" 
          y1="150.168" 
          x2="54.1142" 
          y2="-5.3753" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00D7CC" />
          <stop offset="0.975962" stopColor="#004EF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}; 