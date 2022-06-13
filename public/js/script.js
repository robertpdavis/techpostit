
const bsModal = new bootstrap.Modal(document.getElementById('bsmodal'), { backdrop: 'static' });

//Modal handler
function openModal(modalTitle, modalContent, modalButtons = []) {

    //Update modal DOM to dispay required text
    document.querySelector('#modal-title').textContent = modalTitle;
    document.querySelector('#modal-content').textContent = modalContent;

    //Show modal popup to user
    bsModal.show();
}

//Event handlers
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value;
    const postId = document.querySelector('[data-postid]').getAttribute('data-postid');
  
    if (comment && postId) {
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        openModal("Comment Failed",response.statusText);
      }
    }
  };
  
  const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
  
    if (title && content) {
      const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        openModal("Post Failed",response.statusText);
      }
    }
  };
  
  const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const postId = document.querySelector('[data-postid]').getAttribute('data-postid');
  
    if (title && content) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response);
        document.location.replace(`/dashboard`);
      } else {
        openModal("Update Error",response.statusText);
      }
    }
  }
  
  const deleteFormHandler = async (event) => {
    event.preventDefault();
    if (confirm("Are you sure you wish to delete this post?")) {
  
      const postId = document.querySelector('[data-postid]').getAttribute('data-postid');
  
      if (title && content) {
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