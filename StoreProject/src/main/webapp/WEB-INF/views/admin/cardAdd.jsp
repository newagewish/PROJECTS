<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	 	<link href="/resources/css/admin/cardAdd.css" rel="stylesheet">
	<!-- script -->
		<script src="/resources/script/admin/cardAdd.js"></script>
	<!-- ckeditor5 -->	
		<script src="/resources/api/ckeditor5/build/ckeditor.js"></script>
		<!-- 커스텀  -->
		<script src="/resources/api/ckeditor5/custom/customUploadAdapter.js"></script>
		<link rel="stylesheet" href="/resources/api/ckeditor5/custom/customStyle.css" type="text/css">
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="card_box">
		<div class="card_box_name">종류 선택</div>
		<div class="card_radio_box">
			<input type="radio" id="card_radio_image" name="card_type" onclick="cardImgAdd()" value="image"><label for="card_radio_image">이미지형</label>
			<input type="radio" id="card_radio_intro" name="card_type" onclick="cardIntroAdd()" value="intro"><label for="card_radio_intro">소개형</label>
			<input type="radio" id="card_radio_list" name="card_type" onclick="cardListAdd()" value="list" checked><label for="card_radio_list">목록형</label>
		</div>
		<div id="card_view_box">
			<div id="card_view">
			
			</div>
			<div id="card_choice_box">
				<div class="card_box_name">추천 상품 선택</div>
				<div id="card_choice_list" onScroll="choiceScroll()">
				</div>
			</div>
		</div>
		<div class="card_box_name" id="card_viewpage_title">뷰페이지 종류 선택</div>
		<div class="card_radio_box">
			<input type="radio" id="card_viewpage_radio_url" name="card_viewpage_type" onclick="cardViewpageUrlOpen()" value="url"><label for="card_viewpage_radio_url">제품 링크형</label>
			<input type="radio" id="card_viewpage_radio_contents" name="card_viewpage_type" onclick="cardViewpageContentsOpen()" value="contents" checked><label for="card_viewpage_radio_contents">게시판형</label>
		</div>
		<div id="card_viewpage_box">
			<div id="card_viewpage_url">
				<div class="card_box_name">링크할 제품</div>
				<span>카드 뷰페이지 대신 보여줄 제품 : </span>
				<input type="hidden" id="card_url_no" name="card_url_no" readonly>
				<input type="text" id="card_url_nm" placeholder="추천 제품에서 1개 선택" readonly>
			</div>
			<div id="card_viewpage_contents">
				<div class="card_box_name">뷰페이지 내용</div>
					<div id="card_editor_box">
						<div id="toolbar_container_card"></div>
						<div id="editor_card">
					    </div>
					    <script>
					    /* ckeditor5 */
					    var edit_info_text;	/* 입력한 내용을 담을 변수 */
					    
					    DecoupledDocumentEditor 
					    .create( document.querySelector( '#editor_card' ),{
					    	removePlugins: [ 'Title' ],
				        	extraPlugins: [ MyCustomUploadAdapterPlugin ],
				        	fontFamily: {
				                options: [
				                    'Malgun Gothic'
				                ],
				            },
				            fontSize: {
				                options: [
				                	 9,
				                     11,
				                     13,
				                     'default',
				                     17,
				                     19,
				                     21,
				                     23,
				                     25,
				                     27,
				                     29,
				                     31
				                ],
				            },
					    	toolbar: {
								items: [
									'exportPdf',
									'|',
									'heading',
									'|',
									'fontFamily',
									'fontSize',
									'fontColor',
									'fontBackgroundColor',
									'|',
									'bold',
									'italic',
									'underline',
									'strikethrough',
									'|',
									'alignment',
									'|',
									'numberedList',
									'bulletedList',
									'pageBreak',
									'|',
									'indent',
									'outdent',
									'|',
									'specialCharacters',
									'link',
									'blockQuote',
									'imageUpload',
									'insertTable',
									'mediaEmbed',
									'|',
									'undo',
									'redo'
								],
							},
							language: 'ko',
							image: {
								toolbar: [
									'imageTextAlternative',
									'imageStyle:full',
									'imageStyle:side'
								]
							},
							table: {
								contentToolbar: [
									'tableColumn',
									'tableRow',
									'mergeTableCells',
									'tableCellProperties',
									'tableProperties'
								]
							},
				        } )
				        .then( editor => {
				            const toolbarContainer = document.querySelector( '#toolbar_container_card' );
				            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
				            /* 텍스트 내용을 변수에 담아서 보내기 */
				            /* console.log( 'Editor was initialized', editor ); */
				            editor_card_text = editor;
				        } )
				        .catch( error => {
				            console.error( error );
				        } );
						</script>
					</div>
				<button type="button" id="card_editor_btn" onclick="cardEditorBtn()"><span></span></button>
			</div>
		</div>
		<div id="card_viewpage_promotion">
			<div class="card_box_name">추천 상품 목록</div>
			<div id="promotion_list">
				<div id="promotion_placeholder_box">추천 상품을 선택해주세요.</div>
			</div>
		</div>
		<div id="card_btn_box">
			<button type="button" onclick="history.go(-1)">취소</button>
			<button type="button" onclick="saveCard()">등록</button>
		</div>
	</div>
	<div id="blind_box">
		
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>