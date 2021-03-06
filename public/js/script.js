
const bsModal = new bootstrap.Modal(document.getElementById('bsmodal'), { backdrop: 'static' });

//Modal handler
function openModal(modalTitle, modalContent, modalButtons = {cancel:"Close"}) {

    //Update modal DOM to dispay required text
    document.querySelector('#modal-title').textContent = modalTitle;
    document.querySelector('#modal-content').textContent = modalContent;
    //Close button text
    document.querySelector('#modal-close-btn').textContent = modalButtons.cancel;

    //Show modal popup to user
    bsModal.show();
}

//Event handlers
//Add comment
const commentFormHandler = async (event) => {
    event.preventDefault();

    //Get comment data and id for the post
    const comment = document.querySelector('#comment').value;
    const postId = document.querySelector('[data-postid]').getAttribute('data-postid');
  
    if (comment && postId) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
      //If ok go to post page
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        openModal("Comment Failed",response.statusText);
      }
    }
  };
  
  //Add post
  const postFormHandler = async (event) => {
    event.preventDefault();
    //Get the post data
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
  
    if (title && content) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      //If ok go to dashboard page
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        openModal("Post Failed",response.statusText);
      }
    }
  };

  //Update post
  const updateFormHandler = async (event) => {
    event.preventDefault();
    //Get post data and id for the post
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const postId = document.querySelector('[data-postid]').getAttribute('data-postid');
  
    if (title && content) {
      // Send a PUT request to the API endpoint
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      //If ok go to dashboard page
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        const data = await response.json();
        openModal("Update Error",data.message);
      }
    }
  }
  
  const deleteFormHandler = async (event) => {
    event.preventDefault();
    const postId = document.querySelector('[data-postid]').getAttribute('data-postid');

    if (title && content) {
      // Send a DELETE request to the API endpoint
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log(response);
        document.location.replace(`/dashboard`);
      } else {
        openModal("Delete Failed",response.statusText);
      }
    }
  }

  //Event listeners
  if (document.querySelector('.comment-form')) {
    document
      .querySelector('.comment-form')
      .addEventListener('submit', commentFormHandler);
  }

  if (document.querySelector('.post-form')) {
    document
      .querySelector('.post-form')
      .addEventListener('submit', postFormHandler)
  }
  
  if (document.querySelector('#update')) {
    document
      .querySelector('#update')
      .addEventListener('click', updateFormHandler)
  }
  
  if (document.querySelector('#delete')) {
    document
      .querySelector('#delete')
      .addEventListener('click', deleteFormHandler)
  }