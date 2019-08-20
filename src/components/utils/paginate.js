import _ from "lodash";

export function paginate(items, pageNumber, pagesSize) {
  const startIndex = (pageNumber - 1) * pagesSize;
  return _(items)
    .slice(startIndex)
    .take(pagesSize)
    .value();
}
