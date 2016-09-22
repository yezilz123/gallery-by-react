var lottery={
	index:-1,	//当前转动到哪个位置，起点位置
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	timer2:0,
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:32,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	flag:0,
	init:function(id){
		if ($("#"+id).find(".lottery-unit").length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(".lottery-unit-"+this.index).addClass("active");
		};
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-"+index).removeClass("active");
		index += 1;
		if (index>count-1) {
			index = 0;
		};
		$(lottery).find(".lottery-unit-"+index).addClass("active");
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=index;
		return false;
	}
};
function roll(num){
	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
		clearTimeout(lottery.timer);
		var curindex = lottery.prize;
		// console.log(lottery.prize + 'a');
		lottery.timer2 = setTimeout(function(){
			 prizes('bomb',curindex);
			 lottery.flag = 1;
		},600);
		lottery.prize=-1;
		lottery.times=0;
		click=false;
	}else{
		if (lottery.times<lottery.cycle) {
			// lottery.speed -= 10;
		}else if(lottery.times==lottery.cycle) {
			var index = num;   //随机数
			lottery.prize = index;	
			// console.log(lottery.prize);
		}else{
		
			if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}		
		if (lottery.speed<40) {
			lottery.speed=40;
		};
		
		//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
		lottery.timer = setTimeout(function(){
			roll(num);
		},lottery.speed);
	}
	return false;
}
function prizes(id,prize){
	$("#"+id).show();
	$("#"+id).find(".product_cont").eq(prize).show().siblings().hide();
}