import styles from './index.module.scss'
import React, {useState, useEffect} from 'react'
import userInfoIcon from '../../assets/img/page/aigc/InfoUser.png'
import weijiazai from '../../assets/img/page/home/weijiazai.png'
import image8 from '../../assets/img/page/aigc/image8.png'
import image9 from '../../assets/img/page/aigc/image9.png'
import image10 from '../../assets/img/page/aigc/image10.png'
import image11 from '../../assets/img/page/aigc/image11.png'
import {Box, TextField, Button, Typography, ImageList, ImageListItem, Checkbox} from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import UploadImageComp from 'src/components/AIGC/UploadImageComp'
import vector from '../../assets/img/page/aigc/Vector.png'
import {genaigc} from "../../service/aigcMint";

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
        <img className={styles.image8} src={image8} alt=''/>
        <img className={styles.image9} src={image9} alt=''/>
        <img className={styles.image10} src={image10} alt=''/>
        <img className={styles.image11} src={image11} alt=''/>
      </div>
    </div>
  )
}

const ImageCardBox = ({formik,aiImgList}) => {
  console.log(aiImgList)
  return (
    <ImageList sx={{width: 600, height: 600}} cols={2} rowHeight={290}>
      {aiImgList.map((item) => (
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
          <div className={styles.aiBox}>
            <img className={styles.weijiazai}
                 src={item}
                 alt={item}
                 loading="lazy"
            />
          </div>
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
                '& .MuiSvgIcon-root': {fontSize: 40}
              }}
              icon={<RadioButtonUncheckedIcon/>}
              checkedIcon={<RadioButtonCheckedIcon/>}
            />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

const ImageSelectComp = ({formik,aiImgList}) => {
  return (
    <>
      <Typography variant="body2" sx={{my: 2, fontSize: '16px'}}>
        Results:
      </Typography>
      <ImageCardBox formik={formik} aiImgList={aiImgList}/>
      <div className={styles.tapYourFavorite}>
        Tap your favorite image and mint.
      </div>
    </>
  )
}


const TextInputComp = ({formik}) => {
  return (
    <>
      <div className={styles.step1}>
        1. Describe your art
      </div>
      <div className={styles.step1Desc}>
        Describe your desired image with English. <br/>
        Examples: <br/>
        a person as apex legends character, digital illustration portrait design, by android jones <br/> and greg rutkowski, retrowave color scheme, detailed, cinematic lighting, wide angle <br/> action dynamic portrait
      </div>
      <TextField
        className='text-area'
        name='text'
        error={Boolean(formik.touched.text && formik.errors.text)}
        helperText={Boolean(formik.touched.text) && formik.errors.text}
        fullWidth
        multiline
        // rows={4}
        value={formik.values.text}
        onChange={(e) => {
          formik.setFieldValue('text', e.target.value);
        }}
        type='text'
        placeholder="e.g. A master piece of a person in cyberpunk style."
        sx={{
          '.MuiInputBase-root': {
            color: '#C4C4C4 !important',
            border: '1px solid #C4C4C4'
          },
          my: 2,
          textarea: {
            border: 'none',
            lineHeight: '26px',
            fontSize: '16px'
          }
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
        <img className={styles.userInfoIcon} src={userInfoIcon} alt=''/>
        <div className={styles.platformBox}>
          {platformList.map((item, index) => {
            return (
              <div className={styles.platformItem} key={index}>
                <img className={styles.platformIcon} src={item.icon} alt='' onClick={() => {
                  window.open("https://twitter.com/Maxi_sui");
                }}/>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.desc}>
        Suicasso is the first AIGC NFT on SUI.<br/> <br/>

        Currently, It is live on the SUI devnet but all participants will receive the same NFT when the SUI mainnet launches.<br/> <br/>
        <div className={styles.descWeight}>
          The first 1000 of Suicasso will be sent to Maxi supporters for free. <br/>
          Simply:<br/>
          1. Follow @maxi_sui on twitter<br/>
          2. Retweet this tweet<br/>
          3. Comment your wallet address on the tweet<br/>
          4. Wait for our moderators to add you to the whitelist(Should take a few minutes)<br/><br/>
        </div>
        Then you can generate the art and mint it below.<br/>
      </div>
    </>
  )
}

const AIGCMintContainer = ({formik}) => {

  const [aiImgList, setAiImgList] = useState([]);

  const RequestAI = async () => {
    let aiList=[]
    const result =await genaigc(formik.values.text)
    result.forEach((ele,index)=> {
      aiList.push("data:image/png;base64,"+ele.base64)
    })
    setAiImgList(aiList)
  }

  return (
    <>
      <div className={styles.firstContent}>
        <BannerComp/>
        <div className={styles.right}>
          <InfoComp/>
          <TextInputComp formik={formik}/>
          <UploadImageComp/>
          <Button
            onClick={RequestAI}
            className={styles.mintNowForFree}
            sx={{
              mt: 2,
            }}
            startIcon={<Box
              component='img'
              className={styles.icon}
              src={vector}
              alt=''
              sx={{
                width: 20,
                height: 20,
              }}
            />}
          >
            <span>Generate (10 points remaining)</span>
          </Button>
          <ImageSelectComp formik={formik} aiImgList={aiImgList}/>
          <Button
            className={styles.mintNowForFree}
            onClick={async () => {
              const aiImgList = await genaigc()
              // console.log(aiImgList)
              // formik.submitForm()
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
