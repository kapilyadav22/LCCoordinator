const CustomListView = ({ items, onItemClick, renderTitle }) => {
  return (
    <div className="rounded-lg p-1 mx-auto my-[2px] w-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-[2px]">
        <ul className="list-none m-0 p-0">
          {items.map((item) => (
            <li
              className="p-[2px] mb-1 last:mb-0"
              key={`${item.id}_${
                item.title?.trim() ? item.title : "title_" + item.id
              }`}
            >
              <button
                onClick={() => onItemClick(item)}
                className="w-full text-left rounded transition-all duration-300 hover:bg-itemhover-main dark:hover:bg-purple-900/20 hover:scale-[1.01] p-1 flex items-center group"
              >
                {renderTitle ? (
                  renderTitle(item)
                ) : (
                  <div className="flex-1 w-full pl-5">
                    <span className="text-base font-medium text-text-primary group-hover:text-title-main transition-colors">
                      ○ {item.title}
                    </span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomListView;
