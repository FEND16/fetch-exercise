# CRUD med Fetch

Vi ska implementera förra lektionens HTTP-metoder med en annan standard som skiljer sig ganska mycket från den föregående men ändå bygger på samma metoder:
`fetch`.


```js
//GET
fetch('http://fend16.azurewebsites.net/albums')
    .then(function(response){
        console.log(response.json());
    })
    .then(function(json){
        console.log(json);
    })
 
//POST request, we need to supply body and headers
fetch('http://fend16.azurewebsites.net/albums', 
    {
        method: 'POST',
        body: JSON.stringify({
            artist: '',
            title: ''
            }),
        headers: {
            'Content-type' : 'application/json'
        }
    })
    .then(function(response){
        console.log(response);
    })
```


## Övning

Skapa en `index.html`, `main.js` och `main.css` där du skriver din kod och kör den sedan genom `localhost` via `MAMP`.

1. Implementera förra lektionens funktioner som vi gjorde med `XMLHttpRequest`
fast nu istället med `fetch`. Skicka med samtliga parametrar och inte bara`artist` och `title` utan samtliga med omslagsbild och allt.

* **Implementera GET/POST/PATCH/DELETE**

2. Gör så att man kan skicka med olika värden till funktioner som hanterar `DELETE` och `PATCH` via din `index.html`. T.ex. med ett eller flera `input`-fält. Data ska alltså kunna skrivas in eller väljas från din index.html och skickas via dina funktioner som använder sig av `fetch`.

### Frågor

Diskutera med en någon i klassen gällande följande saker, inget som ska skickas in.:

1. Hur är skillnaderna mellan de två olika implementationerna av HTTP-protokollet? 
2. Vilka nackdelar och fördelar finns det med de två olika implementationerna? `XMLHttpRequest` och `fetch`.
3. Vilka andra alternativ finns det om vi inte använder någon av dessa? Och vad bygger de på för standarder?
4. Vilka saker måste vi alltid göra oberoende av implementation? Vilka värden måste skickas med i vår `request` för att servern ska kunna tolka förfrågan rätt.

### Länkar

* [FETCH | David Walsh](https://davidwalsh.name/fetch)
* [Fetch_API | MDN](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
* [Promises In Depth](https://ponyfoo.com/articles/es6-promises-in-depth)
* [Promises illustrerad](https://bevacqua.github.io/promisees/)