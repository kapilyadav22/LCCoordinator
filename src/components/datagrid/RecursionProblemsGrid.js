
import { RECURSION } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const RecursionProblemsGrid = () => (
  <CommonDataGrid
    title="Recursion Problems"
    dataFetchUrl={RECURSION}
  />
);


export default RecursionProblemsGrid;
