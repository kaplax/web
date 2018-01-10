function add(a, b, cb) {
    return cb(a + b);
}
function show(str) {
    console.log(str);
}


function test() {
    let a = 'a';
    if (num < 5) {
        a = 'aa';
    } else if (num == 5) {
        a = 'bb';
    } else {
        add(5, 4, (sum) => {
            return show(sum);
        })
    }
}
