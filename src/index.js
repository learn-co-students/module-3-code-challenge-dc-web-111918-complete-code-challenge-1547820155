// {
//     id: 1845,
//     url: "http://blog.flatironschool.com/wp-content/uploads/2016/01/20141110-Flatiron-School-29-352x200.jpg",
//     name: "Not Flatiron",
//     like_count: 0,
//     comments: Array(1)
//   }


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1845 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  // debugger

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //fetch imageURL
  getImage(imageURL)
  //then render image
})

function getImage(imageURL){
  fetch(imageURL)
  .then(response => response.json())
  .then(jsonData => {
    renderImage(jsonData)
  })
} //jsonData is exactly what it should be

function renderImage(image) {
  // image is the proper object

  //TITLE OF IMAGE
  const headerTag = document.querySelector('#name')
  headerTag.innerText = `${image.name}`
  headerTag.classList.add('image_card')
  //title properly shows

  //SHOW PICTURE

// <img src="" id="image" data-id=""/>

  // const pic = document.querySelector('image')
  // pic.classList.add('image_card')
  // debugger
  const imgPic = document.createElement('img')
  imgPic.src = `${image.url}`
  //imgPic and its source work
  // debugger
  // imgPic.classList.add('#image')
  // pic.appendChild(imgPic)


  //SHOW COMMENTS

  const showComment = document.querySelector('#comments')

  cmt = image.comments.forEach(comment =>{
    const createCommentList = document.createElement('li')
    createCommentList.innerText = `${comment.content}`
    createCommentList.classList.add('image_card')
    showComment.appendChild(createCommentList)
  }) //this does get the correct content
  showComment.classList.add('image_card')

  //showing comments works properly


  //LIKES EVENT LISTENER

  const likesButton = document.querySelector("like_button")

  // likesButton.addEventListener('click', (e) =>{
  //   addLikes(image)
  // })


  //SHOW LIKES

  const totalLikes = document.querySelector('#likes')
  totalLikes.innerText = `${image.like_count}`
  totalLikes.classList.add('image_card')
  //works!!!


} //renderImage end



//ADD LIKES

// function updateLikes(likeURL, imgLikes){
//   const data = {likes: imgLikes}
//   return fetch(likeURL, {
//     method: "PATCH",
//     headers: {
//       "Content-Type" : "application/json",
//       Accept: "application/json"
//     }
//     body: JSON.stringify(data)
//   })
// }
//
// function addLikes(image) {
//   updateLikes(likeURL, ++image.like_count)
//   .then(response => response.json())
//   .then(newLikeCount => {
//     totalLikes.innerText = '${newLikeCount}'
//   })
// }


//ADD COMMENTS
