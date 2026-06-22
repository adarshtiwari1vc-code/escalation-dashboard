export const parseExcelData = (fileContent) => {
  try {
    const lines = fileContent.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const emailIndex = headers.indexOf('email');
    const daysIndex = headers.indexOf('days') !== -1 ? headers.indexOf('days') : headers.indexOf('time bucket');
    const countIndex = headers.indexOf('count');

    if (emailIndex === -1 || daysIndex === -1 || countIndex === -1) {
      throw new Error('Missing required columns: email, days/time bucket, count');
    }

    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      return {
        email: values[emailIndex],
        days: values[daysIndex],
        count: parseInt(values[countIndex]) || 0
      };
    }).filter(item => item.email && item.days && item.count > 0);

    return data;
  } catch (error) {
    console.error('Error parsing data:', error);
    throw error;
  }
};
