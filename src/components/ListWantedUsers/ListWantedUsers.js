import { useState, useEffect } from "react";
import { Pagination } from "../Pagination/Pagination";

export const ListWantedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wantedList, setWantedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        setIsLoading(true);
        console.log(currentPage);
        const response = await fetch(
          `https://api.fbi.gov/wanted/v1/list?page=${currentPage}`
        );

        const data = await response.json();

        setTotalNumberOfPages(Math.ceil(data.total / data.items.length));
        setWantedList([...data.items]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchData();
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;

  console.log(wantedList[0])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ padding: "1rem" }}>
        {wantedList.map((user, index) => (
          <div key={index} style={{ border: "2px solid", padding: "1rem" }}>
            <div>{user.title}</div>
            <img
              src={user.images[0].large}
              style={{ width: "100px" }}
              alt={user.title}
            />
            <div>{user.description ? user.description : 'No description'}</div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        numberOfPageSlots={5}
        totalNumberOfPages={totalNumberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
