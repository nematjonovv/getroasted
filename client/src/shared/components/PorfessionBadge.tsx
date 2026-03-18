
function PorfessionBadge({ title }: { title: string }) {
  return (
    <p className="px-2.5 py-1.25 rounded-full bg-(--primary)/20 border border-(--primary) text-xs">
      {title}
    </p>
  );
}

export default PorfessionBadge;