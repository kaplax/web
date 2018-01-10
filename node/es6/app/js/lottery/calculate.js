class Calculate {
    /**
     * [计算注数]
     * @param {number} active 
     * @param {string} play_name 
     */
    computeCount(active, play_name) {
        let count = 0;
        const exist = this.play_list.has(play_name);
        const arr = new Array(active).fill('0');
        if (exist && play_name.at(0) === 'r') {
            count = Calculate.combine(arr, play_name.split('')[1]);
        }
        return count;
    }
    /**
     * [组合运算]
     * @param {array} arr 
     * @param {number} size 
     */
    static combine(arr,size){

    }
}