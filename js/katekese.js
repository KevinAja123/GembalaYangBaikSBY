// Katekese: tanya jawab dari data/katekese.json, dengan pencarian.
(function(){
  var list=document.getElementById('katList'),input=document.getElementById('kq'),chips=document.getElementById('kChips');
  if(!list)return;
  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
  var DATA=[];
  function src(label,text){var d=el('div');d.appendChild(el('b',null,label));d.appendChild(document.createTextNode(' '+text));return d}
  function render(q){
    q=(q||'').trim().toLowerCase();list.textContent='';var n=0;
    DATA.forEach(function(k,ki){
      var its=k.items.filter(function(i){
        return !q||[i.pertanyaan,i.jawaban,i.kitab_suci,i.tradisi,i.magisterium].join(' ').toLowerCase().indexOf(q)>-1});
      if(!its.length)return;
      var cat=el('div','kcat');cat.id='kat-'+k.id;
      var hd=el('div','kcat-h');hd.appendChild(el('span','kno',String(ki+1).padStart(2,'0')));
      var t=el('div');t.appendChild(el('h3',null,k.nama));t.appendChild(el('p',null,k.deskripsi));hd.appendChild(t);cat.appendChild(hd);
      its.forEach(function(i){
        n++;
        var d=el('details');if(q)d.open=true;
        d.appendChild(el('summary',null,i.pertanyaan));
        var b=el('div','kbody');b.appendChild(el('p','kans',i.jawaban));
        var s=el('div','ksrc');s.appendChild(src('Kitab Suci',i.kitab_suci));s.appendChild(src('Tradisi',i.tradisi));s.appendChild(src('Magisterium',i.magisterium));
        b.appendChild(s);d.appendChild(b);cat.appendChild(d);
      });
      list.appendChild(cat);
    });
    if(!n)list.appendChild(el('p','kempty','Pertanyaan tidak ditemukan. Coba kata kunci lain.'));
  }
  loadData('katekese').then(function(d){
    DATA=d.kategori||[];
    DATA.forEach(function(k){
      var a=el('a',null,k.nama);a.href='#kat-'+k.id;
      a.addEventListener('click',function(e){
        e.preventDefault();input.value='';render('');
        var t=document.getElementById('kat-'+k.id);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
      });
      chips.appendChild(a);
    });
    render('');
  }).catch(function(){list.appendChild(el('p','kempty','Katekese belum dapat dimuat.'))});
  input.addEventListener('input',function(){render(input.value)});
})();
