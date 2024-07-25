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

    // console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    // console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

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
    
        let result = "ขออภัย หนูไม่เข้าใจ";
    
        if (bmi < 18.5) {
          result = "คุณผอมไป กินข้าวบ้างนะ";
        } else if (bmi >= 18.5 && bmi <= 22.9) {
          result = "คุณหุ่นดีจุงเบย";
        } else if (bmi >= 23 && bmi <= 24.9) {
          result = "คุณเริ่มจะท้วมแล้วนะ";
        } else if ((bmi >= 25) && (bmi <= 29.9)) {
          result = "คุณอ้วนละ ออกกำลังกายหน่อยนะ";
        } else if (bmi > 30) {
          result = "คุณอ้วนเกินไปละ หาหมอเหอะ";
        }
        const flexMessage = {
          type: "flex",
          altText: "Flex Message",
          contents: {
            type: "bubble",
            header: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "BMI Calculation Result",
                  weight: "bold",
                  size: "lg",
                  align: "center",
                },
              ],
            },
            hero: {
              type: "image",
              url: "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/BMI+levels-1920w.jpg",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "Your BMI Result",
                  weight: "bold",
                  size: "md",
                  margin: "md",
                },
                {
                  type: "text",
                  text: "Height: " + height * 100 + " cm",
                  size: "sm",
                  margin: "sm",
                },
                {
                  type: "text",
                  text: "Weight: " + weight + " kg",
                  size: "sm",
                  margin: "sm",
                },
                {
                  type: "separator",
                  margin: "lg",
                },
                {
                  type: "text",
                  text: "BMI: " + bmi,
                  weight: "bold",
                  size: "xl",
                  align: "center",
                  margin: "lg",
                  color: "#00b900",
                },
                {
                  type: "text",
                  text: result,
                  align: "center",
                  size: "sm",
                  margin: "md",
                },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "button",
                  action: {
                    type: "uri",
                    label: "รายละเอียดเพิ่มเติม",
                    uri: "https://samitivejchinatown.com/th/article/health/BMI-calculator",
                  },
                  style: "primary",
                  color: "#1DB446",
                },
              ],
            },
          },
        };
    
        let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
        // if(!payload){
            agent.add(payload);
        // }else{
            // agent.add("not output")
        // }
    }

    const calRectangle = (agent) => {
        let width = agent.parameters.width;
        let lengths = agent.parameters.lengths;
        let result = width * lengths;

        let flexMessage = 
        {
            type: "flex",
            altText: "Flex Message",
            contents: {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://bucket.ex10.tech/images/83f95d06-4ab0-11ef-891c-0242ac120003/originalContentUrl.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://www.debsirinsp.ac.th/debsirinsp/doc/Cature1%20Flow%20Chart/excample.pdf"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": `${result} cm.`,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": [
                    {
                      "type": "text",
                      "text": `กว้าง ${width} ซม. x ยาว ${lengths} ซม. = ${result} ซม.`,
                      "size": "sm",
                      "color": "#999999",
                      "margin": "md"
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
                    "label": "description",
                    "uri": "http://www.debsirinsp.ac.th/debsirinsp/doc/Cature1%20Flow%20Chart/excample.pdf"
                  }
                }
              ]
            }
          }
        };

        let payload = new Payload("LINE", flexMessage, { sendAsMessage : true});
        agent.add(payload);
        

        // if(result != null){
        //     agent.add(`กว้าง ${width} ซม. x สูง ${lengths} ซม. = ${result} ซม.`);
        // }else{
        //     agent.add("Oh shit!, sorry");
        // }
    }

    const calCircle = (agent) => {
        let r = agent.parameters.r;
        let pi = Math.PI;
        let result = pi * Math.pow(r, 2);

        let flexMessage = 
        {
            type: "flex",
            altText: "Flex Message",
            contents: {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://bucket.ex10.tech/images/829065fd-4ab1-11ef-891c-0242ac120003/originalContentUrl.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://www.debsirinsp.ac.th/debsirinsp/doc/Cature1%20Flow%20Chart/excample.pdf"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": `${result.toFixed(2)} cm.`,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": [
                    {
                      "type": "text",
                      "text": `Pi ${pi.toFixed(2)} x r ${r} x ${r} = ${result.toFixed(2)} cm`,
                      "size": "sm",
                      "color": "#999999",
                      "margin": "md"
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
                    "label": "description",
                    "uri": "http://www.debsirinsp.ac.th/debsirinsp/doc/Cature1%20Flow%20Chart/excample.pdf"
                  }
                }
              ]
            }
          }
        };

        let payload = new Payload("LINE", flexMessage, { sendAsMessage : true});
        agent.add(payload);

        // agent.add(`พื้นที่วงกลมเท่ากับ ${result.toFixed(2)} ซม.`);
    }

    const calTiangle = (agent) => {
        let base = agent.parameters.base;
        let height = agent.parameters.height;
        let result = 0.5 * base * height;

        let flexMessage = 
        {
            type: "flex",
            altText: "Flex Message",
            contents: {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://bucket.ex10.tech/images/909126e3-4ab1-11ef-891c-0242ac120003/originalContentUrl.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://www.debsirinsp.ac.th/debsirinsp/doc/Cature1%20Flow%20Chart/excample.pdf"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": `${result.toFixed(2)} cm.`,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": [
                    {
                      "type": "text",
                      "text": `0.5 x ฐาน ${base} ซม. x  สูง ${height} ซม. = ${result.toFixed(2)} ซม.`,
                      "size": "sm",
                      "color": "#999999",
                      "margin": "md"
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
                    "label": "description",
                    "uri": "http://www.debsirinsp.ac.th/debsirinsp/doc/Cature1%20Flow%20Chart/excample.pdf"
                  }
                }
              ]
            }
          }
        };

        let payload = new Payload("LINE", flexMessage, { sendAsMessage : true});
        agent.add(payload);

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
