/**
 * 
 */
var MaxContentNum, MaxPageNum, MaxPageBoxNum, pageNum, pageBoxNum;

window.onload = function() {
	/* 고객센터 첫 호출 시 공지사항 1번 페이지 보이기 위해 함수 실행 */
	help_notice_tbVarSet();	//FAQ 변수 초기화
	
	/* 고객센터 공지사항 탭 클릭 */
	$('#help_tab_notice').click(function(){
		$('.help_faq_content').remove();
		$('#help_paging_arrow_box').remove();
		
		help_notice_tbVarSet();	//FAQ 변수 초기화
		
		$('#help_tab_faq').css('color','#9A9A9E');
		$('#help_tab_notice').css('color','black');
	});
	/* 고객센터 FAQ 탭 클릭 */
	$('#help_tab_faq').click(function(){
		$('.help_notice_content').remove();
		$('#help_paging_arrow_box').remove();
		
		help_faq_tbVarSet();	//FAQ 변수 초기화
		
		$('#help_tab_notice').css('color','#9A9A9E');
		$('#help_tab_faq').css('color','black');
	});
}
 
$(document).ready(function(){
	/* 헤더 부분 효과  */
	$('#header_box').css('border-bottom','none');
	$('#header_bar').css('border-bottom','1px solid #E3E5E8');
});

/* ----------------------------------------------- */
/* FAQ */
/* 고객센터 FAQ 첫 호출 스크립트 함수 */
function help_faq_tbVarSet(){
	$.ajax({
		type:"GET",
		url :"ajax/help/faq/count",
		success : function(result){
			/* 고객센터 FAQ 콘텐츠 갯수를 불러와 페이지 박스와 페이지 번호를 계산하여 변수에 저장 */
			MaxContentNum = result;	//FAQ 콘텐츠 전체 갯수
			MaxPageNum = Math.ceil(result/5);	//1페이지당 5개씩 보일 때 전체 페이지 갯수
			MaxPageBoxNum = Math.ceil(MaxPageNum/10);	//페이지 갯수를 1~10개씩 1박스로 묶음을 때 박스 갯수
			pageNum = 1;	//함수 처음 호출 시 현재 페이지 시작 값
			pageBoxNum = 1;	//함수 처음 호출 시 현재 페이지 박스 시작 값
			
			/* window.onload에 help_faq_tbVarSet()밑에 넣으니 처음 클릭시 스크립트 변수를 찾을 수 없었서 함수안에 다시 넣어줌*/
			help_faq_tbPagingBox();	//FAQ 페이징 박스 삭제 생성
			hp_faq_Content();	//FAQ 콘텐츠 불러오기 (값은 첫 페이지 번호 1)
		}, 
		error: function(jqXHR, textStatus, errorThrown) { 
			alert(jqXHR.responseText); 
		}
	})
};

