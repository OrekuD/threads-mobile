import React from "react";

/**
 * Effect hook for handling search
 * @param query Search query
 * @param searchFunction Callback containing search logic
 */
export default function useSearch(
  query: string,
  searchFunction: (...args: any[]) => void
) {
  React.useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      searchFunction();
    }, 500);

    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [query]);
}
