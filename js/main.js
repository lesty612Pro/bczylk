/*
 * @author: Lesty
 * @code-date: 2015/7/24
 * @introduction: 一个基于单页的web应用 -- 图片管理器
 */
$(function() {
	/**
	 * [imgs 图片存储路径]
	 * @type {Object}
	 */
	var imgs = {
		All: [
			"./imgs/All/Lesty/1.jpg",
			"./imgs/All/Lesty/2.JPG",
			"./imgs/All/Lesty/3.JPG",
			"./imgs/All/Lesty/4.jpg",
			"./imgs/All/Lesty/5.JPG",
			"./imgs/All/Lesty/6.jpg",
			"./imgs/All/Lesty/7.jpg",
			"./imgs/All/Lesty/8.jpg",
			"./imgs/All/Lesty/9.jpg",
			"./imgs/All/Lesty/10.JPG",
			"./imgs/All/Class/C1.jpg",
			"./imgs/All/Class/C2.JPG",
			"./imgs/All/Class/C3.JPG",
			"./imgs/All/Class/C4.jpeg",
			"./imgs/All/Class/C5.jpg",
			"./imgs/All/Class/C6.JPG",
			"./imgs/All/Class/C7.jpg",
			"./imgs/All/Class/C8.JPG",
			"./imgs/All/Class/C9.jpg",
			"./imgs/All/Class/C10.jpg",
			"./imgs/Lesty/11.jpg",
			"./imgs/Lesty/12.jpg",
			"./imgs/Lesty/13.jpg",
			"./imgs/Lesty/14.jpg",
			"./imgs/Lesty/15.jpeg",
			"./imgs/Lesty/16.jpg",
			"./imgs/Lesty/17.jpg",
			"./imgs/Lesty/18.JPG",
			"./imgs/Lesty/19.JPG",
			"./imgs/Lesty/20.JPG",
			"./imgs/Class/C11.jpg",
			"./imgs/Class/C12.jpg",
			"./imgs/Class/C13.jpg",
			"./imgs/Class/C14.JPG",
			"./imgs/Class/C15.JPG",
			"./imgs/Class/C16.jpg",
			"./imgs/Class/C17.JPG",
			"./imgs/Class/C18.JPG",
			"./imgs/Class/C19.jpg",
			"./imgs/Class/C20.jpg"
		],
		Lesty: [
			"./imgs/Lesty/1.jpg",
			"./imgs/Lesty/2.JPG",
			"./imgs/Lesty/3.JPG",
			"./imgs/Lesty/4.jpg",
			"./imgs/Lesty/5.JPG",
			"./imgs/Lesty/6.jpg",
			"./imgs/Lesty/7.jpg",
			"./imgs/Lesty/8.jpg",
			"./imgs/Lesty/9.jpg",
			"./imgs/Lesty/10.JPG",
			"./imgs/Lesty/11.jpg",
			"./imgs/Lesty/12.jpg",
			"./imgs/Lesty/13.jpg",
			"./imgs/Lesty/14.jpg",
			"./imgs/Lesty/15.jpeg",
			"./imgs/Lesty/16.jpg",
			"./imgs/Lesty/17.jpg",
			"./imgs/Lesty/18.JPG",
			"./imgs/Lesty/19.JPG",
			"./imgs/Lesty/20.JPG"
		],
		Class: [
			"./imgs/Class/C1.jpg",
			"./imgs/Class/C2.JPG",
			"./imgs/Class/C3.JPG",
			"./imgs/Class/C4.jpeg",
			"./imgs/Class/C5.jpg",
			"./imgs/Class/C6.JPG",
			"./imgs/Class/C7.jpg",
			"./imgs/Class/C8.JPG",
			"./imgs/Class/C9.jpg",
			"./imgs/Class/C10.jpg",
			"./imgs/Class/C11.jpg",
			"./imgs/Class/C12.jpg",
			"./imgs/Class/C13.jpg",
			"./imgs/Class/C14.JPG",
			"./imgs/Class/C15.JPG",
			"./imgs/Class/C16.jpg",
			"./imgs/Class/C17.JPG",
			"./imgs/Class/C18.JPG",
			"./imgs/Class/C19.jpg",
			"./imgs/Class/C20.jpg"
		]
	};

	/**
	 * [historyTools 历史操控工具，响应前进后退操作]
	 * @type {Object}
	 * @author Lesty
	 * @code-date 2015.7.29
	 */
	var historyTools = (function() {
		var _this = null;
		// 保存当前的location.hash值
		var hash = "";

		/**
		 * [init 初始化函数]
		 * @return {[type]} [description]
		 */
		var init = function() {
			_this = this;
			_this.regEvent();
		};

		/**
		 * [hashChange url的hash发生改变时做出响应]
		 * @param  {String} hash [当前url的location.hash值]
		 * @return {[type]}      [description]
		 */
		var hashChange = function(hash) {
			var section = hash.split("/");
			// 根据hash值做相应操作
			if(section[0].substring(1) == "display") {
				var picType = section[1].substr(0, 1).toUpperCase() + section[1].substring(1);
				displayTools.typeChange(picType);
			} else if(section[0].substring(1) == "manage") {
			}
		};

		/**
		 * [regEvent 注册事件]
		 * @return {[type]} [description]
		 */
		var regEvent = function() {
			$(window).on("popstate", function(eve) {
				_this.hash = window.location.hash;
				_this.hashChange(_this.hash);
			});
		};

		// 接口
		return {
			init: init,
			hashChange: hashChange,
			regEvent: regEvent
		}
	})();

	/**
	 * [displayTools 图片显示工具]
	 * @type {Object}
	 * @author [Lesty]
	 * @code-time [2015.7.26]
	 */
	var displayTools = (function() {
		var _this =  null;
		//当前类型
		var curType =  "";
		// 每列图片高度
		var picHeight =  [0, 0, 0];
		// picHight中最小值索引位置
		var minIndex = 0;

		/**
		 * [init 初始化函数]
		 * @return {[type]} [description]
		 */
		var init = function() {
			_this = this;
			_this.typeChange("Lesty");
			_this.regEvent();
		};

		/**
		 * [makePicFlow 生成相应分类的图片流]
		 * @param  {[String]} picType [图片类别]
		 * @return {[type]}         [description]
		 */
		var makePicFlow = function(picType) {
			// 重置图片高度
			_this.picHeight = [0, 0, 0];
			_this.minIndex = 0;

			// 移除已有分类
			$("#pic" + picType).remove();

			// 生成分类
			var appendHtml = '<div id="pic' + picType + '"></div>';
			$("#picContain").append(appendHtml);

			// 加载分类对应图片
			var images = imgs[picType];
			for(var i = 0; i < images.length; i++) {
				appendHtml = '<img class="pic-flow" src="' + images[i] + '">';
				$("#pic" + picType).append(appendHtml);
			}

			// 对图片进行瀑布流排版
			_this.composeImg(picType);
		};

		/**
		 * [composeImg 对对应分类下的图片进行瀑布流排版]
		 * @param  {[String]} picType [图片类别]
		 * @return {[type]}         [description]
		 */
		var composeImg = function(picType) {
			// 是否全部加载完成
			var isLoad = true;
			// 计时器
			var timer = null;

			$("#pic" + picType).children().each(function() {
				// 图片高度为零则说明未加载完成
				if($(this).height() == 0) {
					isLoad = false;
					return false;
				}
			});

			// 加载完成后执行排版操作
			if(isLoad == true) {
				// 清空计时器
				clearTimeout(timer);

				// 根据每列图片高度进行排版
				var images = imgs[picType];
				for(var i = 0; i < images.length; i++) {
					$("#pic" + picType).children().eq(i).css({
						position: "absolute",
						left: (_this.minIndex * (25 + 0.5)) + "vw",
						top: _this.picHeight[_this.minIndex]  + "vh"
					});

					// 更新每列图片总高度
					_this.picHeight[_this.minIndex] += $("#pic" + picType).children().eq(i).height() / $(window).height() * 100;
					// 获取高度最低列的索引位置
					_this.minIndex = _this.picHeight.indexOf(Math.min.apply(null, _this.picHeight));
				}
			} else {
				isLoad = true;
				timer = setTimeout(function() {
					_this.composeImg(picType);
				}, 300);
			}
		};

		/**
		 * [typeChange 响应类型改变]
		 * @param  {String} picType [图片类别]
		 * @return {[type]}         [description]
		 */
		var typeChange = function(picType) {
			$("#pic" + _this.curType).hide();
			$("#type" + _this.curType).css({
				"font-weight": "normal",
				"color": "#F5F5F5"
			});

			$("#type" + picType).css({
				"font-weight": "bold",
				"color": "#ffffff"
			});

			if($("#pic" + picType).length == 0) {
				_this.makePicFlow(picType);
			}
			$("#pic" + picType).show();
			_this.curType = picType;
		};

		var regEvent = function() {
			$("#typeAll").on("click", function() {
				_this.typeChange("All");
			});
			$("#typeLesty").on("click", function() {
				_this.typeChange("Lesty");
			});
			$("#typeClass").on("click", function() {
				_this.typeChange("Class");
			});
		};

		return {
			init: init,
			makePicFlow: makePicFlow,
			composeImg: composeImg,
			typeChange: typeChange,
			regEvent: regEvent
		}
	})();

	var manageTools = (function() {
		var _this = null;

		var init = function() {
			_this = this;
		};

		return {
			init: init
		}
	})();

	var globalCtr = (function() {
		var _this = null;

		var init = function() {
			_this = this;
			historyTools.init();
			displayTools.init();
			manageTools.init();

			$("picManage").hide();
		};

		var modelSwitch = function(status) {
			if(status == true) {
				$("#picManage").hide();
				$("#picDisplay").show();
			} else {
				$("#picDisplay").hide();
				$("#picManage").show();
			}
		};

		return {
			init: init,
			modelSwitch: modelSwitch
		}
	})();

	globalCtr.init();
});