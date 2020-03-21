import React from 'react';
import classnames from 'classnames';

type TagProps = {
  className?: string;
};

export const Tag: React.FC<TagProps> = ({ children, className }) => {
  return (
    <div className={classnames('flex-shrink-0 flex', className)}>
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {children}
      </span>
    </div>
  );
};
