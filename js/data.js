// Memuat file data (data/*.json). Konten website diubah lewat file-file ini
// (atau lewat panel admin /admin di Pages CMS).
(function(){
  var cache={};
  window.loadData=function(name){
    return cache[name]||(cache[name]=fetch('data/'+name+'.json').then(function(r){
      if(!r.ok)throw new Error(name);return r.json();
    }));
  };
  // "/images/x.jpg" (dari panel admin) -> "images/x.jpg" agar jalan di mana pun website dipasang
  window.imgSrc=function(p){return p?String(p).replace(/^\/+/,''):''};
})();
