require('dotenv').config({ path: "./.env" })
var axios = require('axios').default;
var qs = require('querystring');
var deasync = require('deasync');
var roundTo = require('round-to');



let mov_order = 1;

let success = false;

let data = qs.stringify({
    mem_no: process.env.CDEC_MEM_NO.trim(),
    mov_order: mov_order,
    currentTime: roundTo(Math.random()*10+900, 6),
    volume: 1,
    muted: false
})
let done = false;
axios.post('https://www.cdec.kr/education/player/ajax', data, {
    headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Content-Length': data.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': process.env.CDEC_COOKIE.trim(),
        'Host': 'www.cdec.kr',
        'Origin': 'https://www.cdec.kr',
        'Referer': 'https://www.cdec.kr/education/player/basic',
        'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
}).then((res) => {
    success = true;
    done = true;
}).catch((err) => {
    success = false;
    done = true;
})
deasync.loopWhile(() => !done);

if (success) {
    console.log(`${mov_order} 수강 완료`);
    done = false;
    setTimeout(() => {
        done = true;
    }, 1000);
    deasync.loopWhile(() => !done);
} else {
    console.log(`${mov_order} 수강 실패`);
}

process.exit();