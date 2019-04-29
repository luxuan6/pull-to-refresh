require.config({
	paths: {
		"mui": "buli/mui.min"
	}
})
require(['mui'], function(mui) {
	var page = 0;
	var pageSize = 3;

mui.init({
			pullRefresh: {
				container: '.mui-scroll',

				up: {
					callback: reader
				}
			}
		});
	function init() {
		tab();
		reader();
		
	}

	function tab() {
		mui('.tab').on('tap', 'a', function() {
			var tab = document.querySelectorAll('.tab a');
			for (let i = 0; i < tab.length; i++) {
				tab[i].classList.remove('mui-active')
			}
			this.classList.add('mui-active');
			document.querySelector('.list').innerHTML ='';
			let tap1 =this.innerHTML;
			page=0;
			reader(tap1)
			
		})
	}

	function reader(tap1) {
		page++;
		
		mui.ajax('/api/find', {
			data: {
				page: page,
				pagesize: pageSize,
				style:tap1||document.querySelector('.tab .mui-active').innerHTML
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				
				if(data.data.length===0){
					mui('.mui-scroll').pullRefresh().endPullupToRefresh(true);
				}else{
					mui('.mui-scroll').pullRefresh().endPullupToRefresh(false);
					  mui(".mui-scroll").pullRefresh().refresh(true);
					var str = '';
						data.data.forEach(item => {
							str +=
								`<div class="list-li">
									<dl>
										<dt class="img"><img src="${item.img}" alt=""></dt>
										<dd>${item.name}</dd>
										<dd class="content">${item.default}</dd>
									</dl>
								</div>`
						})
						document.querySelector('.list').innerHTML += str;
					
					}
				},
					error: function(xhr, type, errorThrown) {
					
			}
		});
	}
	init()
})
