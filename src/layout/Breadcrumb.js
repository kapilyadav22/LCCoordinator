import { Link } from "react-router-dom";
import { RouteConfig } from "../config/RouteConfig";
import CustomIcon from "../icons/CustomIcon";

export const Breadcrumb = (props) => {
  // const navigate = useNavigation();
  const currentPage = RouteConfig.find(
    (item) => props.pageName === item.pageName
  );

  const ParentBreadCrumb = () => {
    if (currentPage?.parent?.length) {
      const parentArr = currentPage.parent.map(
        (parentItem) => parentItem.parentName
      );
      const pathArr = new Array(parentArr.length);

      let pathItemCount = 0;
      for (let index = 0; index < RouteConfig.length; index++) {
        const parentObject = RouteConfig[index];
        for (let j = 0; j < parentArr.length; j++) {
          if (parentArr[j] === parentObject.pageName) {
            pathArr[j] = parentObject;
            pathItemCount++;
          }
          if (pathItemCount === parentArr.length) {
            break;
          }
        }
      }
      return pathArr;
    }
    return [];
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-text-primary text-sm sm:text-base">
        <li className="flex items-center">
          <CustomIcon name="home" className="w-5 h-5 text-title-main" />
        </li>
        {ParentBreadCrumb().map((item) => (
          <li key={item.path} className="flex items-center">
            <CustomIcon
              name="forwardArrow"
              className="w-4 h-4 mx-2 text-gray-400"
            />
            <Link
              to={item.path}
              className="hover:text-title-main hover:underline transition-colors"
            >
              {item.pageName}
            </Link>
          </li>
        ))}
        <li className="flex items-center">
          <CustomIcon
            name="forwardArrow"
            className="w-4 h-4 mx-2 text-gray-400"
          />
          <Link
            to={`${currentPage?.pageName}`}
            className="font-medium text-title-main"
            aria-current="page"
          >
            {props.pageName}
          </Link>
        </li>
      </ol>
    </nav>
  );
};
