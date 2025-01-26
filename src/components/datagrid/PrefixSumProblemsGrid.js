
import { PREFIXSUM } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const PrefixSumProblemsGrid = () => (
  <CommonDataGrid
    title="PrefixSum Problems"
    dataFetchUrl={PREFIXSUM}
  />
);


export default PrefixSumProblemsGrid;
