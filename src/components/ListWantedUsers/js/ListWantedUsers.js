import { useState, useEffect } from "react";
import { Pagination } from "../../Pagination/js/Pagination";
import { fetchData } from "../../../utility/fetchData";
import "../../../index.css";
import "../css/ListWantedUsers.css";

export const ListWantedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wantedList, setWantedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  useEffect(() => {
    const handleFetchData = async () => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        const fetchedWantedList = await fetchData(currentPage);

        if (fetchedWantedList.length === 0) return;

        setTotalNumberOfPages(
          Math.ceil(fetchedWantedList.total / fetchedWantedList.length)
        );
        setWantedList([...fetchedWantedList]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchData();
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  return (
    <div className="list-wanted-users-wrapper">
      <h1>Wanted List</h1>
      <div className="list-wanted-users">
        {wantedList.map((user, index) => (
          <div key={index} className="list-wanted-users-details">
            <div>{user.title}</div>
            <img
              src={user.images[0].large}
              style={{ width: "100px" }}
              alt={user.title}
            />
            <div>{user.description ? user.description : "No description"}</div>
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
