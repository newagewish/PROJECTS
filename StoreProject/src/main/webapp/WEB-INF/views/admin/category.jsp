<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>스토어 프로젝트</title>
	<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	 	<link href="/resources/css/admin/category.css" rel="stylesheet">
	<!-- script -->
		<script src="/resources/script/admin/category.js"></script>

</head>
<body>
	<%@include file="../includes/header.jsp" %>
	<div id="category_box">
		<div id="category_header_box">
			<div>카테고리 관리</div>
		</div>
		<div id="category_content_box">
			<table  id="category_content_table_id">
				<thead id="category_content_table_thead_id">
					<tr class="category_content_table_tr_class">
						<td></td>
						<td>대표 카테고리</td>
						<td></td>
						<td>세부 카테고리</td>
						<td></td>
						<td>업데이트</td>
						<td></td>
					</tr>
				</thead>
				<tbody id="category_content_table_tbody_id">
					<tr class="category_content_table_tr_class">
						<td></td>
						<td><ul id="category_content_table_tbody_td_ul_main"></ul></td>
						<td><span class="td_bulkhead"></span></td>
						<td><ul id="category_content_table_tbody_td_ul_sub"><li>대표 카테고리 선택 필요</li></ul></td>
						<td><span class="td_bulkhead"></span></td>
						<td>
							<div id="cateogry_update_box">
							
							</div>
						</td>
						<td></td>
					</tr>
				</tbody>
				<tfoot id="category_content_table_tfoot_id">
					<tr class="category_content_table_tr_class">
						<td></td>
						<td><button class="category_content_table_tfoot_td_button_class" onclick="addMainCategory()">+대표 카테고리 추가</button>
						</td>
						<td></td>
						<td>
							<button class="category_content_table_tfoot_td_button_class" onclick="addSubCategory()">+세부 카테고리 추가</button>
						</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<%@include file="../includes/footer.jsp" %>
</body>
</html>