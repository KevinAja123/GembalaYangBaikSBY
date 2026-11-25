(function(){
  function run(){
  var BLN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  var BLN_PANJANG=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  function p2(x){return (x<10?'0':'')+x}
  // tanggal hari ini di WIB (YYYY-MM-DD)
  var t=new Date(),w=new Date(t.getTime()+t.getTimezoneOffset()*60000+7*3600000);
  var today=w.getFullYear()+'-'+p2(w.getMonth()+1)+'-'+p2(w.getDate());

  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
  function parts(d){var a=d.split('-');return {y:a[0],m:+a[1]-1,d:+a[2]}}

  function eventCard(ev){
    var p=parts(ev.date),card=el('article','ev');
    var dt=el('div','dt');
    dt.appendChild(el('b',null,String(p.d)));
    dt.appendChild(el('span',null,BLN[p.m]));
    dt.appendChild(el('i',null,p.y));
    var body=el('div','evbody');
    body.appendChild(el('h3',null,ev.title));
    var meta=[ev.time,ev.place].filter(Boolean).join(' · ');
    if(meta)body.appendChild(el('p','meta',meta));
    if(ev.desc)body.appendChild(el('p','desc',ev.desc));
    card.appendChild(dt);card.appendChild(body);
    return card;
  }

  function empty(box,title,text){
    var d=el('div','empty');
    d.appendChild(el('h3',null,title));
    d.appendChild(el('p',null,text));
    var row=el('div','erow');
    [['Instagram @komsos.gyb','https://www.instagram.com/komsos.gyb/'],
     ['YouTube Paroki GYB','https://www.youtube.com/@parokigyb'],
     ['Facebook','https://www.facebook.com/parokigybsurabaya']].forEach(function(l){
      var a=el('a','link',l[0]);a.href=l[1];a.target='_blank';a.rel='noopener';row.appendChild(a);
    });
    d.appendChild(row);box.appendChild(d);
  }

  var all=(window.AGENDA||[]).slice();
  var up=all.filter(function(e){return e.date>=today}).sort(function(a,b){return a.date<b.date?-1:1});
  var past=all.filter(function(e){return e.date<today}).sort(function(a,b){return a.date<b.date?1:-1});

  var ag=document.getElementById('agendaList');
  if(ag){
    if(up.length)up.forEach(function(e){ag.appendChild(eventCard(e))});
    else empty(ag,'Belum ada agenda mendatang','Agenda terbaru akan tampil di sini. Untuk kabar terkini, ikuti media sosial paroki.');
  }
  var ar=document.getElementById('arsipList');
  if(ar){
    if(past.length)past.forEach(function(e){ar.appendChild(eventCard(e))});
    else ar.appendChild(el('p','meta','Belum ada arsip kegiatan.'));
  }

  var bl=document.getElementById('beritaList');
  if(bl){
    var news=(window.BERITA||[]).slice().sort(function(a,b){return a.date<b.date?1:-1});
    if(!news.length){empty(bl,'Belum ada berita','Berita paroki akan dipublikasikan di sini. Untuk kabar harian, ikuti media sosial paroki.');bl.className='';}
    news.forEach(function(n){
      var p=parts(n.date),c=el('article','news');
      c.appendChild(el('small',null,p.d+' '+BLN_PANJANG[p.m]+' '+p.y));
      c.appendChild(el('h3',null,n.title));
      if(n.text)c.appendChild(el('p',null,n.text));
      if(n.link){var a=el('a','link','Baca selengkapnya');a.href=n.link;a.target='_blank';a.rel='noopener';c.appendChild(a)}
      bl.appendChild(c);
    });
  }
  }
  Promise.all([loadData("agenda"),loadData("berita")]).then(function(r){window.AGENDA=r[0].items||[];window.BERITA=r[1].items||[];run()});
})();
