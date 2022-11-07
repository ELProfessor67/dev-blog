import mongoose from 'mongoose';
import admin from './admin';

const post = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: admin, required: true},
    image: {
        public_id: {type: String, required: true},
        url: {type: String, required: true}
    },
    content: {type: String, required: true},
    shorDiscreption: {type: String, required: true},
    category: {type: String, required: true, enum: ['cyber security', 'web development', 'programming', 'news']},
    
},{timestamps: true});

mongoose.models = {};

export default  mongoose.model('post',post);