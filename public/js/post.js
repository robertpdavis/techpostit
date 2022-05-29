
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
      console.log(response);
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
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
      alert(response.statusText);
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
        alert(response.statusText);
      }
    }
  }
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


