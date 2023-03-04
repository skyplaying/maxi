import axios from "axios";

const BaseUrl = 'https://api.maixtest.shop'
const str = '/api/v1/public'
export const checkEligibility = async () => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/mint/eligibility/check`, {
      chainId: 1111,
      walletAddress: 1111,
      nftCollectionId: 3111,
      nftCollectionAddress: 1111,
    })
    console.log('res', res);
    if (res?.data?.success) {
      return res?.data?.data
    }
    return []
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}
export const mint = async () => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/mint/signature/content`, {
      chain_id: 1111,
      wallet_address: 1111,
      nftCollection_id: 3111,
      nftCollection_address: 1111,
    })
    console.log('res', res);
    if (res?.data?.success) {
      return res?.data?.data
    }
    return []
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}

export const genaigc = async (content) => {
  try {
    const res = await axios.post(`https://api.stability.ai/v1beta/generation/stable-diffusion-512-v2-0/text-to-image`, {
        "text_prompts": [
          {
            "text": content
          }
        ],
        "cfg_scale": 7,
        "clip_guidance_preset": "FAST_BLUE",
        "height": 512,
        "width": 512,
        "samples": 4,
        "steps": 20
      },
      {
        headers: {
          "Authorization": "sk-orcI02jiYxEiIDMNIkZnofc8k9MUToSQJrFco508uVELTciH",
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
    // console.log('res', res?.data?.artifacts);
    return res?.data?.artifacts
    // if (res?.data?.finishReason==="SUCCESS") {
    //   return res?.data?.data
    // }
    // return
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}
