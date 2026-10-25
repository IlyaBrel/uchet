/* Наряд-допуск: бланк Excel, бригада, допуск по дням, шаблоны. Отдельный модуль — если не загрузится, приложение работает как раньше. */
(function(){
'use strict';

const I18N={ru:{
 pt_title:'Бланк наряда',pt_open:'Бланк, бригада, допуск',pt_excel:'Скачать Excel',pt_new_tpl:'Новый по шаблону',
 pt_sec_main:'Наряд',pt_sec_resp:'Ответственные',pt_sec_team:'Бригада',pt_sec_hot:'Огневые работы',pt_sec_daily:'Допуск по дням',
 pt_num:'Номер',pt_from:'Дата выдачи',pt_days:'Дней',pt_t1:'Начало',pt_t2:'Окончание',pt_desc:'Описание работ',pt_place:'Место работ',pt_regl:'Работы по (ППР, регламент)',
 pt_head:'Руководитель работ',pt_exec:'Ответственный исполнитель (вы)',pt_issuer:'Наряд выдал',pt_hse:'Специалист по ОТ',
 pt_cyr:'ФИО кириллицей',pt_lat:'Латиницей',pt_pos:'Должность',pt_lat_auto:'латиница — сама',
 pt_people:n=>`${n} чел.`,pt_pick:'Выбрать людей',pt_fix:'Зафиксировать состав',pt_fixed:d=>`Состав зафиксирован ${d}`,
 pt_fix_hint:'Пока состав не зафиксирован, его можно менять свободно. После фиксации каждое изменение попадёт в п.15 с датой и временем. Состав фиксируется сам при первой выгрузке Excel.',
 pt_chg:(c,n,p)=>`Изменено ${c} из ${n} · ${p}%`,pt_chg_lim:m=>`можно ещё ${m}`,pt_chg_over:'Больше 50% — нужен новый наряд',
 pt_in:'Введён',pt_out:'Выведен',pt_log:'Изменения состава (п.15)',pt_log_none:'Изменений нет',pt_max:n=>`В бланке ${n} строк — лишние не попадут`,
 pt_hot_on:'Огневой наряд в файле',pt_hot_num:'№ огневого наряда',pt_hot_desc:'Описание огневых работ',pt_hot_unit:'Подразделение',pt_hot_resp:'Ответственный за проведение огневых',
 pt_hot_team:'Бригада огневых',pt_hot_same:'Взять всех из бригады',
 pt_d_s:'Начало',pt_d_l:'Обед',pt_d_e:'Конец',pt_d_off:'не работали',pt_d_plan:'по плану',
 pt_save_tpl:'Сохранить как шаблон',pt_tpl_name:'Название шаблона',pt_tpl_saved:'Шаблон сохранён',pt_tpls:'Шаблоны нарядов',pt_tpl_del:'Удалить шаблон',
 pt_choose_tpl:'Выберите шаблон',pt_new_num:'Номер нового наряда',
 pt_fixed_now:'Состав бригады зафиксирован — дальше изменения пойдут в п.15',pt_err:'Не удалось собрать файл: ',pt_no_tpl:'Бланк не загрузился — откройте приложение с интернетом один раз',
 pt_today:'Допуск',pt_today_set:k=>({s:'Время начала',l:'Время обеда',e:'Время окончания'})[k],pt_clear:'Очистить',
 pt_notin:n=>`Работают, но не в бригаде наряда: ${n}`,pt_add_them:'Ввести в бригаду',
 pt_sel_all_today:'Все на смене',pt_sel_group:'Моя группа',pt_sel_none:'Снять все',pt_no_h:'нет допуска на высоту',pt_no_lat:'нет латиницы',
 pt_doc_name:'ФИО для бланков (по-русски)',pt_doc_lat:'',pt_doc_hint:'Так человек будет записан в нарядах и листах ТБ. Пусто — берётся имя из карточки.',
 pt_my_pos:'Моя должность',pt_fio:'ФИО',pt_unit_head:'Руководитель подразделения',
 pt_sec_print:'Листы для печати',pt_print_n:(a,b)=>`${a} из ${b}`,pt_date:'Дата',pt_print_hint:'Снятые листы скрываются в файле и не печатаются. «Дата» выключена — в листе дата останется пустой, впишете ручкой.',
 pt_sh_s1:'Наряд-допуск',pt_sh_s2:'Ежедневный допуск',pt_sh_s3:'Инструктаж (TBT)',pt_sh_s4:'ППРВ — работы на высоте',pt_sh_s5:'ПСЭР — план спасения',pt_sh_s6:'Приложение № 1 — первая помощь',pt_sh_s7:'ЛО ПСЭР — лист ознакомления',pt_sh_s8:'Наряд на огневые работы',
 pt_sec_lists:'Инструктажи и подписи',pt_l_tbt1:'Инструктаж TBT — лист 1',pt_l_tbt2:'Инструктаж TBT — лист 2',pt_l_lo:'ЛО ПСЭР — ознакомление с планом спасения',pt_l_same:'Как в бригаде',pt_l_own:'Свой список',pt_l_people:'Люди',pt_l_add:'Вписать',pt_l_add_q:'ФИО (как писать в листе)',pt_l_only:'Только этот лист',pt_l_max:'В листе 36 строк',pt_l_hint:'Каждый лист печатается и настраивается отдельно. «Только этот лист» — файл с одним этим листом, без наряда.',
 pt_f_work:n=>`На работе · ${n}`,pt_f_all:n=>`Все · ${n}`,pt_sel_work:'Отметить всех на работе',pt_not_work:'не на работе',pt_blank:'Бланк'
},ar:{
 pt_title:'نموذج التصريح',pt_open:'النموذج، الفرقة، الإذن',pt_excel:'تنزيل Excel',pt_new_tpl:'جديد من قالب',
 pt_sec_main:'التصريح',pt_sec_resp:'المسؤولون',pt_sec_team:'الفرقة',pt_sec_hot:'الأعمال الساخنة',pt_sec_daily:'الإذن اليومي',
 pt_num:'الرقم',pt_from:'تاريخ الإصدار',pt_days:'أيام',pt_t1:'البداية',pt_t2:'النهاية',pt_desc:'وصف الأعمال',pt_place:'مكان العمل',pt_regl:'وفق (خطة العمل، اللائحة)',
 pt_head:'مدير الأعمال',pt_exec:'المنفّذ المسؤول (أنت)',pt_issuer:'أصدر التصريح',pt_hse:'أخصائي السلامة',
 pt_cyr:'الاسم بالكيريلية',pt_lat:'باللاتينية',pt_pos:'الوظيفة',pt_lat_auto:'اللاتينية تلقائيًا',
 pt_people:n=>`${n} عامل`,pt_pick:'اختيار العمال',pt_fix:'تثبيت التشكيل',pt_fixed:d=>`التشكيل مثبت ${d}`,
 pt_fix_hint:'قبل التثبيت يمكن تغيير التشكيل بحرية. بعده يُسجّل كل تغيير في البند 15 بالتاريخ والوقت. يُثبّت تلقائيًا عند أول تنزيل Excel.',
 pt_chg:(c,n,p)=>`تغيّر ${c} من ${n} · ${p}%`,pt_chg_lim:m=>`يمكن ${m} أخرى`,pt_chg_over:'أكثر من 50% — يلزم تصريح جديد',
 pt_in:'أُدخل',pt_out:'أُخرج',pt_log:'تغييرات التشكيل (البند 15)',pt_log_none:'لا تغييرات',pt_max:n=>`في النموذج ${n} سطرًا — الزائد لن يدخل`,
 pt_hot_on:'تصريح الأعمال الساخنة في الملف',pt_hot_num:'رقم تصريح الأعمال الساخنة',pt_hot_desc:'وصف الأعمال الساخنة',pt_hot_unit:'القسم',pt_hot_resp:'المسؤول عن الأعمال الساخنة',
 pt_hot_team:'فرقة الأعمال الساخنة',pt_hot_same:'أخذ الجميع من الفرقة',
 pt_d_s:'البداية',pt_d_l:'الغداء',pt_d_e:'النهاية',pt_d_off:'لم نعمل',pt_d_plan:'حسب الخطة',
 pt_save_tpl:'حفظ كقالب',pt_tpl_name:'اسم القالب',pt_tpl_saved:'تم حفظ القالب',pt_tpls:'قوالب التصاريح',pt_tpl_del:'حذف القالب',
 pt_choose_tpl:'اختر القالب',pt_new_num:'رقم التصريح الجديد',
 pt_fixed_now:'تم تثبيت تشكيل الفرقة — التغييرات التالية تذهب إلى البند 15',pt_err:'تعذّر إنشاء الملف: ',pt_no_tpl:'لم يُحمَّل النموذج — افتح التطبيق مع الإنترنت مرة واحدة',
 pt_today:'الإذن',pt_today_set:k=>({s:'وقت البداية',l:'وقت الغداء',e:'وقت النهاية'})[k],pt_clear:'مسح',
 pt_notin:n=>`يعملون لكن خارج فرقة التصريح: ${n}`,pt_add_them:'إدخال في الفرقة',
 pt_sel_all_today:'كل الحاضرين',pt_sel_group:'مجموعتي',pt_sel_none:'إلغاء الكل',pt_no_h:'لا تصريح للارتفاع',pt_no_lat:'لا اسم لاتيني',
 pt_doc_name:'الاسم في النماذج (بالروسية)',pt_doc_lat:'',pt_doc_hint:'هكذا يُكتب العامل في التصاريح وأوراق السلامة. إذا كان فارغًا يُؤخذ الاسم من البطاقة.',
 pt_my_pos:'وظيفتي',pt_fio:'الاسم',pt_unit_head:'رئيس القسم',
 pt_sec_print:'أوراق للطباعة',pt_print_n:(a,b)=>`${a} من ${b}`,pt_date:'التاريخ',pt_print_hint:'الأوراق غير المحددة تُخفى في الملف ولا تُطبع. إذا أُطفئ «التاريخ» يبقى فارغًا للكتابة باليد.',
 pt_sh_s1:'تصريح العمل',pt_sh_s2:'الإذن اليومي',pt_sh_s3:'الإرشاد (TBT)',pt_sh_s4:'خطة العمل على الارتفاع',pt_sh_s5:'خطة الإنقاذ',pt_sh_s6:'الملحق 1 — الإسعاف الأولي',pt_sh_s7:'ورقة الاطلاع على خطة الإنقاذ',pt_sh_s8:'تصريح الأعمال الساخنة',
 pt_sec_lists:'الإرشادات والتوقيعات',pt_l_tbt1:'إرشاد TBT — الورقة 1',pt_l_tbt2:'إرشاد TBT — الورقة 2',pt_l_lo:'الاطلاع على خطة الإنقاذ',pt_l_same:'كما في الفرقة',pt_l_own:'قائمة خاصة',pt_l_people:'العمال',pt_l_add:'كتابة',pt_l_add_q:'الاسم (كما يُكتب في الورقة)',pt_l_only:'هذه الورقة فقط',pt_l_max:'في الورقة 36 سطرًا',pt_l_hint:'كل ورقة تُطبع وتُضبط على حدة. «هذه الورقة فقط» — ملف بورقة واحدة بدون التصريح.',
 pt_f_work:n=>`في العمل · ${n}`,pt_f_all:n=>`الكل · ${n}`,pt_sel_work:'تحديد كل من في العمل',pt_not_work:'ليس في العمل',pt_blank:'النموذج'
}};
function init(){Object.assign(L.ru,I18N.ru);Object.assign(L.ar,I18N.ar)}

/* ---------- транслитерация (как в загранпаспорте) ---------- */
const TR={а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'i',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'ie',ы:'y',ь:'',э:'e',ю:'iu',я:'ia'};
function lat(s){return String(s||'').replace(/[а-яё]/gi,ch=>{const l=ch.toLowerCase(),r=TR[l];if(r==null)return ch;return ch===l?r:(r?r.charAt(0).toUpperCase()+r.slice(1):'')})}
const isCyr=s=>/[а-яё]/i.test(s||'');
function wCyr(w){return String(w.docName||'').trim()||(isCyr(w.name)?String(w.name).trim():'')}
function wLat(w){const c=wCyr(w);return String(w.docLat||'').trim()||(c?lat(c):(!isCyr(w.name)?String(w.name||'').trim():''))}
const wName=w=>String(w.docName||'').trim()||String(w.name||'').trim();
const pName=p=>p?(String(p.cyr||'').trim()||String(p.lat||'').trim()):'';

/* ---------- шаблоны ---------- */
const DEF_PRESET={id:'rpo-eldabaa',name:'РПО — ремонт дефектов ЖК (10UJA)',
  desc:'Ремонт дефектов поверхностей ЖК, бетонной смесью или ремонтным составом/Repair of LCD surface defects with concrete mixture or repair compound',
  place:'10UJA from elev. -0.100/ +6.800',regl:'Технологический регламент ED.A.A&&&.&.&&&&&&.&&&&&&.012.KB.0001.R Ревизия С-02',
  days:15,t1:'07:00',t2:'17:00',lunch:'13:00',end:'16:30',
  head:{cyr:'Павлов В.Е.',pos:'Мастер'},issuer:{cyr:'Алферов А.В.',pos:'Врио начальника участка'},hse:{cyr:''},
  hot:{on:true,desc:'Резка металла, бетона УШМ, шлифовка металла и бетона.',unit:'MU-12',unitHead:{cyr:''},resp:{cyr:'',pos:''}}};
const presets=()=>{const a=Array.isArray(S.ptwPresets)?S.ptwPresets:[];return a.some(p=>p.id===DEF_PRESET.id)?a:[clone(DEF_PRESET),...a]};
function docFrom(p){const x=clone(p);return {preset:p.id,desc:x.desc,place:x.place,regl:x.regl,t1:x.t1,t2:x.t2,lunch:x.lunch,end:x.end,head:x.head,issuer:x.issuer,hse:x.hse||{},hot:Object.assign({num:'',team:[]},x.hot||{on:false}),print:x.print||{},dates:x.dates||{},team:[],team0:null,fixedAt:0,changes:[],daily:{}}}
function ensureDoc(n){if(!n.doc){n.doc=docFrom(presets()[0]);n.doc.desc=n.title||n.doc.desc}const d=n.doc;d.team=d.team||[];d.changes=d.changes||[];d.daily=d.daily||{};d.hot=d.hot||{on:false,team:[]};d.hot.team=d.hot.team||[];d.hse=d.hse||{};d.print=d.print||{};d.dates=d.dates||{};d.lists=d.lists||{};LISTS.forEach(k=>{d.lists[k]=Object.assign({own:false,team:[],extra:[]},d.lists[k]||{})});return d}
const NAR=id=>(S.naryads||[]).find(n=>n.id===id);
async function saveNar(n){const a=[...(S.naryads||[])],i=a.findIndex(x=>x.id===n.id);if(i>=0)a[i]=n;else a.push(n);await setSetting('naryads',a)}
const me=()=>({cyr:S.myName||'',pos:S.myPos||''});

/* ---------- состав бригады ---------- */
function setTeam(d,ids,hot){
  if(hot){d.hot.team=[...ids];return}
  const old=new Set(d.team),nw=new Set(ids);
  if(d.fixedAt){const at=Date.now();
    ids.forEach(id=>{if(!old.has(id))d.changes.push({id:uid(),wid:id,dir:'in',at})});
    d.team.forEach(id=>{if(!nw.has(id))d.changes.push({id:uid(),wid:id,dir:'out',at})});}
  d.team=[...ids];
}
function chgStat(d){const t0=new Set(d.team0||d.team),cur=new Set(d.team);let a=0,r=0;cur.forEach(x=>{if(!t0.has(x))a++});t0.forEach(x=>{if(!cur.has(x))r++});const c=Math.max(a,r),n=t0.size;return {c,n,p:n?Math.round(c/n*100):0,left:Math.max(0,Math.floor(n*0.5)-c)}}

/* ---------- ZIP (чтение/запись) ---------- */
const CRC=(()=>{const tb=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;tb[n]=c>>>0}return tb})();
function crc32(u){let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRC[(c^u[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}
function readZip(buf){
  const u=new Uint8Array(buf),dv=new DataView(buf),dec=new TextDecoder();
  let e=u.length-22;while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error('zip');
  const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const out=[];
  for(let i=0;i<n;i++){
    const method=dv.getUint16(p+10,true),crc=dv.getUint32(p+16,true),cs=dv.getUint32(p+20,true),us=dv.getUint32(p+24,true),nl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lho=dv.getUint32(p+42,true);
    const name=dec.decode(u.subarray(p+46,p+46+nl));p+=46+nl+xl+cl;
    const ds=lho+30+dv.getUint16(lho+26,true)+dv.getUint16(lho+28,true);
    out.push({name,method,crc,cs,us,raw:u.subarray(ds,ds+cs)});
  }
  return out;
}
async function streamBytes(u,ts){return new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(ts)).arrayBuffer())}
async function unzipEntry(en){if(en.method===0)return en.raw;if(en.method!==8)throw new Error('zip method '+en.method);if(typeof DecompressionStream==='undefined')throw new Error('iOS 16.4+');return streamBytes(en.raw,new DecompressionStream('deflate-raw'))}
async function packEntry(name,data){
  const crc=crc32(data);
  if(typeof CompressionStream!=='undefined'){try{const c=await streamBytes(data,new CompressionStream('deflate-raw'));if(c.length<data.length)return {name,method:8,crc,cs:c.length,us:data.length,raw:c}}catch(x){}}
  return {name,method:0,crc,cs:data.length,us:data.length,raw:data};
}
function writeZip(entries,type){
  const enc=new TextEncoder(),parts=[],cent=[];let off=0;
  entries.forEach(f=>{const nm=enc.encode(f.name);
    const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,f.method,true);h.setUint16(10,0,true);h.setUint16(12,0x21,true);h.setUint32(14,f.crc,true);h.setUint32(18,f.cs,true);h.setUint32(22,f.us,true);h.setUint16(26,nm.length,true);h.setUint16(28,0,true);
    parts.push(new Uint8Array(h.buffer),nm,f.raw);
    const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(10,f.method,true);c.setUint16(12,0,true);c.setUint16(14,0x21,true);c.setUint32(16,f.crc,true);c.setUint32(20,f.cs,true);c.setUint32(24,f.us,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
    cent.push(new Uint8Array(c.buffer),nm);off+=30+nm.length+f.raw.length});
  const cs=cent.reduce((a,x)=>a+x.length,0),e=new DataView(new ArrayBuffer(22));
  e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
  return new Blob([...parts,...cent,new Uint8Array(e.buffer)],{type});
}

/* ---------- ячейки листа ---------- */
const XE=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const colN=c=>{let n=0;for(const ch of c)n=n*26+ch.charCodeAt(0)-64;return n};
function cellXML(ref,sAttr,val){
  if(val.n!=null)return `<c r="${ref}"${sAttr}><v>${val.n}</v></c>`;
  if(val.s==null||val.s==='')return `<c r="${ref}"${sAttr}/>`;
  return `<c r="${ref}"${sAttr} t="inlineStr"><is><t xml:space="preserve">${XE(val.s)}</t></is></c>`;
}
function setCell(x,ref,val){
  const re=new RegExp('<c r="'+ref+'"((?:\\s[^>]*?)?)(?:/>|>([\\s\\S]*?)</c>)');
  const m=re.exec(x);
  if(m){const sm=(m[1]||'').match(/\ss="(\d+)"/);return x.slice(0,m.index)+cellXML(ref,sm?` s="${sm[1]}"`:'',val)+x.slice(m.index+m[0].length)}
  const rn=ref.match(/\d+/)[0],col=colN(ref.match(/[A-Z]+/)[0]);
  const rr=new RegExp('<row r="'+rn+'"([^>]*?)(/>|>([\\s\\S]*?)</row>)'),rm=rr.exec(x);
  const cx=cellXML(ref,'',val);
  if(rm){
    if(rm[2]==='/>')return x.slice(0,rm.index)+`<row r="${rn}"${rm[1]}>${cx}</row>`+x.slice(rm.index+rm[0].length);
    let inner=rm[3],pos=inner.length;const cr=/<c r="([A-Z]+)\d+"/g;let k;
    while((k=cr.exec(inner))){if(colN(k[1])>col){pos=k.index;break}}
    inner=inner.slice(0,pos)+cx+inner.slice(pos);
    return x.slice(0,rm.index)+`<row r="${rn}"${rm[1]}>${inner}</row>`+x.slice(rm.index+rm[0].length);
  }
  const sd=x.indexOf('</sheetData>');const rows=/<row r="(\d+)"/g;let ins=sd,q;
  while((q=rows.exec(x))){if(+q[1]>+rn){ins=q.index;break}}
  return x.slice(0,ins)+`<row r="${rn}">${cx}</row>`+x.slice(ins);
}
/* кэш простых формул (=Лист!A1, =A1+1), чтобы и в предпросмотре iPhone были новые значения */
function refreshCache(sh,changed){
  const FR=/^(?:'([^']+)'!|([^'!+\-]+)!)?\$?([A-Z]+)\$?(\d+)(?:([+-])(\d+(?:\.\d+)?))?$/;
  for(let it=0;it<40;it++){let any=false;
    Object.keys(sh).forEach(name=>{
      sh[name].x=sh[name].x.replace(/<c r="([A-Z]+\d+)"([^>]*)><f([^>]*)>([^<]*)<\/f>(?:<v>([^<]*)<\/v>)?<\/c>/g,(all,ref,attrs,fa,f,v)=>{
        const m=f.match(FR);if(!m)return all;
        const src=changed.get((m[1]||m[2]||name)+'!'+m[3]+m[4]);if(!src)return all;
        let nv=src;if(m[5]){if(src.n==null)return all;nv={n:src.n+(m[5]==='+'?1:-1)*(+m[6])}}
        const key=name+'!'+ref,pv=changed.get(key);if(pv&&pv.n===nv.n&&pv.s===nv.s)return all;
        changed.set(key,nv);any=true;
        const at=attrs.replace(/\st="[^"]*"/,'');
        return `<c r="${ref}"${at}${nv.s!=null?' t="str"':''}><f${fa}>${f}</f><v>${nv.s!=null?XE(nv.s):nv.n}</v></c>`;
      });
    });
    if(!any)break;
  }
}
const serial=iso=>{const [y,m,d]=iso.split('-').map(Number);return (Date.UTC(y,m-1,d)-Date.UTC(1899,11,30))/864e5};
const tfrac=s=>{if(!s)return null;const [h,m]=String(s).split(':').map(Number);return (h*60+(m||0))/1440};
const addDays=(d0,k)=>{const x=new Date(d0+'T12:00:00');x.setDate(x.getDate()+k);return iso(x)};
const wProf=w=>tx(w.profession||'','ru')||'';
const dtStr=ms=>{const d=new Date(ms);return fmt(iso(d))+' '+pad(d.getHours())+':'+pad(d.getMinutes())};

