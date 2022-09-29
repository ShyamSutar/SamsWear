// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  let pincodes = {
    "721302":["Kharagpur","West Bengal"],
    "422101":["Nashik","Maharashtra"],
    "422103":["Nashik Road","Maharashtra"]
  }

  res.status(200).json(pincodes)
}
