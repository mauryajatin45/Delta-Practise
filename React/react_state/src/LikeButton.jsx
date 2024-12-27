import { useState } from "react";

export default function LikeButton() {
  let [likeBtn, setLikeBtn] = useState(false);
  let [counter, setCounter] = useState(0);

  let LikeButton = () => {
    setLikeBtn(!likeBtn);
    setCounter(counter+1)
  };
  
  return (
    <div>
      <p onClick={LikeButton}>
        {likeBtn ? (
          <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
        <br />
        Counter : {counter}
      </p>
    </div>
  );
}
