type Props = {
  sort: "oldest" | "newest"
  onSortChange: (value: "oldest" | "newest") => void
}

function SortDropdown({ sort, onSortChange }: Props) {
  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value as "oldest" | "newest")}
      className="text-(--text-50) border border-(--text-20) round15 p-2 w-30 outline-none focus:ring-1 focus:ring-(--primary)">
      <option className="bg-(--card) cursor-pointer round15" value="newest">New</option>
      <option className="bg-(--card) cursor-pointer round15" value="oldest">Old</option>
    </select>
  );
}

export default SortDropdown;