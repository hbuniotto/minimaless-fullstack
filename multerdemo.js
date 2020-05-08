var express = require('express')
var multer  = require('multer')

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.match(/jpe|jpeg|png/)) {
            cb(new Error('File is not supported'), false)
            return
        } cb(null, true)
    }
})

// name="image"
app.post('/user_image', upload.single("image"), async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const blog = new Blog()
    blog.title = req.body.title
    blog.imageUrl = result.secure_url
    await blog.save()

    res.send({ msg: 'blog is created' })
    // res.send(req.file)
})

// npm i cloudinary

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb({ message: 'unsupported file format'}, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024*1024 },
    fileFilter: fileFilter
})


exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: 'auto', 
            folder: folder
        })
    })
}