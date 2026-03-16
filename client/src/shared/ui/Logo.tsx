
function Logo() {
  return (
    <div className="h-20 flex items-center" draggable>
      <img src="/logo.png" className="h-15" draggable alt="" />
      <div className="border-l-3 border-(--text-50) pl-3 ml-3">
        <h1 className="text-3xl text-(--text) font-syne font-extrabold">GET ROASTED</h1>
        <h2 className="text-xl text-(--primary) font-sans">Portfolio Review</h2>
        <p className="text-sm text-(--text-50) font-syne">FOR CREATORS</p>
      </div>
    </div>
  );
}

export default Logo;