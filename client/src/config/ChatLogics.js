export const getSender = (userId, users) => {

    return users[0]._id === userId ? users[1]?.username : users[0]?.username
      
  }
  
  export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      (i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId) ||
      (i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== userId)
    ) { 
      return 0;
    }  else {
      return "auto";
    }
  };
  
  
  export const isSameUser = (messages, m, i) => {
      return i > 0 && messages[i - 1].sender._id === m.sender._id
  }
  