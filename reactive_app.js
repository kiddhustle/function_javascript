// const Bacon = require('baconjs');
// const jQuery = require('jquery');
// const $ = jQuery;
// console.log(jQuery);
var app = {container:$('#app')[0]};
var regions = [];
function Region(name, percent, parties){
  // mutable properties:
  this.name = name;
  this.percent = percent; // % of precincts reported
  this.parties = parties; // political parties
  // return an HTML representation
  this.render = function(){
    var lis = this.parties.map(function(p){
      return '<li>' + p.name + ': ' + p.votes + '</li>';
    });

    var output = '<h2>' + this.name + '</h2>';
    output += '<ul>' + lis.join('') + '</ul>';
    output += 'Percent reported: ' + this.percent;
    return output;
  }

}

function getRegions(data) {
  return data.map(function(obj){
    return new Region(obj.name, obj.percent, obj.parties);
  });
}

// var url = 'http://api.server.com/election-data?format=json';
var url = '/data/payload.json?format=json';



 jQuery.ajax(url).then(function(result){
  regions = getRegions(result);
});
// var regions = getRegions(data);

app.container.innerHTML = regions.map(function(r){
  return r.render();
}).join('');
var url = '/data/payload.json?format=json';

var eventStream = Bacon.fromPromise(jQuery.ajax(url));

var subscriber = eventStream.onValue(function(data){
  // var url = 'http://api.server.com/election-data?format=json';
  // var url = '/data/payload.json?format=json';
  // var data = jQuery.ajax(url);

  var newRegions = getRegions(data);

  app.container.innerHTML = newRegions.map(function(r){
    return r.render();
  }).join('');

});
