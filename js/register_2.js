axios.defaults.withCredentials = true;
var globallocal;
var vm = new Vue({
	el:'#subBody',
	data:{
		rightorwrong1:false,
		rightorwrong2:false,
		rightorwrong3:false,
		rightorwrong4:false,
		firstinputval:'',
		secondinputval:'',
		errshow:false,
		errmsg:'',
		ableornot1:true,
		btncolorswitch2:false,
		ableornot2:true,
	},
	created:function(){
		axios.get('http://47.95.6.203:8183/token.json').then(function(res){
		}).catch(function(err){
			console.log(err);
		});
		//获取token
		if ( localStorage['huanxinreg'] ){
			globallocal = JSON.parse( localStorage['huanxinreg'] );
			console.log(globallocal);
		}
	},
	methods:{
		nextstepfinal:function(){
			
			axios.post('http://47.95.6.203:8183/im/user/register.json?loginName='+globallocal.loginName+'&captcha='+globallocal.captcha+'&smscode='+globallocal.smscode+'&nickname='+globallocal.nickname+'&sex='+globallocal.sex+'&passwd='+vm.firstinputval+'&repasswd='+vm.secondinputval).then(function(res){
				console.log(res.data.code);
				var code = res.data.code;
				switch(code){
					case 2000 :
						vm.errshow = true;
						vm.errmsg = '信息保存成功';
						window.location.href="message.html";
						break;
					case 4000 :
						vm.errshow = true;
						vm.errmsg = '用户已存在、用户名或密码为空、用户名不合法';
						return false;
						break;
					case 4008 :
						vm.errshow = true;
						vm.errmsg = '输入密码不一致';
						return false;
						break;
					case 4009 :
						vm.errshow = true;
						vm.errmsg = '账号（手机号）不是合法的手机号';
						return false;
						break;
					case 4010 :
						vm.errshow = true;
						vm.errmsg = '该登录名已存在';
						return false;
						break;
					case 4011 :
						vm.errshow = true;
						vm.errmsg = '该用户不存在或已删除';
						return false;
						break;
					case 4014 :
						vm.errshow = true;
						vm.errmsg = '图片验证码错误';
						return false;
						break;
					case 4015 :
						vm.errshow = true;
						vm.errmsg = '短信验证码错误';
						return false;
						break;
				}
				
			}).catch(function(err){
				console.log(err);
			})
			
			//errshow:false,
			//errmsg:'',
			
		},
		//点击下一步
		checkpsw1:function(){
			var reg1 = /^([a-zA-Z0-9`~!@#$%^&*()_+<>?:"{},.\/;'[\]·]{6,20})$/img;
			var t1 = vm.firstinputval.match(reg1);
			
			if ( t1 == null ){
				//密码非法状态
				vm.rightorwrong2 = true;
				vm.rightorwrong1 = false;
				vm.btncolorswitch2 = false;//不启用
				vm.ableornot2 = true;//不启用
				
				
			} else {
				//密码合法状态
				vm.rightorwrong1 = true;
				vm.rightorwrong2 = false;
				
				if ( vm.firstinputval == vm.secondinputval ) {
					vm.btncolorswitch2 = false;
					vm.ableornot2 = true;
					vm.rightorwrong3 = true;
					vm.rightorwrong4 = false;
					
				}else {
					vm.btncolorswitch2 = false;
					vm.ableornot2 = true;
					vm.rightorwrong3 = false;
					vm.rightorwrong4 = true;
				}
			}
			
		},
		//检查密码
		checkpsw2:function(){
			if ( vm.firstinputval == vm.secondinputval ){
				
				vm.rightorwrong4 = false;
				vm.rightorwrong3 = true;
				vm.btncolorswitch2 = true;//启用
				vm.ableornot2 = false;//启用
				
			}else {
				vm.rightorwrong3 = false;
				vm.rightorwrong4 = true;
				vm.btncolorswitch2 = false;//不启用
				vm.ableornot2 = true;//不启用
				
			}
			
		},
		//检查密码
		clearinput1:function(){
			vm.firstinputval = '';
		},
		clearinput2:function(){
			vm.secondinputval = '';
		},
		
		
		
		
		
		
		
		
		
		
	}
		
});



