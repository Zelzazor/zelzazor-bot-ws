const fs = require('fs');


const getData = () => {
    const data = fs.readFileSync("./data.json", "utf-8");
    let { cooldown, timeEnd } = JSON.parse(data);

    if (cooldown) {
        if (timeEnd - Date.now() <= 0) {
            cooldown = false;
            timeEnd = 0;
            fs.writeFile(
                "./data.json",
                JSON.stringify({
                    cooldown: false,
                    timeEnd: 0,
                }, null, 2),
                (err) => {
                    if (err) console.log(err);
                }
            );
            return { cooldown, timeEnd };
        }

        setTimeout(() => {
            cooldown = false;
            timeEnd = 0;
            fs.writeFile(
                "./data.json",
                JSON.stringify({
                    cooldown: false,
                    timeEnd: 0,
                }, null, 2),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }, timeEnd - Date.now());
    }
    return { cooldown, timeEnd };
};

module.exports = { getData };
