import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const ItemDetails = () => {
  const [details, setDetails] = useState(true);
  const [expanded, setExpanded] = useState(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const post = useSelector((state) => state.posts.post);
  const { id } = useParams();

  const handleReadMore = (id) => {
    setExpanded(id === expanded ? -1 : id);
  };

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const selectedItem = post.find((item) => item.id === Number(id));

  if (!selectedItem) {
    return (
      <>
        <h1>Item not found, please try again</h1>
      </>
    );
  }

  const { title, body, userId } = selectedItem;

  return (
    <>
      <div className=" bg-[#F8E7E7]">
        <div className="flex">
          <button
            onClick={() => navigate(-1)}
            className="w-[40px] h-[40px] bg-gradient-to-b from-[#F05A22] to-[#F78E48] rounded-md mt-[80px] ml-8"
            type="button"
          >
            &lt;
          </button>
          <h1 className=" py-[80px] pb-[40px] px-8 font-bold text-3xl">
            Post Number {Number(id)}
          </h1>
        </div>

        <div className=" px-8 sm:flex">
          {/* left */}
          <div>
            <div className="w-[300px] rounded-lg pb-4">
              <img
                className=" w-[100%] rounded-lg"
                src={`https://picsum.photos/200?random=${id}`}
              ></img>
            </div>
          </div>
          {/* Right */}
          <div className="px-4">
            <div className="flex pb-6">
              <button
                onClick={() => setDetails(true)}
                className={`${details ? "bg-[#F05A22]" : "bg-[#ffffff]"} ${
                  details ? "text-white" : "text-black"
                } w-[100px] h-[30px] rounded font-bold hover:bg-orange-300 hover:text-black mr-4`}
              >
                Details
              </button>
              <button
                onClick={() => setDetails(false)}
                className={`${details ? "bg-[#ffffff]" : "bg-[#F05A22]"} ${
                  details ? "text-black" : "text-white"
                } w-[100px] h-[30px] rounded font-bold hover:bg-orange-300 hover:text-black`}
              >
                User Info
              </button>
            </div>
            <h2 className=" text-black font-bold text-4xl">
              {title.slice(0, 10)}
            </h2>
            {details ? (
              <p className=" w-[100%] sm:w-[50%] text-xl">{body}</p>
            ) : (
              <p>This post was uploaded by {userId}</p>
            )}
          </div>
        </div>
        <h1 className=" py-[80px] pb-[40px] px-8 font-bold text-3xl">
          More posts
        </h1>
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
                  className="w-[120px] h-[40px] bg-gradient-to-b from-[#F05A22] to-[#F78E48] rounded-md ml-[50%] sm:ml-[65%]"
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

export default ItemDetails;
