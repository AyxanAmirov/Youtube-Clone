import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

function Comments({
  comment,
  deleteComment,
  updateData,
  setNewComment,
  newComment,
}) {
  const [myComment, setMyComment] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [newCommentInp, setNewCommentInp] = useState(false);
  const [disabledOn, setDisabledOn] = useState(false);
  useEffect(() => {
    let userInform = JSON.parse(localStorage.getItem("user"));

    if (comment?.userEmail == userInform?.userEmail) {
      setMyComment(true);
    } else {
      setMyComment(false);
    }
  }, []);
  const createComment = () => {
    setNewComment(comment.userComment);
    setNewCommentInp(true);
  };
  const addComment = () => {
    updateData(comment.id);
    setNewCommentInp(false);
  };
  const reCreate = (comment) => {
    setNewComment(comment);
    if (comment.trim() !== "") {
      setDisabledOn(false);
    } else {
      setDisabledOn(true);
    }
  };
  return (
    <>
      {newCommentInp ? (
        <>
          <div className="add-comment">
            <p className="profil-image">{comment.userName.slice(0, 1)}</p>
            <input
              type="text"
              className="comment-input"
              placeholder="Şərh əlavə edin"
              value={newComment}
              onChange={(e) => reCreate(e.target.value)}
            />
          </div>
          <div>
            <button
              className="cancle-button"
              onClick={() => setNewCommentInp(false)}
            >
              Ləğv Edin
            </button>
            <button
              disabled={disabledOn}
              type="submit"
              className={disabledOn ? "add-btn disColor" : "add-btn"}
              onClick={addComment}
            >
              Şərh
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex justify-between pos-rel align-center">
          <div className="comments-info">
            <p className="profil-image">{comment.userName.slice(0, 1)}</p>
            <div className="comment-info">
              <p className="comment-user-name">@{comment.userName}</p>
              <p className="comment">{comment.userComment}</p>
            </div>
          </div>
          {myComment ? (
            <i
              className="fa-solid fa-ellipsis"
              onClick={() => setDeleteBtn(!deleteBtn)}
            ></i>
          ) : null}
          {deleteBtn && (
            <div className="delete-body">
              <div className="delete-comment" onClick={createComment}>
                <i className="fa-solid fa-pen"></i>

                <p>Düzəldin</p>
              </div>
              <div
                className="delete-comment"
                onClick={() => deleteComment(comment.id)}
              >
                <i className="fa-solid fa-trash"></i>
                <p>Silin</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Comments;
