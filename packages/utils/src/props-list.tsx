import React from 'react';
import clsx from 'clsx';
import { isLastIndex } from './is-last-index';

export type PropsListProps = {
  className?: string;
  style?: React.CSSProperties;
  propsToDisplay: Record<string, any>;
  headingText?: string;
};

export const PropsList = ({ className, style, propsToDisplay, headingText }: PropsList) => {
  const renderValue = (value: any) => {
    let type: React.ReactElement | null = null;
    let valueNode: React.ReactElement | null = null;

    if (typeof value === 'string') {
      valueNode = <p>{value}</p>;
      typeNode = <p className="text-green-500">String</p>;
    }

    return (
      <div className="flex flex-col">
        {valueNode}
        <p className="text-green-500">{typeNode}</p>
      </div>
    );
  };

  return (
    <div className={clsx('flex flex-col', className)} style={style}>
      {headingText && <h1 className="text-xl text-gray-900 mb-4">{headingText}</h1>}
      <div className="p-4 rounded-lg bg-blue-300">
        {Object.entries(propsToDisplay).map(([key, value], index, thisArr) => (
          <div key={key} className={clsx('flex', { 'border-b': !isLastIndex(index, thisArr) })}>
            <p className="text-gray-700 w-28 mr-6">{key}</p>
            <div className="flex flex-col">{renderValue(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