/* 고개센터 FAQ 콘텐츠 페이징 스크립트 함수 */
function help_faq_tbPagingBox(){
	$('#help_paging_arrow_box').remove();
	
	/* 페이지 번호가 처음 일 때 왼쪽 화살표는 삭제 */
	if(pageNum==1){
		$('#help_paging_box').append(
			'<div id="help_paging_arrow_box">'
			+	'<div id="help_paging_num_box">'
			+	'</div>'
			+	'<div id="help_paging_arrow_right" onclick="help_faq_tbpagingRightBtn()">'
			+		'<div></div>'
			+	'</div>'
			+'</div>'
		)
	}
	/* 페이지 번호가 마지막 일 때 오른쪽 화살표는 삭제 */
	else if(pageNum==MaxPageNum){
		$('#help_paging_box').append(
			'<div id="help_paging_arrow_box">'
			+	'<div id="help_paging_arrow_left" onclick="help_faq_tbpagingLeftBtn()">'
			+		'<div></div>'
			+	'</div>'
			+	'<div id="help_paging_num_box">'
			+	'</div>'
			+'</div>'
		)
	}
	/* 페이지 번호가 처음, 마지막이 아닐 때 오른쪽, 왼쪽 화살표 생성 */
	else{
		$('#help_paging_box').append(
				'<div id="help_paging_arrow_box">'
				+	'<div id="help_paging_arrow_left" onclick="help_faq_tbpagingLeftBtn()">'
				+		'<div></div>'
				+	'</div>'
				+	'<div id="help_paging_num_box">'
				+	'</div>'
				+	'<div id="help_paging_arrow_right" onclick="help_faq_tbpagingRightBtn()">'
				+		'<div></div>'
				+	'</div>'
				+'</div>'
			)
	}
	/* 만들어진 박스에 페이지 박스 번호로 페이지 번호 추가 */
	for(var i=(pageBoxNum*10)-9; i<=pageBoxNum*10; i++){
		if(i<=MaxPageNum){	//최대 페이지 번호보다 더 많이 생성 되는 걸 방지
			$('#help_paging_num_box').append(
					'<div class="help_paging_num_btn" onclick="help_faq_tbPagingNumBtn(this)">'+i+'</div>'
			);
		}else{
			
		}
	}
	/* 현재 페이지 번호에 효과 */
	/* eq()는 0부터 시작이기 때문에 -1 */
	var stylePageNum = pageNum-(pageBoxNum-1)*10;
	$('.help_paging_num_btn').eq(stylePageNum-1).css("color",'black');
	$('.help_paging_num_btn').eq(stylePageNum-1).css("text-decoration",'underline');
};

/* 고객센터 FAQ 콘텐츠 스크립트 함수 */
function hp_faq_Content(){
	$.ajax({
		type:"GET",
		url : "/ajax/help/faq/list",
		data: { "pageNum": pageNum },
		success : function(result){
			$('.help_faq_content').remove();	//페이지 콘텐츠를 불러올 때 기존 콘텐츠들을 삭제 해준다.
			for(var i=0; i<result.length; i++){
				$('#help_content_box').append(
						'<div class="help_faq_content">'
						+	'<div class="help_faq_content_btn" onclick="hp_faq_ContentBtn(this)">'
						+		'<div class="help_faq_title">'+result[i].hp_faq_NM+'</div>'
						+		'<div class="help_faq_category" id="help_faq_category_off">'+result[i].hp_faq_Category+'</div>'
						+	'</div>'
						+	'<div class="help_faq_text_box">'
						+		'<div class="help_faq_text">'
						+			result[i].hp_faq_Content
						+		'</div>'
						+	'</div>'
						+'</div>'
				)
			};
		}, error: function(jqXHR, textStatus, errorThrown) { 
			alert(jqXHR.responseText); 
		}
	});
};

/* 고객센터 FAQ 페이지 넘버 버튼 스크립트 함수 */
function help_faq_tbPagingNumBtn(pagenum){
	pageNum = Number($(pagenum).text());
	help_faq_tbPagingBox();
	hp_faq_Content();
};
/* 고객센터 FAQ 페이지 왼쪽 화살표 버튼 스크립트 함수 */
function help_faq_tbpagingLeftBtn(){
	/* 페이지 번호가 처음 일 때 왼쪽 화살표가 생성 되지 않아 예외 처리가 필요 없다 */
	pageNum -= 1;
	/* 페이지 번호에 -1 값이 (페이지 박스 번호*10)-9보다 미만 일 때 페이지 박스 번호 -1 */
	if(pageNum<(pageBoxNum*10)-9){
		pageBoxNum -= 1;
	}else{
		
	}
	help_faq_tbPagingBox();
	hp_faq_Content();
}
/* 고객센터 FAQ 페이지 오른쪽 화살표 버튼 스크립트 함수 */
function help_faq_tbpagingRightBtn(){
	/* 페이지 번호가 마지막일 때 오른쪽 화살표가 생성 되지 않아 예외 처리가 필요 없다 */
	pageNum += 1;
	/* 페이지 번호에 +1 값이 페이지 박스 번호*10보다 초과 일 때 페이지 박스 번호 +1 */
	if(pageNum>pageBoxNum*10){
		pageBoxNum += 1;
	}else{
		
	}
	help_faq_tbPagingBox();
	hp_faq_Content();
}

