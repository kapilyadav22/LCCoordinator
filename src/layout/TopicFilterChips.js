import CustomBox from "./CustomIconButtonBox";

const TopicFilterChips = ({
  uniqueTopics,
  selectedTopics,
  onChipClick,
  onReset,
  handleRefresh,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center px-4 sm:px-8 py-2 mb-2 w-full gap-4">
      <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-2">
        {uniqueTopics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <button
              key={topic}
              onClick={() => onChipClick(topic)}
              className={`
                                px-3 py-1 rounded-full text-sm font-medium transition-colors border
                                ${
                                  isSelected
                                    ? "bg-title-main text-white dark:text-gray-900 border-title-main"
                                    : "bg-background-paper text-title-main border-title-main hover:bg-gray-100 dark:hover:bg-gray-700"
                                }
                            `}
            >
              {topic}
            </button>
          );
        })}
      </div>

      <div className="flex shrink-0">
        <CustomBox
          iconName="refresh"
          onClick={handleRefresh}
          className="cursor-pointer w-8 h-8"
          arialabel="refresh"
        />

        <CustomBox
          iconName="reset"
          onClick={onReset}
          className="cursor-pointer w-8 h-8"
          arialabel="reset filters"
        />
      </div>
    </div>
  );
};

export default TopicFilterChips;
