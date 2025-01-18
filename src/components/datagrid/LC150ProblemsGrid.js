import React from 'react';

import { LC150 } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';
import { PAGES_NAME } from '../../config';

const sortingObject = {
  'Comparison Sorting Algorithms' : '/ComparisonSort.html',
  'Bucket Sort' : '/BucketSort.html',
  'Counting Sort' : '/CountingSort.html',
  'Radix Sort' : '/RadixSort.html',
  'Heap Sort' : '/HeapSort.html'
}

const LC150ProblemsGrid = () => (
  <CommonDataGrid
    title="LeetCode 150 DSA Problems"
    dataFetchUrl={LC150}
    pageName = {PAGES_NAME.LC150}
    visualObject={sortingObject}
    // uniqueTopics={topics}
  />
);


export default LC150ProblemsGrid;
