Hello,

Steps to run the API:
1. Install cors, express and axios by $ npm install cors express axios --save
2. API to GET news items while TimeStories.js is run in local machine is: localhost:4000/getTimeStories/

Overview of the function getLatestNews():
1. Basic String.split() is used to scrap the page.
2. Class 'homepage-module latest' is identified and h2 tags are extracted from the class.
3. h2 tags are further splitted to collect the title and the link of the news items.

Thankyou.