 // set up the main template the the router will use to build pages
 Router.configure({
     layoutTemplate: 'ApplicationLayout'
 });
 // specify the top level route, the page users see when they arrive at the site
 Router.route('/', function() {
     console.log("rendering root /");
     this.render("navbar", {
         to: "header"
     });
     this.render("lobby_page", {
         to: "main"
     });
     this.render("footer", {
         to: "footer"
     });
 });

 // specify a route that allows the current user to chat to another users
 Router.route('/chat/:_id', function() {
     // the user they want to chat to has id equal to 
     // the id sent in after /chat/... 
     var otherUserId = this.params._id;
     // find a chat that has two users that match current user id
     // and the requested user id
     var filter = {
         $or: [{
             user1Id: Meteor.userId(),
             user2Id: otherUserId
         }, {
             user2Id: Meteor.userId(),
             user1Id: otherUserId
         }]
     };

     Meteor.call('addChat', filter, otherUserId, function(error, result) {
         if (!error) {
             console.log("result: ", result);
             if (result) {
                 Session.set("chatId", result);
             }
         }
     });

     this.render("navbar", {
         to: "header"
     });
     this.render("chat_page", {
         to: "main"
     });
     this.render("footer", {
         to: "footer"
     });
 });
