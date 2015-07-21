/****************域名、REST地址JSON配置文件*********************/

//#region 获取域名

//地名地址检索服务器根域名（住建委/旅图）同源tomcat发布地址
var uadb_Addr = GetServiceAddressHead() + "/uadb.app/rest";

//SAE开放平台部署环境
//var siteRoot='';

//Tomcat部署环境
var siteRoot = getSiteRoot();

//#region REST服务接口

var restConfig = {
    statis: uadb_Addr + "/v100/addressTable/statis"
};
//#endregion


//#region 配置参数 

//获取IP地址eg:192.168.1.188:8080
/**
 * @return {string}
 */
function getSiteRoot() {
    var addressHead = GetServiceAddressHead(); 
    if (addressHead.indexOf("geosmart.github.io") >= 0) {
        return addressHead;
    } else {
        return addressHead + "/geosmart.github.io";
    }
}


//获取IP地址eg:192.168.1.188:8080
/**
 * @return {string}
 */
function GetServiceAddressHead() {
    var addressHead;
    var protocol = window.location.protocol + "//";
    var hostName = document.location.hostname;
    var port = window.location.port;
    if (port !== "" && port != null) {
        port = ":" + port;
    }
    addressHead = protocol + hostName + port;

    return addressHead;
}

//#endregion
