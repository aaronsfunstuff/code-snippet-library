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
