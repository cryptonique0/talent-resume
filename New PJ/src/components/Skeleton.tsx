import React from 'react';

export interface SkeletonProps {
  type?: 'text' | 'avatar' | 'card' | 'button' | 'line';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  width = '100%',
  height = '20px',
  className = '',
  count = 1,
  circle = false,
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 animate-pulse rounded';

  const typeConfigs = {
    text: { width: '100%', height: '20px' },
    avatar: { width: '48px', height: '48px' },
    card: { width: '100%', height: '200px' },
    button: { width: '100px', height: '40px' },
    line: { width: '100%', height: '12px' },
  };

  const config = typeConfigs[type];
  const finalWidth = width || config.width;
  const finalHeight = height || config.height;
  const circleClass = circle || type === 'avatar' ? 'rounded-full' : 'rounded';

  const skeletonStyle = {
    width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
    height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
  };

  const skeletons = Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${circleClass} ${className}`}
      style={skeletonStyle}
    />
  ));

  return <div className="space-y-2">{skeletons}</div>;
};

export default Skeleton;
