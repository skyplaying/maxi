import styles from './index.module.scss'
import React from 'react'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import { Box, TextField, Button } from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'

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
  return (
    <>
      <div className={styles.step2}>
        2. Upload image (Optional)
      </div>
      <div className={styles.step1Desc}>
        Works best with photos which consist only one face. <br />
        Your input image won’t be saved anywhere.
      </div>

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
