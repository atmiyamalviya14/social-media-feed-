function togglePostForm() {
  const postForm = document.getElementById('postForm');
  postForm.classList.toggle('hidden');
}

function addPost() {
  const feed = document.getElementById('feed');
  const message = document.getElementById('postMessage').value;
  const imageInput = document.getElementById('postImage');
  const file = imageInput.files[0];

  const post = document.createElement('div');
  post.className = 'post';

  if (message) {
    const messageElem = document.createElement('p');
    messageElem.textContent = message;
    post.appendChild(messageElem);
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      post.appendChild(img);

      // Save post to localStorage
      saveFeedToLocalStorage(message, e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveFeedToLocalStorage(message, null);
  }

  feed.insertBefore(post, feed.firstChild);

  document.getElementById('newPostForm').reset();
  togglePostForm();
}

function saveFeedToLocalStorage(message, image) {
  const savedFeeds = JSON.parse(localStorage.getItem('savedFeeds')) || [];
  savedFeeds.push({ message, image });
  localStorage.setItem('savedFeeds', JSON.stringify(savedFeeds));
}

function openSavedFeeds() {
  window.location.href = "saved-feeds.html";
}
