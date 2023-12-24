const extractLeadingNumbers = (str) => {
  const match = str.match(/^\d+/);
  return match ? match[0] : null;
}

module.exports = { extractLeadingNumbers }