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
      var hours, minutes, ampm, time;
      var arr = [];
      for(var i = 420; i <= 1440; i += 15){
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
        time = hours + ':' + minutes + ' ' + ampm;
        arr.push(time);
      }
      console.log(arr);
      return arr;
    }
  });

  var time =  moment().add(2, 'h').format("H mm");

  console.log(time);

// Ransons Code
// Appending user input to the ul list.



// Template.hello.events({
//   'click button': function () {
//     // increment the counter when button is clicked
//     Session.set('counter', Session.get('counter') + 1);
//   }
// });


  Template.submit_button.events({
    "click #submit_button": function(){
      var user_name = $('#name_input').val();
      var user_phone_num = $('#phone_num_input').val();
      var user_party_num = $('#party_num_input').val();
      // var user_selected_time = $('#res_time').(":selected");
      console.log(user_selected_time);
    }
    // $('#result_list').append("</li>" + user_name, user_phone_num, user_party_num, user_selected_time + "</li>");
  });

  Router.configure({
    layoutTemplate: 'layout'
  });

Router.route('/rest', function (){
  this.render('restaurant_view');
});

Router.route('/', function () {
  this.render('home');
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
