import { useState } from "react";
import { resourcesData } from "../dataFields/resourcesData";
import CustomAccordion from "../layout/CustomAccordion";
import { CustomTitle } from "../layout/CustomTitle";

const Resources = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleResourcesClick = (item) => {
    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  const onAccordionChange = (index) => {
    setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full px-4 py-8">
      <CustomTitle title={"Resources"} />
      <div className="max-w-4xl mx-auto space-y-4">
        {resourcesData.map((category, index) => (
          <CustomAccordion
            key={`${index + "_" + category.title}`}
            index={index}
            category={category.title}
            content={category.items}
            isOpen={openAccordion === index}
            onChange={() => onAccordionChange(index)}
            handleClick={handleResourcesClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources;
