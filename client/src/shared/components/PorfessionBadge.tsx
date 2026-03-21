
function PorfessionBadge({ title }: { title: string | null }) {
  return (
    title ? (
      <p className="px-2.5 py-1.5 rounded-full bg-(--primary)/20 border border-(--primary) text-xs">
        {title}
      </p>
    ) : null
  );
}

export default PorfessionBadge;