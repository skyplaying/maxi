import styles from './index.module.scss'
import React, { useState } from 'react'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import { Box, TextField, Button, Stack, LinearProgress, Typography } from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import Dropzone from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
const platformList = [
  {
    name: 'Twitter',
    icon: twitterIcon,
    url: ''
  }
]

const BannerComp = () => {
  return (
    <div className={styles.left}>
      <div className={styles.swiper}>
        <img src={dogeAvatar} alt='' />
      </div>
    </div>
  )
}

const ImageSelectComp = () => {
  return (
    <div className={styles.tapYourFavorite}>
      Tap your favorite image and mint.
    </div>
  )
}

const UploadImageComp = () => {
  const [progress, setProgress] = useState(50);
  const onFileInput = (fs) => {
    if (!fs.length) {
      return;
    }
    const file = fs?.[0];
    console.log('file', file);
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
                  <BackupIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      width: '100%',
                      paddingBottom: '100%',
                      padding: '20px',
                      color: ' #5142FC',
                      mt: '15px',
                      textAlign: 'center'
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
                      mt: '15px',
                      textAlign: 'center'
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
          <ImageSelectComp />
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
