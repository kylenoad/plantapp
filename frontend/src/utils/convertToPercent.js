export function convertToPercent(value) {
    const fullyWet = 325;   
    const fullyDry = 850;   
  
    const percent = (fullyDry - value) / (fullyDry - fullyWet) * 100;
  
    if (percent > 100) {
      return 100;
    } else if (percent < 0) {
      return 0;
    } else {
      return percent;
    }
  }
  