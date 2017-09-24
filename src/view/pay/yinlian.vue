<template>
    <div v-html="data"></div>
</template>

<script>

export default{
    data(){
        return{ 
            payment:'',
        }
    },
    created(){
        this.payment = sessionStorage.getItem('payment');//提取暂存的数据
        // console.log('payment========',sessionStorage.getItem('payment'));
        let form = document.createElement('form'); //创建表单
        form.id = 'pay_form';                      //给表单设置id
        form.action = 'https://101.231.204.80:5000/gateway/api/frontTransReq.do';   //跳转银联支付网站
        form.method='post';                         //获取方法
        //提取标签<body></body>
        let formstr = this.payment.substring(this.payment.lastIndexOf('<body>')+6,this.payment.lastIndexOf('</body>'));
        //提取标签<form></form>
        let innerForm = formstr.substring(formstr.indexOf('>') + 1,formstr.lastIndexOf('</form>'));
        form.innerHTML = innerForm;                 //把提取的form表单填充到创建的form表单中
        document.querySelector('body').appendChild(form);  //在添加到body中
        form.submit();          //提交表单
    },
    methods:{
        
    }

};
</script>

<style>

</style>
