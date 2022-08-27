// The Modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import { resizeThePic } from '../../../_utils/resizing';

const images = express.Router();

images.get('/', async (req, res) => {
    try {
        const { filename, width, height } = req.query;
        if (filename == '') {
            res.send('Filename Should Be included');
        }

        const thumbPath = `${path.resolve('./')}/assets/thumbs/`;

        // Check if the Output Folder is Exist
        if (fs.existsSync(`${path.resolve('./')}/assets/full/${filename}`)) {
            if (fs.existsSync(thumbPath)) {
                // Check if there is any resized pic of that pic before
                if (
                    fs.existsSync(
                        thumbPath + `${filename}-${width}_${height}.jpg`
                    )
                ) {
                    // Return the Pic
                    res.sendFile(
                        path.resolve('./') +
                            `/assets/thumbs/${filename}-${width}_${height}.jpg`
                    );
                } else {
                    await resizeThePic(filename as string, width, height);
                    res.sendFile(
                        path.resolve('./') +
                            `/assets/thumbs/${filename}-${width}_${height}.jpg`
                    );
                }
            } else {
                fs.mkdirSync(thumbPath);

                await resizeThePic(filename as string, width, height);
                res.sendFile(
                    path.resolve('./') +
                        `/assets/thumbs/${filename}-${width}_${height}.jpg`
                );
            }
        } else {
            // If the Photo doesn't exist
            res.sendStatus(400);
        }
    } catch (error) {
        res.sendStatus(400);
    }
});

export default images;
