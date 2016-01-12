 // subscribe to read data
 Meteor.subscribe("chats");
 Meteor.subscribe("users");
 Meteor.subscribe('emojis');

 ///
 // helper functions 
 /// 
 Template.available_user_list.helpers({
     users: function() {
         return Meteor.users.find();
     }
 })
 Template.available_user.helpers({
     getUsername: function(userId) {
         user = Meteor.users.findOne({
             _id: userId
         });
         return user.profile.username;
     },
     isMyUser: function(userId) {
         if (userId == Meteor.userId()) {
             return true;
         } else {
             return false;
         }
     }
 })

 Template.chat_page.helpers({
     messages: function() {
         var chat = Chats.findOne({
             _id: Session.get("chatId")
         });
         console.log("chat: ",chat)
         return chat.messages;
     },
     other_user: function() {
         return ""
     },

 })

Template.emoticon.helpers({
    emoticon: function(){
        var emoticon = [':smile:',':laughing:',':heart_eyes:',
                        ':sleeping:',':open_mouth:',':confounded:',':sweat:',
                        ':scream:',':rage:',':smiling_imp:',':+1:',':smile_cat:',':scream_cat:',':smirk_cat:',
                        ':eyes:',':love_letter:',':kiss:',':crying_cat_face:',':stuck_out_tongue_winking_eye:',
                        ':frowning:',':smirk:',':wink:',':sunglasses:',':star:',
                        ':triumph:',':innocent:',':cupid:',':fire:',':pouting_cat:',
                        ':hear_no_evil:',':see_no_evil:',':speak_no_evil:',':hatched_chick:',':panda_face:',
                        ':monkey_face:',':baby_chick:',':gift_heart:',':tada:',':watch:',':beer:',':hotel:',':wine_glass:',
                        ':open_mouth:',':yum:'];
        return emoticon;
    }
 })
 ///EVENTS
 Template.chat_page.events({
     // this event fires when the user sends a message on the chat page
     'submit .js-send-chat': function(event) {
         // stop the form from triggering a page reload
         event.preventDefault();
         // see if we can find a chat object in the database
         // to which we'll add the message
         var chat = Chats.findOne({
             _id: Session.get("chatId")
         });
         if (chat) { // ok - we have a chat to use
             var msgs = chat.messages; // pull the messages property
             if (!msgs) { // no messages yet, create a new array
                 msgs = [];
             }
             // is a good idea to insert data straight from the form
             // (i.e. the user) into the database?? certainly not. 
             // push adds the message to the end of the array
             user = Meteor.users.findOne({
                 _id: Meteor.user()._id
             });
             if(event.target.chat.value==''){
                return;
             }
             msgs.push({
                 text: event.target.chat.value,
                 userInfo: user.profile
             });
             // reset the form
             event.target.chat.value = "";
             // put the messages array onto the chat object
             chat.messages = msgs;
             // update the chat object in the database.
             console.log("update.....")
             Meteor.call('updateMessage', chat);
             $('#emoticonsPopup').toggle('hide');
             // Chats.update(chat._id, chat);
         }
     },
     'click .js-pop-emoticon':function(event){
        console.log(event);
        $('#emoticonsPopup').toggle('slow');
     }
 })
 Template.emoticon.events({
     'click .js-emoticon': function (event) {
        var message = $('#chat').val();
         var emoticon = ' :'+event.target.title+': ';
         $('#chat').val(message+emoticon);
     }
 });

