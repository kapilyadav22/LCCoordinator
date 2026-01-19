import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "../icons/CustomIcon";
import ListView from "../layout/CustomListView";

const CustomAccordion = ({
  index,
  category,
  content,
  isOpen,
  handleClick,
  onChange,
}) => {
  return (
    <div className="border border-title-main/20 rounded-lg overflow-hidden mb-2 bg-white dark:bg-gray-800 shadow-sm">
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        onClick={onChange}
        aria-expanded={isOpen}
        aria-controls={`${category}-content`}
        id={`${category}-header`}
      >
        <span className="text-lg font-medium text-title-main">{category}</span>
        <span
          className={`transform transition-transform duration-200 text-title-main ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <CustomIcon name="expand" className="w-5 h-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            id={`${category}-content`}
          >
            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
              <ListView items={content} onItemClick={handleClick} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomAccordion;
