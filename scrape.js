const traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),
    fs = require('fs')
    xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUwODM2NjIyOSwiaWF0IjoxNTA3NzYxNDI5LCJhdWQiOiI1NzMwZTZlMWNkNTMwZTY2MDgwMDA2YTYiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNTlkZTlkMTViMjAyYTM0ZDdmY2YxZjc2In0.9JbXLLuBP8v7pgtNzhRmtcjT4N9IdlK2UmxY1SJTdGg';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
api = traverson.from('https://api.artsy.net/api').jsonHal();

let allGenes = []

const startFollow = 'genes'

const req =  api.newRequest()

follow(startFollow)


function follow(followLink) {
  console.log('followLink', followLink)
    req
    .follow(followLink)
    .withRequestOptions({
      headers: {
        'X-Xapp-Token': xappToken,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    })
    //.withTemplateParameters({ id: 'andy-warhol' })
    .getResource(function(error, genes) {
      console.log(genes)
      console.log(genes._embedded.genes.map(d => d.name));
      if(genes._links.next) {
        console.log('has next', genes._links.next)
        follow('next')
      }
      //else {
      //}
      allGenes = allGenes.concat(genes._embedded.genes)
        fs.writeFile("genes.json", JSON.stringify(allGenes), function(err) {
          if(err) {
          return console.log(err);
          }
        });
      console.log(allGenes.length)
    }) 
}

