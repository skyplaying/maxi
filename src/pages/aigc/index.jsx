import React, { memo, useEffect, useState } from 'react'
import styles from './index.module.scss'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import { getBanner, getNftDetail, getNftList } from 'src/service/home'
import { useNavigate } from 'react-router-dom'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import { mint } from '../../service/aigcMint'

const Home = () => {
  const history = useNavigate()

  const platformList = [
    {
      name: 'Twitter',
      icon: twitterIcon,
      url: ''
    }
  ]

  const initData = async () => {
    const bList = await getBanner()
    const nList = await getNftList({
      pageIndex: 0,
      pageSize: 10,
      status: 'minting'
    })
  }

  useEffect(() => {
    initData()
    // checkEligibility()
  }, [])

  const goAigc = () => {
    history(`/aigc-mint`)
  }

  const FirstContent = () => {
    const [value, setValue] = useState('');//把vaule的值存起来，方便其他地方用;

    const onChange = (value: any) => {
      setValue(value.target.value)
    }

    const queryAI = index => {
      mint()
    }
    return (
      <>
        <div className={styles.firstContent}>
          <div className={styles.left}>
            <div className={styles.swiper}>
              <img src={dogeAvatar} alt='' />
            </div>
          </div>
          <div className={styles.right}>
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
              Suicasso is the first AIGC NFT on SUI. There are 5000 NFTs in total. <br/> <br/>

              Currently, It is live on the SUI  devnet but all participants will receive the same NFT when the SUI mainnet launches.<br/> <br/>
              <div className={styles.descWeight}>
                The first 1000 of Suicasso will be sent to Maxi supporters for free.  <br/>
                Simply:<br/>
                1. Follow @maxi_sui on twitter<br/>
                2. Retweet this tweet<br/>
                3. Comment your wallet adress on the tweet<br/>
                4. Wait for our moderators to add you to the whitelist(Should take a few minutes)<br/><br/>
              </div>
              Then you can generate the art and mint it below.<br/>
            </div>

            <div className={styles.step1}>
              1. Describe your art
            </div>
            <div className={styles.step1Desc}>
              Describe your desired image with English. <br/>
              Examples: <br/>
              a person as apex legends character, digital illustration portrait design, by android jones <br/> and greg rutkowski, retrowave color scheme, detailed, cinematic lighting, wide angle <br/> action dynamic portrait
            </div>
            <div className={styles.picKeywords}>
              <input onChange={onChange} type='text' placeholder="e.g. A master piece of a person in cyberpunk style."/>
            </div>
            <div className={styles.step2}>
              2. Upload image (Optional)
            </div>
            <div className={styles.step1Desc}>
              Works best with photos which consist only one face. <br/>
              Your input image won’t be saved anywhere.
            </div>

            <div className={styles.viewDetailBtn} onClick={() => queryAI()}>
              <img className={styles.icon} src={cartIcon} alt='' />
              <span>Generate (10 points remaining)</span>
            </div>

            <div className={styles.tapYourFavorite}>
              Tap your favorite image and mint.
            </div>
            <div className={styles.mintNowForFree}>
              <span>Mint now for free</span>
            </div>

          </div>
        </div>
      </>
    )
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {/* <Slider data={heroSliderData} />
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <PopularCollection data={popularCollectionData} />
      <Create /> */}
        <FirstContent />
      </div>
    </div>
  )
}

export default memo(Home)
