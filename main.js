
/**
 * Get alla albums from the fend16 api
 * @return {Array} Returns an array of json-objects
 */
var getAlbumsFromAPI = function(){

  fetch('https://fend16.azurewebsites.net/albums')
    .then(function(response) {
      return response.json();
  })
    .then(function(json){
      console.log(json);
    })
  .catch(function(error){
    console.log(error);
  });
};


/**
 * Post an album to an api
 * @param  {Object} data all data that needs to be sent
 * @return {Object} return the promise data
 */
var postAlbumToAPI = function(data){

  fetch('https://fend16.azurewebsites.net/albums', 
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response){
    console.log(response);
  });
};


postAlbumToAPI({title: "Hey", artist: "hello", genre: "Waha!"});


