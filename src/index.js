document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1846 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  loadPage(imageURL);

})

const loadPage = (imageURL) => {
  let imageData = loadImages(imageURL);
  imageData.then(imageData => {
    document.getElementById('image').src = imageData.url;
    document.getElementById('name').innerText = imageData.name;
    document.getElementById('likes').innerText = imageData.like_count;
    imageData.comments.forEach(function(commentData){
      addListItem(commentData);
    });



  });
  likeEventHandler();
  commentEventHandler();
}

const loadImages = (imageURL) => {
  return fetch(imageURL)
    .then(res => res.json())
    .then(json => json);
};

const likeEventHandler = () => {
  let likeButton = document.getElementById('like_button');
  likeButton.addEventListener("click", function(){
      let likes = document.getElementById('likes');
      likes.innerText = parseInt(likes.innerText) + 1;
      likeData = {
        //id: "1846",
        likes: document.getElementById('likes').innerText
      };
      updateLikeData(likeData);
  })
};

const updateLikeData = (likeData) => {
  return fetch(`https://randopic.herokuapp.com/likes/`,
    {
      method: "POST",
      headers:
        { "content-type":"application/json",
          accept: "application/json"
        },
      body: JSON.stringify(likeData)
    })
};

const commentEventHandler = () => {
  let commentForm = document.getElementById("comment_form");
  commentForm.addEventListener("submit", function(event){
    event.preventDefault()
    let comment = document.getElementById('comment_input').value;
    commentData = {
      image_id: 1846,
      content: comment
    };
    addListItem(commentData);
    let commentUpdate = updateCommentData(commentData);
    commentUpdate.then(newCommentData => {


    })
  })
};

const addListItem = (comment) => {
  let list = document.getElementById('comments');

  let li = document.createElement('li');
  li.innerText = comment.content;
  list.appendChild(li);

  let button = document.createElement('button');
  button.innerText = "delete";
  button.id = comment.id;
  button.addEventListener("click", function(event){
    commentId = event.target.id;
    document.getElementById(commentId).parentElement.remove();
    deleteComment(commentId);
  });
  li.appendChild(button);

};

const deleteComment = (commentId) => {
  return fetch(`https://randopic.herokuapp.com/comments/${commentId}`,
    { method: "DELETE" });
};


const updateCommentData = (commentData) => {
  return fetch(`https://randopic.herokuapp.com/comments/`,
    {
      method: "POST",
      headers:
        { "content-type":"application/json",
          accept: "application/json"
        },
      body: JSON.stringify(commentData)
    })
};
