import ReactCrop from 'react-image-crop'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      window.URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = window.URL.createObjectURL(blob);
      resolve(this.fileUrl);
    }, 'image/jpeg');
  });
}

function CropComp({ file }) {
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 45,
    y: 45,
    width: 510,
    height: 510
  });
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (file) {
      const s = URL.createObjectURL(file);
      setSrc(s)
    }
  }, [file])
  return (
    <Box
      sx={{
        width: 600,
        height: 600,
        border: '1px solid #fff',
        mt: 2,
        '.ReactCrop': {
          height: '100%',
          '.ReactCrop__child-wrapper': {
            height: '100%',
            img: {
              height: '100%'
            }
          }
        }
      }}
    >
      <ReactCrop
        crop={crop}
        onChange={c => {
          setCrop({
            ...c,
            width: 510,
            height: 510
          })
        }}
      >
        <Box
          src={src}
          component='img'
          sx={{
            objectFit: 'cover'
          }}
        />
      </ReactCrop>
    </Box>
  )
}

export default CropComp
