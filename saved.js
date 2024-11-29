function loadSavedPosts() {
    const savedFeed = document.getElementById('savedFeed');
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];

    savedPosts.forEach(postData => {
      const post = document.createElement('div');
      post.className = 'post';

      if (postData.message) {
        const messageElem = document.createElement('p');
        messageElem.textContent = postData.message;
        post.appendChild(messageElem);
      }

      if (postData.image) {
        const img = document.createElement('img');
        img.src = postData.image;
        post.appendChild(img);
      }

      savedFeed.appendChild(post);
    });
  }

  // Go back to the landing page
  function goBack() {
    window.location.href = "index.html"; // Ensure index.html is the main landing page
  }

  // Load saved posts on page load
  window.onload = loadSavedPosts;