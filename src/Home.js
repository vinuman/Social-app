import React from "react";
import Loading from "./Componenets/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./features/postSlice";
import { Link } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";

const Home = () => {
  const [expanded, setExpanded] = useState(-1);
  const dispatch = useDispatch();

  const { post, loading, error } = useSelector((state) => state.posts);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleReadMore = (id) => {
    setExpanded(id === expanded ? -1 : id);
  };

  if (loading) {
    return (
      <>
        <div className=" flex justify-center items-center py-32">
          <Loading type="spin" color="#F05A22" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className=" text-5xl flex justify-center items-center py-36">
          Opps...Something wrong, please try again
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 bg-[#F8E7E7]">
        <h1 className="text-2xl pt-[80px] px-4 font-bold">
          Social Media For Travellers
        </h1>
        <input
          className=" ml-4 mt-4 w-[90%] p-2 rounded-md"
          type="text"
          placeholder="Search here..."
        ></input>
        <div className=" w-[100%] flex flex-wrap">
          {post.map((item) => (
            <div className=" p-4  rounded-md bg-white flex flex-col  w-[100%] sm:w-[60%] md:w-[80%] lg:w-[400px] m-4">
              <div className="w-[100%] h-[200px] rounded-md">
                <img
                  className="w-[100%] h-[100%] rounded-md"
                  src={`https://picsum.photos/200?random=${item.id}`}
                ></img>
              </div>
              <h1 className="font-bold">{item.title.slice(0, 10)}</h1>
              {expanded === item.id ? (
                <p>
                  {item.body}
                  <span
                    onClick={() => setExpanded(-1)}
                    className="font-bold cursor-pointer"
                  >
                    {" "}
                    Read Less...
                  </span>
                </p>
              ) : (
                <p>
                  {item.body.slice(0, 50)}{" "}
                  <span
                    onClick={() => handleReadMore(item.id)}
                    className="font-bold cursor-pointer"
                  >
                    Read More...
                  </span>
                </p>
              )}

              <Link to={`/item/${item.id}`}>
                <button
                  onClick={handleScrollToTop}
                  className="w-[120px] h-[40px] bg-gradient-to-b from-[#F05A22] to-[#F78E48] rounded-md ml-[50%] sm:ml-[65%] mt-4"
                  type="button"
                >
                  &gt;
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
