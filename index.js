const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const port = 4000;

// create server
const app = express();

// middleware
app.use(bodyParser.json());

// call back function anonymust function
app.get("/", (req, res) => {
    res.send("<h1>Welcome this is a webhook for line chatbot.</h1>");
});
app.post("/webhook", (req, res) => {
    // create webhook client
    const agent = new WebhookClient({
        request : req,
        response : res
    });

    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
      }
     
      function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
      }
      
      function bodyMassIndex(agent) {
        let weight = agent.parameters.weight;
        let height = agent.parameters.height / 100;
        let bmi = (weight / (height * height)).toFixed(2);
        let result = 'ขออภัย หนูไม่เข้าใจ';
        
        if (bmi < 18.5){
          result = 'คุณผอมไป กินข้าวบ้างนะ';
        } else if (bmi >= 18.5 && bmi<= 22.9){
          result = 'คุณหุ่นดีจุงเบย';
        } else if (bmi >= 23 && bmi<= 24.9){
          result = 'คุณเริ่มจะท้วมแล้วนะ';
        } else if (bmi >= 25.8& bmi<= 29.9){
          result = 'คุณอ้วนละ ออกกำลังกายหน่อยนะ';
        } else if (bmi > 30){
          result = 'คุณอ้วนเกินไปละ หาหมอเหอะ';
        }

        const flexMessage = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://line.me/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Brown Cafe",
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "margin": "md",
                            "contents": [
                                {
                                    "type": "icon",
                                    "size": "sm",
                                    "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                },
                                {
                                    "type": "icon",
                                    "size": "sm",
                                    "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                },
                                {
                                    "type": "icon",
                                    "size": "sm",
                                    "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                },
                                {
                                    "type": "icon",
                                    "size": "sm",
                                    "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                },
                                {
                                    "type": "icon",
                                    "size": "sm",
                                    "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                },
                                {
                                    "type": "text",
                                    "text": "4.0",
                                    "size": "sm",
                                    "color": "#999999",
                                    "margin": "md"
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": result,
                                            "color": "#aaaaaa",
                                            "size": "sm"
                                        },
                                        {
                                            "type": "text",
                                            "text": "Flex Tower, 7-7-4 Midori-ku, Tokyo",
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm"
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "Time",
                                            "color": "#aaaaaa",
                                            "size": "sm"
                                        },
                                        {
                                            "type": "text",
                                            "text": "10:00 - 23:00",
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "CALL",
                                "uri": "https://line.me/"
                            }
                        },
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "WEBSITE",
                                "uri": "https://line.me/"
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "margin": "sm"
                        }
                    ]
                }
            }
        };

        let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
        agent.add(result);
        // agent.add(payload);
    }

    const calRectangle = (agent) => {
        let width = agent.parameters.width;
        let lengths = agent.parameters.lengths;
        let result = width * lengths;
        // if(width != null && length != null){
        //     agent.add("hello success!");
        // }else{
        //     agent.add("Error!")
        // }
        if(result != null){
            agent.add(`กว้าง ${width} ซม. x สูง ${lengths} ซม. = ${result} ซม.`);
        }else{
            agent.add("Oh shit!, sorry");
        }
    }

    const calCircle = (agent) => {
        let r = agent.parameters.r;
        let pi = Math.PI;
        let result = pi * Math.pow(r, 2);

        agent.add(`พื้นที่วงกลมเท่ากับ ${result.toFixed(2)} ซม.`);
    }

    const calTiangle = (agent) => {
        let base = agent.parameters.base;
        let height = agent.parameters.height;
        let result = 0.5 * base * height;

        agent.add(`พื้นที่สามเหลี่ยมเท่ากับ ${result}`);
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    
    intentMap.set('BMI - custom - yes', bodyMassIndex);

    intentMap.set('area - rectangle - yes', calRectangle);
    intentMap.set('area - circle - q - yes', calCircle);
    intentMap.set('area - tiangle - q - yes', calTiangle);
  
    agent.handleRequest(intentMap);
});

app.listen(port, () => {
    console.log("Server is runing at http://localhost:" + port);
});
