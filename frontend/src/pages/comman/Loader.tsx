import React from 'react';

export default function Loader({
  fullScreen = false,
  size = 'md',
  text = 'Loading...',
}: {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]';
  const clayInset = 'bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]';

  const loaderContent = (
    <div className="flex select-none flex-col items-center justify-center gap-4">
      {/* clay puck shell with spinning clay ring inside */}
      <div className={`flex items-center justify-center rounded-full p-3 ${clayRaised}`}>
        <div className={`flex items-center justify-center rounded-full p-2 ${clayInset}`}>
          <div
            className={`animate-spin rounded-full border-4 border-indigo-400 border-t-transparent ${sizeClasses[size]}`}
          />
        </div>
      </div>
      {text && (
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#718096]">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#e0e5ec]">
        {loaderContent}
      </div>
    );
  }

  return <div className="flex w-full items-center justify-center py-12">{loaderContent}</div>;
}