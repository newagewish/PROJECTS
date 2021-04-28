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
	 	<link href="/resources/css/admin/productsAdd.css" rel="stylesheet">
	<!-- script -->
		<script src="/resources/script/admin/productsAdd.js"></script>
	<!-- ckeditor5 -->	
		<script src="/resources/api/ckeditor5/build/ckeditor.js"></script>
		<!-- 커스텀  -->
		<script src="/resources/api/ckeditor5/custom/customUploadAdapter.js"></script>
		<link rel="stylesheet" href="/resources/api/ckeditor5/custom/customStyle.css" type="text/css">
</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="products_add_box">
		<form id="products_form">
		<table class="products_table">
			<tbody class="products_tbody">
				<tr class="products_tr">
					<td class="products_title">
						<div>상품명</div>
					</td>
					<td class="products_title">
						<div>가격</div>
					</td>
				</tr>
				<tr id="products_name_price_tr">
					<td>
						<input class="products_input" id="products_name" type="text" autocomplete="off" required/>
					</td>
					<td>
						<input type="hidden" name="products_price">
						<input class="products_input" id="products_price" type="text" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" onblur="addReplacePrice(this)" autocomplete="off" required/>
						<span id="products_price_krw">원</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div id="editor_box">
			<!-- 제품 소개 -->
			<div class="editor_title">제품 소개</div>
			<div id="toolbar_container_info"></div>
			<div id="editor_info">
		    </div>
		    <script>
		    /* ckeditor5 */
		    var edit_info_text;	/* 입력한 내용을 담을 변수 */
		    
		    DecoupledDocumentEditor 
		    .create( document.querySelector( '#editor_info' ),{
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
	            const toolbarContainer = document.querySelector( '#toolbar_container_info' );
	            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
	            /* 텍스트 내용을 변수에 담아서 보내기 */
	            /* console.log( 'Editor was initialized', editor ); */
	            edit_info_text = editor;
	        } )
	        .catch( error => {
	            console.error( error );
	        } );
			</script>
			<div class="editor_foot"></div>
		
		
			<!-- 세부 정보 -->
			<div class="editor_title">세부정보</div>
			<div id="toolbar_container_detail"></div>
			<div id="editor_detail">
				<ul>
					<li>품질보증 기준 : 본 제품은 공정거래위원회 고시 소비자 분쟁해결기준에 의거 교환 및 보상을 받으실 수 있습니다.</li>
					<li>A/S 책임자와 전화번호 : 스토어프로젝트 고객센터 010-5533-3222</li>
				</ul>
			</div>
		    <script>
		    /* ckeditor5 */
		    var edit_detail_text;	/* 입력한 내용을 담을 변수 */
		    
		    DecoupledDocumentEditor 
		    .create( document.querySelector( '#editor_detail' ),{
	        	extraPlugins: [ MyCustomUploadAdapterPlugin ],
	        	removePlugins: [ 'Title' ],
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
						'insertTable',
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
	            const toolbarContainer = document.querySelector( '#toolbar_container_detail' );
	            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
	            /* 텍스트 내용을 변수에 담아서 보내기 */
	            /* console.log( 'Editor was initialized', editor ); */
	            edit_detail_text = editor;
	        } )
	        .catch( error => {
	            console.error( error );
	        } );
			</script>
		</div>
		<div class="editor_foot"></div>
		
		<table class="products_table" id="products_select">
			<tbody class="products_tbody">
				<tr class="products_tr">
					<td class="products_title">
						<div>카테고리 선택</div>
					</td>
				</tr>
				<tr class="products_tr" id="products_checkbox">
					<td id="checkbox_td">
						<div id="slide_checkbox">
							<ul id="mc_ul">
								
							</ul>
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr class="products_tr">
					<td>
						<div style="display:flex;"><button type="button" id="category_open_btn" onclick="opencheckBoxCategory()"><span id="category_chevrons_icon"></span></button></div>
					</td>
				</tr>
			</tfoot>
		</table>
		<table class="products_table">
			<thead>
				<tr class="products_tr">
					<td class="products_title" >
						<div>캐릭터 카테고리 선택</div>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div id="slide_checkbox_charater">
						<table>
							<tbody>
								<tr style="height:20px">
									<td colspan="8">
									</td>
								</tr>
								<tr class="products_tr">
									<td class="products_charater_td">
										<label for="charater_ryan" class="label_charater" id="label_charater_ryan"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_apeach" class="label_charater" id="label_charater_apeach"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_muzi" class="label_charater" id="label_charater_muzi"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_frodo" class="label_charater" id="label_charater_frodo"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_neo" class="label_charater" id="label_charater_neo"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_tube" class="label_charater" id="label_charater_tube"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_jayg" class="label_charater" id="label_charater_jayg"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_con" class="label_charater" id="label_charater_con"></label>
									</td>
								</tr>
								<tr class="products_tr">
									<td class="products_charater_td">
										<input type="checkbox" value="ryan" id="charater_ryan" name="group_charater"/>라이언
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="apeach" id="charater_apeach" name="group_charater"/>어피치
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="muzi" id="charater_muzi" name="group_charater"/>무지
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="frodo" id="charater_frodo" name="group_charater"/>프로도
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="neo" id="charater_neo" name="group_charater"/>네오
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="tube" id="charater_tube" name="group_charater"/>튜브
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="jayg" id="charater_jayg" name="group_charater"/>제이지
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="con" id="charater_con" name="group_charater"/>콘
									</td>
								</tr>
								<tr style="height:20px">
									<td colspan="8">
									</td>
								</tr>
								<tr class="products_tr">
									<td class="products_charater_td">
										<label for="charater_jordy" class="label_charater" id="label_charater_jordy"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_scappy" class="label_charater" id="label_charater_scappy"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_angmond" class="label_charater" id="label_charater_angmond"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_penda_jr" class="label_charater" id="label_charater_penda_jr"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_kero_berony" class="label_charater" id="label_kero_berony"></label>
									</td>
									<td class="products_charater_td">
										<label for="charater_cob_bbanya" class="label_charater" id="label_cob_bbanya"></label>
									</td>
									<td class="products_charater_td" colspan="2">
									</td>
								</tr>
								<tr class="products_tr">
									<td class="products_charater_td">
										<input type="checkbox" value="jordy" id="charater_jordy" name="group_charater"/>죠르디
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="scappy" id="charater_scappy" name="group_charater"/>스카피
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="angmond" id="charater_angmond" name="group_charater"/>앙몬드
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="penda_jr" id="charater_penda_jr" name="group_charater"/>팬다주니어
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="kero_berony" id="charater_kero_berony" name="group_charater"/>케로&베로니
									</td>
									<td class="products_charater_td">
										<input type="checkbox" value="cob_bbanya" id="charater_cob_bbanya" name="group_charater"/>콥&빠냐
									</td>
									<td class="products_charater_td" colspan="2">
									</td>
								</tr>
						</tbody>
						</table>
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr class="products_tr">
					<td>
						<div style="display:flex;"><button type="button" id="charater_open_btn" onclick="opencheckBoxCharater()"><span id="charater_chevrons_icon"></span></button></div>
					</td>
				</tr>
			</tfoot>
		</table>
		<table class="products_table">
			<thead>
				<tr class="products_tr">
					<td class="products_title">
						<div>제품 색상</div>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div id="products_color_input_box">
							<input type="checkbox" name="products_color" id="color_red" value="red">빨간색
							<input type="checkbox" name="products_color" id="color_orange" value="orange">주황색
							<input type="checkbox" name="products_color" id="color_gold" value="gold">금색
							<input type="checkbox" name="products_color" id="color_yellow" value="yellow">노랑색
							<input type="checkbox" name="products_color" id="color_lightgreen" value="light_green">연두색
							<input type="checkbox" name="products_color" id="color_green" value="green">초록색
							<input type="checkbox" name="products_color" id="color_aquamarine" value="aquamarine">아쿠아마린
							<input type="checkbox" name="products_color" id="color_skyblue" value="sky_blue">하늘색
							<input type="checkbox" name="products_color" id="color_blue" value="blue">파란색
							<input type="checkbox" name="products_color" id="color_indigo" value="indigo">남색
							<input type="checkbox" name="products_color" id="color_white" value="white">하얀색
							<input type="checkbox" name="products_color" id="color_silver" value="silver">은색
							<input type="checkbox" name="products_color" id="color_black" value="black">검은색
							<input type="checkbox" name="products_color" id="color_khaki" value="khaki">카키색
							<input type="checkbox" name="products_color" id="color_brown" value="brown">갈색
							<input type="checkbox" name="products_color" id="color_purple" value="purple">보라색
							<input type="checkbox" name="products_color" id="color_deeppink" value="deep_pink">진분홍색
							<input type="checkbox" name="products_color" id="color_pink" value="pink">분홍색
							<input type="checkbox" name="products_color" id="color_grey" value="grey">회색
						</div>
						<div id="products_color_label_box">
							<span>색상 : </span>
							<label for="color_red" id="label_red" onclick="colorcheck(this)"></label>
							<label for="color_orange" id="label_orange" onclick="colorcheck(this)"></label>
							<label for="color_gold" id="label_gold" onclick="colorcheck(this)"></label>
							<label for="color_yellow" id="label_yellow" onclick="colorcheck(this)"></label>
							<label for="color_lightgreen" id="label_lightgreen" onclick="colorcheck(this)"></label>
							<label for="color_green" id="label_green" onclick="colorcheck(this)"></label>
							<label for="color_aquamarine" id="label_aquamarine" onclick="colorcheck(this)"></label>
							<label for="color_skyblue" id="label_skyblue" onclick="colorcheck(this)"></label>
							<label for="color_blue" id="label_blue" onclick="colorcheck(this)"></label>
							<label for="color_indigo" id="label_indigo" onclick="colorcheck(this)"></label>
							<label for="color_white" id="label_white" onclick="colorcheck(this)"></label>
							<label for="color_silver" id="label_silver" onclick="colorcheck(this)"></label>
							<label for="color_black" id="label_black" onclick="colorcheck(this)"></label>
							<label for="color_khaki" id="label_khaki" onclick="colorcheck(this)"></label>
							<label for="color_brown" id="label_brown" onclick="colorcheck(this)"></label>
							<label for="color_purple" id="label_purple" onclick="colorcheck(this)"></label>
							<label for="color_deeppink" id="label_deeppink" onclick="colorcheck(this)"></label>
							<label for="color_pink" id="label_pink" onclick="colorcheck(this)"></label>
							<label for="color_grey" id="label_grey" onclick="colorcheck(this)"></label>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<table class="products_table" id="products_option">
			<thead id="products_thead_options">
				<tr class="products_tr">
					<td class="products_title" >
						<div>옵션 및 재고</div>
					</td>
				</tr>
				<tr class="products_tr">
					<td id="option_choice">
						<input type="radio" name="option_Choice" value="없음" onchange="selectsOptions(this)" checked>옵션 없음
						<input type="radio" name="option_Choice" value="사이즈" onchange="selectsOptions(this)">사이즈
						<input type="radio" name="option_Choice" value="캐릭터" onchange="selectsOptions(this)">캐릭터
						<input type="radio" name="option_Choice" value="기종" onchange="selectsOptions(this)">기종
					</td>
				</tr>
			</thead>
			<tbody id="products_tbody_options">
				<tr class="products_tr" id="products_option_tr">
					<td id="products_option_td">
						<div id="option_contents">
							<span class="option_span">재고 : </span>
							<span class="option_span">
								<input type="text" placeholder="수량" class="option_stock" name="option_Stock" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" autocomplete="off">
							</span>
						</div>
					</td>
				</tr>
				<!-- 자바 스크립트에서 내용 추가 -->
					
			</tbody>
			<tfoot id="option_tfoot">
				<!-- 자바 스크립트에서 내용 추가 -->
			</tfoot>
		</table>
		<table class="products_table">
			<thead>
				<tr class="products_tr">
					<td class="products_title" >
						<div>배송 설정</div>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr class="products_tr">
					<td id="products_td_delivery">
						<!-- boolean 형식으로 0은 국내 1은 해외 -->
						<span>
							
							<label for="delivery_korea" class="delivery_label">
								<input type="radio" id="delivery_korea" name="option_delivery" value="0" checked/>
								국내 배송
							</label>
						</span>
						<span>
							
							<label for="delivery_global" class="delivery_label">
								<input type="radio" class="option_delivery" id="delivery_global" name="option_delivery" value="1"/>
								해외 배송
								</label>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<table class="products_table">
			<thead>
				<tr class="products_tr">
					<td colspan="2" class="products_title" id="image_thead_td">
						<div>대표 이미지</div>
						<div>미리보기</div>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr class="products_tr" id="image_tbody_tr">
					<td id="image_btn_td">
						<div id="products_image_top">
							<input type="file" id="products_image_input" accept="image/*" multiple onchange="imageupload(this)">
							<label for="products_image_input" id="image_btn_add">
								이미지 추가
							</label>
						</div>
						<div id="products_image_mid">
							선택한 파일이 없습니다.
						</div>
						<div id="products_image_bottom">
							<input type="button" id="image_btn_remove" value="삭제" onclick="checkboximgremove()">
						</div>
					</td>
					<td id="image_view_td">
						<div id="image_view_div">
							<div id="products_slide_movebox">
								미리보기 할 이미지가 없습니다.
							</div>
							<ul id="products_slide_pagination">
							
							</ul>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<table class="products_table" id="products_vogue">
			<thead>
				<tr class="products_tr" id="vogue_thead_tr">
					<td class="products_title" id="vogue_thead_td">
						<div>인기 이미지</div>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr class="products_tr" id="vogue_tbody_tr">
					<td id="vogue_tbody_td">
						<input type="file" id="products_vogue_input" accept="image/*" onchange="vogueupload(this)">
						<label for="products_vogue_input" id="vogue_btn_add">
							이미지 추가
						</label>
						<div id="vogue_file_name"></div>
						<div id="vogue_image_div">
						
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div id="products_btn_box">
			<button type="button" id="products_cancel_btn" onclick="history.go(-1)">취소</button>
			<button type="button" id="products_save_btn" onclick="saveproducts()">등록</button>
		</div>
		</form>
	</div>
	<div id="blind_box">
		
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>