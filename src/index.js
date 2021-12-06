// write your code here
const cardSection = document.querySelector('.image-container')
const state = {
    images: [],
    comments: []

}

function createCard(item) {
    // cardSection.innerHTML = ''
    const imageCard = document.createElement('article');
    imageCard.setAttribute('class', 'image-card');

    const titleOfImage = document.createElement('h2');
    titleOfImage.setAttribute('class', 'title');
    titleOfImage.textContent = item["title"];

    const imageEl = document.createElement('img');
    imageEl.setAttribute('class', 'image');
    imageEl.setAttribute('src', item["image"]);

    const likesSection = document.createElement('div');
    likesSection.setAttribute('class', 'likes-section');

    const likes = document.createElement('span');
    likes.setAttribute('class', 'likes');
    likes.textContent = item["likes"];

    const likeBtn = document.createElement('button');
    likeBtn.setAttribute('class', 'like-button');
    likeBtn.textContent = '♥';

    likesSection.append(likes, likeBtn);

    const comments = document.createElement('ul');
    comments.setAttribute('class', 'comments')

    const matchedComments = state.comments.filter(function (element) {
        return element["imageId"] === item.id;
    })
    for (const comment of matchedComments) {
        const commentElement = document.createElement('li');

        commentElement.textContent = comment["content"];

        comments.append(commentElement);
    }


    imageCard.append(titleOfImage, imageEl, likesSection, comments);
    cardSection.append(imageCard);
}


function createNewForm() {
    const container = document.createElement('article');
    container.setAttribute('class', 'new-post-article');

    const title = document.createElement('h1');
    title.setAttribute('class', 'new-post-title');
    title.textContent = 'New Post';

    const formEl = document.createElement('form');

    const titleInput = document.createElement('input');
    titleInput.setAttribute('class', 'title-input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Add a title..');

    const urlInput = document.createElement('input');
    urlInput.setAttribute('class', 'url-input');
    urlInput.setAttribute('type', 'url');
    urlInput.setAttribute('placeholder', 'Add an image url..');

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('class', 'submit-btn');
    submitBtn.textContent = 'Post';

    formEl.append(titleInput, urlInput, submitBtn);

    container.append(title, formEl);
    cardSection.prepend(container);
}
function renderNewFormCard() {

    createNewForm();
}

function renderCard() {
    for (const data of state.images) {
        createCard(data);
    }

}
function render() {
    cardSection.innerHTML = '';
    renderCard();
    renderNewFormCard();
}

function getComments() {
    return fetch('http://localhost:3000/comments').then((response) => response.json())
}

getComments().then((comment) => {
    state.comments = comment;
    render();
});

function getImages() {
    return fetch('http://localhost:3000/images').then((response) => response.json())

}

getImages().then(function (image) {
    state.images = image;
    render();
});
render();