export default class Ajax {
  constructor(server_url) {
    this.server_url = server_url;
  }

  helloWorld() {
    console.log("Hello World from Ajax class!");
  }

  postData(data = {}) {
    // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    // Default options are marked with *
    return fetch(this.server_url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects
  }

}
