import React, { useMemo, useState, useEffect } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import useAxios from "axios-hooks";
import axios from "axios";

function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    // 조회 목적에서는 useAxios 훅을 사용하는 것이 좀 더 간편 !
    url: "http://localhost:8000/accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    if (!origUserList) {
      setUserList([]);
    } else {
      setUserList(origUserList.map((user) => ({ ...user, is_follow: false })));
    }
  }, [origUserList]);

  const onFollowUser = (username) => {
    const data = { username };
    const config = { headers };
    axios.post("http://localhost:8000/accounts/follow/", data, config)
      .then(response => {
        setUserList((prevUserList) => 
          prevUserList.map((user) => 
            (user.username !== username) ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div style={style}>
      {loading && <div>loading</div>}
      {error && <div>에러 발생</div>}
      <button onClick={() => refetch()}>Reload</button>
      <Card title="Suggestions for you" size="small">
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
              onFollowUser={onFollowUser}
            />
          ))}
      </Card>
    </div>
  );
}

export default SuggestionList;
