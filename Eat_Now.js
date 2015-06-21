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

var addMinutes = function(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
};

  Template.time_dropdown.helpers({
    populate: function() {
      var d = new Date();
      var result = "";
      var arr = [];
      for (var idx = 0; idx < 8; idx++)
      {
          var m = (((d.getMinutes() + 7.5)/15 | 0) * 15) % 60;
          var h = ((((d.getMinutes()/105) + .5) | 0) + d.getHours()) % 12;
          d = new Date(d.getYear(), d.getMonth(), d.getDay(), h, m, 0, 0);

          if (idx > 0) result += ", ";
          result += ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2);
          
          d = addMinutes(d, 15);
      }
      // console.log(result);
      arr = result.split(',');
      // console.log(arr);
      return arr;
    }
  });

// Ransons Code
// Appending user input to the ul list.



// Template.hello.events({
//   'click button': function () {
//     // increment the counter when button is clicked
//     Session.set('counter', Session.get('counter') + 1);
//   }
// });



// defines the submit button event 
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


Accounts.onCreateUser(function(options,user){
  user.permissions = user;
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});


}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
