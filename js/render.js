// Menampilkan konten dari data/*.json ke halaman.
(function(){
  var HARI=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
  function $(id){return document.getElementById(id)}
  function wibDay(){var t=new Date();return new Date(t.getTime()+t.getTimezoneOffset()*60000+7*3600000).getDay()}
  function img(src,alt,cls){var i=el('img',cls||'');i.src=imgSrc(src);i.alt=alt||'';i.loading='lazy';return i}
  function link(text,href,ext){var a=el('a',null,text);a.href=href;if(ext!==false){a.target='_blank';a.rel='noopener'}return a}
  function use(name,fn){loadData(name).then(fn).catch(function(){})}

  // foto utama beranda
  use('beranda',function(d){
    [['bnr','banner'],['fotoTentang','foto_tentang'],['fotoDoa','foto_doa']].forEach(function(p){
      var e=$(p[0]);if(e&&d[p[1]])e.src=imgSrc(d[p[1]]);
    });
  });

  // jadwal misa
  use('jadwal-misa',function(d){
    var today=wibDay();
    [$('misaCols')].forEach(function(box){
      if(!box)return;
      box.textContent='';
      d.items.forEach(function(g){
        var col=el('div','col');col.appendChild(el('h3',null,g.judul));
        var ul=el('ul');
        (g.jam||[]).forEach(function(j){
          var li=el('li'),days=(j.hari||[]).map(function(n){return HARI.indexOf(n)});
          if(days.indexOf(today)>-1)li.className='today';
          li.appendChild(el('span',null,j.label));li.appendChild(el('b',null,j.waktu));ul.appendChild(li);
        });
        col.appendChild(ul);
        if(g.catatan)col.appendChild(el('p','n',g.catatan));
        box.appendChild(col);
      });
    });
  });

  // romo (klik untuk melihat profil)
  use('romo',function(d){
    var box=$('romoGrid');if(!box)return;box.textContent='';
    d.items.forEach(function(r){
      var f=el('figure','rm');f.appendChild(img(r.foto,r.nama));
      var c=el('figcaption');c.appendChild(el('b',null,r.nama));c.appendChild(el('span',null,r.jabatan));
      if(r.profil&&r.profil.length){
        c.appendChild(el('em','more','Lihat profil'));
        f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','Lihat profil '+r.nama);
        f.addEventListener('click',function(){openProfil(r)});
        f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openProfil(r)}});
      }
      f.appendChild(c);box.appendChild(f);
    });
  });
  function openProfil(r){
    var dlg=$('profil');if(!dlg)return;
    var p=$('pfBody');p.textContent='';
    var im=$('pfImg');im.src=imgSrc(r.foto);im.alt=r.nama;
    $('pfName').textContent=r.nama;$('pfRole').textContent=r.jabatan;
    (r.profil||[]).forEach(function(s){
      var sec=el('section','pfsec');sec.appendChild(el('h4',null,s.judul));
      var dl=el('dl');
      (s.baris||[]).forEach(function(b){dl.appendChild(el('dt',null,b.label));dl.appendChild(el('dd',null,b.isi))});
      sec.appendChild(dl);p.appendChild(sec);
    });
    dlg.showModal();document.body.style.overflow='hidden';dlg.scrollTop=0;
  }
  (function(){
    var dlg=$('profil');if(!dlg)return;
    function close(){dlg.close()}
    dlg.addEventListener('close',function(){document.body.style.overflow=''});
    $('pfClose').addEventListener('click',close);
    dlg.addEventListener('click',function(e){if(e.target===dlg)close()});
  })();

  // fasilitas
  use('fasilitas',function(d){
    var box=$('fasGrid');if(!box)return;box.textContent='';
    d.items.forEach(function(x){
      var a=el('article');a.appendChild(img(x.foto,x.nama));
      a.appendChild(el('h3',null,x.nama));a.appendChild(el('p',null,x.deskripsi));box.appendChild(a);
    });
  });

  // ruang adorasi
  use('adorasi',function(d){
    if(!$('adorasi'))return;
    var i=$('adImg');if(i&&d.foto)i.src=imgSrc(d.foto);
    var v=$('adVerse');
    if(v){v.textContent='“'+d.ayat+'” ';v.appendChild(el('cite',null,d.rujukan))}
    var r=$('adRules');
    if(r){r.textContent='';(d.tata_tertib||[]).forEach(function(t){r.appendChild(el('li',null,t))})}
    [['adJam','jam','jam_catatan'],['adLokasi','lokasi','lokasi_catatan']].forEach(function(p){
      var e=$(p[0]);if(!e)return;e.textContent='';
      e.appendChild(el('b',null,d[p[1]]));e.appendChild(document.createElement('br'));
      e.appendChild(document.createTextNode(d[p[2]]||''));
    });
  });

  // rekening donasi
  use('rekening',function(d){
    var box=$('accList');if(!box)return;box.textContent='';
    d.items.forEach(function(x){
      var r=el('div','r'),t=el('div');
      t.appendChild(el('h3',null,x.judul));t.appendChild(el('p',null,x.keterangan));
      var no=el('div','no');no.appendChild(el('small',null,x.bank));no.appendChild(document.createTextNode(x.nomor));
      var b=el('button',null,'Salin');b.type='button';b.dataset.copy=String(x.nomor).replace(/\D/g,'');
      r.appendChild(t);r.appendChild(no);r.appendChild(b);box.appendChild(r);
    });
    var n=$('accNote');if(n)n.textContent=d.catatan||'';
  });

  // kontak
  use('kontak',function(d){
    var dl=$('kontakList');if(!dl)return;dl.textContent='';
    d.items.forEach(function(k){
      dl.appendChild(el('dt',null,k.label));
      var dd=el('dd');
      (k.isi||[]).forEach(function(x,n){
        if(n)dd.appendChild(document.createElement('br'));
        dd.appendChild(x.link?link(x.teks,x.link,!/^(tel|mailto):/.test(x.link)):document.createTextNode(x.teks));
        if(x.catatan){dd.appendChild(document.createTextNode(' '));dd.appendChild(el('span','sub-note',x.catatan))}
      });
      dl.appendChild(dd);
    });
  });
})();
