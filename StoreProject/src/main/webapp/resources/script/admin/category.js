/**
 * 
 */

$(document).ready(function(){
	ajaxGetMainCategory();
});

/* 대표 카테고리 목록 호출 */
function ajaxGetMainCategory(){
	$.ajax({
		type:"GET",
		url:"ajax/getMainCategory",
		success:function(result){
			for(var i=0 ; i<result.length ; i++){
				$('#category_content_table_tbody_td_ul_main').append(
						'<li><button type="button" value="'+result[i].main_category_NM+'" onmouseenter="addMainBtn(this)" onmouseleave="removeBtn()">'+result[i].main_category_NM
						+'<input type="hidden" value="'+result[i].main_column_NM+'">'
						+'</button></li>'
				)
			}
		},error:function(jqXHR, textStatus, errorThrown){
			alert("예기치 못한 오류로 대표 카테고리를 호출하지 못했습니다.");
		}
	});
}

/* 대표 카테고리 버튼 클릭 */
/* 세부 카테고리 목록 호출*/
function mainCategoryBtn(here){
	var maincategory = $(here).parent().parent().val();
	var maincolumn = $(here).parent().parent().children('input').val();
	localStorage.setItem("selMaincategory", maincategory); /* 현재 선택한 대표 카테고리가 무엇인지 기억 */
	localStorage.setItem("selMaincolumn", maincolumn); /* 현재 선택한 대표 카테고리가 무엇인지 기억 */
	var alldata = { "main_category_NM" : maincategory, "main_column_NM" : maincolumn };
	$.ajax({
		type:"GET",
		url:"ajax/getSubCategory",
		data:alldata,
		success:function(result){
			$('#category_content_table_tbody_td_ul_sub').empty();
			for(var i=0 ; i<result.length ; i++){
				$('#category_content_table_tbody_td_ul_sub').append(
						'<li><button type="button" value="'+result[i].sub_category_NM+'" onmouseenter="addSubBtn(this)" onmouseleave="removeBtn()">'+result[i].sub_category_NM
						+'<input type="hidden" value="'+result[i].sub_column_NM+'">'
						+'</button></li>'
				
				)
			}
		},error:function(jqXHR, textStatus, errorThrown){
			alert("예기치 못한 오류로 대표 카테고리를 호출하지 못했습니다.");
		}
	});
}


/* 대표 카테고리 마우스 오버 시 수정 버튼 생성 */
function addMainBtn(here){
	$(here).append(
			'<div class="category_content_table_td_btn_box">'
			+	'<button type="button" class="category_content_table_td_btn_class" onclick="mainCategoryBtn(this)">선택</button>'
			+	'<button type="button" class="category_content_table_td_btn_class" onclick="mainUpdateBtn(this)">수정</button>'
			+'</div>'
	)
}
/* 세부 카테고리 마우스 오버 시 수정 버튼 생성 */
function addSubBtn(here){
	$(here).append(
			'<div class="category_content_table_td_btn_box">'
			+	'<button type="button" class="category_content_table_td_btn_class" onclick="subupdateBtn(this)">수정</button>'
			+'</div>'
	)
}
/* 카테고리 마우스 아웃 시 수정 선택 버튼 삭제 */
function removeBtn(){
	$('.category_content_table_td_btn_box').remove();
}


