$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
	YDUI.dialog.loading.open("加载中");
	$("#back-btn").on("click", Common.prototype.Back);

	abnormity.getabnormity().then(()=>{
		YDUI.dialog.loading.close();
	})
});

var abnormity = function () {};

abnormity.prototype = {
    getabnormity:function(){
        let url = window.location.href;
        let begin = '';
        let end = '';
        let companyId = '';
        let type = '';
            return axios.post("/api/statistics/getAbnormityInfo?startTime="+ begin +"&endTime=" +end+"&companyId=" +companyId+"&type=" + type).then(res => {
                data= res.data;
                if(data&&data.length>0){
                    let html = '';
                    data.forEach((value, index)=>{
                        html += '<a href="abnormityDetail.html?id='+value.id+'"  class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
                        html += '<h3 class="list-title">'+value.projectName+'</h3>';
                        html += '<div class="list-mes-item">';
                        html += '<div>'+value.content.substring(0,18)+"..."+'</div>';
                        // html += '<div>'+new Date(value.joinTime)+'</div>';
                        html += '<div>'+value.createTime.substr(0,10)+'</div>';
                        html += '</div>';
                        html += '</div></a>';
                    });
                    $("#title").html("异常信息");
                    $("#abnormityList").html(html);
                }else{
                    $("#abnormityList").html('暂无异常信息。');
                }
                })

    },
    CloaseDetail: function (htmlId) {
        if (!varIsNull(htmlId)) {
            $("." + htmlId).find("input").val("");
            $("." + htmlId).find("textarea").val("");
            $("." + htmlId).find("select").val("");
            $("." + htmlId).addClass("none");
        } else {
            $(".xmbbdetail").addClass("none");
        }
    },
}

window.abnormity = new abnormity();
