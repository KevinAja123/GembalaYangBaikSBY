(function(){
  var hd=document.querySelector('header.nav'),
      b=document.querySelector('.burger'),
      n=document.getElementById('nav');

  // menu ponsel
  b.addEventListener('click',function(){
    var o=n.classList.toggle('open');
    hd.classList.toggle('open',o);
    b.setAttribute('aria-expanded',o);
  });
  n.addEventListener('click',function(e){
    if(e.target.closest('a')){n.classList.remove('open');hd.classList.remove('open');b.setAttribute('aria-expanded',false)}
  });

  // navbar adaptif: warna mengikuti bagian halaman di bawahnya
  var blocks=[].slice.call(document.querySelectorAll('[data-nav]'));
  function rgba(c){var m=c.match(/[\d.]+/g);return m?m.map(Number):[0,0,0,0]}
  function adapt(){
    var r=hd.getBoundingClientRect(),y=r.top+r.height/2,el=null;
    for(var i=0;i<blocks.length;i++){
      var br=blocks[i].getBoundingClientRect();
      if(br.top<=y&&br.bottom>y){el=blocks[i];break}
    }
    var dark=!el||el.dataset.nav!=='light';
    if(!el)dark=false;
    var scrolled=window.scrollY>8;
    var c=el?rgba(getComputedStyle(el).backgroundColor):[0,0,0,0];
    var tint;
    if(c[3]===undefined||c[3]===0||(c.length===4&&c[3]===0)){
      // bagian bergambar (tanpa warna solid): transparan di puncak halaman
      tint=scrolled?(dark?'rgba(8,22,63,.45)':'rgba(255,255,255,.7)'):'transparent';
    }else{
      tint='rgba('+c[0]+','+c[1]+','+c[2]+',.8)';
    }
    hd.style.setProperty('--nav-bg',tint);
    hd.classList.toggle('on-dark',dark);
    hd.classList.toggle('on-light',!dark);
    hd.classList.toggle('scrolled',scrolled);
  }
  window.addEventListener('scroll',adapt,{passive:true});
  window.addEventListener('resize',adapt);
  adapt();

  // misa berikutnya (WIB), dihitung dari data/jadwal-misa.json
  var HARI=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  function p2(x){return (x<10?'0':'')+x}
  function wibNow(){var t=new Date();return new Date(t.getTime()+t.getTimezoneOffset()*60000+7*3600000)}
  var S={0:[],1:[],2:[],3:[],4:[],5:[],6:[]};
  function nextMass(w){
    for(var d=0;d<8;d++){
      var day=new Date(w.getFullYear(),w.getMonth(),w.getDate()+d),l=S[day.getDay()];
      for(var i=0;i<l.length;i++){var c=new Date(day.getFullYear(),day.getMonth(),day.getDate(),l[i][0],l[i][1]);if(c>w)return c}
    }
  }
  var ntEl=document.getElementById('nt'),cdEl=document.getElementById('cd'),target;
  function tick(){
    var w=wibNow();
    if(!target||target<=w){target=nextMass(w);if(!target)return;
      ntEl.textContent=HARI[target.getDay()]+', '+target.getDate()+'/'+(target.getMonth()+1)+', '+p2(target.getHours())+'.'+p2(target.getMinutes())+' WIB'}
    var s=Math.max(0,Math.floor((target-w)/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);
    cdEl.textContent=(d?d+' hari ':'')+h+' jam '+m+' menit lagi';
  }
  if(ntEl&&cdEl){
    loadData('jadwal-misa').then(function(d){
      d.items.forEach(function(g){(g.jam||[]).forEach(function(j){
        var t=String(j.waktu).split(/[.:]/);
        (j.hari||[]).forEach(function(n){var k=HARI.indexOf(n);if(k>-1)S[k].push([+t[0],+t[1]||0])});
      })});
      for(var k in S)S[k].sort(function(a,b){return a[0]*60+a[1]-b[0]*60-b[1]});
      tick();setInterval(tick,30000);
    }).catch(function(){ntEl.textContent='lihat jadwal'});
  }

  // salin nomor rekening
  document.addEventListener('click',function(e){
    var btn=e.target.closest&&e.target.closest('button[data-copy]');if(!btn)return;
    var v=btn.dataset.copy,done=function(){btn.textContent='Tersalin';setTimeout(function(){btn.textContent='Salin'},1600)};
    try{navigator.clipboard.writeText(v).then(done,function(){btn.textContent=v})}catch(err){btn.textContent=v}
  });

  // Google Maps. Ubah EMBED_MAP menjadi true bila website dipasang di domain sendiri
  // (di pratinjau artifact, bingkai situs lain diblokir sehingga peta tidak bisa tampil).
  var EMBED_MAP=true;
  var mb=document.getElementById('mapbox');
  if(mb&&EMBED_MAP){var f=mb.querySelector('iframe');f.src=f.dataset.src;mb.classList.add('live')}
  var MAPS_URL='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Gereja Gembala Yang Baik, Jl. Jemur Andayani X No.14, Siwalankerto, Surabaya 60237');
  ['mapsLink','mapsBtn'].forEach(function(id){var a=document.getElementById(id);if(a)a.href=MAPS_URL});
})();
