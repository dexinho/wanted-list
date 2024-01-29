import React, { useEffect, useState } from "react";
import { ListWantedUsers } from "./components/ListWantedUsers/ListWantedUsers";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wantedList, setWantedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.fbi.gov/wanted/v1/list?page=${currentPage}`
        );

        const data = await response.json();
        setWantedList([...data.items])
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchData();
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ListWantedUsers wantedList={wantedList}/>
    </div>
  );
};

export default App;
