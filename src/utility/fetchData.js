export const fetchData = async (currentPage) => {
  try {
    const response = await fetch(
      `https://api.fbi.gov/wanted/v1/list?page=${currentPage}`
    );

    const data = await response.json();

    return data.items;
  } catch (err) {
    console.log(err);
  }
};
