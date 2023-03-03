import styles from './index.module.scss'
import React, { useEffect, useState } from 'react'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import { Box, TextField, Button, Stack, LinearProgress, Typography, ImageList, ImageListItem, Checkbox } from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import Dropzone from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ReactCrop from 'react-image-crop'
const platformList = [
  {
    name: 'Twitter',
    icon: twitterIcon,
    url: ''
  }
]

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

const BannerComp = () => {
  return (
    <div className={styles.left}>
      <div className={styles.swiper}>
        <img src={dogeAvatar} alt='' />
      </div>
    </div>
  )
}
const ImageCardBox = ({ formik }) => {
  return (
    <ImageList sx={{ width: 600, height: 600 }} cols={2} rowHeight={290}>
      {[1, 2, 3, 4].map((item) => (
        <ImageListItem
          key={item}
          sx={{
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => {
            formik.setFieldValue('checked', item)
          }}
        >
          <img
            src={dogeAvatar}
            alt={item}
            loading="lazy"
          />
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0
            }}
          >
            <Checkbox
              checked={formik.values?.checked === item}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 40 }
              }}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

const ImageSelectComp = ({ formik }) => {
  return (
    <>
      <Typography variant="body2" sx={{ my: 2, fontSize: '16px' }}>
        Results:
      </Typography>
      <ImageCardBox formik={formik} />
      <div className={styles.tapYourFavorite}>
        Tap your favorite image and mint.
      </div>
    </>
  )
}

const UploadImageComp = () => {
  const [progress, setProgress] = useState(50);
  const [file, setFile] = useState(null);

  const onFileInput = (fs) => {
    if (!fs.length) {
      return;
    }
    const file = fs?.[0];
    setFile(file)
    setProgress(0)
  };
  return (
    <>
      <div className={styles.step2}>
        2. Upload image (Optional)
      </div>
      <div className={styles.step1Desc}>
        Works best with photos which consist only one face. <br />
        Your input image won’t be saved anywhere.
      </div>
      {file ? <CropComp file={file} /> :
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Dropzone onDrop={onFileInput}>
            {
              ({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  sx={{ width: '100%' }}
                >
                  <input {...getInputProps()} />
                  <Box
                    sx={{
                      width: '100%',
                      background: '#1F1F2C',
                      /* Drop Shadow Item */
                      boxShadow: ' 0px 3px 16px rgba(47, 83, 109, 0.12)',
                      borderRadius: '20px',
                      height: 260,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      my: 2,
                    }}
                  >
                    <BackupIcon sx={{
                      color: '#fff',
                      width: '50px',
                      height: '50px'
                    }} />
                    <Typography
                      variant="body2"
                      sx={{
                        width: '100%',
                        paddingBottom: '100%',
                        padding: '1px',
                        color: ' #5142FC',
                        mt: '10px',
                        textAlign: 'center',
                        fontFamily: 'Montserrat Bold',
                        fontWeight: 700,
                        fontSize: '16px'
                      }}
                    >
                      Drag an image here or tap to upload
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        width: '100%',
                        paddingBottom: '100%',
                        padding: '20px',
                        color: '#8A8AA0',
                        textAlign: 'center',
                        fontFamily: 'Montserrat',
                        fontWeight: 400,
                        fontSize: '15px'
                      }}
                    >
                      File requirement: JPG or PNG, smaller than 5MB
                    </Typography>
                  </Box>
                </Box>
              )
            }
          </Dropzone>
          <LinearProgress
            color="inherit"
            sx={{
              marginTop: '10px',
              width: '300px',
              display: progress > 0 ? 'block' : 'none',
            }}
            variant="determinate"
            value={progress}
          />
        </Stack>
      }
      <Button
        className={styles.mintNowForFree}
        sx={{
          mt: 2,
        }}
        startIcon={<Box
          component='img'
          className={styles.icon}
          src={cartIcon}
          alt=''
          sx={{
            width: 20,
            height: 20,
          }}
        />}
      >
        <span>Generate (10 points remaining)</span>
      </Button>
    </>
  )
}

const TextInputComp = ({ formik }) => {
  return (
    <>
      <div className={styles.step1}>
        1. Describe your art
      </div>
      <div className={styles.step1Desc}>
        Describe your desired image with English. <br />
        Examples: <br />
        a person as apex legends character, digital illustration portrait design, by android jones <br /> and greg rutkowski, retrowave color scheme, detailed, cinematic lighting, wide angle <br /> action dynamic portrait
      </div>
      <TextField
        name='text'
        error={Boolean(formik.touched.text && formik.errors.text)}
        helperText={Boolean(formik.touched.text) && formik.errors.text}
        fullWidth
        value={formik.values.text}
        onChange={(e) => {
          formik.setFieldValue('text', e.target.value);
        }}
        type='text'
        placeholder="e.g. A master piece of a person in cyberpunk style."
        sx={{
          my: 2
        }}
      />
    </>
  )
}

const InfoComp = () => {
  return (
    <>
      <div className={styles.title}>Suicasso AIGC Pilot Collection</div>
      <div className={styles.box1}>
        <img className={styles.userInfoIcon} src={userInfoIcon} alt='' />
        <div className={styles.platformBox}>
          {platformList.map((item, index) => {
            return (
              <div className={styles.platformItem} key={index}>
                <img className={styles.platformIcon} src={item.icon} alt='' />
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.desc}>
        Suicasso is the first AIGC NFT on SUI. There are 5000 NFTs in total. <br /> <br />

        Currently, It is live on the SUI  devnet but all participants will receive the same NFT when the SUI mainnet launches.<br /> <br />
        <div className={styles.descWeight}>
          The first 1000 of Suicasso will be sent to Maxi supporters for free.  <br />
          Simply:<br />
          1. Follow @maxi_sui on twitter<br />
          2. Retweet this tweet<br />
          3. Comment your wallet adress on the tweet<br />
          4. Wait for our moderators to add you to the whitelist(Should take a few minutes)<br /><br />
        </div>
        Then you can generate the art and mint it below.<br />
      </div>
    </>
  )
}

const AIGCMintContainer = ({ formik }) => {
  return (
    <>
      <div className={styles.firstContent}>
        <BannerComp />
        <div className={styles.right}>
          <InfoComp />
          <TextInputComp formik={formik} />
          <UploadImageComp />
          <ImageSelectComp formik={formik} />
          <Button
            className={styles.mintNowForFree}
            onClick={() => {
              formik.submitForm()
            }}
          >
            Mint now for free
          </Button>
        </div>
      </div>
    </>
  )
}

export default AIGCMintContainer
