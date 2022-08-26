import sharp from 'sharp';
import path from 'path';


export const resizeThePic = async (filename: string, width: any, height: any): Promise<void> => {
    console.log(filename, width, height);

    if (filename && width && height) {
        await sharp(`${path.resolve('./')}/assets/full/${filename}`)
        .resize({
            width: parseInt(width),
            height: parseInt(height),
            fit: 'cover',
            position: 'center'
        })
        .toFile(path.resolve('./') + `/assets/thumbs/${filename}-${width}_${height}.jpg`);
        console.log('Donee.....');
    }

}