const LISTS=['tbt1','tbt2','lo'];
const SHEETS=[{k:'s1',name:'Наряд на РПО',dates:['X16','X213','X217','X224']},{k:'s2',name:'+ обязательно Допуск',dates:Array.from({length:15},(_,i)=>'A'+(15+2*i))},
 {k:'s3',name:'+ обязательно инструктаж',dates:[]},{k:'s4',name:'ППРВ',dates:['U9']},{k:'s5',name:'ПСЭР',dates:['U10']},{k:'s6',name:'Приложение № 1',dates:[]},{k:'s7',name:'ЛО ПСЭР',dates:[]},{k:'s8',name:'Огневой',dates:['X18','X24']}];
const cpOn=(d,c)=>d.print.s3!==false&&d.print[c]!==false;
const prOn=(d,k)=>k==='s8'?(!!(d.hot&&d.hot.on)&&d.print[k]!==false):k==='s3'?(cpOn(d,'tbt1')||cpOn(d,'tbt2')):k==='s7'?(d.print.s7!==false&&d.print.lo!==false):d.print[k]!==false;
const ldOn=(d,c)=>d.dates.s3!==false&&d.dates[c]!==false;
function listIds(d,k){const L2=d.lists[k];return L2&&L2.own?L2.team:d.team}
function listNames(d,k){const L2=d.lists[k]||{};return listIds(d,k).map(W).filter(Boolean).map(wName).concat(L2.extra||[])}
const dtOn=(d,k)=>d.dates[k]!==false;
function toValues(x){
  return x.replace(/<c r="([A-Z]+\d+)"([^>]*?)>(<f\b[^>]*?(?:\/>|>[^<]*<\/f>))(?:<v>([^<]*)<\/v>)?<\/c>/g,(a,ref,attrs,f,v)=>{
    const tm=attrs.match(/\st="([^"]*)"/),sm=attrs.match(/\ss="(\d+)"/),sa=sm?` s="${sm[1]}"`:'';
    if(v==null||v==='')return `<c r="${ref}"${sa}/>`;
    if(tm&&tm[1]==='str')return `<c r="${ref}"${sa} t="inlineStr"><is><t xml:space="preserve">${v}</t></is></c>`;
    if(tm&&(tm[1]==='b'||tm[1]==='e'))return `<c r="${ref}"${sa} t="${tm[1]}"><v>${v}</v></c>`;
    return `<c r="${ref}"${sa}><v>${v}</v></c>`;});
}
let TPLBUF=null;
async function template(){if(TPLBUF)return TPLBUF;const r=await fetch('naryad/rpo.xlsx');if(!r.ok)throw new Error(t('pt_no_tpl'));TPLBUF=await r.arrayBuffer();return TPLBUF}

