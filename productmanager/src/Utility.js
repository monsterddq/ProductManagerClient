var Utility = {
  url: "http://45.32.109.18/product",
  notice: function(className,content){
    return `<div class="alert ${className}" role="alert">
          ${content}
        </div>`;
  },
  paramsURL: function(url,id){
    url = url.substring(1);
    let a = [];
    a = url.split('&');
    let b = new Map();
    a.forEach((v,k)=>{
      b.set(v.split('=')[0],v.split('=')[1]);
    });
    return b;
  }
};


export default Utility;
