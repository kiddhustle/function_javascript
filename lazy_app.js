const Lazy = require('lazy');


function Receptor(name, available){
  this.name = name;
  this.available = available;

  this.render = function(){
    var output;
    output = '<li>';
    output += this.available ?
      this.name + ' is available' :
      this.name + ' is not available';
    output += '</li>';
    return output;
  }
}

var me = new Receptor;

var receptors = app.getReceptors().push(me);

app.container.innerHTML = receptors.map(function(r){

return r.render();

}).join('');
