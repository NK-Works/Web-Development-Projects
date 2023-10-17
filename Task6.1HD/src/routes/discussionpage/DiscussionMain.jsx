import React, { useEffect } from "react";
import { db } from "../../utils/firebase";
import "./DiscussionMain.css";
import { collection, onSnapshot, addDoc, deleteDoc, doc, Timestamp, updateDoc, arrayUnion, setDoc, arrayRemove, getDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import ReactMarkdown from "react-markdown";

function Question() {
  const location = useLocation();
  const auth = getAuth();

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    tags: ""
  });
  const [loading, setLoading] = useState(false);
  const [newdiscuss, setnewdiscuss] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const collectionRef = collection(db, "newdiscuss");
  const [comment, setComment] = useState();

  const deleteHandler = async id => {
    try {
      const docRef = doc(db, "newdiscuss", id);
      await deleteDoc(docRef);
      toast("Data Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch Firestore Data
  useEffect(() => {
    let dataArray = [];
    onSnapshot(collectionRef, snapshot => {
      snapshot.docs.map(x => dataArray.push({ ...x.data(), id: x.id }));
      setnewdiscuss(dataArray);
      setFilteredData(dataArray);
      dataArray = [];
      console.log("triggered");
    });
  });

  // Input Handler Function
  const inputHandler = e => {
    setInputData(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value
      };
    });
  };

  // Submit Handler Function
  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    if (
      inputData.title &&
      inputData.description &&
      inputData.tags &&
      auth.currentUser.email &&
      auth.currentUser.uid
    ) {
      try {
        await addDoc(collectionRef, {
          title: inputData.title,
          description: inputData.description,
          tags: inputData.tags,
          createdAt: Timestamp.now().toDate(),
          postedBy: auth.currentUser.email,
          userId: auth.currentUser.uid
        });
        toast("Data Added");
        setInputData({
          title: "",
          description: "",
          tags: ""
        });
        setInputData({});
      } catch (error) {
        toast("Please Input Valid Data");
      }
    } else {
      toast("Empty value");
    }
    setLoading(false);
  };

  const commentInputHandler = e => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = async (questionId, userId) => {
    try {
      if (comment) {
        let newComment = {
          comment: comment,
          user: auth.currentUser.email
        };
        await updateDoc(doc(db, "newdiscuss", questionId), {
          comments: arrayUnion(newComment)
        });
        const docRef = doc(db, "notifications", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(doc(db, "notifications", userId), {
            notificationList: arrayUnion(
              `${auth.currentUser.email} commented on your post`
            )
          });
        } else {
          await setDoc(doc(db, "notifications", userId), {
            notificationList: arrayUnion(
              `${auth.currentUser.email} commented on your post`
            )
          });
        }
        toast("Comment Submitted");
        setComment("");
      } else {
        toast("Input comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async (questionId, likes, userId) => {
    if (likes?.includes(auth.currentUser.uid)) {
      await updateDoc(doc(db, "newdiscuss", questionId), {
        likes: arrayRemove(auth.currentUser.uid)
      });
      await updateDoc(doc(db, "notifications", userId), {
        notificationList: arrayRemove(
          `${auth.currentUser.email} liked your post`
        )
      });
    } else {
      await updateDoc(doc(db, "newdiscuss", questionId), {
        likes: arrayUnion(auth.currentUser.uid)
      });
      const docRef = doc(db, "notifications", userId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());
      if (docSnap.exists()) {
        await updateDoc(doc(db, "notifications", userId), {
          notificationList: arrayUnion(
            `${auth.currentUser.email} liked your post`
          )
        });
      } else {
        await setDoc(doc(db, "notifications", userId), {
          notificationList: arrayUnion(
            `${auth.currentUser.email} liked your post`
          )
        });
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        progressStyle={{ background: "#D61C4E" }}
      />

      {location.pathname === "/query" && (
        <div className="mainStart">
          <div className="askQuestion">What do you want to ask or share?</div>
          <form onSubmit={e => submitHandler(e)} className="formSub">
            <div className="partTitle">
              <label className="nameOfTiTle">Title</label>
              <input
                value={inputData.title}
                onChange={e => inputHandler(e)}
                id="title"
                className="inputSize"
                placeholder="Start your question with how, what, why,etc"
              />
            </div>
            <div className="partTitle">
              <label className="nameOfTiTle">Describe your problem</label>
              <textarea
                value={inputData.description}
                onChange={e => inputHandler(e)}
                id="description"
                className="inputSize"
                placeholder="Start your question with how, what, why,etc"
              />
            </div>
            <div className="partTitle">
              <label className="nameOfTiTle">Tags</label>
              <input
                value={inputData.tags}
                onChange={e => inputHandler(e)}
                id="tags"
                className="inputSize"
                placeholder="Please add up to 3 tags to describe what your question is about e.g.., Java"
              />
            </div>
            <div className="submittingBut">
              <button type="submit" className="thisBut">
                {loading ? "Loading ..." : "New Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {location.pathname === "/query" && (
        <div className="cardDatePost">
          {filteredData.length > 0 &&
            filteredData.map(x => {
              return (
                <div key={x.id} className="takeSub">
                  <div className="takerSub">
                    <div className="newformSubthis">
                      <div className="nameOfTiTle theSize">Title</div>
                      <div>{x.title}</div>
                    </div>
                  </div>
                  <div className="newformSubthis">
                    <div className="nameOfTiTle theSize">Description</div>
                    <div>{x.description}</div>
                  </div>
                  <div className="newformSubthis">
                    <div className="nameOfTiTle theSize">Tags</div>
                    <div>{x.tags}</div>
                  </div>
                  <div className="newformSubthis">
                    <div className="nameOfTiTle theSize">Created at</div>
                    <div>
                      {JSON.stringify(x.createdAt.toDate().toDateString())
                        .replace('"', "")
                        .replace('"', "")}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHandler(x.id)}
                    className="deleterBut"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      )}
      <div className="contentPlace">

      {location.pathname !== "/query" && (
        <div className="discussDataCard">
          {filteredData.length > 0 &&
            filteredData.map(x => {
              return (
                <div className="theBorder">
                  <div className="itemPlacer">
                    <div className="sizeSel">
                      Posted By : {x.postedBy}
                    </div>
                    {/* Liked  */}
                    <svg
                      onClick={() => likeHandler(x.id, x.likes, x.userId)}
                      className={`${
                        x.likes?.includes(auth.currentUser.uid)
                          ? "text-red-500"
                          : "text-black"
                      } transition-all checkMark cursor-pointer`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 48 48"
                    >
                      <mask id="svgIDa">
                        <path
                          fill="#fff"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                          d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"
                        />
                      </mask>
                      <path
                        fill="currentColor"
                        d="M0 0h48v48H0z"
                        mask="url(#svgIDa)"
                      />
                    </svg>
                  </div>
                  <div className="checkMark">
                    <ReactMarkdown>{x.title}</ReactMarkdown>
                  </div>
                  <div className="withTake">
                    {" "}
                    <ReactMarkdown>{x.description}</ReactMarkdown>
                  </div>
                  <div className="tagCheck"># {x.tags}</div>
                  <div className="withTake theSize">
                    {x.likes?.length} Likes
                  </div>
                  <div className="withTake">
                    <div className="theSize">Comments</div>
                    <div className="withTake newformSubthis">
                      {x.comments?.map(x => {
                        
                        return (
                          <div className="theBorder rounded-md">
                            <div className="sizeselcted">
                              <ReactMarkdown>{x.user}</ReactMarkdown>
                            </div>
                            <div>{x.comment}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="commentTaker">
                    <textarea
                      value={comment}
                      onChange={e => commentInputHandler(e)}
                      className="holdFinalComment"
                      placeholder="Comment something..."
                      ></textarea>
                      <br /> 
                    <button
                      onClick={() => commentSubmitHandler(x.id, x.userId)}
                      className="commentBut"
                      >
                      Comment
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      </div>
    </div>
  );
}

export default Question;
