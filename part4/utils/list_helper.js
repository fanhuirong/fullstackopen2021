const dummy = (blogs) => {
  if (blogs) {
    return 1;
  } else {
    return 1;
  }
};

const totalLikes = (list) =>{
  return list.reduce((sum, blog)=>{
    return sum + blog.likes;
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
};