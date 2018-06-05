var X = XLSX;
var XW = {
  /* worker message */
  msg: 'xlsx',
  /* worker scripts */
  worker: './xlsxworker.js'
};

var global_wb;

var process_wb = (function() {
  var OUT = document.getElementById('out');
  var HTMLOUT = document.getElementById('htmlout');



  var to_json = function to_json(workbook) {
      $(".loading").show();
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
      var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(roa.length) result[sheetName] = roa;
    });
        var html1 ="Total records:"+result.Sheet1.length;
       $("#totalrecord").append(html1);
       //console.log(result.PROD[1][2]);
       //console.log(result)
      
        for(var i = 6;i<result.Sheet1.length;i++){
           if(result.Sheet1[i] != ""){
                var html = "<tr id='data-"+i+"'>";
               for(var j = 0 ; j < result.Sheet1[i].length ; j++){
                   if(JSON.stringify(result.Sheet1[i][j]) != undefined){
                    html +="<td id="+i+""+j+">"+result.Sheet1[i][j]+"</td>";
                   }
               } 
                html +="<td><button type='button' class='btn btn-success' onclick='addAppt(this)'>Add</button></td>"
                html +="</tr>";
                $("#clientDetails").append(html);
               $(".loading").hide();
           }
           
                
                
           
            
            //document.getElementById("myList").appendChild(node);
        }
        
        
        
    return JSON.stringify(result, 2, 2);
  };


  return function process_wb(wb) {
    global_wb = wb;
    var output = "";
    switch("json") {
      case "json": output = to_json(wb); break;
    }
    if(OUT.innerText === undefined) OUT.textContent = output;
    else OUT.innerText = output;
    if(typeof console !== 'undefined') console.log("output", new Date());
  };
})();

var setfmt = window.setfmt = function setfmt() { if(global_wb) process_wb(global_wb); };

var b64it = window.b64it = (function() {
  var tarea = document.getElementById('b64data');
  return function b64it() {
    if(typeof console !== 'undefined') console.log("onload", new Date());
    var wb = X.read(tarea.value, {type:'base64', WTF:false});
    process_wb(wb);
  };
})();

var do_file = (function() {
  var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
  var domrabs = document.getElementsByName("userabs")[0];
  if(!rABS) domrabs.disabled = !(domrabs.checked = false);

  var use_worker = typeof Worker !== 'undefined';
  var domwork = document.getElementsByName("useworker")[0];
  if(!use_worker) domwork.disabled = !(domwork.checked = false);

  var xw = function xw(data, cb) {
    var worker = new Worker(XW.worker);
    worker.onmessage = function(e) {
      switch(e.data.t) {
        case 'ready': break;
        case 'e': console.error(e.data.d);alert("Wrong File Format !!"); break;
        case XW.msg: cb(JSON.parse(e.data.d)); break;
      }
    };
    worker.postMessage({d:data,b:rABS?'binary':'array'});
  };

  return function do_file(files) {
    rABS = domrabs.checked;
    use_worker = domwork.checked;
    var f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
      var data = e.target.result;
      if(!rABS) data = new Uint8Array(data);
      if(use_worker) xw(data, process_wb);
      else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
    };
    if(rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  };
})();



(function() {
  var xlf = document.getElementById('xlf');
  if(!xlf.addEventListener) return;
  function handleFile(e) { do_file(e.target.files); }
  xlf.addEventListener('change', handleFile, false);
})();