/* 고객센터 FAQ 콘텐츠 제목(btn) 스크립트 함수 */
function hp_faq_ContentBtn(here){
	if($(here).next().css('display')=='none'){
		$(here).next().css('display', 'block');
		$(here).children('div:nth-child(2)').attr('id','help_faq_category_on');
	}else{
		$(here).next().css('display', 'none');
		$(here).children('div:nth-child(2)').attr('id','help_faq_category	_off');
	}
}



/* ----------------------------------------------- */
/* 공지사항 */
/* 고객센터 공지사항 첫 호출 스크립트 함수 */
function help_notice_tbVarSet(){
	$.ajax({
		type:"GET",
		url :"ajax/help/notice/count",
		success : function(result){
			/* 고객센터 공지사항 콘텐츠 갯수를 불러와 페이지 박스와 페이지 번호를 계산하여 변수에 저장 */
			MaxContentNum = result;	//공지사항 콘텐츠 전체 갯수
			MaxPageNum = Math.ceil(result/5);	//1페이지당 5개씩 보일 때 전체 페이지 갯수
			MaxPageBoxNum = Math.ceil(MaxPageNum/10);	//페이지 갯수를 1~10개씩 1박스로 묶음을 때 박스 갯수
			pageNum = 1;	//함수 처음 호출 시 현재 페이지 시작 값
			pageBoxNum = 1;	//함수 처음 호출 시 현재 페이지 박스 시작 값
			
			/* window.onload에 help_faq_tbVarSet()밑에 넣으니 처음 클릭시 스크립트 변수를 찾을 수 없었서 함수안에 다시 넣어줌*/
			help_notice_tbPagingBox();	//FAQ 페이징 박스 삭제 생성
			hp_nt_Content();	//FAQ 콘텐츠 불러오기 (값은 첫 페이지 번호 1)
		}, 
		error: function(jqXHR, textStatus, errorThrown) { 
			alert(jqXHR.responseText); 
		}
	})
};

/* 고개센터 공지사항 콘텐츠 페이징 스크립트 함수 */
function help_notice_tbPagingBox(){
	$('#help_paging_arrow_box').remove();
	
	/* 페이지 번호가 처음 일 때 왼쪽 화살표는 삭제 */
	if(pageNum==1){
		$('#help_paging_box').append(
			'<div id="help_paging_arrow_box">'
			+	'<div id="help_paging_num_box">'
			+	'</div>'
			+	'<div id="help_paging_arrow_right" onclick="help_notice_tbpagingRightBtn()">'
			+		'<div></div>'
			+	'</div>'
			+'</div>'
		)
	}
	/* 페이지 번호가 마지막 일 때 오른쪽 화살표는 삭제 */
	else if(pageNum==MaxPageNum){
		$('#help_paging_box').append(
			'<div id="help_paging_arrow_box">'
			+	'<div id="help_paging_arrow_left" onclick="help_notice_tbpagingLeftBtn()">'
			+		'<div></div>'
			+	'</div>'
			+	'<div id="help_paging_num_box">'
			+	'</div>'
			+'</div>'
		)
	}
	/* 페이지 번호가 처음, 마지막이 아닐 때 오른쪽, 왼쪽 화살표 생성 */
	else{
		$('#help_paging_box').append(
				'<div id="help_paging_arrow_box">'
				+	'<div id="help_paging_arrow_left" onclick="help_notice_tbpagingLeftBtn()">'
				+		'<div></div>'
				+	'</div>'
				+	'<div id="help_paging_num_box">'
				+	'</div>'
				+	'<div id="help_paging_arrow_right" onclick="help_notice_tbpagingRightBtn()">'
				+		'<div></div>'
				+	'</div>'
				+'</div>'
			)
	}
	/* 만들어진 박스에 페이지 박스 번호로 페이지 번호 추가 */
	for(var i=(pageBoxNum*10)-9; i<=pageBoxNum*10; i++){
		if(i<=MaxPageNum){	//최대 페이지 번호보다 더 많이 생성 되는 걸 방지
			$('#help_paging_num_box').append(
					'<div class="help_paging_num_btn" onclick="help_notice_tbPagingNumBtn(this)">'+i+'</div>'
			);
		}else{
			
		}
	}
	/* 현재 페이지 번호에 효과 */
	/* eq()는 0부터 시작이기 때문에 -1 */
	var stylePageNum = pageNum-(pageBoxNum-1)*10;
	$('.help_paging_num_btn').eq(stylePageNum-1).css("color",'black');
	$('.help_paging_num_btn').eq(stylePageNum-1).css("text-decoration",'underline');
};

