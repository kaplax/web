import { setTimeout } from "timers";

{
    let ajax = function (cb) {
        setTimeout(function () {
            cb && cb()
        }, 1000);

    }
}
{
    let ajax = function () {
        console.log('执行2');
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }
    ajax().then(function(){
        console.log('promise','timeout');
    })
}