import React from 'react';

function Techstack({ tech }: { tech: string[] }) {
  return (
    <div className='flex items-center gap-3 flex-wrap'>
      {tech.map((t, i) => (
        <p key={i} className='bg-(--card) border border-(--text-10) px-2.5 py-1.25 text-xs text-(--text-50) syne rounded-full'>{t}</p>
      ))}
    </div>
  );
}

export default Techstack;