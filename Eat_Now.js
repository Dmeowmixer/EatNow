Queues = new Mongo.Collection("queues");

if (Meteor.isClient) {



  // defines the submit button event 
  Template.body.events({
    "submit #user_input": function(event, template){
      // console.log(event);
      // var text = event.target.text.value;


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
  var user_info_obj = {};

  // Ransons Code
  // Appending user input to the ul list.
  // defines the submit button event 
  Template.submit_button.events({
    "click #submit_button": function(){
      event.preventDefault();
      var user_name = $('#name_input').val();
      var user_phone_num = $('#phone_num_input').val();
      var user_party_num = $('#party_num_input').val();
      var user_selected_time = $('#res_time').val();
      
      Queues.insert({
        name: user_name,
        phone: user_phone_num,
        time: user_selected_time,
        pNum: user_party_num
      });


      // var dbName = Queues.find().fetch()[0].name;
      // var dbPhone = Queues.find().fetch()[0].name;
      // var dbTime = Queues.find().fetch()[0].name;
      // var dbPNum = Queues.find().fetch()[0].name;

      // $('#db_results').append("<ul><li>"+dbName+"</li><li>"+dbPhone+"</li><li>"+dbTime+"</li><li>"+dbPNum+"</li></ul>");

 
    window.location.replace("/list_view");
    console.log(user_info_obj);
    var current_time = moment().format("hh:mm");

    var start_time = current_time;
    var end_time = user_selected_time;
    var start = moment.duration(start_time, 'm');
    var end = moment.duration(end_time, 'm');
    var minutes_left = (end.subtract(start).minutes());


    $('.food_image').append("<ul id='result_list'>" + "<li class='name'>"+user_name+"</li>" + "<li class='party_num'>"+user_party_num+"</li>" + "<li class='select_time'>"+user_selected_time+"</li>" + "<li class='time_left'>"+minutes_left+ " minutes" + "</li>" + "</ul>");
    }
  });


  Template.list_view.helpers({
    queues_items: function () {
      return Queues.find();
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

  Router.route('/list_view', function (){
    this.render('list_view');
      var results = Queues.find().fetch();

      Template.list_view.render = function(){

      };


      // $('#db_results').append('<ul id=db_ul> </ul>');
      // for(var i = 0; i < results.length; i++){
      //   var current_obj = results[i];
      //   (Object.keys(current_obj)).forEach(function(key){
      //     if(key === "_id"){
      //       return;
      //     }
      //     console.log(current_obj);
      //     $('#db_ul').append("<li class='list item'>" +current_obj[key]+ "<button class='delete'> Cancel Reservation </button></li>");
      //   }); 
      }
    // $("button.delete").click(function(){
    //   console.log($(this).parent());
    // });
  );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
