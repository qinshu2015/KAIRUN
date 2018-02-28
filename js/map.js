var map = new BMap.Map("container");
//创建标注
var pt = new BMap.Point(lon, lat);
map.centerAndZoom(pt, 18);
map.addControl(new BMap.NavigationControl()); //添加工具条
loadmap();
map.enableScrollWheelZoom(); // 启用滚轮放大缩小。
function tabChange(tabid) {

    $("#ul_change_test li").removeClass("li_actives");
    if (tabid == 1) {
        $("#from").addClass("li_actives");
        $(".qh_cont").css("display", "none");
        $("#qh_cont_1").css("display", "block");
    }
    if (tabid == 2) {
        $("#to").addClass("li_actives");
        $(".qh_cont").css("display", "none");
        $("#qh_cont_2").css("display", "block");
    }
    if (tabid == 3) {
        $("#nearby").addClass("li_actives");
        $(".qh_cont").css("display", "none");
        $("#qh_cont_3").css("display", "block");
    }
}

//周边
function nearbySearch(name) {
    loadmap();
    var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map, autoViewport: true }
    });
    local.searchInBounds(name, map.getBounds());
}
function trans(ts, type) {
    //loadmap();

            var TransitFun = function (result){   
                    if (transit.getStatus() == BMAP_STATUS_SUCCESS){
                        // 从结果对象中获取起点和终点信息
                        var start = result.getStart().title;
                        var end = result.getEnd().title;

                        // 直接获取第一个方案
                        var plan = result.getPlan(0);
                        // 获取步行线路与公交线路个数总和，用于遍历
                        var total = plan.getNumRoutes() + plan.getNumLines();

                        var description = ['从' + start];
                        var addEndTitle = true;
                        for (var i = 0; i < total; i++) {
                                if (i % 2 == 0) {
                                        // i为偶数
                                        // 处理第一个步行描述逻辑
                                        if (i / 2 == 0) {
                                                if (plan.getRoute(i / 2).getDistance(false) == 0) {
                                                        description = ['从'];
                                                }
                                        }
                                        // 处理最后一个步行描述逻辑
                                        if (i / 2 == plan.getNumRoutes() - 1) {
                                                if (plan.getRoute(i / 2).getDistance(false) == 0) {
                                                        addEndTitle = false;
                                                }
                                        }
                                        if (plan.getRoute(i / 2).getDistance(false) > 0) {
                                                description.push('步行约' + plan.getRoute(i / 2).getDistance(true) + '至');
                                        }
                                } else {
                                        // i为奇数
                                        var line = plan.getLine((i - 1) / 2);
                                        if (i == 0) {
                                                description.push(line.getGetOnStop().title + ', ');
                                        }
                                        if (i > 0) {
                                                if (plan.getRoute((i - 1) / 2).getDistance(false) > 0) {
                                                        description.push(line.getGetOnStop().title + ', ');
                                                }
                                        }
                                        description.push('乘坐' + line.title + ', ');
                                        description.push('经过' + line.getNumViaStops() + '站');
                                        description.push('在' + line.getGetOffStop().title + '站下车，');

                                        var myLabel = new BMap.Label('乘坐' + line.title.split("(")[0] + ', 在' + line.getGetOffStop().title + '站下车', {offset: new BMap.Size(-50,-50), position: line.getGetOnStop().point});
                                        map.addOverlay(myLabel);
                                }
                        }
                        if (addEndTitle) {
                                description.push(end + '。');
                        }
                        // 替换可能出现的末尾位置的逗号
                        var descriptionStr = description.join('').replace(/\uff0c$/, '。');
                    }
            }
            var DrivingFun = function (results){   
                if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
        var start = results.getStart();
                    var end = results.getEnd();

                    var myLabel = new BMap.Label(start.title, {offset: new BMap.Size(-50,-50), position: start.point});
                    map.addOverlay(myLabel);

                    var viewPoints = [start.point, end.point];
                    // 获取方案
                    var plan = results.getPlan(0);
                    // 获取方案中包含的路线
                    for (var i =0; i < plan.getNumRoutes(); i++) {
                        for (var ii =1; ii < plan.getRoute(i).getNumSteps(); ii++) {
                            if (plan.getRoute(i).getStep(ii-1).getDistance(false) > 1000) {
                                var myLabel = new BMap.Label(plan.getRoute(i).getStep(ii).getDescription(false), {offset: new BMap.Size(-50,-50), position: plan.getRoute(i).getStep(ii).getPosition()});
                                map.addOverlay(myLabel);
                            }
                        }
                    }
                }
            }

    if (ts == 0) {
        if ($("#trafficFrom").val() != "") {
            if (type == 0) {
                //公交
                var transit = new BMap.TransitRoute(map, {
                                        renderOptions: { map: map },//, panel: 'panel'
                                        policy: BMAP_TRANSIT_POLICY_LEAST_TRANSFER,
                                        onSearchComplete: TransitFun
                });
                transit.search($("#trafficFrom").val(), { title: title, point: pt });
            }
            else {
                //驾车
                var driving = new BMap.DrivingRoute(map, {
                                        renderOptions: { map: map, autoViewport: true, enableDragging: true},
                                        policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE,
                                        onSearchComplete: DrivingFun
                                    });
                driving.search($("#trafficFrom").val(), { title: title, point: pt });
            }
        }
        else {
            alert("起点不能为空！");
            return false;
        }
    }
    else {
        if ($("#trafficTo").val() != "") {
            if (type == 0) {
                //公交
                var transit = new BMap.TransitRoute(map, {
                                        renderOptions: { map: map },//, panel: 'panel'
                                        policy: BMAP_TRANSIT_POLICY_LEAST_TRANSFER,
                                        onSearchComplete: TransitFun
                });
                transit.search({ title: title, point: pt }, $("#trafficTo").val());
            }
            else {
                //驾车
                var driving = new BMap.DrivingRoute(map, {
                                        renderOptions: { map: map, autoViewport: true, enableDragging: true},
                                        policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE,
                                        onSearchComplete: DrivingFun
                                    });
                driving.search({ title: title, point: pt }, $("#trafficTo").val());
            }
        }
        else {
            alert("终点不能为空！");
            return false;
        }
    }
}
function loadmap() {
    map.clearOverlays();
    var myIcon = new BMap.Icon("images/idea.png", new BMap.Size(48, 44));
    var marker = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    map.addOverlay(marker);
    var data = '<div class="mhc_title"><a class="mhc_title_link" href="javascript:void(0);" target="_blank" title="'+title+'">'+title+'</a></div><div class="add_ct" title="'+address+'"><b>地址：</b>'+address+'</div><div class="ul_change_test_div"><ul id="ul_change_test"><li id="from" class="li_actives" onclick="tabChange(1);return false;">到这里去</li><li id="to" onclick="tabChange(2);return false;">从这里出发</li><li id="nearby" onclick="tabChange(3);return false;">在附近找</li></ul></div><div class="qh_cont" id="qh_cont_1"><div class="add_ct"> <div class="left"> <span class="sp_pd">起点：</span> </div> <div class="left"><input name="起点" class="qh_inputs" id="trafficFrom" type="text" /> </div> </div><div class="add_ct add_ct_2"><input name="" style="margin-right: 10px;" class="Fl_search_btn" value="公交" type="button" onclick="trans(0,0);" /><input name="" class="Fl_search_btn" onclick="trans(0,1);" value="驾车" type="button" /></div></div><div class="qh_cont" id="qh_cont_2" style="display: none;"><div class="add_ct"><div class="left"><span class="sp_pd">终点：</span></div><div class="left"><input name="终点" class="qh_inputs" id="trafficTo" value="" type="text" /></div></div><div class="add_ct add_ct_2"><input name="" onclick="trans(1,0);" style="margin-right: 10px;" class="Fl_search_btn" value="公交" type="button" /><input name="" onclick="trans(1,1);" class="Fl_search_btn" value="驾车" type="button" /></div></div><div class="qh_cont" id="qh_cont_3" style="display: none;"><div style="padding-top: 5px;"><ul class="Fl_ul_list"><a href="javascript:void(0);" onclick="nearbySearch(\'公交\')">公交</a><a href="javascript:void(0);" onclick="nearbySearch(\'地铁\')">地铁</a><a href="javascript:void(0);" onclick="nearbySearch(\'餐饮\')">餐饮</a><a href="javascript:void(0);" onclick="nearbySearch(\'购物\')">购物</a><a href="javascript:void(0);" onclick="nearbySearch(\'银行\')">银行</a></ul></div></div>';
    var infoWindow = new BMap.InfoWindow(data);
    marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
    map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
}
