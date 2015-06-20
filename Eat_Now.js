if (Meteor.isClient) {
  // // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });

  Template.time_dropdown.helpers({
    populate: function() {
      var select = $('#res_time');
      console.log(select);
      var hours, minutes, ampm;
      for(var i = 0; i <= 100; i += 15){
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10){
            minutes = '0' + minutes; // adding leading zero
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0){
            hours = 12;
        }
        select.append($('<option></option>')
            .attr('value', i)
            .text(hours + ':' + minutes + ' ' + ampm)); 
      }
    }
  });
  
  var time =  moment().add(2, 'h').format("H mm");

  console.log(time);

  // var populate = function(selector) {
  //   var select = $(selector);
  //   console.log(select);
  //   var hours, minutes, ampm;
  //   for(var i = 0; i <= 100; i += 15){
  //     hours = Math.floor(i / 60);
  //     minutes = i % 60;
  //     if (minutes < 10){
  //         minutes = '0' + minutes; // adding leading zero
  //     }
  //     ampm = hours % 24 < 12 ? 'AM' : 'PM';
  //     hours = hours % 12;
  //     if (hours === 0){
  //         hours = 12;
  //     }
  //     select.append($('<option></option>')
  //         .attr('value', i)
  //         .text(hours + ':' + minutes + ' ' + ampm)); 
  //   }
  // };

  // populate('#res_time');

  // console.log(populate('#res_time'));
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


$('#res_time').
var time = moment().add(2,'hours').format('H mm');
console.log(time);
