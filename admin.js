document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('adminPanel');
    const snippetForm = document.getElementById('snippetForm');
    const snippetList = document.getElementById('snippetList');

    // Mock admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'password';

    // Function to handle login
    window.login = function () {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === adminUsername && password === adminPassword) {
            loginForm.style.display = 'none';
            adminPanel.style.display = 'block';
            loadSnippets();
        } else {
            alert('Invalid username or password');
        }
    };

    // Function to handle logout
    window.logout = function () {
        loginForm.style.display = 'block';
        adminPanel.style.display = 'none';
    };

    // Function to load snippets from localStorage
    function loadSnippets() {
        snippetList.innerHTML = '';
        const snippets = JSON.parse(localStorage.getItem('snippets')) || [];
        snippets.forEach(snippet => {
            displaySnippet(snippet);
        });
    }

    // Function to display a snippet
    function displaySnippet(snippet) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${snippet.title} (${snippet.category})</strong>
            <pre>${snippet.code}</pre>
            <button onclick="deleteSnippet(${snippet.id})">Delete</button>
        `;
        snippetList.appendChild(li);
    }

    // Event listener for snippet form submission
    snippetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('titleInput').value;
        const category = document.getElementById('categoryInput').value;
        const code = document.getElementById('codeInput').value;
        const snippets = JSON.parse(localStorage.getItem('snippets')) || [];
        const newSnippet = { id: Date.now(), title, category, code };
        snippets.push(newSnippet);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        displaySnippet(newSnippet);
        snippetForm.reset();
    });

    // Function to delete a snippet
    window.deleteSnippet = function (id) {
        let snippets = JSON.parse(localStorage.getItem('snippets')) || [];
        snippets = snippets.filter(snippet => snippet.id !== id);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        loadSnippets();
    };

    // Initial load of snippets
    loadSnippets();
});
