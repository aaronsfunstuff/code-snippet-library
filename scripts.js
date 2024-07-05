// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDHV2hfD6_omPHVTFz4Y02tO_2gQxP-yE0",
    authDomain: "code-snibbit-project.firebaseapp.com",
    projectId: "code-snibbit-project",
    storageBucket: "code-snibbit-project.appspot.com",
    messagingSenderId: "175669747273",
    appId: "1:175669747273:web:f66da1e4747899566aa998",
    measurementId: "G-9BZ2WTLGG5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', loadSnippets);

document.getElementById('snippetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('titleInput').value;
    const code = document.getElementById('codeInput').value;
    const category = document.getElementById('categoryInput').value;

    if (title && code && category) {
        addSnippet(title, code, category);
        document.getElementById('snippetForm').reset();
    }
});

document.getElementById('searchInput').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const snippets = document.querySelectorAll('#snippetList li');
    snippets.forEach(snippet => {
        const text = snippet.textContent.toLowerCase();
        snippet.style.display = text.includes(query) ? '' : 'none';
    });
});

function loadSnippets() {
    const snippets = JSON.parse(localStorage.getItem('snippets')) || [];
    snippets.forEach(snippet => displaySnippet(snippet));
}

function addSnippet(title, code, category) {
    const snippets = JSON.parse(localStorage.getItem('snippets')) || [];
    const snippet = { id: Date.now(), title, code, category };
    snippets.push(snippet);
    localStorage.setItem('snippets', JSON.stringify(snippets));
    displaySnippet(snippet);
}

function displaySnippet(snippet) {
    const snippetList = document.getElementById('snippetList');

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="code"><strong>${snippet.title} (${snippet.category}):</strong> <pre><code class="language-${snippet.category.toLowerCase()}">${snippet.code}</code></pre></span>
        <button class="edit-btn" onclick="editSnippet(${snippet.id})">Edit</button>
        <button class="delete-btn" onclick="deleteSnippet(${snippet.id})">Delete</button>
    `;
    snippetList.appendChild(li);

    Prism.highlightAll();
}

function editSnippet(id) {
    const snippets = JSON.parse(localStorage.getItem('snippets'));
    const snippet = snippets.find(s => s.id === id);
    if (snippet) {
        document.getElementById('titleInput').value = snippet.title;
        document.getElementById('codeInput').value = snippet.code;
        document.getElementById('categoryInput').value = snippet.category;
        deleteSnippet(id);
    }
}

function deleteSnippet(id) {
    let snippets = JSON.parse(localStorage.getItem('snippets'));
    snippets = snippets.filter(snippet => snippet.id !== id);
    localStorage.setItem('snippets', JSON.stringify(snippets));
    document.getElementById('snippetList').innerHTML = '';
    snippets.forEach(snippet => displaySnippet(snippet));
}

// Authentication functions
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert('User registered successfully');
            showLoginForm();
        })
        .catch(error => {
            alert(error.message);
        });
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert('User logged in successfully');
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('snippetForm').style.display = 'block';
            document.getElementById('searchInput').style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('snippetForm').style.display = 'block';
        document.getElementById('searchInput').style.display = 'block';
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('snippetForm').style.display = 'none';
        document.getElementById('searchInput').style.display = 'none';
    }
});