/* ----------------------------------------------------------------- */
/* 카테고리 수정 자바스크립트 */
	/* 대표 카테고리 수정 */
	function mainUpdateBtn(here){
		var columnNM = $(here).parent('div').parent('button').children('input').val();
		var alldata = {"column_NM": columnNM};
		$('#cateogry_update_box').empty();
		$.ajax({
			type:"get",
			url:"ajax/getCategoryImg",
			data:alldata,
			success:function(result){
				if(result==""){
					$('#cateogry_update_box').append(
						'<span>배너 이미지</span>'
						+	'<div>'
						+		'<span id="category_img_span" style="">등록된 이미지가 없습니다.</span>'
						+		'<input type="file" id="category_img_upload_input" name="categoryimg" onchange="categoryimgupload(this)" accept="image/png, image/jpeg"></input>'
						+		'<label for="category_img_upload_input"></label>'
						+	'</div>'
						+	'<div>'
						+		'<span>대표 카테고리 이름</span>'
						+		'<input type="text" name="maincategoryNM" value="'+$(here).parent('div').parent('button').val()+'">'
						+		'<input type="hidden" name="maincategorycolumnNM" value="'+$(here).parent('div').parent('button').children('input').val()+'">'
						+	'</div>'
						+	'<div>'
						+		'<button type="button" onclick="mainCategoryUpdateSaveBtn()">수정</button>'
						+	'</div>'
					);
				}else{
					$('#cateogry_update_box').append(
						'<span>배너 이미지</span>'
						+	'<div>'
						+		'<span id="category_img_span" style="background-image:url(/resources/upload/category/'+result+');"></span>'
						+		'<input type="file" id="category_img_upload_input" name="categoryimg" onchange="categoryimgupload(this)" accept="image/png, image/jpeg"></input>'
						+		'<label for="category_img_upload_input"></label>'
						+	'</div>'
						+	'<div>'
						+		'<span>대표 카테고리 이름</span>'
						+		'<input type="text" name="maincategoryNM" value="'+$(here).parent('div').parent('button').val()+'">'
						+		'<input type="hidden" name="maincategorycolumnNM" value="'+$(here).parent('div').parent('button').children('input').val()+'">'
						+	'</div>'
						+	'<div>'
						+		'<button type="button" onclick="mainCategoryUpdateSaveBtn()">수정</button>'
						+	'</div>'
					);
				}
			},error:function(jqXHR, textStatus, errorThrown){
				alert("예기치 못한 오류로 대표 카테고리를 호출하지 못했습니다.");
			}
		})
	}

	
	/* 세부 카테고리 수정 */
	function subupdateBtn(here){
		var columnNM = $(here).parent('div').parent('button').children('input').val();
		var alldata = {"column_NM": columnNM};
		$('#cateogry_update_box').empty();
		$.ajax({
			type:"get",
			url:"ajax/getCategoryImg",
			data:alldata,
			success:function(result){
				if(result==""){
					$('#cateogry_update_box').append(
						'<span>배너 이미지</span>'
						+	'<div>'
						+		'<span id="category_img_span" style="">등록된 이미지가 없습니다.</span>'
						+		'<input type="file" name="categoryimg" id="category_img_upload_input" onchange="categoryimgupload(this)" accept="image/png, image/jpeg"></input>'
						+		'<label for="category_img_upload_input"></label>'
						+	'</div>'
						+	'<div>'
						+		'<span>대표 카테고리 이름</span>'
						+		'<select id="category_update_main_select" name="maincategoryNM"></select>'
						+		'<span>추가될 세부 카테고리 이름</span>'
						+		'<input type="text" name="subcategoryNM" value="'+$(here).parent('div').parent('button').val()+'">'
						+		'<input type="hidden" name="subcategorycolumnNM" value="'+$(here).parent('div').parent('button').children('input').val()+'">'
						+	'</div>'
						+	'<div>'
						+		'<button type="button" onclick="subCategoryUpdateSaveBtn()">수정</button>'
						+	'</div>'
					);
				}else{
					$('#cateogry_update_box').append(
						'<span>배너 이미지</span>'
						+	'<div>'
						+		'<span id="category_img_span" style="background-image:url(/resources/upload/category/'+result+');"></span>'
						+		'<input type="file" name="categoryimg" id="category_img_upload_input" onchange="categoryimgupload(this)" accept="image/png, image/jpeg"></input>'
						+		'<label for="category_img_upload_input"></label>'
						+	'</div>'
						+	'<div>'
						+		'<span>대표 카테고리 이름</span>'
						+		'<select id="category_update_main_select" name="maincategoryNM"></select>'
						+		'<span>추가될 세부 카테고리 이름</span>'
						+		'<input type="text" name="subcategoryNM" value="'+$(here).parent('div').parent('button').val()+'">'
						+		'<input type="hidden" name="subcategorycolumnNM" value="'+$(here).parent('div').parent('button').children('input').val()+'">'
						+	'</div>'
						+	'<div>'
						+		'<button type="button" onclick="subCategoryUpdateSaveBtn()">수정</button>'
						+	'</div>'
					);
				}
				/* 상위 카테고리 선택을 위해 대표 카테고리 목록 재호출 */
				$.ajax({
					type:"GET",
					url:"ajax/getMainCategory",
					success:function(result){
						var selMaincategory = localStorage.getItem("selMaincategory");
						var selMaincolumn = localStorage.getItem("selMaincolumn");
						
						for(var i=0 ; i<result.length ; i++){
							if(result[i].main_column_NM == selMaincolumn && result[i].main_category_NM == selMaincategory){
								$('#category_update_main_select').append(
										'<option value1="'+result[i].main_column_NM+'" value2="'+result[i].main_category_NM+'" selected>'+result[i].main_category_NM+'</option>'
								)
							}else{
								$('#category_update_main_select').append(
										'<option value1="'+result[i].main_column_NM+'" value2="'+result[i].main_category_NM+'">'+result[i].main_category_NM+'</option>'
								)
							}
							
						}
					}
				});
			},error:function(jqXHR, textStatus, errorThrown){
				alert("예기치 못한 오류로 대표 카테고리를 호출하지 못했습니다.");
			}
		});
		
	}
	
	/* 대표 카테고리 수정 저장 버튼*/
	function mainCategoryUpdateSaveBtn(){
		var fileNM = $('#category_img_span').attr('value');
		var categoryNM = $('input[name=maincategoryNM]').val();
		var columnNM = $('input[name=maincategorycolumnNM]').val();
	
		var alldata = {"main_column_NM" : columnNM, "main_category_NM" : categoryNM, "fileNM" : fileNM};
		$.ajax({
			type:"POST",
			url:"ajax/updateMainCategory",
			data:alldata,
			headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
			success:function(){
				alert("대표 카테고리 수정 완료");
				/* 수정 후 페이지 새로고침 */
				location.href='/admin/category';
				
			},error:function(jqXHR, textStatus, errorThrown){
				alert("예기치 못한 오류로 카테고리를 수정하지 못했습니다.");
			}
		});
	}
	
	/* 세부 카테고리 수정 저장 버튼 */
	function subCategoryUpdateSaveBtn(){
		var fileNM = $('#category_img_span').attr('value');
		var maincolumnNM = $('#category_update_main_select option:selected').attr('value1');
		var maincategoryNM = $('#category_update_main_select option:selected').attr('value2');
		var subcolumnNM = $('input[name=subcategorycolumnNM]').val();
		var subcategoryNM = $('input[name=subcategoryNM]').val();
		
		var alldata = {"main_column_NM" : maincolumnNM, "main_category_NM" : maincategoryNM, "sub_column_NM" : subcolumnNM, "sub_category_NM" : subcategoryNM, "fileNM" : fileNM};
		$.ajax({
			type:"POST",
			url:"ajax/updateSubCategory",
			data:alldata,
			headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
			success:function(){
				alert("세부 카테고리 수정 완료");
				/* 수정 후 페이지 새로고침 */
				location.href='/admin/category';
				
			},error:function(jqXHR, textStatus, errorThrown){
				alert("예기치 못한 오류로 카테고리를 수정하지 못했습니다.");
			}
		});
	}



