const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the login page (replace with the actual login page URL)
  await page.goto('https://www.example.com/login', { waitUntil: 'networkidle2' });

  // Log in (replace selectors with the actual ones)
  await page.type('#email', process.env.EMAIL);
  await page.type('#password', process.env.PASSWORD);
  await page.click('#login-button');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Navigate to the appointment booking page (replace with the actual booking page URL)
  await page.goto('https://www.example.com/appointments', { waitUntil: 'networkidle2' });

  // Select the desired date and time (replace selectors with the actual ones)
  // This step may vary depending on the website's structure and functionality
  await page.click('#date-picker');
  await page.waitForSelector('#available-dates');
  const availableDates = await page.$$('#available-dates .date');
  await availableDates[0].click(); // Select the first available date

  await page.click('#time-picker');
  await page.waitForSelector('#available-times');
  const availableTimes = await page.$$('#available-times .time');
  await availableTimes[0].click(); // Select the first available time

  // Confirm the appointment (replace selectors with the actual ones)
  await page.click('#confirm-button');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // The appointment has been booked. You can scrape the appointment details or take a screenshot as proof.

  // Scrape appointment details (replace selectors with the actual ones)
  const appointmentDate = await page.$eval('#appointment-date', el => el.textContent);
  const appointmentTime = await page.$eval('#appointment-time', el => el.textContent);
  console.log(`Appointment booked on ${appointmentDate} at ${appointmentTime}`);

  // Take a screenshot of the confirmation page
  await page.screenshot({ path: 'confirmation.png' });

  // Close the browser
  await browser.close();
})();