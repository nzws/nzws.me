import removeMD from 'remove-markdown';

const nRegex = /\n/gi;
const generateSummary = (text: string): string =>
  removeMD(text).replace(nRegex, ' ').substring(0, 120) + '...';

export default generateSummary;
