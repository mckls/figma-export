# figma-export

This is an cli-UI for [fimga-extractor](https://github.com/javierarce/figma-extractor). It asks for the figma link, the desired export format and also saves your figma access token locally.

## Dependencies

- figma-extractor

Install with:

`npm install figma-extractor`

## How to use it

1. Run the figma-export.js with `node figma-export.js`
2. Input your [access token](https://www.figma.com/developers/api#access-tokens) from Figma
3. Enter your desired Figma file URL
4. Chose your export format (png, svg, pdf)

## Pro Tip

Use [reg-cli](https://github.com/reg-viz/reg-cli) to do visual regression tests with your png exports from Figma.

