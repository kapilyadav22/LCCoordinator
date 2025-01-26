
import { BinarySearch } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const binaryObject = {
  "Binary Search" : "/Search.html"
}
const BinarySearchProblemsGrid = () => (
  <CommonDataGrid
    title="Binary Search Problems"
    dataFetchUrl={BinarySearch}
    visualObject= {binaryObject}
    // uniqueTopics={topics}
  />
);


export default BinarySearchProblemsGrid;
