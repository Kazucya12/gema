var $=function(i){return document.getElementById(i)},S=[],cur=0,t=0,playing=false,tm,tabs=["home","explore","lib","profile"];
function go(id){document.querySelectorAll(".scr").forEach(function(s){s.classList.remove("on");s.style.display=""});$(id).classList.add("on");$("tab").classList.toggle("on",tabs.indexOf(id)>-1);document.querySelectorAll("#tab [data-s]").forEach(function(s){s.classList.toggle("a",s.dataset.s==id)});$(id).scrollTop=0}
function row(i){return '<div class="song" onclick="play('+i+')"><div class="cov" style="--h:'+(i*47%360)+';width:48px;height:48px"></div><div><b>'+S[i][0]+'</b><span class="mut">'+S[i][1]+'</span></div><button class="pb">&#9654;</button></div>'}
function who(n){$("pn").textContent=n;$("ph").textContent="@"+n.toLowerCase().replace(/\s+/g,"");$("sn").textContent=n}
function guest(){who("Pengunjung");go("home")}
var reg=0,ACC=(function(){try{return JSON.parse(localStorage.getItem('ma_acc')||'{}')}catch(e){return{}}})();
function saveAcc(){try{localStorage.setItem('ma_acc',JSON.stringify(ACC))}catch(e){}}
function hs(s){var x=5381;for(var i=0;i<s.length;i++)x=(x*33)^s.charCodeAt(i);return String(x>>>0)}
function idOk(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||/^(\+62|62|0)8\d{8,11}$/.test(v.replace(/[\s-]/g,''))}
function norm(v){return v.indexOf('@')>-1?v.toLowerCase():v.replace(/[\s-]/g,'').replace(/^(\+62|62)/,'0')}
function mode(){reg=!reg;$('cf').style.display=reg?'flex':'none';$('lb').textContent=reg?'Daftar':'Masuk';$('tgm').textContent=reg?'Sudah punya akun? Masuk':'Daftar Akun';$('err').textContent=''}
function soc(){$('err').textContent='Masuk dengan Google/Apple/X belum tersedia. Gunakan email/nomor HP atau Pengunjung.'}
function forgot(){var v=$('em').value.trim();if(!idOk(v)){$('err').textContent='Isi email/nomor HP yang valid dulu.';return}var k=norm(v);if(!ACC[k]){$('err').textContent='Akun belum terdaftar.';return}if(confirm('Reset akun ini? Akun dihapus dari perangkat dan kamu perlu mendaftar ulang.')){delete ACC[k];saveAcc();if(reg)mode();$('err').textContent='Akun direset. Silakan daftar ulang.'}}
function login(){var v=$('em').value.trim(),p=$('pw').value,e=$('err');
if(!v||!p){e.textContent='Isi email/nomor HP dan password.';return}
if(!idOk(v)){e.textContent='Email atau nomor HP tidak valid.';return}
if(p.length<6){e.textContent='Password minimal 6 karakter.';return}
var k=norm(v);
if(reg){if(p!=$('pw2').value){e.textContent='Konfirmasi password tidak sama.';return}if(ACC[k]){e.textContent='Akun sudah terdaftar. Silakan masuk.';return}ACC[k]={h:hs(p)};saveAcc()}
else{if(!ACC[k]){e.textContent='Akun belum terdaftar. Tekan Daftar Akun.';return}if(ACC[k].h!=hs(p)){e.textContent='Password salah.';return}}
e.textContent='';who(k.split('@')[0]);go('home')}
function editName(){var n=prompt("Nama tampilan:",$("pn").textContent);if(n&&n.trim())who(n.trim())}
function ui(){var m=Math.floor(t/60),s=t%60;$("t1").textContent=("0"+m).slice(-2)+":"+("0"+s).slice(-2);$("seek").value=t;$("pp").innerHTML=playing?"&#10074;&#10074;":"&#9654;";$("mp").innerHTML=playing?"&#10074;&#10074;":"&#9654;";$("pt").textContent=S[cur][0];$("pa").textContent=S[cur][1]}
function play(i){cur=i;t=0;playing=true;ui();go("player");run()}
function run(){clearInterval(tm);tm=setInterval(function(){if(!playing)return;t++;if(t>=272){if($("rep").classList.contains("a"))t=0;else nx(1)}ui()},1000)}
function tgl(){playing=!playing;ui()}
function nx(d){cur=$("shf").classList.contains("a")?Math.floor(Math.random()*S.length):(cur+d+S.length)%S.length;t=0;ui()}
function tg(b){b.classList.toggle("a");if(b.id=="fav")b.innerHTML=b.classList.contains("a")?"&#9829;":"&#9825;"}
function srch(){var v=$("q").value.toLowerCase();$("sres").innerHTML=v?S.map(function(s,i){return s[0].toLowerCase().indexOf(v)>-1||s[1].toLowerCase().indexOf(v)>-1?row(i):""}).join("")||'<p class="mut">Tidak ditemukan.</p>':""}
function lt(b){b.parentNode.querySelectorAll(".chip").forEach(function(c){c.classList.remove("on")});b.classList.add("on");var k=b.textContent,r=k=="Playlist"?[5,6,7,4,3]:k=="Favorit"?[3,0,1]:[2,4];$("libl").innerHTML=r.map(row).join("")}
function addPl(){S.push(["Playlist Baru "+(S.length-7),"0 Lagu"]);lt(document.querySelector("#lib .chip.on"));alert("Playlist baru dibuat")}
function preset(v){var p={c:[40,25,50,70,60],b:[90,75,40,35,30],v:[30,45,75,70,50],f:[50,50,50,50,50]}[v];document.querySelectorAll("#eqb input").forEach(function(e,i){e.value=p[i]})}


