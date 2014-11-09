var net = net || {};

(function () {

net.json = function(url)
{
  return net.ajax({
    url: url,
    method: "GET",
    responseType: "json",
  });
};

net.ajax = function(options)
{
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var async = true;
    xhr.open(options.method, options.url, async);
    xhr.responseType = options.responseType;
    xhr.onload = function() {
      if (xhr.status == 200) {
        if (options.responseType)
          resolve(xhr.response);
        else
          resolve(xhr.responseText);
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = function(error) {
      reject(error);
    };
    var data = options.data || null;
    if (data)
      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(data);
  });
};

})();
