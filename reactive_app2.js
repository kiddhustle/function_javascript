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
var app = {container:$('#app')[0]};
var regions = [];
var url = '/data/payload.json?format=json';
var eventStream = Bacon.fromPromise(jQuery.ajax(url));
var subscriber = eventStream.onValue(function(data){
  var newRegions = getRegions(data);

  app.container.innerHTML = newRegions.map(function(r){
    return r.render();
  }).join('');

});
// our un-modified subscriber

$('button#showAll').click(function() {
  var subscriber = eventStream.onValue(function(data) {
    var newRegions = getRegions(data).map(function(r) {
      return new Region(r.name, r.percent, r.parties);
    });

    app.container.innerHTML = newRegions.map(function(r) {
      return r.render();
    }).join('');

  });
});

// a button for showing the total votes

$('button#showTotal').click(function() {
  var subscriber = eventStream.onValue(function(data) {
    var emptyRegion = new Region('empty', 0, [
      {
        name: 'Republican', votes: 0
      }, {
        name: 'Democrat', votes: 0
      }
    ]);

    var totalRegions = getRegions(data).reduce(function(r1, r2) {
      newParties = r1.parties.map(function(x, i) {
        return {
          name: r1.parties[i].name,
          votes: r1.parties[i].votes + r2.parties[i].votes
        };
      });

      newRegion = new Region('Total', (r1.percent + r2.percent) / 2, newParties);

      return newRegion;

      }, emptyRegion);

    app.container.innerHTML = totalRegions.render();
  });
});

// a button for only displaying regions that are reporting > 50%

$('button#showMostlyReported').click(function(e) {console.log(e);
  var subscriber = eventStream.onValue(function(data) {
    var newRegions = getRegions(data).map(function(r) {
      if (r.percent > 50) return r;
      else return null;
    }).filter(function(r) {return r != null;});

    app.container.innerHTML = newRegions.map(function(r) {
      return r.render();
    }).join('');

  });

});
