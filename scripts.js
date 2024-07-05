document.getElementById('snippetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('titleInput').value;
    const code = document.getElementById('codeInput').value;

    if (title && code) {
        addSnippet(title, code);
        document.getElementById('snippetForm').reset();
    }
});

function addSnippet(title, code) {
    const snippetList = document.getElementById('snippetList');

    const li = document.createElement('li');
    li.innerHTML = `<span class="code"><strong>${title}:</strong> ${code}</span><button class="delete-btn">Delete</button>`;
    snippetList.appendChild(li);

    li.querySelector('.delete-btn').addEventListener('click', function() {
        snippetList.removeChild(li);
    });
}
