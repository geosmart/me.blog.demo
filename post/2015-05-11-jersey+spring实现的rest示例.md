## spring+jersey rest service startup    [项目主页](http://geosmart.github.io/me.demo.jersey.startup/) 
---
1. mvn package
2. tomcat部署
3. postman等rest工具测试
---
* get服务测试 

> url  http://localhost:8080/jersey.startup/rest/v100/obj/get   
> 参数  userName=geosmart&token=902370e-4c95-42f2-a1b7-cfc2fdbc5ac3| 
> 结果  
<pre>
            {
    "token": "902370e-4c95-42f2-a1b7-cfc2fdbc5ac3",
    "message": {
        "request": "http://localhost:8080/jersey.startup/rest/v100/obj/get?userName=geosmart&token=902370e-4c95-42f2-a1b7-cfc2fdbc5ac3",
        "statusCode": 200,
        "reasonPhrase": "OK"
    },
    "result": "geosmart：Hello World！"
}
</pre> 

* post服务测试

> url  http://localhost:8080/jersey.startup/rest/v100/obj/post
> 参数  (application/json)
<pre>
           {
    "token": "5902370e-4c95-42f2-a1b7-cfc2fdbc5ac3",
    "data": {
        "param": {
            "param1": "param1",
            "param2": "param2"
        },
        "filter": {
            "filter1": "filter1",
            "filter2": "filter2"
        },
        "items": [
            {
                "id": "5902370e-4c95-42f2-a1b7-cfc2fdbc5ac3",
                "item": {
                    "prop2": "prop2",
                    "prop1": "prop1"
                }
            }
        ]
    }
}
</pre>
> 结果   
<pre>
          {
    "token": "5902370e-4c95-42f2-a1b7-cfc2fdbc5ac3",
    "message": {
        "request": "http://localhost:8080/jersey.startup/rest/v100/obj/post",
        "statusCode": 200,
        "reasonPhrase": "OK"
    },
    "result": {
        "param": {
            "param1": "param1",
            "param2": "param2"
        },
        "filter": {
            "filter1": "filter1",
            "filter2": "filter2"
        },
        "items": [
            {
                "id": "5902370e-4c95-42f2-a1b7-cfc2fdbc5ac3",
                "item": {
                    "prop2": "prop2",
                    "prop1": "prop1"
                }
            }
        ]
    }
}
</pre> 
 