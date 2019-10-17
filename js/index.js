$(function(){
    
    var data = [];
    var deffer = $.Deferred();

    // 题目信息

    $.ajax({
        url: "/ti/src/data.json",
        type: "get",
        dataType: "json",
        success: function (resp) {
            if (!resp.tag) {
                return false;
            }
            data = resp.data;
            deffer.resolve();
        },
        error: function(err) {
            console.error(err);
            deffer.reject();
        }
    })
   
    // 基本信息操作
    $.when(deffer).done(function(resolve) {
 
        // 提交数据
        $("#submit2").on("click",function(){
            var parentName = $('#parentName').val();
            var childName = $('#childName').val();
            var childAge = $('#childAge').val();
            var childSex = $('#childSex').val();
            var contact = $('#contact').val();
            var address = $('#address').val();
            var problem = $('#problem').val();
            
                var data = {
                    parentName : $('#parentName').val(),
                    childName : $('#childName').val(),
                    childAge : $('#childAge').val(),
                    childSex :  $('#childSex').val(),
                    contact : $('#contact').val(),
                    address : $('#address').val(),
                    problem : $('#problem').val()
                }
                var str =$("input").val();
                var str2 = $("textarea").val();
                var parentNam = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,20}$/g;
                var childNam = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,20}$/g;
                var contac = /^1[345789]\d{9}$/g;
                    if((str.length <= 0)||(str2.length <= 0)){
                        alert("内容不能为空！！");
                        return false;
                    }else if (!parentNam.exec(data.parentName)) {
                        alert("家长姓名不合法！！");
                        return false;
                    } else if (!childNam.exec(data.childName)) {
                        alert("孩子姓名不合法！！");
                        return false;
                    }else if(!contac.exec(data.contact)){
                        alert("电话输入不合法！！"); 
                        return false; 
                    } else if(contact){
    
                        // 基本信息
                //    $.ajax({
                //     url:'d.php',
                //     data:{contact:contact},
                //     dataType:'html',
                //     type:'post',
                //     success:function(mss){
                    
                //     if( mss == 1){
                    
                //         alert( "该手机号已经使用" );
                //         return false ;
                //         } else if( mss == 0){
                     
                    
                //          $.ajax({
                //              url:'i.php',					
                //              //data:{parentName:parentName,childName:childName,childAge:childAge,childSex:childSex,contact:contact,address:address,problem:problem},
                //              data:data,
                //              dataType:'html',
                //              type:'post',
                //              success:function(mydata){
                //               alert("提交成功");	
                //                 $('#parentName').val("");
                //                 $('#childName').val("");
                //                 $('#childAge').val("");
                //                  $('#childSex').val("");
                //                  $('#contact').val("");
                //                 $('#address').val("");
                //                  $('#problem').val("");
                                
                                
                //              }
                //          })
                        ShowDiv('MyDiv','info')
                //         }
                //    }})
                }
                   
            });

        // 重置数据

        $("#reset").on("click",function(){
            $('#parentName').val("");
            $('#childName').val("");
            $('#childAge').val("");
            $('#childSex').val("");
            $('#contact').val("");
            $('#address').val("");
            $('#problem').val("");
        });

        function ShowDiv(show_div,bg_div){
            document.getElementById(show_div).style.display='block';
            document.getElementById(bg_div).style.display='none';
        };
        function SubmitDiv(show_div,bg_div,time_div){
            document.getElementById(show_div).style.display='block';
            document.getElementById(bg_div).style.display='none';
            setTimeout(function(){
                document.getElementById(show_div).style.display='none';
                document.getElementById(time_div).style.display='block';
            },2000);
                    
        };

        //头部搜索框
        $('#btn_search_site').click(function(){
            var search_cate = $('#search_cate').val();
            var search_combo_input = $('#search_combo_input').val();
            if(search_combo_input != ''){
                if(search_cate == 'video'){
                    window.open("http://www.xingxiwang.net/teacher.html"+"?search="+search_combo_input);
                }else if(search_cate == 'school'){
                    window.open("http://www.xingxiwang.net/teacher.html"+"?search="+search_combo_input);
                }else if(search_cate == 'teacher'){
                    window.open("http://www.xingxiwang.net/teacher.html"+"?search="+search_combo_input);
                }
            }
        });
        $(".search_index_val span a").click(function(){
            var span_Val = $(this).text();
            // var a_Attr = $(this).attr("attr");
            $(".search_index_val p").html(span_Val);
            // $("#search_cate").val(a_Attr);
            $(".search_index #search_combo_input").attr("placeholder","搜索"+span_Val);
            $(this).hide().siblings().show();
        })

        $(".search_index input").focus(function(){
            $(".search_index").css("width","250px");
            $(".search_index input").css("width","140px");
        })
        
        var _index = 1;
        var answer = [];
        var scores = []; // 分数
        var VALUE = [2, 1, 0]; //分值
        addTi(_index)
        $("#ti ul").on("click", "li", function() {
            $(this).addClass("show").siblings().removeClass("show")
        })
        $("#next").on("click", function() {
            var selected = $("#ti li.show").index();
            $("#prev").show();
            if (selected > -1) {
                // answer.push(numToUpperCase(selected))
                answer.splice(_index-1, 1, numToUpperCase(selected));
            
                // 算分的
                scores.splice(_index-1, 1, caclScore(VALUE[selected]));
                _index ++;
                if (_index >= data.length) {
                    $("#next").hide()
                    $("#submit").show()
                }
                addTi(_index);
                addSelectedTi(_index);
                daanfun();
            } else {
                alert('你还没有选择答案');
                if(_index < 2) {
                    $("#prev").hide();
                }
            }
        })
        $("#prev").on("click", function() {
            _index--;
            if(_index < 2) {
                $("#prev").hide();
            }
            addTi(_index);
            addSelectedTi(_index);
            $("#next").show()
            $("#submit").hide()
            daanfun();
        })

        $("#submit").on("click", function () {
        
            // 调用分数和答案接口
            var result = answer;
            var score = scores;
            
            var selected = $("#ti li.show").index();
            if (selected > -1) {
                answer.splice(_index-1, 1, numToUpperCase(selected));
                // 算分的
                scores.splice(_index-1, 1, caclScore(VALUE[selected]));

                console.log("answer ", answer, "\nscores ", scores)
                $("#results .line").text(toTotal(scores) )
                if( toTotal(scores)>=0 && toTotal(scores)<5){
                
                    $("#results .test-content p").text("恭喜你，孩子目前不存在孤独症。");
                    $("#results .test-content div").text("Ta新奇心强，对新奇的东西和事物比较感兴趣，拥有着较强的思维理解能力！TA是个人见人爱的可人儿，但是可能偶尔会出现注意力不集中、或者察言观色欠佳，甚至沟通表达不引人入胜。家长们可不要忘记了适当的行为引导哦！");
                    
                }else if(toTotal(scores)>=5 && toTotal(scores)<15){
                    
                    $("#results .test-content p").text("孩子目前存在孤独症的可能。");
                    $("#results .test-content div").text("也许你也不太清楚宝宝经常不看你的眼睛,也不喜欢搭理人，不主动跟你聊天，对外界事物的好奇心好像也不太强烈，他的行为表现跟同龄孩子相比有一定的差距，建议要多学习、了解关于自闭症的专业知识，给孩子适当的干预。");
                }else{
                    $("#results .test-content p").text("孩子目前患有自闭症的可能性很大。");
                    $("#results .test-content div").text("虽说宝宝偶尔的不理人不爱说话属于正常现象。但如果这个行为长期来没有得到改善，即使和父母、幼儿园的小伙伴在一起也不见好转，那就要注意了。Ta很少眼神对视、不会表达需求，不关注周围，注意力涣散,甚至还有一些刻板行为等，孩子也缺乏理解力和想象力，他的行为表现跟同龄孩子相比差异颇大。这些行为似乎已经打乱了你们家的正常生活了，时常让你焦虑不安。该怎么办呢？掌握正确的康复技术，进行高强度的康复训练吧！");
                }
                SubmitDiv('sait','ti','results')
                
            } else {
                alert("你还没有选择答案")
            }
            //返回成绩和答案
            // $.ajax({
            //     url:"ja.php",
            //     type:"post",
            //     //data:{ans1:result[0],ans2:result[1],ans3:result[2],ans4:result[3],ans5:result[4],ans6:result[5],ans7:result[6],ans8:result[7],ans9:result[8],ans10:result[9],ans11:result[10],ans12:result[11],ans13:result[12],ans14:result[13],ans15:result[14],},
            //     data:{result:result,score:toTotal(scores)},
            //     dataType:'html',
            //     success:function(mydata){
            //         //alert(result[14]);	
            //     }

            //  }); 

        })

        function numToUpperCase (type) {
            switch (type) {
                case 0: return 'A';
                case 1: return 'B';
                case 2: return 'C';
                case 3: return 'D';
                case 4: return 'E';
            }
        }
        
        function upperCaseToNum (type) {
            switch (type) {
                case 'A': return 0;
                case 'B': return 1;
                case 'C': return 2;
                case 'D': return 3;
                case 'E': return 4;
            }
        }
        function addTi (index) {
            $("#ti .timu").text(index + ". " + data[index-1].timu)
            $("#ti ul").html("");
           
            $.each(data[index-1].daan, function(i, item){
                $("#ti ul").append(
                    "<li><i></i><span>"+numToUpperCase(i)+" </span><span>"+item+"</span></li>"
                )
            })
        
        }
        function addSelectedTi (index) {
            var _eq = upperCaseToNum(answer[index-1])
            $("#ti ul li").eq(_eq).addClass("show")
        }
        function caclScore(value) {
            return value;
        
        }
        function toTotal (arr) {
            var total = 0;
            $.each(arr, function(index, item){
                total += item
            })
            return total;    
        }
        function daanfun () {
            console.log("answer: ", answer, " scores: ", scores)
        }
            
        })
    });