// Grab a reference to the input field and store its value in a variable
function handleSubmit(event) {
	// prevent page from reloading when form is submitted
	event.preventDefault();
	// get the value of the input field
  const input = document.querySelector('.searchForm-input').value;
  // remove whitespace from the input
	const searchQuery = input.trim();
	// call `fetchResults` and pass it the `searchQuery`
  fetchResults(searchQuery);
}


// Send Query to wiki and log response
function fetchResults(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${searchQuery}`;

  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const results = data.query.search;
    displayResults(results);
});
}

// Capture the results and display
function displayResults(results) {
  // Store a reference to `.searchResults`
  const searchResults = document.querySelector('.searchResults');
  // Remove all child elements
  searchResults.innerHTML = '';

  // Loop over results array
  results.forEach(result => {
   const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

   searchResults.insertAdjacentHTML('beforeend',
      `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
    );
  });
}

// Grab Search Query
const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);