$("ech").innerHTML=["Untukmu","Top 100","Genre","Mood"].map(function(c,i){return '<span class="chip'+(i?"":" on")+'" onclick="this.parentNode.querySelectorAll(\'.chip\').forEach(function(x){x.classList.remove(\'on\')});this.classList.add(\'on\')">'+c+'</span>'}).join("");
$("eqb").innerHTML=["60Hz","230Hz","910Hz","3.6kHz","14kHz"].map(function(f){return '<div><input type="range" min="0" max="100" value="50">'+f+'</div>'}).join("");preset("c");

for(var i=0,w="";i<48;i++)w+='<i style="height:'+(8+Math.abs(Math.sin(i*.7))*28)+'px"></i>';$("wave").innerHTML=w;
document.getElementById("splash").style.display="block";
var au=new Audio(),ok=0,asked=0;
function fmt(s){s=Math.floor(s||0);return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}
function esc(x){return String(x).replace(/[&<>]/g,function(c){return '&#'+c.charCodeAt(0)+';'})}
function row(i){return '<div class="song" onclick="play('+i+')"><div class="cov" style="--h:'+(i*47%360)+';width:48px;height:48px'+(S[i].img?";background-image:url('"+S[i].img+"');background-size:cover":'')+'"></div><div><b>'+esc(S[i][0])+'</b><span class="mut">'+esc(S[i][1])+'</span></div><button class="pb">&#9654;</button></div>'}
function empty(){return '<div class="card" style="text-align:center"><p class="mut">Belum ada lagu.</p><div class="btn p" onclick="askPerm()">Impor Lagu</div></div>'}
function ui(){lyrSync();$('sc').textContent=S.length;$('sf').textContent=S.filter(function(s){return s.fav}).length;var s=S[cur],d=au.duration||0;t=au.currentTime||0;$('pt').textContent=s?s[0]:'Belum ada lagu';$('bg').style.backgroundImage=s&&s.img?"url('"+s.img+"')":'';$('bg').style.backgroundSize='cover';$('pa').textContent=s?s[1]:'Impor lagu untuk mulai';$('seek').max=d||1;$('seek').value=t;$('t1').textContent=fmt(t);$('t2').textContent=fmt(d);var c=playing?'&#10074;&#10074;':'&#9654;';$('pp').innerHTML=c;$('mp').innerHTML=c;var f=$('fav');f.classList.toggle('a',!!(s&&s.fav));f.innerHTML=f.classList.contains('a')?'&#9829;':'&#9825;'}
function load(i){cur=i;au.src=S[i][2];au.play();getLy(i)}
function play(i){if(!S[i]){askPerm();return}load(i);go('player')}
function tgl(){if(!S.length){askPerm();return}au.paused?au.play():au.pause()}
function nx(d){if(!S.length)return;load($('shf').classList.contains('a')?Math.floor(Math.random()*S.length):(cur+d+S.length)%S.length)}
function run(){}
function tg(b){b.classList.toggle('a');if(b.id=='fav'&&S[cur])S[cur].fav=b.classList.contains('a');ui()}
function lt(b){b.parentNode.querySelectorAll('.chip').forEach(function(c){c.classList.remove('on')});b.classList.add('on');var k=b.textContent,L=S.map(function(_,i){return i}).filter(function(i){return k!='Favorit'||S[i].fav});$('libl').innerHTML=L.length?L.map(row).join(''):(S.length?'<p class="mut">Belum ada lagu favorit.</p>':empty())}
function render(){$('trend').innerHTML=S.length?S.slice(0,4).map(function(_,i){return row(i)}).join(''):empty();lt(document.querySelector('#lib .chip.on'));srch();ui()}
function askPerm(){if(ok)$('fi').click();else $('dlg').style.display='flex'}
function allow(){ok=1;$('dlg').style.display='none';$('fi').click()}
// ===== KONFIGURASI API TheAudioDB =====
// Utama lewat server perantara /api/tracks (Vercel); kunci API disimpan di Environment Variables. Cadangan: langsung ke v1.
var API={proxy:'/api/tracks',jamendo:'/api/jamendo',v1:'https://www.theaudiodb.com/api/v1/json',key:'123'};
async function apiTracks(q){var e=encodeURIComponent(q);if(API.proxy){try{var r0=await fetch(API.proxy+'?q='+e);if(r0.ok){var j0=await r0.json();return j0.track||[]}}catch(z){}}var r=await fetch(API.v1+'/'+API.key+'/track-top10.php?s='+e),j=await r.json();return j.track||[]}
var ot,OT=[];
function mv(i){var u=OT[i]&&OT[i].strMusicVid;if(u)window.open(u,'_blank');else alert('Video tidak tersedia untuk lagu ini.')}
var JT=[],IT=[];
var SRC={jamendo:false,itunes:true};
async function apiJamendo(q){try{var r=await fetch(API.jamendo+'?q='+encodeURIComponent(q));if(!r.ok)return[];var j=await r.json();return j.tracks||[]}catch(z){return[]}}
async function apiItunes(q){try{var r=await fetch('https://itunes.apple.com/search?media=music&entity=song&limit=15&term='+encodeURIComponent(q));if(!r.ok)return[];var j=await r.json();return(j.results||[]).filter(function(o){return o.previewUrl}).map(function(o){return{id:'it'+o.trackId,name:o.trackName,artist:o.artistName,audio:o.previewUrl.replace(/^http:/,'https:'),image:(o.artworkUrl100||'').replace('100x100','300x300'),duration:30}})}catch(z){return[]}}
function playOn(i,src){var o=(src=='it'?IT:JT)[i];if(!o)return;var k=-1;S.forEach(function(s,n){if(s.jid==o.id)k=n});if(k<0){var s=[o.name,o.artist,o.audio];s.jid=o.id;s.img=o.image;S.push(s);k=S.length-1;render()}play(k)}
function onl(){clearTimeout(ot);var v=$('q').value.trim(),el=$('sonl');if(v.length<3){el.innerHTML='';return}el.innerHTML='<p class="mut" style="margin-top:12px">Mencari online...</p>';ot=setTimeout(async function(){var a=await Promise.all([SRC.jamendo?apiJamendo(v):[],apiTracks(v).catch(function(){return[]}),SRC.itunes?apiItunes(v):[]]);if($('q').value.trim()!=v)return;JT=a[0];OT=a[1];IT=a[2];var h='';if(IT.length)h+='<div class="sec"><h2>Preview Online (iTunes, 30 detik)</h2></div>'+IT.map(function(o,i){return '<div class="song" onclick="playOn('+i+',\'it\')"><div class="cov" style="--h:'+(i*47%360)+';width:48px;height:48px;'+(o.image?"background-image:url('"+o.image+"');background-size:cover":'')+'"></div><div><b>'+esc(o.name)+'</b><span class="mut">'+esc(o.artist+' - '+fmt(o.duration))+'</span></div><button class="pb">&#9654;</button></div>'}).join('');if(JT.length)h+='<div class="sec"><h2>Lagu Online (Jamendo)</h2></div>'+JT.map(function(o,i){return '<div class="song" onclick="playOn('+i+',\'jm\')"><div class="cov" style="--h:'+(i*47%360)+';width:48px;height:48px;'+(o.image?"background-image:url('"+o.image+"');background-size:cover":'')+'"></div><div><b>'+esc(o.name)+'</b><span class="mut">'+esc(o.artist+' - '+fmt(o.duration))+'</span></div><button class="pb">&#9654;</button></div>'}).join('');if(OT.length)h+='<div class="sec"><h2>Info dari TheAudioDB</h2></div>'+OT.map(function(o,i){var d=Math.round((+o.intDuration||0)/1000);return '<div class="song" onclick="mv('+i+')"><div class="cov" style="--h:'+(i*60+200)+';width:48px;height:48px"></div><div><b>'+esc(o.strTrack)+'</b><span class="mut">'+esc(o.strArtist+' - '+(o.strAlbum||''))+(d?' - '+fmt(d):'')+'</span></div><button class="pb">&#9654;</button></div>'}).join('');el.innerHTML=h||'<p class="mut" style="margin-top:12px">Tidak ada hasil online.</p>'},500)}
var ac=-1;
function base(n){return n.replace(/\.[^.]+$/,'')}
function tl(){var s=$('lyr').style.display=='none';$('lyr').style.display=s?'block':'none';$('lt').innerHTML=(s?'Sembunyikan':'Tampilkan')+' &#8964;'}
function parseLrc(x){var o=[],pl=[];x.split(/\r\n|\r|\n/).forEach(function(l){if(/^\s*\[(ar|ti|al|by|offset|length|re|ve):/i.test(l))return;var ts=[],tx=l.replace(/\[(\d+):(\d+(?:[.:]\d+)?)\]/g,function(a,mi,sc){ts.push(+mi*60+parseFloat(sc.replace(':','.')));return ''}).trim();if(ts.length)ts.forEach(function(t){o.push({t:t,x:tx})});else if(tx)pl.push({t:null,x:tx})});return o.length?o.sort(function(a,b){return a.t-b.t}):pl}
async function id3(f){try{var b=new Uint8Array(await f.slice(0,1048576).arrayBuffer());if(String.fromCharCode(b[0],b[1],b[2])!='ID3')return;var v=b[3],p=10,end=Math.min(10+((b[6]<<21)|(b[7]<<14)|(b[8]<<7)|b[9]),b.length);while(p+10<end){var id=String.fromCharCode(b[p],b[p+1],b[p+2],b[p+3]);if(!/^[A-Z0-9]{4}$/.test(id))break;var n=v==4?((b[p+4]<<21)|(b[p+5]<<14)|(b[p+6]<<7)|b[p+7]):(((b[p+4]<<24)|(b[p+5]<<16)|(b[p+6]<<8)|b[p+7])>>>0);if(id=='USLT'){var d=b.subarray(p+10,p+10+n),e=d[0],q=4;if(e==1||e==2){while(q+1<d.length&&(d[q]||d[q+1]))q+=2;q+=2}else{while(q<d.length&&d[q])q++;q++}var c=['iso-8859-1','utf-16le','utf-16be','utf-8'][e]||'utf-8';if(e==1&&d[q]==254)c='utf-16be';return new TextDecoder(c).decode(d.subarray(q))}p+=10+n}}catch(z){}}
async function getLy(i){var s=S[i];ac=-1;if(s.ly||s.busy){lyrDraw();return}s.busy=1;lyrDraw();var x=s.f&&await id3(s.f);if(x&&x.trim()){s.ly=parseLrc(x)}else{try{var r=await fetch('https://lrclib.net/api/search?q='+encodeURIComponent(s[0].replace(/_+/g,' '))),j=await r.json(),h=j.filter(function(o){return o.syncedLyrics||o.plainLyrics})[0];if(h){s.ly=parseLrc(h.syncedLyrics||h.plainLyrics);if(h.artistName)s[1]=h.artistName}}catch(z){}}s.busy=0;s.tried=1;if(cur==i){ac=-1;lyrDraw();render()}}
function lyrDraw(){var s=S[cur],el=$('lyr');el.scrollTop=0;if(!s){el.innerHTML='Belum ada lagu.';return}if(s.ly&&s.ly.length)el.innerHTML=s.ly.map(function(l,i){return '<div class="l" id="l'+i+'">'+(l.x?esc(l.x):'&#9834;')+'</div>'}).join('');else el.innerHTML=s.busy?'Mencari lirik...':'Lirik tidak ditemukan.<br>Impor file .lrc dengan nama sama seperti lagunya.'}
function lyrSync(){var s=S[cur];if(!s||!s.ly||!s.ly[0]||s.ly[0].t==null)return;var tt=au.currentTime,k=-1;for(var i=0;i<s.ly.length;i++){if(s.ly[i].t<=tt)k=i;else break}if(k==ac)return;ac=k;var o=document.querySelector('#lyr .l.on');if(o)o.classList.remove('on');var n=$('l'+k);if(n){n.classList.add('on');$('lyr').scrollTop=Math.max(0,n.offsetTop-50)}}
function addFiles(fl){var A=Array.prototype.slice.call(fl),isL=function(f){return /\.(lrc|txt)$/i.test(f.name)};A.forEach(function(f){if(!isL(f)){var s=[base(f.name),'Di perangkat',URL.createObjectURL(f)];s.b=base(f.name).toLowerCase();s.f=f;S.push(s)}});A.forEach(function(f){if(isL(f)){var k=base(f.name).toLowerCase();f.text().then(function(x){S.forEach(function(s){if(s.b==k){s.ly=parseLrc(x);s.tried=1}});ac=-1;lyrDraw()})}});$('fi').value='';render()}
au.ontimeupdate=au.onloadedmetadata=au.onplay=au.onpause=function(){playing=!au.paused;ui()};
au.onended=function(){if($('rep').classList.contains('a')){au.currentTime=0;au.play()}else nx(1)};
var _go=go;go=function(id){_go(id);if(id=='home'&&!asked&&!S.length){asked=1;askPerm()}};
render();
