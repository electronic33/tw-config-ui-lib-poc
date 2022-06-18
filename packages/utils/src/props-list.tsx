import React from 'react';
import clsx from 'clsx';
import { isLastIndex } from './is-last-index';

export type PropsListProps = {
  className?: string;
  style?: React.CSSProperties;
  propsToDisplay: Record<string, any>;
  headingText?: string;
};

export const PropsList = ({ className, style, propsToDisplay, headingText }: PropsListProps) => {
  const renderValue = (value: any) => {
    let typeNode: React.ReactElement | string | number = '-';
    let valueNode: React.ReactElement | string | number = '-';

    if (typeof value === 'string') {
      valueNode = <p className="text-gray-900">{value}</p>;
      typeNode = <span className="text-gray-900">string</span>;
    }

    if (typeof value === 'boolean') {
      valueNode = <p className="text-yellow-800">{value ? 'true' : 'false'}</p>;
      typeNode = <span className="text-yellow-800">boolean</span>;
    }

    if (typeof value === 'number') {
      valueNode = <p className="text-blue-600">{value}</p>;
      typeNode = <span className="text-blue-600">number</span>;
    }

    return (
      <div className="flex flex-col">
        <p className="text-gray-500 flex">
          <span className="w-[50px] mr-3">Value:</span> {valueNode}
        </p>
        <p className="text-gray-500 flex">
          <span className="w-[50px] mr-3">Type: </span>
          {typeNode}
        </p>
      </div>
    );
  };

  return (
    <div className={clsx('flex flex-col', className)} style={style}>
      {headingText && <h1 className="text-xl text-gray-900 mb-4">{headingText}</h1>}
      <div className="p-4 rounded-lg bg-blue-100">
        {Object.entries(propsToDisplay).map(([key, value], index, thisArr) => (
          <div
            key={key}
            className={clsx('flex py-2', {
              'border-b-2 border-gray-500': !isLastIndex(index, thisArr),
            })}
          >
            <p className="text-gray-700 w-40 mr-6">{key}</p>
            <div className="flex flex-col">{renderValue(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
