/**
 * 
 */
/* 슬라이드 선언 */
const storeinfoSlideMoveBox = document.querySelector('#storeinfo_slide_movebox');
const storeinfoSlideNextBtn = document.querySelector('#storeinfo_slide_btn_next');
const storeinfoSlidePrevBtn = document.querySelector('#storeinfo_slide_btn_prev');
const storeinfoSlideContentLength = $('.storeinfo_slide_content').css('width').length;
let storeinfoSlideContentWidth = $('.storeinfo_slide_content').css('width').substr(0, storeinfoSlideContentLength-2);
let storeinfoSlideIndex = 1;
/* 슬라이드 이미지 선언 끝 */

/* 슬라이드 닷 선언 */
const storeinfoSlideDot = $('.storeinfo_slide_dot');
/* 슬라이드 닷 선언 끝*/
$(document).ready(function(){
	storeinfoSlideAuto();
	
	storeinfoSlideBtn();
	/* 슬라이드 닷 버튼 처리 */
	storeinfoSlideDot.attr("onclick", "storeinfoSlideDotBtn(this)");
	/* 슬라이드 닷 버튼 처리 끝 */
	
});

/* 리사이즈 슬라이드쇼 이미지 처리*/
$(window).resize(function(){
	clearInterval(storeinfoSlideStart);
	const Resize_storeinfoSlideContentLength = $('.storeinfo_slide_content').css('width').length;
	let Resize_storeinfoSlideContentWidth = $('.storeinfo_slide_content').css('width').substr(0, Resize_storeinfoSlideContentLength-2);
	
	storeinfoSlideMoveBox.style.transition = 0 + "ms";
	$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(Resize_storeinfoSlideContentWidth*storeinfoSlideIndex)+"px, 0px, 0px)");
	storeinfoSlideContentWidth = Resize_storeinfoSlideContentWidth;
	
	storeinfoSlideAuto();
});


/* 슬라이드 이미지 자동 처리 */
function storeinfoSlideAuto(){
	storeinfoSlideStart = setInterval(function(){
		if(storeinfoSlideIndex<=4){
			storeinfoSlideMoveBox.style.transition = 300 + "ms";
			$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex+1))+"px, 0px, 0px)");
			storeinfoSlideIndex += 1;
			
			/* 닷 */
			$('[data-index="'+storeinfoSlideIndex+'"').siblings('li').css('background', '#bbb');
			$('[data-index="'+storeinfoSlideIndex+'"').css('background', '#333');
		}else{
			storeinfoSlideMoveBox.style.transition = 300 + "ms";
			$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex+1))+"px, 0px, 0px)");
			storeinfoSlideIndex = 1;
			
			setTimeout(function() {
				storeinfoSlideMoveBox.style.transition = 0 +"ms";
				$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*storeinfoSlideIndex)+"px, 0px, 0px)");
			}, 300);
			
			/* 닷 */
			$('[data-index="'+storeinfoSlideIndex+'"').siblings('li').css('background', '#bbb');
			$('[data-index="'+storeinfoSlideIndex+'"').css('background', '#333');
		}
	}, 3000);
};

/* 슬라이드 이미지 버튼 */
function storeinfoSlideBtn(){
	$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex))+"px, 0px, 0px)");

	/* 다음 버튼*/
	if(storeinfoSlideNextBtn){
		storeinfoSlideNextBtn.addEventListener('click', function() {
			/* storeinfoSlideAuto 시간초기화 */
			clearInterval(storeinfoSlideStart);
			if(storeinfoSlideIndex<=4){
				storeinfoSlideMoveBox.style.transition = 300 + "ms";
				$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex+1))+"px, 0px, 0px)");
				storeinfoSlideIndex += 1;
				
				/* 닷 */
				$('[data-index="'+storeinfoSlideIndex+'"').siblings('li').css('background', '#bbb');
				$('[data-index="'+storeinfoSlideIndex+'"').css('background', '#333');
			}else{
				storeinfoSlideMoveBox.style.transition = 300 + "ms";
				$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex+1))+"px, 0px, 0px)");
				storeinfoSlideIndex = 1;
				
				setTimeout(function() {
					storeinfoSlideMoveBox.style.transition = 0 +"ms";
					$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*storeinfoSlideIndex)+"px, 0px, 0px)");
				}, 300);
				
				/* 닷 */
				$('[data-index="'+storeinfoSlideIndex+'"').siblings('li').css('background', '#bbb');
				$('[data-index="'+storeinfoSlideIndex+'"').css('background', '#333');
			}
			storeinfoSlideAuto();
		});
		
		/* 이전 버튼 */
		storeinfoSlidePrevBtn.addEventListener('click', function() {
			/* storeinfoSlideAuto 시간초기화 */
			clearInterval(storeinfoSlideStart);
			if(storeinfoSlideIndex>=2){
				storeinfoSlideMoveBox.style.transition = 300 + "ms";
				$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex-1))+"px, 0px, 0px)");
				storeinfoSlideIndex -= 1;
				
				/* 닷 */
				$('[data-index="'+storeinfoSlideIndex+'"').siblings('li').css('background', '#bbb');
				$('[data-index="'+storeinfoSlideIndex+'"').css('background', '#333');
			}else{
					storeinfoSlideMoveBox.style.transition = 300 + "ms";
					$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(storeinfoSlideIndex-1))+"px, 0px, 0px)");
					storeinfoSlideIndex = 5;
				
				
				setTimeout(function() {
					storeinfoSlideMoveBox.style.transition = 0 +"ms";
					$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*storeinfoSlideIndex)+"px, 0px, 0px)");
				}, 300);
				
				/* 닷 */
				$('[data-index="'+storeinfoSlideIndex+'"').siblings('li').css('background', '#bbb');
				$('[data-index="'+storeinfoSlideIndex+'"').css('background', '#333');
			}
			storeinfoSlideAuto();
		});
	}else{
		alert("슬라이드 쇼를 가져오지 못했습니다.");
	}
};

/* 슬라이드 닷 버튼  */
function storeinfoSlideDotBtn(here){
	/* storeinfoSlideAuto 시간초기화 */
	clearInterval(storeinfoSlideStart);
	const storeinfoSlideMoveBox = document.querySelector('#storeinfo_slide_movebox');
	const storeinfoSlideContentLength = $('.storeinfo_slide_content').css('width').length;
	const storeinfoSlideContentWidth = $('.storeinfo_slide_content').css('width').substr(0, storeinfoSlideContentLength-2);
	
	
	let dotIndex = here.getAttribute('data-index');
	$(here).siblings('li').css('background', '#ddd');
	$(here).css('background', '#333');
	
	if(storeinfoSlideIndex < dotIndex){
		storeinfoSlideMoveBox.style.transition = 300 + "ms";
		$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(dotIndex))+"px, 0px, 0px)");
		storeinfoSlideIndex = Number(dotIndex);
	}else{
		storeinfoSlideMoveBox.style.transition = 300 + "ms";
		$('#storeinfo_slide_movebox').css('transform', "translate3d(-"+(storeinfoSlideContentWidth*(dotIndex))+"px, 0px, 0px)");
		storeinfoSlideIndex = Number(dotIndex);
	}
	storeinfoSlideAuto();
};

