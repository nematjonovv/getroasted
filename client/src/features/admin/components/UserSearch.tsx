
import { Search } from "lucide-react";

type Props = {
  search: string,
  onSetSearch: (value: string) => void
}

function UserSearch({ search, onSetSearch }: Props) {
  return (
    <div className="mb-5 py-2 px-5">
      <label className="relative">
        <Search className="absolute top-0.5 left-2 text-(--text-50)" size={18} />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSetSearch(e.target.value)}
          value={search}
          className="border border-(--text-20) round15 px-8 py-2 placeholder:text-(--text-50) text-(--text-50) syne outline-none focus:ring-2 focus:ring-(--primary) transition duration-150"
        />
      </label>
    </div>
  );
}

export default UserSearch;