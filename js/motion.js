// Animasi muncul saat digulir. Halus dan dimatikan bila pengguna memilih "kurangi gerakan".
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!('IntersectionObserver' in window))return;
  var SEL=['main .head','main .tentang .pics','main .tentang .wrap>div','main .doa .wrap>*',
    '.next .wrap','.cols>.col','.romo-grid>.rm','.fgrid>article','.adorasi','.tl>li','.prio-h','.prio>li',
    '.grid3>article','.acc>.r','.note','.mcards>*','.mcard','.evlist>.ev','.newsgrid>.news','.empty',
    '.spirit .wrap>div','.kontak .wrap>div','.sakramen article','.sgrid>*'].join(',');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){var x=e.target;x.classList.add('in');io.unobserve(x);setTimeout(function(){x.style.setProperty('--d','0ms')},1100)}});
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  function tag(root){
    var list=(root.matches&&root.matches(SEL)?[root]:[]).concat([].slice.call(root.querySelectorAll?root.querySelectorAll(SEL):[]));
    list.forEach(function(el){
      if(el.classList.contains('rv')||el.closest('header'))return;
      // jeda bertahap untuk saudara sekelompok (maks. 4 langkah)
      var i=[].indexOf.call(el.parentNode.children,el);
      el.style.setProperty('--d',Math.min(i,4)*90+'ms');
      el.classList.add('rv');io.observe(el);
    });
  }
  tag(document.body);
  // konten yang dimuat dari data/*.json
  new MutationObserver(function(ms){
    ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)tag(n)})});
  }).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
})();