async function buildXlsx(n,opts){
  const d=ensureDoc(n),buf=await template(),ents=readZip(buf),only=opts&&opts.only;
  const pOn=k=>only?(only==='lo'?k==='s7':k==='s3'):prOn(d,k);
  const cOn=c=>only?only===c:cpOn(d,c);
  const SH={'Наряд на РПО':'sheet1','+ обязательно Допуск':'sheet2','+ обязательно инструктаж':'sheet3','ППРВ':'sheet4','ПСЭР':'sheet5','Приложение № 1':'sheet6','ЛО ПСЭР':'sheet7','Огневой':'sheet8'};
  const sh={},dec=new TextDecoder();
  for(const [nm,f] of Object.entries(SH)){const en=ents.find(e=>e.name==='xl/worksheets/'+f+'.xml');if(en)sh[nm]={en,x:dec.decode(await unzipEntry(en))}}
  const changed=new Map();void 0;
  const put=(sheet,ref,val)=>{if(!sh[sheet])return;sh[sheet].x=setCell(sh[sheet].x,ref,val);changed.set(sheet+'!'+ref,val)};
  const S1='Наряд на РПО',S2='+ обязательно Допуск',S3='+ обязательно инструктаж',S7='ЛО ПСЭР',S8='Огневой';
  const num=String(n.num||'').trim(),days=Math.max(1,daysBetween(n.from,n.to)+1);
  // номер везде
  put(S1,'N4',{s:num});put(S2,'X1',{s:num});put(S3,'W1',{s:num});put(S3,'W51',{s:num});put(S3,'G7',{s:num});put(S3,'G57',{s:num});
  put(S7,'Y1',{s:num||'-'});put('ППРВ','R15',{s:num||'-'});put('ПСЭР','R19',{s:num||'-'});put(S8,'W4',{s:num});
  // даты и время
  put(S1,'E8',{n:serial(n.from)});put(S1,'E10',{n:serial(n.from)+days-1});put(S1,'Y8',{n:days});
  if(tfrac(d.t1)!=null)put(S1,'N8',{n:tfrac(d.t1)});if(tfrac(d.t2)!=null)put(S1,'N10',{n:tfrac(d.t2)});
  // люди
  const ex=me();
  put(S1,'I12',{s:pName(d.head)});put(S1,'V12',{s:(d.head||{}).pos||''});
  put(S1,'J14',{s:pName(ex)});put(S1,'V14',{s:ex.pos||''});
  if(pName(d.hse))put(S1,'N16',{s:pName(d.hse)});
  put(S1,'K213',{s:pName(d.issuer)});put(S1,'D213',{s:(d.issuer||{}).pos||''});
  put(S1,'H18',{s:d.desc||n.title||''});put(S1,'H20',{s:d.place||''});put(S1,'K22',{s:d.regl||''});
  // бригада: наряд (35), инструктаж ×2 (36), ЛО ПСЭР (36)
  const team=d.team.map(W).filter(Boolean);
  for(let k=0;k<35;k++){const w=team[k];put(S1,'B'+(139+2*k),{s:w?wName(w):''});put(S1,'J'+(139+2*k),{s:w?wProf(w):''})}
  const L1=listNames(d,'tbt1'),L2=listNames(d,'tbt2'),L3=listNames(d,'lo');
  for(let k=0;k<36;k++){const col=k<18?'E':'R',r=k<18?k:k-18;
    put(S3,col+(30+r),{s:L1[k]||''});put(S3,col+(80+r),{s:L2[k]||''});put(S7,(k<18?'F':'T')+(18+r),{s:L3[k]||''})}
  if(sh[S3]){let x=sh[S3].x;const m=x.match(/<c r="I3"[^>]*?><f>([^<]*)<\/f><v>([^<]*)<\/v><\/c>/);
    if(m)x=x.replace(/<c r="I53"([^>]*?)(?:\/>|>[\s\S]*?<\/c>)/,(a,at)=>{const sm=at.match(/\ss="(\d+)"/);return `<c r="I53"${sm?` s="${sm[1]}"`:''} t="str"><f>${m[1]}</f><v>${m[2]}</v></c>`});
    if(!/<rowBreaks/.test(x)){const brk='<rowBreaks count="1" manualBreakCount="1"><brk id="50" max="16383" man="1"/></rowBreaks>';x=/<\/headerFooter>/.test(x)?x.replace('</headerFooter>','</headerFooter>'+brk):x.replace(/(<pageSetup[^>]*\/>)/,'$1'+brk)}
    x=x.replace(/(<pageSetup[^>]*?)\sscale="93"/,'$1 scale="88"');sh[S3].x=x;changed.set(S3+'!I53',{s:'org'})}
  if(!ldOn(d,'tbt1'))put(S3,'U7',{s:''});if(!ldOn(d,'tbt2'))put(S3,'U57',{s:''});
  // п.15 изменения
  for(let k=0;k<17;k++){const c=d.changes[k],w=c&&W(c.wid),txt=w?wName(w)+(wProf(w)?', '+wProf(w):''):'';
    put(S1,'B'+(248+2*k),{s:c&&c.dir==='in'?txt:''});put(S1,'G'+(248+2*k),{s:c&&c.dir==='out'?txt:''});put(S1,'M'+(248+2*k),{s:c?dtStr(c.at):''})}
  // допуск по дням (15 строк)
  for(let k=0;k<15;k++){put(S2,'A'+(15+2*k),{n:serial(n.from)+k});put(S2,'D'+(15+2*k),{s:d.place||''})}
  for(let k=0;k<15;k++){const date=addDays(n.from,k),r=15+2*k,rec=Object.assign({s:d.t1||'07:00',l:d.lunch||'13:00',e:d.end||'16:30'},d.daily[date]||{});
    if(rec.off){['G','L','Q','V'].forEach(c=>put(S2,c+r,{s:''}));put(S2,'G'+(r+1),{s:''});continue}
    if(rec.s){const v={n:tfrac(rec.s)};put(S2,'G'+r,v);put(S2,'L'+r,v);put(S2,'Q'+r,v)}
    if(rec.l)put(S2,'G'+(r+1),{n:tfrac(rec.l)});if(rec.e)put(S2,'V'+r,{n:tfrac(rec.e)});}
  // огневой
  const hot=d.hot||{};
  if(hot.on){put(S8,'F4',{s:hot.num||''});put(S8,'G10',{s:hot.desc||''});put(S8,'K22',{s:hot.unit||''});put(S8,'O16',{s:pName(hot.resp)});put(S8,'J24',{s:pName(hot.unitHead)});put(S8,'W16',{s:(hot.resp||{}).pos||''});
    const ht=hot.team.map(W).filter(Boolean);for(let k=0;k<35;k++){const w=ht[k];put(S8,'B'+(36+2*k),{s:w?wName(w):''});put(S8,'J'+(36+2*k),{s:w?wProf(w):''})}}
  SHEETS.forEach(z=>{if(!dtOn(d,z.k))z.dates.forEach(ref=>put(z.name,ref,{s:''}))});
  refreshCache(sh,changed);
  const vis=SHEETS.filter(z=>pOn(z.k));if(!vis.length)vis.push(SHEETS[0]);
  // невыбранные листы удаляем из файла; если главный не печатается — ссылки на него превращаем в готовые значения
  const removed=SHEETS.filter(z=>!vis.includes(z)),kept=vis;
  if(removed.includes(SHEETS[0]))kept.forEach(z=>{const o=sh[z.name];if(o)o.x=toValues(o.x)});
  const drop=new Set();
  for(const z of removed){const f=SH[z.name];drop.add('xl/worksheets/'+f+'.xml');const rp='xl/worksheets/_rels/'+f+'.xml.rels';drop.add(rp);
    const re=ents.find(e=>e.name===rp);if(!re)continue;const rx=dec.decode(await unzipEntry(re));
    (rx.match(/Target="([^"]+)"/g)||[]).map(a=>a.slice(8,-1)).forEach(tg=>{if(/^https?:/.test(tg)||tg.includes('/media/'))return;const pth=('xl/worksheets/'+tg).split('/').reduce((a,seg)=>{if(seg==='..')a.pop();else if(seg!=='.')a.push(seg);return a},[]).join('/');
      drop.add(pth);const m=pth.match(/^(xl\/drawings)\/(drawing\d+\.xml)$/);if(m)drop.add(m[1]+'/_rels/'+m[2]+'.rels')});}
  if(removed.length){const used=new Set();
    for(const en of ents){if(!en.name.endsWith('.rels')||drop.has(en.name))continue;const base=en.name.replace(/_rels\/[^/]+$/,'');
      (dec.decode(await unzipEntry(en)).match(/Target="([^"]+)"/g)||[]).forEach(a=>{const tg=a.slice(8,-1);if(/^https?:/.test(tg))return;used.add((tg.startsWith('/')?tg.slice(1):base+tg).split('/').reduce((q,seg)=>{if(seg==='..')q.pop();else if(seg!=='.'&&seg!=='')q.push(seg);return q},[]).join('/'))})}
    ents.forEach(en=>{if(/^xl\/(media|embeddings)\//.test(en.name)&&!used.has(en.name))drop.add(en.name)})}
  const firstVis=kept.indexOf(vis[0]);
  kept.forEach((z,i)=>{const o=sh[z.name];if(!o)return;o.x=o.x.replace(/\stabSelected="[^"]*"/g,'');if(i===firstVis)o.x=o.x.replace(/<sheetView\b/,'<sheetView tabSelected="1"')});
  // собрать: изменённые листы, без calcChain, пересчёт при открытии
  const enc=new TextEncoder(),out=[];
  for(const en of ents){
    if(en.name==='xl/calcChain.xml'||drop.has(en.name))continue;
    const s=Object.values(sh).find(v=>v.en===en);
    if(s){out.push(await packEntry(en.name,enc.encode(s.x)));continue}
    if(en.name==='xl/workbook.xml'||en.name==='xl/_rels/workbook.xml.rels'||en.name==='[Content_Types].xml'||en.name==='xl/styles.xml'){
      let x=dec.decode(await unzipEntry(en));
      if(en.name==='xl/workbook.xml'){x=x.replace(/<calcPr([^>]*?)\/>/,(a,b)=>`<calcPr${b.replace(/\sfullCalcOnLoad="[^"]*"/,'')} fullCalcOnLoad="1"/>`);
        x=x.replace(/<sheet name="([^"]+)"([^>]*?)\/>/g,(a,nm,rest)=>{const z=SHEETS.find(q=>q.name===nm);if(z&&removed.includes(z))return '';rest=rest.replace(/\sstate="[^"]*"/,'');return `<sheet name="${nm}"${z&&!vis.includes(z)?' state="hidden"':''}${rest}/>`});
        x=x.replace(/<definedName\b([^>]*?)localSheetId="(\d+)"([^>]*)>([\s\S]*?)<\/definedName>/g,(a,p1,id,p2,body)=>{const z=SHEETS[+id];if(!z||removed.includes(z))return '';if(z.k==='s3'){const a1=cOn('tbt1'),a2=cOn('tbt2');if(a1!==a2)body=body.replace(/\$A\$1:\$Z\$100/,()=>a1?'$A$1:$Z$50':'$A$51:$Z$100')}return `<definedName${p1}localSheetId="${kept.indexOf(z)}"${p2}>${body}</definedName>`}).replace(/<definedNames>\s*<\/definedNames>/,'');
        x=x.replace(/(<workbookView[^>]*?)\sactiveTab="\d+"/,'$1').replace(/(<workbookView[^>]*?)\sfirstSheet="\d+"/,'$1').replace(/<workbookView\b/,`<workbookView activeTab="${firstVis}" firstSheet="${firstVis}"`)}
      else if(en.name==='xl/styles.xml'){
        if(/<numFmts\b/.test(x))x=x.replace(/<numFmts count="(\d+)">/,(a,c)=>`<numFmts count="${+c+1}">`).replace('</numFmts>','<numFmt numFmtId="190" formatCode="dd\\.mm\\.yyyy;@"/></numFmts>');
        else x=x.replace(/(<styleSheet[^>]*>)/,'$1<numFmts count="1"><numFmt numFmtId="190" formatCode="dd\\.mm\\.yyyy;@"/></numFmts>');
        x=x.replace(/<cellXfs[\s\S]*?<\/cellXfs>/,m=>m.replace(/<xf\b([^>]*?)numFmtId="(14|165)"([^>]*?)(\/?)>/g,(a,p1,id,p2,sl)=>{let at=p1+'numFmtId="190"'+p2;if(!/applyNumberFormat=/.test(at))at+=' applyNumberFormat="1"';else at=at.replace(/applyNumberFormat="0"/,'applyNumberFormat="1"');return `<xf${at}${sl}>`}))}
      else if(en.name==='[Content_Types].xml'){x=x.replace(/<Override PartName="\/xl\/calcChain\.xml"[^>]*\/>/,'');x=x.replace(/<Override PartName="\/([^"]+)"[^>]*\/>/g,(a,pn)=>drop.has(pn)?'':a)}
      else{x=x.replace(/<Relationship [^>]*Target="calcChain\.xml"[^>]*\/>/,'');x=x.replace(/<Relationship [^>]*Target="(worksheets\/[^"]+)"[^>]*\/>/g,(a,tg)=>drop.has('xl/'+tg)?'':a)}
      out.push(await packEntry(en.name,enc.encode(x)));continue}
    out.push(en);
  }
  return writeZip(out,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}

/* ---------- выбор людей ---------- */
function pickPeople(title,cur,onDone,pre){
  const sel=new Set(cur);(pre||[]).forEach(id=>sel.add(id));
  const work=new Set(presentIds(getDay(iso())));let flt=work.size?'work':'all';
  const ws=()=>{let a=data.workers.slice();if(flt==='work')a=a.filter(w=>work.has(w.id)||sel.has(w.id));a.sort((x,y)=>(sel.has(y.id)-sel.has(x.id))||((work.has(y.id)?1:0)-(work.has(x.id)?1:0))||byName(x,y));return a};
  const tile=w=>{const on=sel.has(w.id),p=w.permits||{};
    return `<button class="ptp ${on?'on':''}" data-w="${w.id}"><span class="ptk">${on?ic('check',15):''}</span><span class="ptav">${thumbHTML(w)}</span><span class="ptn"><b class="bidi">${esc(wName(w))}</b><small class="bidi">${esc(w.profession||'—')}</small>${!work.has(w.id)?`<em class="nw">${t('pt_not_work')}</em> `:''}${!p.height?`<em>${t('pt_no_h')}</em>`:''}</span></button>`};
  const draw=()=>`<div class="seg" style="margin-bottom:8px"><button type="button" data-f="work" class="${flt==='work'?'on':''}">${t('pt_f_work',work.size)}</button><button type="button" data-f="all" class="${flt==='all'?'on':''}">${t('pt_f_all',data.workers.length)}</button></div>
    <div class="crow" style="margin-bottom:10px">${chip(t('pt_sel_work'),false,'data-q="today"')}${chip(t('pt_sel_none'),false,'data-q="none"')}</div><div class="ptcnt">${t('pt_people',sel.size)}</div>`+ws().map(tile).join('');
  const w=sheet({title,body:`<div id="ptpk">${draw()}</div>`,saveLabel:t('done'),onSave:async()=>{await onDone([...data.workers.filter(x=>sel.has(x.id)).map(x=>x.id)])}});
  $('#ptpk',w).onclick=e=>{
    const f=e.target.closest('[data-f]');if(f){flt=f.dataset.f;$('#ptpk',w).innerHTML=draw();return}
    const q=e.target.closest('[data-q]');if(q){const k=q.dataset.q;if(k==='none')sel.clear();if(k==='today')work.forEach(id=>sel.add(id));$('#ptpk',w).innerHTML=draw();return}
    const b=e.target.closest('[data-w]');if(!b)return;const id=b.dataset.w;sel.has(id)?sel.delete(id):sel.add(id);b.outerHTML=tile(W(id));const c=$('.ptcnt',w);if(c)c.textContent=t('pt_people',sel.size);
  };
}

/* ---------- лист бланка ---------- */
function personFields(key,p,withPos){
  p=p||{};
  return `<div class="ptper ${withPos?'':'one'}" data-per="${key}"><input dir="auto" data-pf="cyr" value="${esc(p.cyr||p.lat||'')}" placeholder="${t('pt_fio')}" autocomplete="off" autocapitalize="words">${withPos?`<input dir="auto" class="pos" data-pf="pos" value="${esc(p.pos||'')}" placeholder="${t('pt_pos')}" autocomplete="off">`:''}</div>`;
}
function open(nid){
  const n=NAR(nid);if(!n)return;const d=ensureDoc(n);
  const opened=new Set(['team']);
  const sec=(k,title,sub,inner)=>`<details class="ptsec" data-sec="${k}" ${opened.has(k)?'open':''}><summary><b>${title}</b><span class="bidi">${sub||''}</span></summary><div class="ptin">${inner}</div></details>`;
  const draw=()=>{
    const ex=me(),cs=chgStat(d),days=Math.max(1,daysBetween(n.from,n.to)+1),team=d.team.map(W).filter(Boolean),hteam=d.hot.team.map(W).filter(Boolean);
    let h=`<div class="pthead"><b class="num">№ ${esc(n.num||'—')}</b><span>${fmt(n.from)} — ${fmt(n.to)} · ${t('pt_people',team.length)}${d.hot.on?' · 🔥 '+hteam.length:''}</span></div>`;
    h+=sec('main',t('pt_sec_main'),esc(d.place||''),`
      <div class="ptg3"><label><span>${t('pt_num')}</span><input data-n="num" value="${esc(n.num||'')}" autocomplete="off"></label><label><span>${t('pt_from')}</span><input type="date" data-n="from" value="${esc(n.from)}"></label><label><span>${t('pt_days')}</span><input class="num" inputmode="numeric" data-n="days" value="${days}"></label></div>
      <div class="ptg3 two"><label><span>${t('pt_t1')}</span><input type="time" data-d="t1" value="${esc(d.t1||'')}"></label><label><span>${t('pt_t2')}</span><input type="time" data-d="t2" value="${esc(d.t2||'')}"></label></div>
      <label class="ptl"><span>${t('pt_desc')}</span><textarea dir="auto" rows="2" data-d="desc">${esc(d.desc||'')}</textarea></label>
      <label class="ptl"><span>${t('pt_place')}</span><input dir="auto" data-d="place" value="${esc(d.place||'')}"></label>
      <label class="ptl"><span>${t('pt_regl')}</span><textarea dir="auto" rows="2" data-d="regl">${esc(d.regl||'')}</textarea></label>`);
    h+=sec('resp',t('pt_sec_resp'),esc(pName(d.head)),`
      <div class="ptlab">${t('pt_head')}</div>${personFields('head',d.head,true)}
      <div class="ptlab">${t('pt_exec')}</div>${personFields('me',ex,true)}
      <div class="ptlab">${t('pt_issuer')}</div>${personFields('issuer',d.issuer,true)}
      <div class="ptlab">${t('pt_hse')}</div>${personFields('hse',d.hse,false)}`);
    const over=d.fixedAt&&cs.p>50;
    h+=sec('team',t('pt_sec_team'),t('pt_people',team.length),`
      <div class="ptchips">${team.map(w=>`<span class="ptc"><b class="bidi">${esc(wName(w))}</b>${w.profession?`<small class="bidi">${esc(w.profession)}</small>`:''}</span>`).join('')||`<span class="hint">—</span>`}</div>
      ${team.length>35?`<div class="ptwarn">${t('pt_max',35)}</div>`:''}
      <div class="ptbtns"><button class="btn" data-a="pick">${ic('users',17)} ${t('pt_pick')}</button>${d.fixedAt?'':`<button class="btn" data-a="fix" ${team.length?'':'disabled'}>${ic('check',17)} ${t('pt_fix')}</button>`}</div>
      ${d.fixedAt?`<div class="ptfix ${over?'bad':''}"><div><b>${t('pt_chg',cs.c,cs.n,cs.p)}</b><small>${t('pt_fixed',dtStr(d.fixedAt))} · ${over?t('pt_chg_over'):t('pt_chg_lim',cs.left)}</small></div><i><u style="width:${Math.min(100,cs.p*2)}%"></u></i></div>
        <div class="ptlab">${t('pt_log')}</div>${d.changes.length?d.changes.map(c=>{const w=W(c.wid);return `<div class="ptlog"><em class="${c.dir}">${c.dir==='in'?'＋ '+t('pt_in'):'－ '+t('pt_out')}</em><span class="bidi">${esc(w?wName(w):'?')}</span><small class="num">${dtStr(c.at)}</small><button class="x" data-undo="${c.id}" aria-label="x">${ic('x',15)}</button></div>`}).join(''):`<div class="hint" style="margin:0 2px">${t('pt_log_none')}</div>`}`:`<div class="hint" style="margin:8px 2px 0">${t('pt_fix_hint')}</div>`}`);
    h+=sec('lists',t('pt_sec_lists'),LISTS.filter(k=>k==='lo'?prOn(d,'s7'):cpOn(d,k)).length+' / 3',LISTS.map(k=>{const L2=d.lists[k],names=listNames(d,k),on=k==='lo'?prOn(d,'s7'):cpOn(d,k);
      return `<div class="ptli ${on?'':'off'}"><div class="ptlh"><button class="ptck ${on?'on':''}" data-lpr="${k}" aria-label="${t('pt_l_'+k)}">${on?ic('check',15):''}</button><b>${t('pt_l_'+k)}</b><span class="num">${t('pt_people',names.length)}</span></div>
        <div class="ptls"><span class="pc ${L2.own?'warn':'gr'}">${L2.own?t('pt_l_own'):t('pt_l_same')}</span>${names.length>36?`<em>${t('pt_l_max')}</em>`:''}</div>
        <div class="ptchips">${listIds(d,k).map(W).filter(Boolean).map(w=>`<span class="ptc"><b class="bidi">${esc(wName(w))}</b></span>`).join('')}${(L2.extra||[]).map((nm,i)=>`<span class="ptc ex"><b class="bidi">${esc(nm)}</b><button data-lxdel="${k}" data-i="${i}" aria-label="x">${ic('x',12)}</button></span>`).join('')}</div>
        <div class="ptlb"><button class="ptsb" data-lpick="${k}">${ic('users',15)} ${t('pt_l_people')}</button>${L2.own?`<button class="ptsb" data-lsame="${k}">${ic('undo',15)} ${t('pt_l_same')}</button>`:''}<button class="ptsb" data-ladd="${k}">${ic('plus',15)} ${t('pt_l_add')}</button>${k!=='lo'?`<button class="ptdt ${ldOn(d,k)?'on':''}" data-ldt="${k}">${ic('cal',14)} ${t('pt_date')}</button>`:''}<button class="ptsb solid" data-lonly="${k}">${ic('download',15)} ${t('pt_l_only')}</button></div></div>`}).join('')+`<div class="hint" style="margin:8px 2px 0">${t('pt_l_hint')}</div>`);
    h+=sec('hot',t('pt_sec_hot'),d.hot.on?t('pt_people',hteam.length):'—',`
      ${ynRow('flame',t('pt_hot_on'),'hoton',d.hot.on,t('yes2'),t('no'))}
      ${d.hot.on?`<div class="ptg3 two"><label><span>${t('pt_hot_num')}</span><input data-h="num" value="${esc(d.hot.num||'')}"></label><label><span>${t('pt_hot_unit')}</span><input data-h="unit" value="${esc(d.hot.unit||'')}"></label></div>
      <label class="ptl"><span>${t('pt_hot_desc')}</span><textarea dir="auto" rows="2" data-h="desc">${esc(d.hot.desc||'')}</textarea></label>
      <div class="ptlab">${t('pt_unit_head')}</div>${personFields('unithead',d.hot.unitHead,false)}
      <div class="ptlab">${t('pt_hot_resp')}</div>${personFields('hotresp',d.hot.resp,true)}
      <div class="ptlab">${t('pt_hot_team')}</div><div class="ptchips">${hteam.map(w=>`<span class="ptc"><b class="bidi">${esc(wName(w))}</b></span>`).join('')||`<span class="hint">—</span>`}</div>
      <div class="ptbtns"><button class="btn" data-a="pickhot">${ic('users',17)} ${t('pt_pick')}</button><button class="btn" data-a="hotsame">${t('pt_hot_same')}</button></div>`:''}`);
    const rows=[];for(let k=0;k<Math.min(15,days);k++){const date=addDays(n.from,k),r=d.daily[date]||{};rows.push(`<div class="ptday ${r.off?'off':''} ${date===iso()?'today':''}" data-date="${date}"><b class="num">${fmtShort(date)}</b>${r.off?`<span class="ptoff">${t('pt_d_off')}</span>`:['s','l','e'].map(k2=>`<input type="time" data-day="${k2}" value="${esc(r[k2]||'')}" aria-label="${t('pt_d_'+k2)}">`).join('')}<button class="x" data-offday aria-label="${t('pt_d_off')}">${ic(r.off?'undo':'x',14)}</button></div>`)}
    h+=sec('daily',t('pt_sec_daily'),'',`<div class="ptdh"><span></span><span>${t('pt_d_s')}</span><span>${t('pt_d_l')}</span><span>${t('pt_d_e')}</span><span></span></div>${rows.join('')}<div class="hint" style="margin:6px 2px 0">${t('pt_d_plan')}: ${esc(d.t1||'—')} · ${esc(d.lunch||'13:00')} · ${esc(d.end||'16:30')}</div>`);
    const nPr=SHEETS.filter(z=>prOn(d,z.k)).length;
    h+=sec('print',t('pt_sec_print'),t('pt_print_n',nPr,SHEETS.length),SHEETS.map(z=>{const on=prOn(d,z.k),dis=z.k==='s8'&&!d.hot.on;
      return `<div class="ptpr ${on?'':'off'}"><button class="ptck ${on?'on':''}" data-pr="${z.k}" ${dis?'disabled':''} aria-label="${t('pt_sh_'+z.k)}">${on?ic('check',15):''}</button><span>${t('pt_sh_'+z.k)}</span>${z.dates.length?`<button class="ptdt ${dtOn(d,z.k)?'on':''}" data-dt="${z.k}" ${on?'':'disabled'}>${ic('cal',14)} ${t('pt_date')}</button>`:''}</div>`}).join('')+`<div class="hint" style="margin:8px 2px 0">${t('pt_print_hint')}</div>`);
    h+=`<button class="btn wide" style="margin-top:6px" data-a="savetpl">${ic('save',17)} ${t('pt_save_tpl')}</button>`;
    return h;
  };
  const w=sheet({title:t('pt_title'),left:t('close'),tapOut:true,body:`<div id="ptb">${draw()}</div>`,foot:`<button class="fb solid" data-xl style="width:100%">${ic('download',18)} ${t('pt_excel')}</button>`,onClose:()=>{if(state.tab==='today')renderList()}});
  const box=$('#ptb',w);
  const redraw=()=>{$$('details[data-sec]',box).forEach(x=>{x.open?opened.add(x.dataset.sec):opened.delete(x.dataset.sec)});const mb=$('.mb',w),y=mb.scrollTop;box.innerHTML=draw();mb.scrollTop=y};
  const save=async()=>{await saveNar(n)};
  box.addEventListener('change',async e=>{
    const el=e.target,v=el.value;
    if(el.dataset.n){const k=el.dataset.n;const days=Math.max(1,daysBetween(n.from,n.to)+1);
      if(k==='num')n.num=v.trim();if(k==='from'&&v){n.from=v;n.to=addDays(v,days-1)}if(k==='days'){const dd=Math.max(1,parseInt(v)||1);n.to=addDays(n.from,dd-1)}
      await save();redraw();return}
    if(el.dataset.d){d[el.dataset.d]=v.trim();await save();return}
    if(el.dataset.h){d.hot[el.dataset.h]=v.trim();await save();return}
    if(el.dataset.pf){const box2=el.closest('[data-per]'),key=box2.dataset.per,f=el.dataset.pf;
      if(key==='me'){const map={cyr:'myName',lat:'myNameLat',pos:'myPos'};await setSetting(map[f],v.trim(),true)}
      else{const tgt=key==='hotresp'?(d.hot.resp=d.hot.resp||{}):key==='unithead'?(d.hot.unitHead=d.hot.unitHead||{}):(d[key]=d[key]||{});tgt[f]=v.trim();if(f==='cyr')delete tgt.lat;await save()}
      return}
    if(el.dataset.day){const row=el.closest('[data-date]'),dt=row.dataset.date;const r=d.daily[dt]=d.daily[dt]||{};r[el.dataset.day]=v;if(!r.s&&!r.l&&!r.e&&!r.off)delete d.daily[dt];await save();return}
  });
  box.addEventListener('click',async e=>{
    const yn=e.target.closest('.yn[data-k="hoton"] button');if(yn){d.hot.on=yn.dataset.v==='1';if(d.hot.on)delete d.print.s8;await save();redraw();return}
    const pr=e.target.closest('[data-pr]');if(pr&&!pr.disabled){const k=pr.dataset.pr,on=prOn(d,k);
      if(k==='s3'){delete d.print.s3;d.print.tbt1=!on;d.print.tbt2=!on}else if(k==='s7'){delete d.print.lo;d.print.s7=!on}else d.print[k]=!on;await save();redraw();return}
    const lpr=e.target.closest('[data-lpr]');if(lpr){const k=lpr.dataset.lpr;if(k==='lo'){const on=prOn(d,'s7');delete d.print.lo;d.print.s7=!on}else{const on=cpOn(d,k);delete d.print.s3;d.print[k]=!on;if(!on){const o=k==='tbt1'?'tbt2':'tbt1';if(d.print[o]===undefined)d.print[o]=true}}await save();redraw();return}
    const lpk=e.target.closest('[data-lpick]');if(lpk){const k=lpk.dataset.lpick;return pickPeople(t('pt_l_'+k),listIds(d,k),async ids=>{d.lists[k].own=true;d.lists[k].team=ids;await save();redraw()})}
    const lsm=e.target.closest('[data-lsame]');if(lsm){const L2=d.lists[lsm.dataset.lsame];L2.own=false;L2.team=[];await save();redraw();return}
    const lad=e.target.closest('[data-ladd]');if(lad){const r=await ask({title:t('pt_l_add'),input:{ph:t('pt_l_add_q')},buttons:[{l:t('add'),v:true,c:'pri'},{l:t('cancel'),v:false}]});if(r.v&&r.text){d.lists[lad.dataset.ladd].extra.push(r.text);await save();redraw()}return}
    const lxd=e.target.closest('[data-lxdel]');if(lxd){d.lists[lxd.dataset.lxdel].extra.splice(+lxd.dataset.i,1);await save();redraw();return}
    const ldt=e.target.closest('[data-ldt]');if(ldt){const k=ldt.dataset.ldt;delete d.dates.s3;d.dates[k]=!ldOn(d,k);await save();redraw();return}
    const lon=e.target.closest('[data-lonly]');if(lon){const k=lon.dataset.lonly;try{const blob=await buildXlsx(n,{only:k});await shareFile(blob,`${t('pt_l_'+k).replace(/[—:]/g,'').replace(/\s+/g,' ').trim()} №${String(n.num||'').replace(/[\/\\]/g,'-')} ${fmt(n.from)}.xlsx`,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',t('pt_l_'+k))}catch(x){alert(t('pt_err')+(x&&x.message||x))}return}
    const dt=e.target.closest('[data-dt]');if(dt&&!dt.disabled){d.dates[dt.dataset.dt]=!dtOn(d,dt.dataset.dt);await save();redraw();return}
    const od=e.target.closest('[data-offday]');if(od){const dt=od.closest('[data-date]').dataset.date;const r=d.daily[dt]=d.daily[dt]||{};r.off=!r.off;if(!r.off&&!r.s&&!r.l&&!r.e)delete d.daily[dt];await save();redraw();return}
    const un=e.target.closest('[data-undo]');if(un){const c=d.changes.find(x=>x.id===un.dataset.undo);if(!c)return;d.changes=d.changes.filter(x=>x!==c);if(c.dir==='in')d.team=d.team.filter(x=>x!==c.wid);else if(!d.team.includes(c.wid))d.team.push(c.wid);await save();redraw();return}
    const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const a=b.dataset.a;
    if(a==='pick')return pickPeople(t('pt_sec_team'),d.team,async ids=>{setTeam(d,ids);await save();redraw()});
    if(a==='pickhot')return pickPeople(t('pt_hot_team'),d.hot.team,async ids=>{setTeam(d,ids,true);await save();redraw()});
    if(a==='hotsame'){d.hot.team=[...d.team];await save();redraw();return}
    if(a==='fix'){d.team0=[...d.team];d.fixedAt=Date.now();await save();redraw();return}
    if(a==='savetpl'){const r=await ask({title:t('pt_save_tpl'),input:{ph:t('pt_tpl_name'),val:(d.desc||'').slice(0,40)},buttons:[{l:t('save'),v:true,c:'pri'},{l:t('cancel'),v:false}]});if(!r.v||!r.text)return;
      const p={id:uid(),name:r.text,desc:d.desc,place:d.place,regl:d.regl,days:Math.max(1,daysBetween(n.from,n.to)+1),t1:d.t1,t2:d.t2,lunch:d.lunch,end:d.end,head:clone(d.head||{}),issuer:clone(d.issuer||{}),hse:clone(d.hse||{}),hot:{on:d.hot.on,desc:d.hot.desc,unit:d.hot.unit,unitHead:clone(d.hot.unitHead||{}),resp:clone(d.hot.resp||{})},print:clone(d.print||{}),dates:clone(d.dates||{}),officials:clone(n.officials||[]).map(o=>Object.assign(o,{signed:false}))};
      await setSetting('ptwPresets',[...presets(),p]);toast(t('pt_tpl_saved'));return}
  });
  $('[data-xl]',w).onclick=async()=>{
    const a=document.activeElement;if(a&&a.blur)a.blur();await new Promise(r=>setTimeout(r,80));
    try{
      if(!d.fixedAt&&d.team.length){d.team0=[...d.team];d.fixedAt=Date.now();await save();redraw();toast(t('pt_fixed_now'))}
      const blob=await buildXlsx(n);
      await shareFile(blob,`Наряд ${n.num||''} ${fmt(n.from)}.xlsx`.replace(/\s+/g,' '),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',t('pt_title'));
    }catch(x){alert(t('pt_err')+(x&&x.message||x))}
  };
}

/* ---------- новый наряд по шаблону, список шаблонов ---------- */
async function newFromPreset(){
  const ps=presets();let p=ps[0];
  if(ps.length>1){const r=await ask({title:t('pt_choose_tpl'),buttons:[...ps.map((x,i)=>({l:x.name,v:String(i),c:i?'':'pri'})),{l:t('cancel'),v:false}]});if(!r.v)return;p=ps[+r.v]}
  const q=await ask({title:t('pt_new_num'),input:{ph:'№'},buttons:[{l:t('add'),v:true,c:'pri'},{l:t('cancel'),v:false}]});if(!q.v)return;
  const from=iso(),n={id:uid(),num:q.text,title:p.name,from,to:addDays(from,(p.days||15)-1),closed:false,officials:clone(p.officials||[]),doc:docFrom(p)};
  await saveNar(n);if(state.tab==='today')renderList();open(n.id);
}
function presetsSheet(){
  const draw=()=>presets().map(p=>`<div class="srow" style="cursor:default"><div style="min-width:0"><b class="bidi">${esc(p.name)}</b><div class="sub bidi">${esc(p.place||'')} · ${p.days||15} ${t('days_short')}</div></div>${p.id===DEF_PRESET.id?'':`<button class="x" data-pdel="${p.id}" aria-label="${t('pt_tpl_del')}">${ic('trash',16)}</button>`}</div>`).join('')+`<button class="btn pri wide" style="margin-top:8px" data-pnew>${ic('plus',18)} ${t('pt_new_tpl')}</button>`;
  const w=sheet({title:t('pt_tpls'),left:t('close'),tapOut:true,body:`<div id="ptps">${draw()}</div>`});
  $('#ptps',w).onclick=async e=>{const d=e.target.closest('[data-pdel]');if(d){if(await confirmDlg(t('pt_tpl_del'),'')){await setSetting('ptwPresets',presets().filter(x=>x.id!==d.dataset.pdel));$('#ptps',w).innerHTML=draw()}return}
    if(e.target.closest('[data-pnew]')){w.close();setTimeout(newFromPreset,380)}};
}

/* ---------- карточка «Сегодня» ---------- */
function cardHTML(n,day){
  const d=n.doc,rec=d&&d.daily[day.id]||{},plan={s:d&&d.t1||'07:00',l:d&&d.lunch||'13:00',e:d&&d.end||'16:30'};
  let h=`<div class="ptd"><span class="ptdl">${t('pt_today')}</span>${['s','l','e'].map(k=>`<button class="ptdb ${rec[k]?'on':''}" data-act="ptw" data-id="${n.id}" data-k="${k}"><small>${t('pt_d_'+k)}</small><b class="num">${esc(rec[k]||plan[k])}</b></button>`).join('')}<button class="ptdb x" data-act="ptw" data-id="${n.id}" data-k="open" aria-label="${t('pt_title')}">${ic('table',16)}<small>${t('pt_blank')}</small></button></div>`;
  if(d&&d.team.length&&day.roll){const act=naryadsActive(day.id).filter(x=>x.doc&&x.doc.team.length);const inAny=new Set(act.flatMap(x=>x.doc.team));const out=presentIds(day).filter(id=>!inAny.has(id));
    if(out.length&&act[0]&&act[0].id===n.id)h+=`<button class="warnrow" style="margin-top:6px" data-act="ptw" data-id="${n.id}" data-k="addout">${ic('alert',18)}<span>${esc(t('pt_notin',out.map(i=>(W(i)||{name:'?'}).name.split(' ')[0]).join(', ')))} → ${t('pt_add_them')}</span></button>`}
  return h;
}
async function click(el,day){
  const n=NAR(el.dataset.id);if(!n)return;const k=el.dataset.k;
  if(k==='open')return open(n.id);
  const d=ensureDoc(n);
  if(k==='addout'){const act=naryadsActive(day.id).filter(x=>x.doc&&x.doc.team.length);const inAny=new Set(act.flatMap(x=>x.doc.team));const out=presentIds(day).filter(id=>!inAny.has(id));
    return pickPeople(t('pt_sec_team'),d.team,async ids=>{setTeam(d,ids);await saveNar(n);renderList()},out)}
  const rec=d.daily[day.id]=d.daily[day.id]||{};const now=new Date(),nowS=pad(now.getHours())+':'+pad(now.getMinutes());
  const r=await ask({title:t('pt_today_set',k)+' · № '+(n.num||'—'),input:{val:rec[k]||nowS,mode:'numeric'},buttons:[{l:t('save'),v:'ok',c:'pri'},{l:t('pt_clear'),v:'clr'},{l:t('cancel'),v:false}]});
  if(!r.v)return;
  if(r.v==='clr')delete rec[k];else{const m=String(r.text).replace(/[^\d]/g,'');let hh,mm;if(m.length<=2){hh=+m;mm=0}else{hh=+m.slice(0,m.length-2);mm=+m.slice(-2)}if(hh>23||mm>59||isNaN(hh)){toast('⚠️');return}rec[k]=pad(hh)+':'+pad(mm)}
  if(!rec.s&&!rec.l&&!rec.e)delete d.daily[day.id];
  await saveNar(n);renderList();
}

const CSS=`
.pthead{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:0 2px 10px}.pthead b{font-size:20px;font-weight:900}.pthead span{font-size:13px;color:var(--sub);font-weight:700}
.ptsec{background:var(--card);border:1.5px solid var(--line);border-radius:16px;margin-bottom:8px;overflow:hidden}
.ptsec>summary{list-style:none;display:flex;align-items:center;gap:8px;padding:12px 14px;cursor:pointer;min-height:48px}
.ptsec>summary::-webkit-details-marker{display:none}
.ptsec>summary b{font-size:15.5px;font-weight:850;flex:none}.ptsec>summary span{flex:1;min-width:0;text-align:end;font-size:12.5px;color:var(--sub);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ptsec>summary:after{content:'';width:8px;height:8px;border-right:2px solid var(--sub);border-bottom:2px solid var(--sub);transform:rotate(45deg);margin:-4px 2px 0;flex:none;transition:transform .2s}
.ptsec[open]>summary:after{transform:rotate(-135deg);margin-top:4px}
.ptin{padding:0 12px 12px}
.ptg3{display:grid;grid-template-columns:1fr 1.3fr .7fr;gap:6px;margin-bottom:8px}.ptg3.two{grid-template-columns:1fr 1fr}
.ptg3 label,.ptl{display:flex;flex-direction:column;gap:3px;min-width:0}.ptl{margin-bottom:8px}
.ptg3 span,.ptl span,.ptlab{font-size:11.5px;font-weight:800;color:var(--sub);margin:0 2px}
.ptlab{margin:10px 2px 4px}.ptlab:first-child{margin-top:0}
.ptg3 input,.ptl input{height:40px;padding:0 10px;border-radius:10px;font-size:15px}.ptl textarea{min-height:0;padding:8px 10px;border-radius:10px;font-size:14px;resize:vertical}
.ptg3 input[type=date],.ptg3 input[type=time]{min-height:40px;padding:0 6px}
.ptper{display:grid;grid-template-columns:1fr 1fr;gap:6px}.ptper input{height:40px;padding:0 10px;border-radius:10px;font-size:14.5px}.ptper .pos{grid-column:1/-1}
.ptchips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.ptc{display:inline-flex;flex-direction:column;background:var(--soft);border-radius:10px;padding:5px 9px;max-width:100%}.ptc b{font-size:13px;font-weight:750}.ptc small{font-size:11px;color:var(--sub);font-weight:650}
.ptbtns{display:flex;gap:6px;flex-wrap:wrap}.ptbtns .btn{flex:1 1 140px;min-height:44px}
.ptwarn{font-size:12.5px;font-weight:750;color:var(--bad);margin:0 2px 8px}
.ptfix{margin-top:10px;background:var(--okbg);border-radius:12px;padding:9px 11px}.ptfix.bad{background:var(--badbg)}
.ptfix b{display:block;font-size:14px;font-weight:850}.ptfix small{display:block;font-size:12px;font-weight:650;color:var(--sub)}.ptfix.bad b,.ptfix.bad small{color:var(--bad)}
.ptfix i{display:block;height:6px;border-radius:99px;background:rgba(0,0,0,.08);margin-top:7px;overflow:hidden}.ptfix i u{display:block;height:100%;background:var(--okS)}.ptfix.bad i u{background:var(--badS)}
.ptlog{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line);font-size:13.5px}.ptlog:last-child{border:0}
.ptlog em{font-style:normal;font-size:11.5px;font-weight:850;flex:none;width:76px}.ptlog em.in{color:var(--ok)}.ptlog em.out{color:var(--bad)}
.ptlog span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700}.ptlog small{flex:none;color:var(--sub);font-size:11.5px}
.ptlog .x,.ptday .x{width:30px;height:30px;border-radius:9px;background:var(--soft);display:grid;place-items:center;color:var(--sub);flex:none}
.ptdh,.ptday{display:grid;grid-template-columns:44px 1fr 1fr 1fr 30px;gap:5px;align-items:center}
.ptdh{font-size:11px;font-weight:800;color:var(--sub);margin-bottom:4px;text-align:center}
.ptday{padding:3px 0}.ptday b{font-size:13px}.ptday input{height:34px;min-height:34px;padding:0 2px;border-radius:9px;font-size:13.5px;text-align:center}
.ptday.today b{color:#8a6d00;background:var(--sigbg);border-radius:7px;padding:2px 4px;text-align:center}
.ptday.off{opacity:.65}.ptoff{grid-column:2/5;font-size:12.5px;font-weight:750;color:var(--sub);text-align:center}
.ptp{display:flex;align-items:center;gap:10px;width:100%;text-align:start;padding:7px 8px;border-radius:14px;background:var(--card);border:1.5px solid var(--line);margin-bottom:6px}
.ptp.on{border-color:var(--ink);box-shadow:0 0 0 2px var(--sig) inset}
.ptk{width:26px;height:26px;border-radius:8px;border:2px solid var(--line);display:grid;place-items:center;flex:none;color:#12161c}.ptp.on .ptk{background:var(--sig);border-color:var(--sig)}
.ptav{width:40px;height:40px;border-radius:12px;overflow:hidden;background:var(--soft);display:grid;place-items:center;font-weight:850;color:var(--sub);flex:none}.ptav img{width:100%;height:100%;object-fit:cover}
.ptn{flex:1;min-width:0}.ptn b{display:block;font-size:14.5px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ptn small{display:block;font-size:12px;color:var(--sub);font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ptn em{font-style:normal;font-size:11px;font-weight:800;color:var(--bad)}
.ptcnt{font-size:13px;font-weight:850;margin:0 2px 8px}
.ptd{display:flex;align-items:stretch;gap:5px;padding:8px 0 2px;border-top:1px solid var(--line);margin-top:4px}
.ptdl{font-size:11.5px;font-weight:850;color:var(--sub);align-self:center;flex:none;width:54px}
.ptdb{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-height:44px;border-radius:12px;border:1.5px dashed var(--line);background:var(--card)}
.ptdb small{font-size:10.5px;font-weight:800;color:var(--sub)}.ptdb b{font-size:14px;font-weight:850;color:var(--sub)}
.ptdb.on{border-style:solid;border-color:var(--okS);background:var(--okbg)}.ptdb.on b{color:var(--ok)}
.ptdb.x{flex:none;width:56px;border-style:solid;border-color:var(--ink);background:var(--sig);color:#12161c}.ptdb.x small{color:#12161c}
.ptper.one{grid-template-columns:1fr}
.ptli{border:1.5px solid var(--line);border-radius:14px;padding:10px;margin-bottom:8px}.ptli.off{opacity:.6}
.ptlh{display:flex;align-items:center;gap:8px}.ptlh b{flex:1;min-width:0;font-size:14.5px;font-weight:850}.ptlh span{flex:none;font-size:12.5px;font-weight:800;color:var(--sub)}
.ptls{display:flex;align-items:center;gap:8px;margin:6px 0}.ptls em{font-style:normal;font-size:12px;color:var(--bad);font-weight:750}
.ptc.ex{flex-direction:row;align-items:center;gap:4px;border:1.5px dashed var(--line)}.ptc.ex button{width:20px;height:20px;border-radius:6px;display:grid;place-items:center;color:var(--sub)}
.ptlb{display:flex;flex-wrap:wrap;gap:6px}
.ptsb{display:inline-flex;align-items:center;gap:5px;min-height:34px;padding:0 10px;border-radius:10px;border:1.5px solid var(--line);background:var(--card);font-size:12.5px;font-weight:800;color:var(--ink)}
.ptsb.solid{background:var(--sig);border-color:var(--ink);color:#12161c}
.ptpr{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}.ptpr:last-of-type{border:0}
.ptpr span{flex:1;min-width:0;font-size:14px;font-weight:700}.ptpr.off span{color:var(--sub);text-decoration:line-through}
.ptck{width:28px;height:28px;border-radius:9px;border:2px solid var(--line);display:grid;place-items:center;flex:none;color:#12161c;background:var(--card)}.ptck.on{background:var(--sig);border-color:var(--sig)}.ptck:disabled{opacity:.35}
.ptdt{display:inline-flex;align-items:center;gap:4px;min-height:32px;padding:0 10px;border-radius:10px;border:1.5px solid var(--line);font-size:12.5px;font-weight:800;color:var(--sub);flex:none;text-decoration:line-through}
.ptdt.on{background:var(--okbg);border-color:var(--okS);color:var(--ok);text-decoration:none}.ptdt:disabled{opacity:.35}
.ptn em.nw{color:var(--warn)}
`;
(function(){if(document.getElementById('ptcss'))return;const st=document.createElement('style');st.id='ptcss';st.textContent=CSS;document.head.appendChild(st)})();

window.PTW={init,open,SHEETS,newFromPreset,presetsSheet,cardHTML,click,lat,buildXlsx,ensureDoc,_t:{setTeam,chgStat,readZip,setCell,refreshCache,wName}};
})();
