const POSTS = "https://jsonplaceholder.typicode.com/posts";
const commentsURL = (id) =>
  `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
const titlesContainer = document.querySelector(".posts");
const postContainer = document.querySelector(".post");

onload = async () => {
  addPosts(await getDataFromApi(POSTS));
};

const getDataFromApi = (url) =>
  fetch(url)
    .then((result) => result.json())
    .then((posts) => {
      return posts;
    });

const addPosts = (posts) => {
  posts.forEach((post) => {
    const titleElement = createTitleElement(post.title, post);
    titlesContainer.append(titleElement);
  });
};

const createTitleElement = (title, post) => {
  const postTitle = createTextElement("h2", title, "post-title");
  postTitle.addEventListener("click", () => onPostClicked(post));
  return postTitle;
};

const createTextElement = (type, text, className) => {
  const postTitle = document.createElement(type);
  postTitle.classList.add(className);

  postTitle.innerHTML = text;
  return postTitle;
};

const onPostClicked = (post) => {
  switchVisibility();
  postContainer.innerHTML = "";
  const postElement = createPostElement(post);
  appendElements(postElement, postContainer);
  console.log(post);
};

const appendElements = (elements, container) => {
  elements.forEach((el) => {
    container.append(el);
  });
};

const createPostElement = (post) => {
  const titleElement = createTextElement("h2", post.title, "title");
  const exitButton = createExitButton();
  const bodyElement = createTextElement("p", post.body, "post-body");
  createCommentElement(post.id);
  return [titleElement, bodyElement, exitButton];
};

const createCommentElement = async (id) => {
  const commentsElement = document.createElement("div");
  const comments = await getDataFromApi(commentsURL(id), addComments);
  comments.forEach((commentObject) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment")
    const name = createTextElement("p", commentObject.name, "comment-name");
    const email = createTextElement("p", commentObject.email, "comment-email");
    const body = createTextElement("p", commentObject.body, "comment-body");
    appendElements([name, email, body], commentElement);
    commentsElement.append(commentElement);
    console.log(commentObject);
  });
  postContainer.append(commentsElement);
};

const addComments = () => {};

const createExitButton = () => {
  const exitButton = document.createElement("button");
  exitButton.setAttribute("id", "exit-button");
  exitButton.innerHTML = "X";
  exitButton.addEventListener("click", switchVisibility);
  return exitButton;
};

const switchVisibility = () => {
  if (titlesContainer.hidden) {
    titlesContainer.hidden = false;
    postContainer.hidden = true;
  } else {
    titlesContainer.hidden = true;
    postContainer.hidden = false;
  }
};
