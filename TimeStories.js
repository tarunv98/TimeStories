// localhost:4000/getTimeStories/ is the API to get the latest 5 news items from time.com
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 4000;
const routes = express.Router();


app.use(cors()); //to accept and process cross origin requests


var resultData = [];
var newsItem = {
    'title': '',
    'link': '',
}

const URL = 'https://time.com';

app.use('/getTimeStories', routes);

routes.route('/').get(function(req, res) {
    axios(URL)
        .then(response => {
            const html = response.data; //response from page is stored in html
            var lines = html.split("\n"); //splitting the html into lines

            res.json(getLatestNews(lines));//the resultData is parsed to JSON and sent as the response
    })
    .catch(console.error);
        
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

function getLatestNews(lines){
    resultData = [];
    var words = '';
    var temp = '';
    var i = 0;
    var isClassLatest = false;
    var count = 0;
    var url = '';
    var title = '';

    for(var line of lines){
        words = line.split(' '); // splitting line into words

         for(let str of words){
            i++;

            if(str=='class="homepage-module' && words[i]=='latest"'){ //verifying the class of the html; required class is 'homepage-module latest'
                isClassLatest=true; //if the class is found we need to access contents of the class
            }
            if(isClassLatest && str== '<h2'){ //to get h2 tag in the class 'homepage-module latest'
                
                temp = line.split('>');
                title=temp[2].split('<')[0];//collects the text in h2 tag which is the title of the news
                url = URL.concat(temp[1].split('=')[1]);//this breaks href='link', collects the link and concatenates it to the base URL
        
                newsItem = {
                    'title': title,
                    'link': url,
                }

                resultData.push(newsItem);//link and title are pushed to the resultdata
                count++;
            }
            if(count == 5){
                break;
            }
        }
        i=0;
    };
    return resultData;//this is an array of newsItem objects which are 5 latest news items from the time.com website
}

