import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
