import styles from './index.module.scss'
import React from 'react'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import { Box, TextField, Button, Typography, ImageList, ImageListItem, Checkbox } from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import UploadImageComp from 'src/components/AIGC/UploadImageComp'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'

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
