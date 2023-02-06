'use strict' 

console.clear()

const configFile = './config.json'
const regEx = '(?<=\/file\/)(.*)(?=\/)'

const YELLOW = '\x1B[0;33m';
const WHITE = '\x1B[0;37m';
const RED = '\x1b[1;31m';
const GREEN = '\x1b[1;32m';

const prompt = require('prompt-sync')();
var fs = require('fs');

let accessToken = '';
let fimgaFileId = '';
let fileFormat = '';

try {
  if (!fs.existsSync(configFile)) {
    
    while (accessToken == ''){
    console.log(YELLOW + 'In order to export the frames of your desired Figma file, this tool needs an access code. You can obtain it by accessing your profile in Figma and the hit the "Settings" tab. Scroll down and create a new access token.\n\nGive it a name and copy and paste the access code down below. The access code is stored locally inside the config.json file.' + RED + '\n\n❗️ This access code is the key to your account and designs in Figma. Don\'t share it with anybody and keep it safe.\n\n' + WHITE)

      const FigmaAccessToken = prompt('Figma access token: ');

      accessToken = FigmaAccessToken;

      let myOptions = {
        figma_access_token: accessToken,
      };

      var data = JSON.stringify(myOptions);     
    }
    fs.writeFile('./config.json', data, function (err) {
      if (err) {
        console.log('There has been an error saving your configuration data.');
        console.log(err.message);
        return;
      }
    });
    console.log(GREEN + '\n\n✅ Access token successfully saved.\n\n' + WHITE)
  } else {

    let data = fs.readFileSync('./config.json'),
      dataObj;

    try {
      dataObj = JSON.parse(data);
      accessToken = dataObj.figma_access_token;
      console.log(GREEN + '✅ Access token successfully loaded.\n\n' + WHITE);

    } catch (err) {
      console.log('There has been an error parsing your JSON.')
      console.log(err);
    }

  }
} catch (err) {
  console.error(err)
}

if (accessToken !== ''){

  while (!checkMatch){
    const figmaFileURL = prompt('Figma File URL: ');

    var checkMatch = figmaFileURL.match(regEx);
    
    if (checkMatch){
      fimgaFileId = checkMatch[1];
    } else {
      console.log(RED + "⛔️ This is not a valid Figma link. Try again.\n\n" + WHITE);
    }
  }
  } else {
  console.log(YELLOW + "There is no access token stored. Remove the config.json file and run this script again." + WHITE);
}

if (accessToken !== '' && fimgaFileId !== ''){

  while (fileFormat !== 'png' && fileFormat !== 'svg' && fileFormat !== 'pdf'){
    const promtFileFormat = prompt('Export File Format (png, svg, pdf): ');
    fileFormat = promtFileFormat;
  }
}


const Extractor = require('figma-extractor')

let options = {
  format: fileFormat,
  svg_include_id: true,
  append_frame_id: true,
  append_page_name: true,
  use_pages_as_folders: true,
  dont_overwrite: false,
  get_comments: false
}

let destination = './export/' + fimgaFileId + '/'

if (accessToken !== '' && fimgaFileId !== ''){

  console.log('\nExport has been started. This may take a long time, if you have a lot of frames...');
  let extractor = new Extractor(accessToken, fimgaFileId, options)

  extractor.extract(destination).then((files) => {
    console.log(GREEN + '\n\n✅ All frames successfully exported. You can find them in the export folder.' + WHITE + '\n\n')
  }).catch((e) => {
    console.error(e)
  })

} else {
  console.log("You didn't provide the necessary input.")
}
