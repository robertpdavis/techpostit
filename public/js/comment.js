
const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log("here");

  const comment = document.querySelector('#comment').value;
  const postId = document.querySelector('[data-postid]').getAttribute('data-postid');

  const userId = "";

  console.log(comment);
  console.log(postId);

  if (comment && postId) {
    const response = await fetch('/api/post/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response);
      document.location.replace(`/post/${postId}`);
    } else {
      alert(response.statusText);
    }
  }
};

if (document.querySelector('.comment-form')) {
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
}
