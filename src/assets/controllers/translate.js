var md5 = require('js-md5')
var axios = require('axios')

function getrdmnum(){
    var rdm = ''; var rdms = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; var rdmcnt = 10;
    while(rdmcnt -- != 0) rdm += rdms[Math.floor(Math.random() * 9)];
    return rdm;
}

var aftermsg = "";
function createStr(Data){
    var data = Object.values(Data.data.trans_result);
    aftermsg = ''
    for(var i = 0; i < data.length; i++)
        aftermsg += eval("'" + data[i]['dst'] + "'") + '\n';
    //console.log(aftermsg);
}
async function getData(url){
    await axios.get(url).then(createStr)//.catch(function (err){ console.log(err);})
    return aftermsg;
}


function translate(rawmsg, rawlanguage, aftlaguage){
    /*http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4*/
    var url = "http://api.fanyi.baidu.com/api/trans/vip/translate?q=" + encodeURIComponent(rawmsg);
    var rdm = getrdmnum();
    var FieldName = ['from','to','appid','salt','sign'];
    var FieldMsg = [rawlanguage, aftlaguage, '20201104000608144', rdm, md5('20201104000608144'+rawmsg+rdm+'VQos_5JDFl5W0cu5YKVR')]
    for(var i = 0; i < 5; i++) url += '&' + FieldName[i] + "=" + FieldMsg[i];
    
    var aftmsg = getData(url);
    console.log(typeof(aftmsg), aftmsg);
    return aftmsg;
}

exports.translate = translate