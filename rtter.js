/**
 * Created by JetBrains WebStorm.
 * User: user
 * Date: 11/12/08
 * Time: 19:47
 * To change this template use File | Settings | File Templates.
 */

consumer = [];

window.onload = function () {

consumer.signForm =
function signForm(form, etc) {
    //form.action = "https://api.twitter.com/oauth/request_token";
    var accessor = { consumerSecret: "dmOxBagIAKNBayKiPyBPZbVeDhdiQhDjWjKCE4G9Kds",
                     tokenSecret   : ""};
    var message = { action: "https://api.twitter.com/oauth/request_token",//form.action,
                    method: form.method,
                    parameters: [
                        ["oauth_consumer_key", "5JV91KfJYkxB7CxyzYgX9A"],
                        ["oauth_signature_method", "HMAC-SHA1"],
                        ["oauth_timestamp", ""],
                        ["oauth_nonce", ""],
                        ["oauth_signature", ""]
                    ]
                  };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
//    alert(dumpJson(accessor));
//    alert(dumpJson(message));
    var parameterMap = OAuth.getParameterMap(message.parameters);
    for (var p in parameterMap) {
        if (p.substring(0, 6) == "oauth_"
         && form[p] != null && form[p].name != null && form[p].name != "")
        {
            form[p].value = parameterMap[p];
        }
    }
    //test for xmlhttprequest
    var url = "https://api.twitter.com/oauth/request_token";
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send(getFormData(form));
    alert("ready");
    request.onreadystatechange = function() {
  if (request.readyState == 4 && request.status == 200) {
    //受信完了時の処理
    var result = document.getElementById("result");
    var text = document.createTextNode(decodeURI(request.responseText));
    alert(text);
  }
}
    //end test
    return false;
};

function getFormData(form) {
  var value = '';
  for(var i = 0; i < form.elements.length; i++) {
    value += ('&' + form.elements[i].name + '=' + form.elements[i].value);
  }
  return value.substring(1);
}

var dumpJson = function(v, opts){
 var _opts={ksort:false, indent:false, funcsrc:false, undefined2str:false, maxDepth:10};
 for(var k in opts) _opts[k]=opts[k];
 var d=parseInt(_opts.maxDepth);
 _opts.maxDepth=(d>0)?(d<100)?d:100:1;

 var f1=(!!_opts.indent)?function(d){
  for(var s='\n', i=0; i<=d; i++) s+='  ';
  return s
 }:function(){ return ''; };

 var f2ps=[[/\\/g,"\\\\"],[/\n/g,"\\n"],[/\r/g ,"\\r"],[/\t/g,"\\t"],[/(")/g,"\\$1"]];
 var f2=function(v){
  for(var i=0;i<f2ps.length;i++) v=v.replace.apply(v,f2ps[i]);
  return v;
 }

 var fn=function(v,d){
  if(d>=_opts.maxDepth) throw 'depth '+_opts.maxDepth+' orver error.';
  if(null===v) return 'null';
  switch(typeof v){
   case 'undefined': return (!!_opts.undefined2str)?'"undefined"':'null';
   case 'boolean': return v?'true':'false';
   case 'function': v=(!!_opts.funcsrc)?v.toSource():'function()';
   case 'string': return '"'+f2(v)+'"';
   case 'object':
    var s=[];
    if(v instanceof Array){
     for(var i=0; i<v.length; i++) s.push(fn(v[i],d+1));
     return '['+f1(d)+s.join(','+f1(d))+f1(d-1)+']';
    }
    var ks=[];
    for(var k in v) ks.push(k);
    if(!!_opts.ksort) ks.sort();
    for(var i=0; i<ks.length; i++) s.push(fn(ks[i],d+1)+':'+fn(v[ks[i]],d+1));
    return '{'+f1(d)+s.join(','+f1(d))+f1(d-1)+'}';
  }
  return v;
 }
 return fn(v,0);
};

}