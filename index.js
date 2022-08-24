
// The Modules

const express = require('express')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const app = express();
const PORT = 3002

const resizeThePic = (filename, width, height) => {
    sharp(`./assets/full/${filename}`)
        .resize({
            width: parseInt(width),
            height: parseInt(height),
            fit: 'cover',
            position: 'center'
        })
        .toFile(`./assets/thumbs/${filename.split('.')[0]}-modified.jpg`)
        .then(() => console.log('Donee.....'))

}


app.get('/api/images/:filename&:width&:height', (req , res) => {
    const {filename , width , height} = req.params
    
    if (!filename | !width | !height) return 

    const filename_ = filename.split('=')[1]
    const width_ = parseInt(width.split('=')[1])
    const height_ = parseInt(height.split('=')[1])

    console.log(`${filename_}`);

    const thumbPath = `${path.resolve('./')}/assets/thumbs/`

    // Check if the Output Folder is Exist
    if (fs.existsSync(`${path.resolve('./')}/assets/full/${filename_}`)) 
    {
        if (fs.existsSync(thumbPath)) {

            // Check if there is any resized pic of that pic before
            if (fs.existsSync(thumbPath + `${filename_}-modified.jpg`)) {
                // Return the Pic
                res.sendFile(path.resolve('./') +`/assets/thumbs/${filename_.split('.')[0]}-modified.jpg`)
            }
            else {
                setTimeout(()=> {
                    resizeThePic(filename_, width_, height_)
                },0)
                setTimeout(()=> {
                    res.sendFile(path.resolve('./') +`/assets/thumbs/${filename_.split('.')[0]}-modified.jpg`)
                },100)
            }
        } else {
            fs.mkdirSync(thumbPath)
        }
    
    
    }
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}
);

