Meteor.methods({
    addChat: function(filter, otherUserId) {
        var chat = Chats.findOne(filter);
        if (!chat) {
            var users = {
                user1Id: Meteor.userId(),
                user2Id: otherUserId
            };
            return Chats.insert(users);
        } 
        return chat._id;
    },
    updateMessage: function(chat) {
        if (this.userId) {
            Chats.update(chat._id, chat);
        }else{
        	return;
        }
    }
});