/* ----------------------------------------------------------------- */
/* 카테고리 추가 자바스크립트 */

	/* 대표 카테고리 추가 버튼 */
	function addMainCategory(){
		$('#cateogry_update_box').empty();
		$('#cateogry_update_box').append(
			'<span>배너 이미지</span>'
			+	'<div>'
			+		'<span id="category_img_span" style="">등록된 이미지가 없습니다.</span>'
			+		'<input type="file" name="categoryimg" id="category_img_upload_input" onchange="categoryimgupload(this)" accept="image/png, image/jpeg"></input>'
			+		'<label for="category_img_upload_input"></label>'
			+	'</div>'
			+	'<div>'
			+		'<span>대표 카테고리 이름</span>'
			+		'<input type="text" name="maincategoryNM" placeholder="임시 카테고리 이름">'
/*			+		'<span>추가될 세부 카테고리 이름</span>'
			+		'<input type="text" name="subcategoryNM" value="임시 카테고리 이름">'
			+		'<input type="hidden" name="maincategorycolumnNM" value="'+$(here).parent('div').parent('button').children('input').val()+'">'*/
			+	'</div>'
			+	'<div>'
			+		'<button type="button" onclick="mainCategoryAddSaveBtn()">추가</button>'
			+	'</div>'
		);
	}
	
	/* 대표 카테고리 추가 저장 버튼*/
	function mainCategoryAddSaveBtn(){
		var fileNM = $('#category_img_span').attr('value');
		var categoryNM = $('input[name=maincategoryNM]').val();
		var alldata = {"main_category_NM" : categoryNM, "fileNM" : fileNM};
		$.ajax({
			type:"POST",
			url:"ajax/addMainCategory",
			data:alldata,
			headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
			success:function(){
				alert("대표 카테고리 추가 완료");
				
				location.href='/admin/category';
				
			},error:function(jqXHR, textStatus, errorThrown){
				alert("예기치 못한 오류로 카테고리를 수정하지 못했습니다.");
			}
		});
	}
	
	
	/* ------------------------------------------------------------- */
	/* 세부 카테고리 추가 버튼 */
	/* 카테고리 추가 자바스크립트 */

	/* 세부 카테고리 추가 버튼 */
	function addSubCategory(){
		$('#cateogry_update_box').empty();
		$('#cateogry_update_box').append(
			'<span>배너 이미지</span>'
			+	'<div>'
			+		'<span id="category_img_span" style="">등록된 이미지가 없습니다.</span>'
			+		'<input type="file" name="categoryimg" id="category_img_upload_input" onchange="categoryimgupload(this)" accept="image/png, image/jpeg"></input>'
			+		'<label for="category_img_upload_input"></label>'
			+	'</div>'
			+	'<div>'
			+		'<span>대표 카테고리 이름</span>'
			+		'<select id="category_update_main_select" name="maincategoryNM"></select>'
			+		'<span>추가될 세부 카테고리 이름</span>'
			+		'<input type="text" name="subcategoryNM" placeholder="임시 카테고리 이름">'
			+	'</div>'
			+	'<div>'
			+		'<button type="button" onclick="subCategoryAddSaveBtn()">추가</button>'
			+	'</div>'
		);
		/* 상위 카테고리 선택을 위해 대표 카테고리 목록 재호출 */
		$.ajax({
			type:"GET",
			url:"ajax/getMainCategory",
			success:function(result){
				var selMaincategory = localStorage.getItem("selMaincategory");
				var selMaincolumn = localStorage.getItem("selMaincolumn");
				
				for(var i=0 ; i<result.length ; i++){
					if(result[i].main_column_NM == selMaincolumn && result[i].main_category_NM == selMaincategory){
						$('#category_update_main_select').append(
								'<option value1="'+result[i].main_column_NM+'" value2="'+result[i].main_category_NM+'" selected>'+result[i].main_category_NM+'</option>'
						)
					}else{
						$('#category_update_main_select').append(
								'<option value1="'+result[i].main_column_NM+'" value2="'+result[i].main_category_NM+'">'+result[i].main_category_NM+'</option>'
						)
					}
					
				}
			}
		});
	}
	
	/* 세부 카테고리 추가 저장 버튼 */
	function subCategoryAddSaveBtn(){
		var fileNM = $('#category_img_span').attr('value');
		var maincolumnNM = $('#category_update_main_select option:selected').attr('value1');
		var maincategoryNM = $('#category_update_main_select option:selected').attr('value2');
		var subcategoryNM =  $('input[name=subcategoryNM]').val();
	
		var alldata = {"main_column_NM" : maincolumnNM, "main_category_NM" : maincategoryNM, "sub_category_NM" : subcategoryNM, "fileNM" : fileNM};
		$.ajax({
			type:"POST",
			url:"ajax/addSubCategory",
			data:alldata,
			headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
			success:function(){
				alert("세부 카테고리 추가 완료");
				/* 수정 후 페이지 새로고침 */
				location.href='/admin/category';
				
			},error:function(jqXHR, textStatus, errorThrown){
				alert("예기치 못한 오류로 카테고리를 수정하지 못했습니다.");
			}
		});
	}

// 카테고리 이미지 업로드
function categoryimgupload(here){
	var formData = new FormData();
	formData.append('uploadFile', here.files[0]);
	$.ajax({
			type:"post",
			url:"ajax/categoryimg/upload",
			data: formData,
			processData: false,
			contentType: false,
			headers:{"X-CSRF-TOKEN":$("input[name='_csrf']").val()},
			success:function(result){
				$('#category_img_span').html("");
				$('#category_img_span').css('background-image', 'url('+result.url+')');
				$('#category_img_span').attr('value', result.uuidfileNM);
			},error:function(jqXHR, textStatus, errorThrown){
				
			}
		})
}