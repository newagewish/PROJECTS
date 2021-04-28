/**
 * 
 */
window.onload = function(){
	document.querySelectorAll( 'oembed[url]' ).forEach( element => {
        iframely.load( element, element.attributes.url.value );
    } );
}

$(document).ready(function(){
	if(pds_arr != ""){
		$('#card_products_box').before(
			'<h3 class="card_title">추천 상품</h3>'
		);
		selectCardProducts();
	}
});


function selectCardProducts(){
	console.log(pds_arr);
	var alldata = { "arr": pds_arr };
	$.ajax({
		type:"get",
		url:"/card/select/products",
		data:alldata,
		success:function(result){
			for(var i=0; i<result.length; i++){
				var image = result[i].pds_Image.split(",");
				var url = "/resources/upload/products/images/"+result[i].pds_Reg_Date+"/"+result[i].pds_NO+"/"+image[0];
				var price = cardReplacePrice(result[i].pds_Price);
				$('#card_products_ul').append(
					"<li><a href='/view?NO="+result[i].pds_NO+"' class='push_a_tag' id='push_"+result[i].pds_NO+"'>"
					+	"<span class='img_cover'></span>"
					+	"<span><img src='"+url+"'></span>"
					+	"<p class='mini_name'>"+result[i].pds_NM+"</p>"
					+	"<p class='mini_price'>"+price+"원</p>"
					+"</a></li>"
				);
				// 세일이 있을 경우 처리
				if(result[i].pds_Sale != 0){
					var sale = cardReplacePrice(result[i].pds_Sale);
					var percent = 100 - Math.floor( result[i].pds_Sale / (result[i].pds_Price / 100) );
					$('#push_'+result[i].pds_NO).children('p:nth-child(3)').after(
						'<p class="mini_percent">'+percent+'%</p>'
					);
					$('#push_'+result[i].pds_NO).children('p:nth-child(4)').after(
						'<p class="mini_sale">'+sale+'원</p>'
					);
				}
			}
		},error:function(){
			
		}
	})
}

function cardReplacePrice(here){
	var str = here.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str;
}