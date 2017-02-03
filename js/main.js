/**
 * Eventlistener makes sure that click-functions are
 * applied att init and that the get-function is being called
 */
document.addEventListener("DOMContentLoaded", function(event) { 
  document.getElementById('patch').addEventListener('click', patchAlbum);
  document.getElementById('delete').addEventListener('click', deleteAlbum);
  document.getElementById('post').addEventListener('click', postAlbumToAPI);
  getAlbumsFromAPI(); //Fill index with albums
});


/**
 * Get alla albums from the fend16 api
 * @return {Array} Returns an array of json objects
 */
 var getAlbumsFromAPI = function(){

  fetch('https://fend16.azurewebsites.net/albums')
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    appendAlbums(json); //Adds all albums to index
    addIdToInputField();  //Binds click events to every album
  });
};


/**
 * Post an album to an api
 * @param  {Object} data all data that needs to be sent
 * @return {Object} return the promise data
 */
 var postAlbumToAPI = function(){

  //Get the input fields, you could also use a form
  var id = document.getElementById('id');
  var title = document.getElementById('title');
  var artist = document.getElementById('artist');
  fetch('https://fend16.azurewebsites.net/albums', 
  {
    method: 'POST',
    body: JSON.stringify(
      {
        artist: artist.value,
        title: title.value
      }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response){
    getAlbumsFromAPI(); //Load the new album list on done
    id.value ='';       //reset input value
    title.value = '';   //reset input value
    artist.value = '';  //reset input value
  });
};

/**
 * Patch a single album, gets the values from input fields
 * @return {JSON} returns a json array
 */
var patchAlbum = function(){
  var id = document.getElementById('id');
  var title = document.getElementById('title').value;
  var artist = document.getElementById('artist').value;
  fetch('https://fend16.azurewebsites.net/albums/' + id.value, 
  {
    method: 'PATCH',
    body: JSON.stringify(
    {
      title: title, 
      artist: artist
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response){
    getAlbumsFromAPI();
    id.value = '';
  });
};

 
var deleteAlbum = function(){
  var id = document.getElementById('id');
  fetch('https://fend16.azurewebsites.net/albums/' + id.value, 
  {
    method: 'DELETE'
  })
  .then(function(response){
    getAlbumsFromAPI();
    id.value = '';
  });
};


/**
 * Appends all album to index.html
 * @param  {Array} data All albums in json
 * @return {void}
 */
var appendAlbums = function(data){

  //Get all list items
  var albumList = document.getElementsByClassName('albumList')[0];
  
  //Make a variabel to hold all the HTML code
  var albums = '';

  //Loop through every album and make new elements for 
  //everything. Using ES6 Template Literals. Better than
  //ordinary string concat
  for(var album of data){
    albums += `<div class="album" data-id=${album._id}>
                  <div class="info">
                    <p><span>Artist: </span>${album.artist}</p>
                    <p><span>Album: </span>${album.title}</p>
                    <p><span>ID: </span><span class="id-number">${album._id}</span></p>
                  </div>
                  <img class="album-cover" src="${album.cover}" alt="${album.title}" />
                </div>`;
  }
  //Add the html chunk to the section 'albulList'
  albumList.innerHTML = albums;
};


/**
 * Function adds a click function to every album
 * so when you click it, the value of the id field
 * changes to the id of the album
 */
var addIdToInputField = function(){
  var albumList = document.getElementsByClassName('album');
  var inputField = document.getElementById('id');
  var title = document.getElementById('title')
  var artist = document.getElementById('artist')
  for(var album of albumList){
    album.addEventListener('click', function(){

        //this.dataset.id refers to the html attribute data-id
        inputField.value = this.dataset.id;
    });
  }
};