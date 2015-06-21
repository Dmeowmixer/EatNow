Queues = new Mongo.Collection("queues");

if (Meteor.isClient) {

  Template.body.helpers({
    queues: function () {
        return Queues.find({});
      }
  });

  // defines the submit button event 
  Template.body.events({
    "submit .new-customer": function(event, template){
      // console.log(event);
      // var text = event.target.text.value;

      Queues.insert({
        name: template.find(".name").value,
        phone: template.find(".phone").value
        // createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
    "click .delete": function () {
      Queues.remove(this._id);
    }
  });

  var addMinutes = function(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  };

  Template.time_dropdown.helpers({
    populate: function() {
      var d = new Date();
      var result = "";
      var arr = [];
      for (var i = 0; i < 8; i++)
      {
          var m = (((d.getMinutes() + 7.5)/15 | 0) * 15) % 60;
          var h = ((((d.getMinutes()/105) + .5) | 0) + d.getHours()) % 12;
          d = new Date(d.getYear(), d.getMonth(), d.getDay(), h, m, 0, 0);

          if (i > 0) result += ", ";
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
  // defines the submit button event 
  Template.submit_button.events({
    "click #submit_button": function(){
      event.preventDefault();
      console.log("click works");
      var user_name = $('#name_input').val();
      console.log("user_name works and saves");
      var user_phone_num = $('#phone_num_input').val();
      var user_party_num = $('#party_num_input').val();
      // var user_selected_time = $('#res_time').parent(":selected").val();
      var user_selected_time = $('#res_time').val();
      console.log(user_selected_time);
    $('#result_list').append("<li class='name'>"+user_name+"</li>" + "<li class='party_num'>"+user_party_num+"</li>" + "<li class='select_time'>"+user_selected_time+"</li>");
    }
  });

  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.route('/', function () {
    this.render('home');
  });

  Router.route('/rest', function (){
    this.render('restaurant_view');
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
