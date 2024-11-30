// Function to toggle the visibility of the post form
function togglePostForm() {
  const postForm = document.getElementById('postForm');
  postForm.classList.toggle('hidden');
}

// Function to add a new post
function addPost() {
  const message = document.getElementById('postMessage').value;
  const imageInput = document.getElementById('postImage');
  const file = imageInput.files[0];

  const post = {
    id: Date.now(), // Unique identifier for each post
    message: message || null,
    image: null
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      post.image = e.target.result;
      savePostToLocalStorage(post); // Save to localStorage after reading the file
      displayPost(post); // Display the post after the image is loaded
    };
    reader.readAsDataURL(file);
  } else {
    savePostToLocalStorage(post);
    displayPost(post);
  }

  document.getElementById('newPostForm').reset();
  togglePostForm();
}

// Save posts to localStorage
function savePostToLocalStorage(post) {
  const posts = JSON.parse(localStorage.getItem('userPosts')) || [];
  posts.push(post);
  localStorage.setItem('userPosts', JSON.stringify(posts));
}

// Load posts from localStorage when the page loads
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('userPosts')) || [];
  posts.forEach(displayPost);
}

// Function to delete a post
function deletePost(postId) {
  const posts = JSON.parse(localStorage.getItem('userPosts')) || [];
  const updatedPosts = posts.filter(post => post.id !== postId);
  localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
  loadFeed(); // Reload the feed to reflect the changes
}

// Reload the feed with the latest data
function loadFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = ""; // Clear the feed
  loadPosts(); // Load the updated posts
}

// Function to display a post on the feed
function displayPost(post) {
  const feed = document.getElementById('feed');
  const postElement = document.createElement('div');
  postElement.className = 'post';

  if (post.message) {
    const messageElem = document.createElement('p');
    messageElem.textContent = post.message;
    postElement.appendChild(messageElem);
  }

  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    postElement.appendChild(img);
  }

  // Add a Save button to the post
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-btn';
  saveButton.onclick = function () {
    saveFeedToLocalStorage(post.message, post.image);
    saveButton.textContent = 'Saved'; // Update button text to indicate saved
    saveButton.disabled = true; // Disable the button
  };

  // Add a Delete button to the post
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.onclick = function () {
    deletePost(post.id); // Call the deletePost function
  };

  postElement.appendChild(saveButton);
  postElement.appendChild(deleteButton);
  feed.insertBefore(postElement, feed.firstChild);
}

// Save feeds to localStorage
function saveFeedToLocalStorage(message, image) {
  const savedFeeds = JSON.parse(localStorage.getItem('savedFeeds')) || [];
  savedFeeds.push({ message, image });
  localStorage.setItem('savedFeeds', JSON.stringify(savedFeeds));
}

// Open the Saved Feeds page
function openSavedFeeds() {
  window.location.href = "saved-feeds.html";
}

// Load posts when the page loads
window.onload = loadPosts;
