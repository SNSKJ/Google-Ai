import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
  isNorthKoreaMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'large', isNorthKoreaMode = false }) => {
  const sizeClasses = size === 'large' ? 'text-7xl md:text-8xl' : 'text-2xl';
  const tld = isNorthKoreaMode ? 'kp' : 'ru';

  return (
    <h1 className={`font-medium ${sizeClasses}`}>
      <span className="text-google-blue">G</span>
      <span className="text-google-red">o</span>
      <span className="text-google-yellow">o</span>
      <span className="text-google-blue">g</span>
      <span className="text-google-green">l</span>
      <span className="text-google-red">e</span>
      <span className="text-sm text-google-blue align-top">{tld}</span>
    </h1>
  );
};

export default Logo;