/* 고객센터 공지사항 콘텐츠 스크립트 함수 */
function hp_nt_Content(){
	$.ajax({
		type:"GET",
		url : "/ajax/help/notice/list",
		data: { "pageNum": pageNum },
		success : function(result){
			$('.help_notice_content').remove();	//페이지 콘텐츠를 불러올 때 기존 콘텐츠들을 삭제 해준다.
			for(var i=0; i<result.length; i++){
				$('#help_content_box').append(
						'<div class="help_notice_content">'
						+	'<div class="help_notice_content_btn" onclick="hp_nt_ContentBtn(this)">'
						+		'<div class="help_notice_title">'+result[i].hp_nt_NM+'</div>'
						+		'<div class="help_notice_date" id="help_notice_date_off">'+result[i].hp_nt_YMD+'</div>'
						+	'</div>'
						+	'<div class="help_notice_text_box">'
						+		'<div class="help_notice_text">'
						+			result[i].hp_nt_Content
						+		'</div>'
						+	'</div>'
						+'</div>'
				)
			};
		}, error: function(jqXHR, textStatus, errorThrown) { 
			alert(jqXHR.responseText); 
		}
	});
};

/* 고객센터 공지사항  페이지 넘버 버튼 스크립트 함수 */
function help_notice_tbPagingNumBtn(pagenum){
	pageNum = Number($(pagenum).text());
	help_notice_tbPagingBox();
	hp_nt_Content();
};
/* 고객센터 공지사항  페이지 왼쪽 화살표 버튼 스크립트 함수 */
function help_notice_tbpagingLeftBtn(){
	/* 페이지 번호가 처음 일 때 왼쪽 화살표가 생성 되지 않아 예외 처리가 필요 없다 */
	pageNum -= 1;
	/* 페이지 번호에 -1 값이 (페이지 박스 번호*10)-9보다 미만 일 때 페이지 박스 번호 -1 */
	if(pageNum<(pageBoxNum*10)-9){
		pageBoxNum -= 1;
	}else{
		
	}
	help_notice_tbPagingBox();
	hp_nt_Content();
}
/* 고객센터 공지사항  페이지 오른쪽 화살표 버튼 스크립트 함수 */
function help_notice_tbpagingRightBtn(){
	/* 페이지 번호가 마지막일 때 오른쪽 화살표가 생성 되지 않아 예외 처리가 필요 없다 */
	pageNum += 1;
	/* 페이지 번호에 +1 값이 페이지 박스 번호*10보다 초과 일 때 페이지 박스 번호 +1 */
	if(pageNum>pageBoxNum*10){
		pageBoxNum += 1;
	}else{
		
	}
	help_notice_tbPagingBox();
	hp_nt_Content();
}

/* 고객센터 공지사항 콘텐츠 제목(btn) 스크립트 함수 */
function hp_nt_ContentBtn(here){
	if($(here).next().css('display')=='none'){
		$(here).next().css('display', 'block');
		$(here).children('div:nth-child(2)').attr('id','help_notice_date_on');
	}else{
		$(here).next().css('display', 'none');
		$(here).children('div:nth-child(2)').attr('id','help_notice_date_off');
	}
}