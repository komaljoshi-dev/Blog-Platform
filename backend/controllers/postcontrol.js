import Post from '../models/post.js';

//create Post
export const createPost =async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const post = await Post.create({
      //req.body has the content whoch we sent and req.user gets the content from header
      //title=req.body.title,description=req.body.description,
      title,
      content,
      user: req.user.userId   
      // ownership comes from token
      //means authenticated individual whose token is there, Post can be created by that user only
    });

    // Populate user info before sending response
    const populatedPost = await Post.findById(post._id).populate('user', 'username');
    res.status(201).json(populatedPost);
  } 
  catch (err) {
    next(err);
  }
};

//get all post no need to be authorized
export const getAllPosts = async (req, res, next) => {
  try {   
    const posts = await Post.find()
        .populate('user','username createdAt')
        .sort({createdAt : -1});

    res.json(posts);
  } 
  catch (err) {
    next(err);
  }
};

//GET SINGLE Post 
export const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username createdAt');
    //here we use params.id to take id in the url and find the post

    if (!post) {
      const err = new Error('Post not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    res.json(post);
  } 
  catch (err) {
    next(err);
  }
};

//UPDATE Post (only if owned)
export const updatePost = async (req, res, next) => {
  try {
  
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id,user: req.user.userId},
      //_id contains the taskid of the task how it is stored in database
      //user has the user's id who created that task
      req.body,
      { new: true }// this to update the req.body
    ).populate( 'user' , 'username');
    //we check for the token we have provided, there would be user id in that(token is created with userid too) means the update happens only when the post id in URL is connected with the user ,
    //otherwise user cant can't access someone else's posts to update

    if (!post) {
      const err = new Error('post not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    res.json(post);
  } 
  catch (err) {
    next(err);
  }
};


// DELETE Post (only if owned)
export const deletePosts = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!post) {
      const err = new Error('Post not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    res.json({ message: 'Post deleted successfully' });
  } 
  catch (err) {
    next(err);
  }
};


// Get user's own posts (for profile page)
export const getUserPosts = async (req, res, next) => {
  try {   

    //checking iof working
    console.log("fetching posts for user:", req.user.userId);

    const posts = await Post.find({ user: req.user.userId })
    .populate('user', 'username')
    .sort({createdAt : -1});

    console.log("found posts?", posts.length);
    
    res.json(posts);
  } 
  catch (err) {
    next(err);
  }
  };

  //to get authenticated users profile
  //GET ALL posts (only logged-in user post) 


//this file contains the logic and we will use these function during routing
