/* eslint-disable max-len */
export const replaceAt = (string, index, replace) => string.substring(0, index) + replace + string.substring(index + 1);

export const constructLink = (imgLink, name) => {
  let link = 'https://midi.frettabladid.is/tonleikar/';
  let nameTmp = name;

  nameTmp = nameTmp.replace(/ó/g, 'o');
  nameTmp = nameTmp.replace(/í/g, 'i');
  nameTmp = nameTmp.replace(/á/g, 'a');
  nameTmp = nameTmp.replace(/ð/g, 'd');
  nameTmp = nameTmp.replace(/ö/g, 'o');
  nameTmp = nameTmp.replace(/é/g, 'e');
  nameTmp = nameTmp.replace(/ú/g, 'u');
  nameTmp = nameTmp.replace(/ý/g, 'y');
  nameTmp = nameTmp.replace(/æ/g, 'a');
  nameTmp = nameTmp.replace(/þ/g, 't');

  nameTmp = nameTmp.toLowerCase();

  let indexOfDash = nameTmp.indexOf('-');

  if (indexOfDash !== -1) {
    nameTmp = replaceAt(nameTmp, indexOfDash - 1, '');
    indexOfDash = nameTmp.indexOf('-');
    nameTmp = replaceAt(nameTmp, indexOfDash + 1, '');
  }

  const whiteSpacesRemoved = nameTmp.replace(/ /g, '_');
  const prefix = 'https://d30qys758zh01z.cloudfront.net/images/large/';
  const withoutPrefix = imgLink.slice(prefix.length, imgLink.length);
  const dotSplit = withoutPrefix.split('.');
  const constant = dotSplit[0];
  const number = dotSplit[1];
  link = `${link + constant}/${number}/${whiteSpacesRemoved}`;

  return link;
};
