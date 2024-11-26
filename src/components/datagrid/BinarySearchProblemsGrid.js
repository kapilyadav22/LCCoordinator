import React from 'react';

import { BinarySearch } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const BinarySearchProblemsGrid = () => (
  <CommonDataGrid
    title="Binary Search Problems"
    dataFetchUrl={BinarySearch}
    // uniqueTopics={topics}
  />
);


export default BinarySearchProblemsGrid;
