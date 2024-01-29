import React from "react";

export const ListWantedUsers = ({ wantedList }) => {
  console.log(wantedList);
  return (
    <div>
      <ol>
        {wantedList.map((user, index) => (
          <li key={index}>
            <div>{user.title}</div>
            <img src={user.images[0].large} />
            <div>{user.caution.replace(//g, '')}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};
