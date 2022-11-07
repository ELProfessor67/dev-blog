import Post from '../models/post';
import successRes from '../utils/successRes';
import cloudinary from 'cloudinary';

// creare posts 
export const addPost = async (req,res) => {
        
        console.log(req.body.image);
        if(!req.body.image){
            return successRes(false,'please give one image',403,res);
        }

        //upload image to cloudnary
        const result = await cloudinary.v2.uploader.upload(req.body.image,{
            folder : "blog post images"
        });

        req.body.image = {
            public_id : result.public_id,
            url : result.secure_url
        }
        
        req.body.author = req.user._id
        const post = await Post.create(req.body);
        
        successRes(true,'Post Create successfully',201,res);
}


// update posts 
export const updatePost = async (req,res) => {
    const id = req.query.postID;

    const post = await Post.findById(id);

    if(!post){
        return successRes(false,'invalid post id',404,res);
    }

    // console.log(req.body.image)
    // only this key are allow to update 
    const allowtoUpdate = new Set(['title','slug','content','shorDiscreption','category','image']);

    //delete empty value
    Object.keys(req.body).forEach((key) => {
        if(req.body[key] === '' || req.body[key] === ' ' || req.body[key] === '  ' || req.body[key] === '   ' || !allowtoUpdate.has(key)){
            delete req.body[key]
        }
    });

    //delete old image and insert new image in cloudnary
    if(req.body.image && req.body.image.toString().includes('data:image/') && req.body.image.toString().includes(';base64,')){
        await cloudinary.v2.uploader.destroy(post.image.public_id);

        const result = await cloudinary.v2.uploader.upload(req.body.image,{
            folder : "blog post images"
        });

        // console.log(result);

        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }else{
        delete req.body.image;
    }
    
    Object.keys(req.body).forEach((key) => {
        post[key] = req.body[key];
    });

    await post.save();

    successRes(true,'post update succesfully',200,res);
}


//delete post
export const deletePost = async (req,res) => {
    const id = req.query.postID;
    const post = await Post.findById(id);

    if(!post){
       return successRes(false,'invalid post id',404,res);
    }

    //delete post image in cloudnary
    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    successRes(true,'post delete successfully',200,res);
}

// get posts 
export const getPost = async (req,res) => {
    const posts = await Post.find().populate('author');

    res.status(200).json({
        success: true,
        posts
    });
}