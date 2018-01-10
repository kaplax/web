import $ from 'jquery';
class Interface {
    /**
     * [getOmit 获取遗漏数据]
     * @param {string} issue [当前期号] 
     */
    getOmit(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/getOmit',
                data: {
                    issue
                },
                dataType: 'json',
                success: function (res) {
                    self.setOmit(res.data);
                    resolve.call(self, res);
                },
                error: function (err) {
                    reject.call(err);
                }
            })
        })
    }
    /**
     * 
     * @param {string} issue 
     */
    getOpenCode(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'/getOpenCode',
                data:{
                    issue
                },
                dataType:'json',
                success:function(res){
                    self.getOpenCode(res.data);
                    resolve.call(self,res)
                },
                error:function(err){
                    reject.call(err);
                }
            });
        });
    }
}