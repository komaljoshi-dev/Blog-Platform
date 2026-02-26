import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true,
      minlength: 3 
      },
  
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /.+\@.+\..+/ 
      },
  
    password: { 
      type: String, 
      required: true, 
      minlength: 6 
      }
  
    }, { timestamps: true 
        //provides createdAt and updatedAt time
    });
  
  const User = mongoose.model('User', userSchema);
  export default User;
  