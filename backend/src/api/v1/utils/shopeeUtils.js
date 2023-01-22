/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
var axios = require("axios");
const AppError = require("./AppError");
var sha256 = require("js-sha256").sha256;
require("dotenv").config();

const convert = async (originUrl, no, subIds = null) => {
  try {
    let query = {
      query: `mutation {
        generateShortLink(input: {originUrl: "${originUrl}", subIds: ${
        subIds ? JSON.stringify(subIds) : "[]"
      }}) {
          shortLink
        }
      }
      `,
    };

    let appId = process.env.SHOPEE_APP_ID;
    let secret = process.env.SHOPEE_SECRET;
    let time = Math.round(new Date().getTime() / 1000);
    let signature = appId + time + JSON.stringify(query) + secret;

    const result = await axios.post(
      "https://open-api.affiliate.shopee.co.id/graphql",
      query,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `SHA256 Credential=${appId}, Timestamp=${time}, Signature=${sha256(
            signature
          )}`,
        },
      }
    );

    if ("data" in result.data) {
      return result.data.data.generateShortLink.shortLink;
    } else {
      throw new AppError(
        `${!!no ? "Link invalid urutan ke-" + no : "Link invalid"} `,
        400
      );
    }
  } catch (error) {
    // throw new Error(error.message);
    throw error;
  }
};

module.exports = { convert };
