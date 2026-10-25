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
        const NF='<numFmt numFmtId="190" formatCode="dd\\.mm\\.yyyy;@"/><numFmt numFmtId="191" formatCode="dd\\.mm\\.yy;@"/>';
        if(/<numFmts\b/.test(x))x=x.replace(/<numFmts count="(\d+)">/,(a,c)=>`<numFmts count="${+c+2}">`).replace('</numFmts>',NF+'</numFmts>');
        else x=x.replace(/(<styleSheet[^>]*>)/,'$1<numFmts count="2">'+NF+'</numFmts>');
        x=x.replace(/<cellXfs[\s\S]*?<\/cellXfs>/,m=>{let i=-1;return m.replace(/<xf\b[^>]*?(?:\/>|>[\s\S]*?<\/xf>)/g,xf=>{i++;
          if(i===472||i===669)xf=xf.replace(/<alignment([^>]*?)\/>/,(q,at)=>/shrinkToFit/.test(at)?q:`<alignment${at} shrinkToFit="1"/>`);
          return xf})}).replace(/<cellXfs[\s\S]*?<\/cellXfs>/,m=>m.replace(/<xf\b([^>]*?)numFmtId="(14|165)"([^>]*?)(\/?)>/g,(a,p1,id,p2,sl)=>{let at=p1+'numFmtId="'+(id==='165'?'191':'190')+'"'+p2;if(!/applyNumberFormat=/.test(at))at+=' applyNumberFormat="1"';else at=at.replace(/applyNumberFormat="0"/,'applyNumberFormat="1"');return `<xf${at}${sl}>`}))}
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
    const gi=(d.guide&&d.guide.issue)?Object.keys(d.guide.issue).length:0;
    h+=`<button class="gbtn2" data-a="guide">${ic('nariad',20)}<span><b>${gt('g_open')}</b><small>${gi?gt('g_progress',gi,G_ISSUE.length):gt('g_first')}</small></span>${ic('chev',18)}</button>`;
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
    if(a==='guide')return guide(n.id,'issue');
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
  if(d){const [a,b]=dayProgress(n,day.id);h+=`<button class="gday ${a>=b?'ok':''}" data-act="ptw" data-id="${n.id}" data-k="guide">${ic(a>=b?'check':'list',17)}<span>${gt('g_day_btn',a,b)}</span><i><u style="width:${Math.round(a/b*100)}%"></u></i>${ic('chev',16)}</button>`}
  if(d&&d.team.length&&day.roll){const act=naryadsActive(day.id).filter(x=>x.doc&&x.doc.team.length);const inAny=new Set(act.flatMap(x=>x.doc.team));const out=presentIds(day).filter(id=>!inAny.has(id));
    if(out.length&&act[0]&&act[0].id===n.id)h+=`<button class="warnrow" style="margin-top:6px" data-act="ptw" data-id="${n.id}" data-k="addout">${ic('alert',18)}<span>${esc(t('pt_notin',out.map(i=>(W(i)||{name:'?'}).name.split(' ')[0]).join(', ')))} → ${t('pt_add_them')}</span></button>`}
  return h;
}
async function click(el,day){
  const n=NAR(el.dataset.id);if(!n)return;const k=el.dataset.k;
  if(k==='open')return open(n.id);
  if(k==='guide')return guide(n.id,'day');
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

/* ================= обучение: кто где подписывает, что проверить ================= */
const GT={ru:{
 g_title:'Обучение по наряду',g_open:'Кто где подписывает',g_tab_issue:'Оформление',g_tab_day:'Каждый день',g_tab_close:'Закрытие',
 g_intro_issue:'Один раз, до начала работ. Распечатайте наряд из приложения и соберите подписи по порядку — отмечайте галочками.',
 g_intro_day:d=>`Каждое утро и вечер по наряду. Отметки — на ${d}. Зелёные пункты приложение проверило само.`,
 g_intro_close:'Когда работа закончена или срок наряда вышел.',
 g_who_head:'Руководитель работ',g_who_me:'Вы — ответственный исполнитель',g_who_issuer:'Выдающий наряд',g_who_hse:'Специалист по ОТ',g_who_team:'Каждый член бригады',g_who_hot:'Бригада огневых',g_who_unit:'Руководитель подразделения',g_who_hotresp:'Ответственный за огневые',g_who_other:'Допускающий от владельца помещения',g_who_app:'В приложении',
 g_auto:'проверено',t_check:'Проверьте',t_done:'Сделано',t_done_on:'Сделано',t_next:'Далее',t_next_ch:'Дальше',t_finish:'Готово',g_end_n:'Конец дня: выведите бригаду и распишитесь в «Допуске»',g_progress:(a,b)=>`${a} из ${b}`,g_day_btn:(a,b)=>`Проверка дня · ${a}/${b}`,g_first:'Впервые с нарядом? Откройте обучение — там по шагам, кто и где расписывается.',
 g_warn_h:n=>`Нет допуска на высоту: ${n}`,g_warn_max:'В бригаде больше 35 человек — не поместятся в п.10',g_warn_notin:n=>`Работают, но не в бригаде: ${n}`,g_ok_all:'Все в порядке',
 i1:['Заполнить наряд и распечатать','Приложение: номер, даты, бригада, ответственные → «Скачать Excel» → печать','app'],
 i2:['Подпись руководителя работ','Наряд, п.1 — «Руководитель работ», графа «подпись»','head'],
 i3:['Ваша подпись','Наряд, п.2 — «Ответственный исполнитель работ»','me'],
 i4:['Согласование с охраной труда','Наряд, п.3 — ФИО, подпись и дата специалиста по ОТ','hse'],
 i5:['Инструктаж бригаде — провёл','Наряд, п.10 «Состав бригады», колонка «Ознакомил, инструктаж провёл» — должность, фамилия, подпись напротив каждого','head'],
 i6:['Инструктаж бригаде — получили','Наряд, п.10, последняя колонка — подпись каждого члена бригады','team'],
 i7:['Отдельные указания','Наряд, п.10.1 — подписи выдающего наряд и ответственного исполнителя','issuer+me'],
 i8:['Наряд выдал','Наряд, п.11 — подпись и дата','issuer'],
 i9:['Наряд принял','Наряд, п.12 — подпись и дата','head'],
 i10:['Разрешение приступить','Наряд, п.13 — «Рабочее место проверено… разрешаю приступить»: подпись и дата','head'],
 i11:['Совмещённые работы — если есть','Наряд, п.14 — только если на территории работает другая организация: подпись допускающего','other'],
 i12:['ППРВ — утвердить','Лист ППРВ, «УТВЕРЖДАЮ» — подпись и дата','issuer'],
 i13:['ПСЭР — утвердить','Лист ПСЭР, «УТВЕРЖДАЮ» — подпись и дата','issuer'],
 i14:['Ознакомление с планом спасения','Лист «ЛО ПСЭР» — подписи всех из списка и организатора собрания','team+head'],
 i15:['Огневой наряд — выдал и подготовил','Огневой: «Наряд-допуск выдал», «Лицо, ответственное за подготовку» — подписи','issuer+head'],
 i16:['Огневой — ответственный, ОТ и подразделение','Огневой: ответственный за проведение, регистрация специалистом ОТ, согласование руководителя подразделения — подписи и даты','hotresp+hse+unit'],
 i17:['Огневой — противопожарный инструктаж','Огневой, п.1 — «Провёл» (подпись) и «Получил» — подписи исполнителей огневых работ','head+hot'],
 i18:['Удостоверения при себе','У каждого в бригаде — удостоверение о допуске к работам на высоте на рабочем месте (обязательно по ППРВ)','team'],
 d1:['Наряд действует','Срок наряда не вышел','app'],
 d2:['Все на работе — в бригаде','Кто вышел по перекличке, должен быть в составе наряда (иначе — ввести через п.15)','app'],
 d3:['Изменения состава — в п.15','Если сегодня кого-то ввели или вывели: строка в п.15, подпись руководителя, инструктаж новым — «провёл» и «получил»','head'],
 d4:['Рабочее место перед началом','Леса/туры и лестницы, ограждение и знаки, 2 огнетушителя, аптечка, освещение, страховочные системы, связь','me'],
 d5:['Динамическая оценка рисков','Лист «Допуск», строка сегодняшней даты — время и подпись','me'],
 d6:['Инструктаж перед началом (TBT)','Лист инструктажа — подписи всех, кто работает сегодня, и организатора. Нужен лист — «Только этот лист» в разделе «Инструктажи»','team+head'],
 d7:['Допуск бригады','Лист «Допуск»: «Бригада получила инструктаж и допущена» — время и подпись руководителя работ и ваша','head+me'],
 d8:['Отметить начало и обед','На «Сегодня» в карточке наряда — «Начало» и «Обед»','app'],
 d9:['Конец дня: бригада выведена','Лист «Допуск»: «Работа закончена, бригада выведена» — время и ваша подпись. В приложении — «Конец»','me'],
 c1:['Закрытие наряда','Наряд, п.16 — подчеркнуть: «Работа выполнена в полном объёме…» или «Выявлены новые опасности…»','me'],
 c2:['Подписи при закрытии','Наряд, п.16 — руководитель работ, лицо, выдавшее наряд, и допускающий: должность, ФИО, подпись, дата','head+issuer+other'],
 c3:['Сдать комплект','Наряд вместе с листами допуска, инструктажей и ЛО ПСЭР — выдающему наряд','issuer'],
 c4:['Закрыть в приложении','Окно наряда → «Закрыть наряд»: он уйдёт из напоминаний','app']
}};
const gt=(k,...a)=>{const v=GT.ru[k];return typeof v==='function'?v(...a):v};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* ================= обучение по бланку: приближение, серым всё кроме строки, цвет по действию ================= */
const ROLE={head:'Руководитель работ',me:'Вы — ответственный исполнитель',issuer:'Выдающий наряд',hse:'Специалист по ОТ',team:'Члены бригады',hot:'Бригада огневых',hotresp:'Ответственный за огневые',unit:'Руководитель подразделения',other:'Допускающий (владелец помещения)',app:'Приложение'};
const TYPE={s:{c:'#16a34a',l:'Подписать'},f:{c:'#eab308',l:'Фамилия (ФИО)'},n:{c:'#0ea5e9',l:'Имена людей'},d:{c:'#f97316',l:'Дата, время'},c:{c:'#8b5cf6',l:'Проверить'},u:{c:'#ef4444',l:'Подчеркнуть'}};
const ROWY=k=>483+59.6*k,ROWH=59.6;
/* r: [x,y,w,h,кто,тип]  тип: a — строка (остаётся яркой), s f n d c u — см. TYPE */
const TOUR={issue:[
 {id:'i0',pg:1,t:'Как пользоваться',x:'Пройдём по бланку шаг за шагом. Экран сам приблизит нужную строку, остальное станет серым. Цвет рамки — что сделать:',legend:1,r:[]},
 {id:'i1',pg:1,t:'Номер, даты и время',x:'Это вписало приложение. Сверьте номер наряда, дату выдачи, срок действия и время работ.',r:[[33,180,972,175,'app','a'],[500,180,240,52,'app','c'],[180,270,150,85,'app','d'],[515,270,185,85,'app','d']]},
 {id:'i2',pg:1,t:'п.1 — Руководитель работ',x:'Фамилия и должность уже вписаны — проверьте. Руководитель работ расписывается в графе «подпись».',r:[[33,360,972,42,'head','a'],[370,362,220,38,'head','f'],[590,362,112,38,'head','s']]},
 {id:'i3',pg:1,t:'п.2 — Ответственный исполнитель',x:'Это вы. Проверьте фамилию и должность, распишитесь.',r:[[33,402,972,84,'me','a'],[370,404,220,80,'me','f'],[590,404,112,80,'me','s']]},
 {id:'i4',pg:1,t:'п.3 — Согласование с охраной труда',x:'Специалист по ОТ вписывает фамилию, расписывается и ставит дату.',r:[[33,486,972,42,'hse','a'],[515,488,185,38,'hse','f'],[700,488,118,38,'hse','s'],[822,488,183,38,'hse','d']]},
 {id:'i5',pg:3,t:'п.10 — Состав бригады',x:'Проверьте имена: все ли, кто будет работать, вписаны, и правильно ли профессии и разряды. Ошибка — исправьте в приложении («Бригада») и выгрузите заново.',r:[[50,1095,955,345,'app','a'],[50,1095,317,345,'app','n'],[367,1095,258,345,'app','c']]},
 {id:'i6',pg:3,t:'п.10 — Инструктаж провёл',x:'Напротив каждого: должность, фамилия, инициалы и подпись того, кто провёл целевой инструктаж.',r:[[50,1095,955,345,'head','a'],[626,1095,196,345,'head','s']]},
 {id:'i7',pg:3,t:'п.10 — Инструктаж получил',x:'Каждый член бригады расписывается в своей строке. Таблица продолжается на следующих листах — подписи во всех заполненных строках.',r:[[50,1095,955,345,'team','a'],[822,1095,183,345,'team','s']]},
 {id:'i8',pg:6,t:'п.10.1 — Отдельные указания',x:'Под блоком две подписи: слева — выдающий наряд, справа — вы.',r:[[30,95,975,450,'issuer','a'],[30,495,483,50,'issuer','s'],[513,495,492,50,'me','s']]},
 {id:'i9',pg:7,t:'п.11 — Наряд выдал',x:'Фамилия и дата уже есть. Подпись выдающего наряд.',r:[[33,120,972,87,'issuer','a'],[300,120,290,87,'issuer','f'],[700,120,122,87,'issuer','s'],[822,120,183,87,'issuer','d']]},
 {id:'i10',pg:7,t:'п.12 — Наряд принял',x:'Подпись руководителя работ, проверьте фамилию и дату.',r:[[33,262,972,48,'head','a'],[300,262,290,48,'head','f'],[700,262,122,48,'head','s'],[822,262,183,48,'head','d']]},
 {id:'i11',pg:7,t:'п.13 — Разрешаю приступить',x:'Рабочее место проверено, меры выполнены — подпись руководителя работ.',r:[[33,452,972,50,'head','a'],[300,452,290,50,'head','f'],[700,452,122,50,'head','s'],[822,452,183,50,'head','d']]},
 {id:'i12',pg:7,t:'п.14 — Совмещённые работы',x:'Только если на этой территории работает другая организация: её допускающий вписывает должность, фамилию, расписывается и ставит дату. Если нет — оставьте пустым.',r:[[33,665,972,50,'other','a'],[110,665,190,50,'other','f'],[300,665,290,50,'other','f'],[700,665,122,50,'other','s'],[822,665,183,50,'other','d']]},
 {id:'i13',pg:12,t:'ППРВ — утвердить',x:'Блок «УТВЕРЖДАЮ»: подпись, фамилия уже вписана, дата.',r:[[470,95,490,270,'issuer','a'],[490,235,160,45,'issuer','s'],[690,235,255,45,'issuer','f'],[725,300,220,50,'issuer','d']]},
 {id:'i14',pg:12,t:'Удостоверения на высоту',x:'У каждого в бригаде удостоверение о допуске к работам на высоте — при себе на рабочем месте.',r:[[33,790,910,60,'team','a'],[33,790,910,60,'team','c']]},
 {id:'i15',pg:17,t:'ПСЭР — утвердить',x:'Блок «УТВЕРЖДАЮ» плана спасения: подпись и дата.',r:[[520,100,440,270,'issuer','a'],[530,250,155,48,'issuer','s'],[720,250,235,48,'issuer','f'],[745,322,210,45,'issuer','d']]},
 {id:'i16',pg:36,t:'ЛО ПСЭР — имена',x:'Все, кто работает на высоте, должны быть в списке ознакомления с планом спасения.',r:[[70,453,866,380,'app','a'],[236,453,172,380,'app','n'],[643,453,180,380,'app','n']]},
 {id:'i17',pg:36,t:'ЛО ПСЭР — подписи',x:'Каждый из списка расписывается напротив своей фамилии. Внизу — подпись организатора собрания.',r:[[70,453,866,380,'team','a'],[408,453,92,380,'team','s'],[823,453,113,380,'team','s'],[100,895,780,110,'head','a'],[713,925,160,75,'head','s']]},
 {id:'i18',pg:37,hot:1,t:'Огневой — выдал, подготовил, проводит',x:'Три подписи: выдающий наряд, ответственный за подготовку и ответственный за проведение огневых работ.',r:[[33,283,972,47,'issuer','a'],[33,433,972,97,'head','a'],[483,283,114,47,'issuer','s'],[560,433,95,47,'head','f'],[655,433,105,47,'head','s'],[560,485,95,45,'hotresp','f'],[655,485,105,45,'hotresp','s']]},
 {id:'i19',pg:37,hot:1,t:'Огневой — ОТ и подразделение',x:'Специалист по ОТ: фамилия, подпись, дата. Руководитель подразделения: подпись и дата.',r:[[33,530,972,52,'hse','a'],[33,687,972,46,'unit','a'],[335,530,495,52,'hse','s'],[880,530,125,52,'hse','d'],[380,687,190,46,'unit','f'],[667,687,166,46,'unit','s'],[880,687,125,46,'unit','d']]},
 {id:'i20',pg:37,hot:1,t:'Огневой — противопожарный инструктаж',x:'Проверьте имена и профессии. «Провёл» — подпись проводившего, «Получил» — каждый исполнитель огневых работ.',r:[[40,1000,977,360,'hot','a'],[67,1000,306,360,'hot','n'],[633,1000,194,360,'head','s'],[827,1000,190,360,'hot','s']]}
],day:[
 {id:'d0',pg:1,t:'Наряд действует?',x:'Сегодняшняя дата должна быть не позже «Действителен до».',r:[[33,270,972,85,'app','a'],[180,318,150,37,'app','d']]},
 {id:'d1',pg:10,t:'Инструктаж TBT — дата и имена',x:'Дата — сегодняшняя, в списке все, кто сегодня вышел. Отдельный лист: в бланке «Инструктажи и подписи» → «Только этот лист».',r:[[33,240,940,45,'app','a'],[687,247,193,33,'app','d'],[60,880,880,427,'app','a'],[160,880,233,427,'app','n'],[587,880,226,427,'app','n']]},
 {id:'d2',pg:10,t:'Инструктаж TBT — подписи',x:'До начала работ каждый расписывается в своей строке. Внизу — организатор собрания.',r:[[60,880,880,427,'team','a'],[393,880,60,427,'team','s'],[813,880,67,427,'team','s'],[60,1315,880,60,'head','a'],[680,1325,200,50,'head','s']]},
 {id:'d3',pg:9,t:'Допуск — оценка рисков',x:'Строка сегодняшней даты: время и подпись — проведена динамическая оценка рисков.',r:[[33,'R',950,'H','me','a'],[33,'R',90,'H','app','d'],[217,'R',74,'H','me','d'],[291,'R',109,'H','me','s']]},
 {id:'d4',pg:9,t:'Допуск — бригада допущена',x:'Бригада получила инструктаж и допущена: время и подписи руководителя работ и ваша. В приложении нажмите «Начало».',r:[[33,'R',950,'H','head','a'],[400,'R',91,'H','head','d'],[491,'R',109,'H','head','s'],[600,'R',83,'H','me','d'],[683,'R',101,'H','me','s']]},
 {id:'d5',pg:3,t:'Рабочее место',x:'Перед началом — по отмеченным мерам: леса и лестницы, ограждение и знаки, огнетушители, аптечка, освещение, страховочные системы, связь.',r:[[33,95,972,305,'me','a'],[33,95,972,305,'me','c']]},
 {id:'d6',pg:7,t:'Если менялся состав — п.15',x:'Кого ввели или вывели: имена, дата и время (их вписывает приложение), подпись руководителя, инструктаж «провёл» и «получил».',r:[[33,1100,972,330,'head','a'],[67,1100,411,330,'app','n'],[478,1100,112,330,'app','d'],[590,1100,110,330,'head','s'],[700,1100,158,330,'head','s'],[858,1100,147,330,'team','s']]},
 {id:'d7',pg:9,t:'Конец дня',x:'Работа закончена, бригада выведена: время и ваша подпись. В приложении нажмите «Конец».',r:[[33,'R',950,'H','me','a'],[784,'R',89,'H','me','d'],[873,'R',111,'H','me','s']]}
],close:[
 {id:'c1',pg:8,t:'п.16 — Закрытие наряда',x:'Подчеркните нужное: «Работа выполнена в полном объёме…» или «Выявлены новые опасности…».',r:[[30,720,976,85,'me','a'],[30,720,976,85,'me','u']]},
 {id:'c2',pg:8,t:'п.16 — Подписи',x:'Руководитель работ, лицо, выдавшее наряд, и допускающий: должность, фамилия, подпись, дата.',r:[[30,827,976,275,'head','a'],[367,827,639,86,'head','s'],[367,913,639,94,'issuer','s'],[367,1007,639,95,'other','s']]},
 {id:'c3',pg:8,t:'Сдать комплект',x:'Наряд с листами допуска, инструктажей и ЛО ПСЭР — выдающему наряд. В приложении: окно наряда → «Закрыть наряд».',r:[]}
]};
const G_ISSUE=TOUR.issue.filter(s=>s.id!=='i0').map(s=>s.id),G_DAY=TOUR.day.map(s=>s.id);
function roleName(d,k){return {head:pName(d.head),me:pName(me()),issuer:pName(d.issuer),hse:pName(d.hse),team:t('pt_people',d.team.length),hot:t('pt_people',(d.hot.team||[]).length),hotresp:pName(d.hot.resp),unit:pName(d.hot.unitHead),other:'',app:''}[k]||''}
function dayAuto(n,d,date){
  const day=data.days.find(x=>x.id===date),rec=d.daily[date]||{},r={};
  r.d0=date>=n.from&&date<=n.to&&!n.closed;
  if(day&&day.roll){const inT=new Set(d.team);r.d1=d.team.length>0&&presentIds(day).every(id=>inT.has(id))}
  if(!d.changes.some(c=>iso(new Date(c.at))===date))r.d6=true;
  if(rec.e)r.d7=true;
  return r;
}
function dayProgress(n,date){const d=ensureDoc(n),a=dayAuto(n,d,date),m=(d.dcheck||{})[date]||{};const done=G_DAY.filter(k=>a[k]||m[k]).length;return [done,G_DAY.length]}
const PW=1075,PH=1521,SMIN=.85;
function guide(nid,tab){
  const n=NAR(nid);if(!n)return;const d=ensureDoc(n);d.guide=d.guide||{};d.dcheck=d.dcheck||{};
  let ch=tab||'issue',i=0,date=iso();if(date<n.from)date=n.from;if(date>n.to)date=n.to;
  const steps=()=>TOUR[ch].filter(s=>!(s.hot&&!d.hot.on));
  const rowK=()=>clamp(daysBetween(n.from,date),0,14);
  const rects=s=>s.r.map(([x,y,w,h,role,ty])=>[x,y==='R'?ROWY(rowK()):y,w,h==='H'?ROWH:h,role,ty]);
  const store=()=>ch==='day'?(d.dcheck[date]=d.dcheck[date]||{}):(d.guide[ch]=d.guide[ch]||{});
  const isDone=s=>{if(ch==='day'&&dayAuto(n,d,date)[s.id])return 'auto';return store()[s.id]?'on':''};
  const el=document.createElement('div');el.className='tour';el.dir='ltr';el.lang='ru';
  el.innerHTML=`<div class="ttop"><button class="tx" data-tclose aria-label="${t('close')}">${ic('x',22)}</button><div class="seg tchap">${[['issue',gt('g_tab_issue')],['day',gt('g_tab_day')],['close',gt('g_tab_close')]].map(([k,l])=>`<button data-tch="${k}">${l}</button>`).join('')}</div><button class="tx" data-tfit aria-label="fit">${ic('target',20)}</button></div>
  <div class="tstage" id="tstage"><div class="tpage" id="tpage"><img id="timg" alt="" draggable="false"><div id="tfix"></div><svg class="tdim" id="tdim" viewBox="0 0 ${PW} ${PH}" preserveAspectRatio="none"></svg><div id="thl"></div></div></div>
  <div class="tcard" id="tcard"></div>`;
  document.body.appendChild(el);lockScroll();document.body.classList.add('plopen');requestAnimationFrame(()=>el.classList.add('open'));
  const stage=$('#tstage',el),page=$('#tpage',el),img=$('#timg',el),fix=$('#tfix',el),dim=$('#tdim',el),hl=$('#thl',el),card=$('#tcard',el);
  let cam={s:.3,x:0,y:0},anim=true,cur=[];
  const apply=()=>{page.style.transition=anim?'transform .6s cubic-bezier(.32,.72,0,1)':'none';page.style.transform=`translate(${cam.x}px,${cam.y}px) scale(${cam.s})`;page.style.setProperty('--inv',(1/cam.s).toFixed(3))};
  const union=rs=>{if(!rs.length)return null;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;rs.forEach(([x,y,w,h])=>{x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x+w);y1=Math.max(y1,y+h)});return [x0,y0,x1-x0,y1-y0]};
  /* приблизить: читаемо (не мельче 1:1); если не влезает — встать на главный участок, остальное — пальцем */
  const focus=(rs,full,ctx)=>{const W=stage.clientWidth,H=stage.clientHeight;
    if(full||!rs.length){const s=Math.min(W/PW,H/PH)*.97;cam={s,x:(W-PW*s)/2,y:(H-PH*s)/2};anim=true;apply();return}
    const U=union(rs),A=union(ctx&&ctx.length?ctx:rs),pad=22,w=U[2]+2*pad,h=U[3]+2*pad;let s=clamp(Math.min(W/w,H/h),SMIN,1.7);
    const vw=W/s,vh=H/s,first=rs[0];
    const ax=(c0,c1,v,a)=>c1-c0+2*pad<=v?clamp(a,c1+pad-v/2,c0-pad+v/2):c0-pad+v/2;
    const cx=w<=vw?ax(U[0],U[0]+U[2],vw,A[0]+A[2]/2):Math.min(first[0]+first[2]/2,first[0]-pad+vw/2);
    const cy=h<=vh?ax(U[1],U[1]+U[3],vh,A[1]+A[3]/2):first[1]-pad+vh/2;
    cam={s,x:W/2-cx*s,y:H/2-cy*s};anim=true;apply()};
  /* подписи к рамкам: не наезжать друг на друга и на соседние рамки, не уходить за край экрана */
  function placeLabels(){const W=stage.clientWidth,s=cam.s,iv=1/s,placed=[],boxes=cur.filter(r=>r[5]!=='a');
    const hit=(a,b)=>a[0]<b[0]+b[2]&&b[0]<a[0]+a[2]&&a[1]<b[1]+b[3]&&b[1]<a[1]+a[3];
    $$('.thl[data-hk]',hl).forEach(div=>{const lab=div.querySelector('.tlab');if(!lab)return;const r=cur[+div.dataset.hk],[x,y,w,h]=r;
      lab.style.bottom='auto';lab.style.margin='0';const g=4*iv;let lw,lh;
      const vx0=(6-cam.x)/s,vx1=(W-6-cam.x)/s,fitX=X=>clamp(X,vx0,Math.max(vx0,vx1-lw));
      const cands=()=>{lw=lab.offsetWidth;lh=lab.offsetHeight;return [[x-3*iv,y-lh-g],[x+w-lw,y-lh-g],[x+2*iv,y+2*iv],[x-3*iv,y+h+g],[x+2*iv,y+h-lh-2*iv],[x+w-lw,y+h+g]].map(([X,Y])=>[fitX(X),Y])};
      const ok=([X,Y],strict)=>{const b=[X,Y,lw,lh];if(placed.some(p=>hit(p,b)))return false;if(strict&&boxes.some(o=>o!==r&&hit([o[0],o[1],o[2],o[3]],b)))return false;return true};
      let cs=cands(),c=cs.find(c=>ok(c,1));if(!c&&lab.dataset.short&&lab.textContent!==lab.dataset.short){lab.textContent=lab.dataset.short;cs=cands();c=cs.find(c=>ok(c,1))}c=c||cs.find(c=>ok(c,0))||cs[0];placed.push([c[0],c[1],lw,lh]);
      lab.style.left=(c[0]-x)+'px';lab.style.top=(c[1]-y)+'px'})}
  const preload=()=>[...new Set(steps().map(s=>s.pg))].forEach(p=>{const im=new Image();im.src=`naryad/tour/p${p}.jpg`});
  function show(){
    const ss=steps();i=clamp(i,0,ss.length-1);const s=ss[i],rs=rects(s);cur=rs;
    $$('[data-tch]',el).forEach(b=>b.classList.toggle('on',b.dataset.tch===ch));
    const src=`naryad/tour/p${s.pg}.jpg`;if(!img.src.endsWith(src)){img.style.opacity=0;img.onload=()=>{img.style.opacity=1};img.src=src}
    dim.innerHTML=rs.length?`<defs><mask id="tmk" maskUnits="userSpaceOnUse" x="0" y="0" width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" fill="#fff"/>${rs.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>`).join('')}</mask></defs><rect width="${PW}" height="${PH}" fill="rgba(112,118,128,.72)" mask="url(#tmk)"/>`:'';
    /* картинки — образец; даты на них заменяем на даты этого наряда */
    const dd=x=>x.split('-').reverse().join('.'),cell=(x,y,w,h,v)=>`<i style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${v}</i>`;
    fix.innerHTML=s.pg===9?Array.from({length:15},(_,k)=>cell(34,ROWY(k)+4,80,ROWH-8,dd(addDays(n.from,k)))).join(''):s.pg===10?cell(690,244,189,40,dd(date)):'';
    const seen=new Set();
    hl.innerHTML=rs.map(([x,y,w,h,role,ty],k)=>{if(ty==='a')return `<div class="thl a" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></div>`;
      const T=TYPE[ty]||TYPE.c,nm=roleName(d,role);let lab=T.l+(ty==='s'&&nm?' · '+nm:'');const key=ty+role;if(seen.has(key))lab='';else seen.add(key);
      return `<div class="thl ${ty}" data-hk="${k}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;--c:${T.c};animation-delay:${.3+k*.1}s">${lab?`<span class="tlab" data-short="${esc(T.l)}">${esc(lab)}</span>`:''}</div>`}).join('');
    const core=rs.filter(r=>r[5]!=='a');focus(core.length?core:rs,!rs.length,rs.filter(r=>r[5]==='a'));placeLabels();
    const done=isDone(s),track=s.id!=='i0';const total=ss.filter(x=>x.id!=='i0'),dn=total.filter(x=>isDone(x)).length;
    const types=[];core.forEach(r=>{const per=(r[5]==='s'||r[5]==='f')&&r[4]!=='app',key=per?'p'+r[4]:'t'+r[5];let q=types.find(z=>z.key===key);if(!q)types.push(q={key,per,role:r[4],tys:[],k:rs.indexOf(r)});if(!q.tys.includes(r[5]))q.tys.push(r[5])});
    card.innerHTML=`<div class="tprog"><b class="num">${i+1} / ${ss.length}</b>${ch==='day'?`<label class="tdate">${ic('cal',14)}<input type="date" data-tdate value="${date}" min="${n.from}" max="${n.to}"></label>`:''}<span class="num">${ic('check',13)} ${dn}/${total.length}</span><i><u style="width:${Math.round((i+1)/ss.length*100)}%"></u></i></div>
      <b class="tt">${esc(s.t)}</b><p class="tx2">${esc(s.x)}</p>
      ${s.legend?`<div class="tleg">${Object.values(TYPE).map(T=>`<span style="--c:${T.c}"><i></i>${esc(T.l)}</span>`).join('')}</div>`:''}
      ${types.length?`<div class="twho">${types.map(q=>{const nm=q.per?roleName(d,q.role):'',T0=TYPE[q.tys[0]]||TYPE.c;return `<button style="--c:${T0.c}" data-fk="${q.k}"><span class="tdots">${q.tys.map(ty=>`<i style="--c:${(TYPE[ty]||TYPE.c).c}"></i>`).join('')}</span><span>${q.per?`<b>${esc(ROLE[q.role]||'')}</b>${nm?` <b class="bidi tnm">${esc(nm)}</b>`:''} — ${q.tys.map(ty=>({s:'подпись',f:'фамилия',d:'дата'}[ty]||TYPE[ty].l.toLowerCase())).join(', ')}`:esc(T0.l)}</span></button>`}).join('')}</div>`:''}
      <div class="tbtn"><button class="tb" data-tprev ${i?'':'disabled'} aria-label="‹">${ic('chevl',20)}</button>${track?`<button class="tb done ${done?'on':''}" data-tdone ${done==='auto'?'disabled':''}>${ic('check',17)} ${done==='auto'?gt('g_auto'):gt('t_done')}</button>`:'<span style="flex:1"></span>'}<button class="tb tnx" data-tnext>${i<ss.length-1?gt('t_next'):ch==='close'?gt('t_finish'):gt('t_next_ch')} ${ic('chev',18)}</button></div>`;
  }
  const close=()=>{el.classList.remove('open');setTimeout(()=>el.remove(),250);document.body.classList.remove('plopen');unlockScroll();if(state.tab==='today')renderList()};
  el.addEventListener('click',async e=>{
    if(e.target.closest('[data-tclose]'))return close();
    if(e.target.closest('[data-tfit]')){focus([],true);return}
    const fk=e.target.closest('[data-fk]');if(fk){const r=cur[+fk.dataset.fk];if(r)focus([r]);return}
    const c=e.target.closest('[data-tch]');if(c){ch=c.dataset.tch;i=0;preload();show();return}
    if(e.target.closest('[data-tprev]')){i--;show();return}
    if(e.target.closest('[data-tnext]')){const ss=steps();if(i<ss.length-1){i++;show()}else if(ch==='issue'){ch='day';i=0;preload();show()}else if(ch==='day'){ch='close';i=0;preload();show()}else close();return}
    const dn=e.target.closest('[data-tdone]');if(dn&&!dn.disabled){const s=steps()[i],st=store();st[s.id]=!st[s.id];if(!st[s.id])delete st[s.id];await saveNar(n);if(st[s.id]&&i<steps().length-1)i++;show();return}
  });
  card.addEventListener('change',e=>{if(e.target.matches('[data-tdate]')&&e.target.value){date=e.target.value;show()}});
  const pts=new Map();let g=null;const lp=e=>{const r=stage.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}};
  stage.addEventListener('pointerdown',e=>{try{stage.setPointerCapture(e.pointerId)}catch(x){}pts.set(e.pointerId,lp(e));anim=false;
    if(pts.size===2){const [a,b]=[...pts.values()];g={pinch:1,d0:Math.max(10,Math.hypot(a.x-b.x,a.y-b.y)),m0:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},c0:Object.assign({},cam)}}else g={p0:lp(e),c0:Object.assign({},cam)}});
  stage.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId)||!g)return;pts.set(e.pointerId,lp(e));
    if(g.pinch&&pts.size>=2){const [a,b]=[...pts.values()],m={x:(a.x+b.x)/2,y:(a.y+b.y)/2},s=clamp(g.c0.s*Math.hypot(a.x-b.x,a.y-b.y)/g.d0,.15,4);const wx=(g.m0.x-g.c0.x)/g.c0.s,wy=(g.m0.y-g.c0.y)/g.c0.s;cam={s,x:m.x-wx*s,y:m.y-wy*s};apply();return}
    if(!g.pinch){const p=lp(e);cam={s:g.c0.s,x:g.c0.x+p.x-g.p0.x,y:g.c0.y+p.y-g.p0.y};apply()}});
  const up=e=>{pts.delete(e.pointerId);if(!pts.size)g=null;else if(g&&g.pinch){const p=[...pts.values()][0];g={p0:p,c0:Object.assign({},cam)}}};
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  stage.addEventListener('wheel',e=>{e.preventDefault();const p=lp(e),k=Math.exp(-e.deltaY*.0015),s=clamp(cam.s*k,.15,4);const wx=(p.x-cam.x)/cam.s,wy=(p.y-cam.y)/cam.s;anim=false;cam={s,x:p.x-wx*s,y:p.y-wy*s};apply()},{passive:false});
  el.addEventListener('gesturestart',e=>e.preventDefault());
  const onR=()=>show();window.addEventListener('resize',onR);
  const obs=new MutationObserver(()=>{if(!document.body.contains(el)){window.removeEventListener('resize',onR);obs.disconnect()}});obs.observe(document.body,{childList:true});
  preload();requestAnimationFrame(show);
}

/* напоминания-уведомления по наряду (вызываются раз в 30 с из приложения) */
const nFired=new Set();
function tickNotify(now,send){
  const date=iso(now),hm=now.getHours()*60+now.getMinutes(),tm=s=>{const p=String(s||'').split(':').map(Number);return p[0]*60+(p[1]||0)};
  naryadsActive(date).forEach(n=>{if(!n.doc)return;const d=n.doc,rec=d.daily[date]||{};if(rec.off)return;
    const fire=(key,title,body)=>{const k=date+n.id+key;if(nFired.has(k))return;nFired.add(k);send(title,body)};
    const num='№ '+(n.num||'—');
    if(hm>=tm(d.t1||'07:00')-20&&hm<tm(d.t1||'07:00')+90){const [a,b]=dayProgress(n,date);if(a<b)fire('chk','📋 '+gt('g_title')+' '+num,gt('g_day_btn',a,b))}
    if(!rec.s&&hm>=tm(d.t1||'07:00')+15&&hm<tm(d.t1||'07:00')+180)fire('s','⏱ '+num,t('pt_today_set','s'));
    if(!rec.e&&hm>=tm(d.end||'16:30')&&hm<tm(d.end||'16:30')+120)fire('e','🏁 '+num,gt('g_end_n'));
    if(daysBetween(date,n.to)===1&&hm>=tm('08:00'))fire('exp','⚠️ '+num,t('nar_end_soon',n.num||'—',t('nar_cal_tomorrow')));
  });
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
.tour{position:fixed;inset:0;z-index:60;background:#0b0e12;display:flex;flex-direction:column;opacity:0;transition:opacity .25s}.tour.open{opacity:1}
.ttop{display:flex;align-items:center;gap:8px;padding:calc(8px + env(safe-area-inset-top)) 10px 8px}
.tx{width:42px;height:42px;border-radius:13px;background:#1c222b;color:#fff;display:grid;place-items:center;flex:none}
.tchap{flex:1;margin:0;background:#1c222b;border-color:#2a313b}.tchap button{color:#9aa5b4;min-height:36px;font-size:13px}.tchap button.on{background:var(--sig);color:#12161c}
.tstage{position:relative;flex:1;min-height:0;overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none}
.tpage{position:absolute;left:0;top:0;width:1075px;height:1521px;transform-origin:0 0;will-change:transform;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.tpage img{position:absolute;inset:0;width:100%;height:100%;transition:opacity .25s;pointer-events:none}
[dir=rtl] .tour .chev{transform:none}
#tfix{position:absolute;inset:0;pointer-events:none}
#tfix i{position:absolute;display:flex;align-items:center;justify-content:center;background:#fff;color:#111;font:400 15px/1 "Liberation Serif","Times New Roman",Times,serif;font-style:normal}
.tdim{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;animation:tfade .4s ease both}
@keyframes tfade{from{opacity:0}to{opacity:1}}
.thl{position:absolute;border:calc(3.5px*var(--inv,1)) solid var(--c);border-radius:calc(6px*var(--inv,1));pointer-events:none;animation:tin .45s cubic-bezier(.32,.72,0,1) both}
.thl.s{background:color-mix(in srgb,var(--c) 22%,transparent);animation:tin .45s cubic-bezier(.32,.72,0,1) both,tpulse 1.6s ease-in-out .9s infinite}
.thl.c,.thl.n,.thl.f,.thl.d,.thl.u{background:color-mix(in srgb,var(--c) 18%,transparent)}
.thl.c{border-style:dashed}
.thl.u{border-bottom-width:calc(7px*var(--inv,1))}
.thl.f .tlab{color:#1c1917}
.thl.a{border:calc(2px*var(--inv,1)) solid rgba(18,22,28,.6);border-radius:calc(3px*var(--inv,1));background:none;animation:none}
@keyframes tin{from{opacity:0;transform:scale(1.08)}to{opacity:1;transform:none}}
@keyframes tpulse{50%{box-shadow:0 0 0 calc(7px*var(--inv,1)) color-mix(in srgb,var(--c) 35%,transparent)}}
.tlab{position:absolute;left:calc(-3px*var(--inv,1));bottom:100%;margin-bottom:calc(4px*var(--inv,1));white-space:nowrap;background:var(--c);color:#fff;font:800 calc(12.5px*var(--inv,1))/1.25 -apple-system,system-ui,sans-serif;padding:calc(3px*var(--inv,1)) calc(8px*var(--inv,1));border-radius:calc(7px*var(--inv,1));box-shadow:0 2px 8px rgba(0,0,0,.3)}
.tcard{background:var(--card);color:var(--ink);border-radius:22px 22px 0 0;padding:12px 14px calc(12px + env(safe-area-inset-bottom));box-shadow:0 -10px 30px rgba(0,0,0,.35);max-height:46vh;overflow:auto}
.tprog{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:12.5px;font-weight:800;color:var(--sub)}.tprog b{color:var(--ink);font-size:13px}
.tprog>span{display:inline-flex;align-items:center;gap:3px;color:var(--ok)}
.tprog i{flex:1;height:5px;border-radius:99px;background:var(--soft);overflow:hidden}.tprog i u{display:block;height:100%;background:var(--sig);transition:width .3s}
.tdate{display:inline-flex;align-items:center;gap:4px;color:var(--ink)}.tdate input{height:30px;min-height:30px;padding:0 6px;border-radius:8px;font-size:13px;width:auto}
.tt{display:block;font-size:18px;font-weight:850;letter-spacing:-.01em;line-height:1.25}
.tx2{margin:5px 0 8px;font-size:14.5px;line-height:1.45;color:var(--ink)}
.twho,.tleg{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.twho .tdots{display:inline-flex;gap:3px;flex:none}
.twho .tdots i{width:11px;height:11px;border-radius:4px;background:var(--c)}
.twho button>span:last-child{min-width:0}
.twho .tnm{white-space:nowrap}
.twho button{border:1.5px solid color-mix(in srgb,var(--c) 50%,transparent);color:var(--ink);text-align:start;line-height:1.3}
.twho button b{font-weight:850}
.twho button,.tleg span{display:inline-flex;align-items:center;gap:6px;background:var(--soft);border-radius:10px;padding:5px 9px;font-size:12.5px;font-weight:700}
.twho i,.tleg i{width:12px;height:12px;border-radius:4px;background:var(--c);flex:none}
.tbtn{display:flex;gap:8px}.tb{white-space:nowrap;min-height:48px;border-radius:14px;border:1.5px solid var(--line);background:var(--card);font-weight:850;font-size:15px;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 14px;color:var(--ink)}
.tb[data-tprev]{width:52px;flex:none;padding:0}.tb:disabled{opacity:.35}
.tb.done{flex:1}.tb.done.on{background:var(--okbg);border-color:var(--okS);color:var(--ok)}
.tb.tnx{flex:1.3;background:var(--sig);border-color:#12161c;color:#12161c}
.gbtn2{display:flex;align-items:center;gap:10px;width:100%;text-align:start;padding:11px 12px;border-radius:15px;background:var(--hero);color:#fff;margin-bottom:10px}
.gbtn2>.ic:first-child{color:var(--sig)}.gbtn2 span{flex:1;min-width:0}.gbtn2 b{display:block;font-size:15px;font-weight:850}.gbtn2 small{display:block;font-size:12px;color:#c9d1dc;font-weight:600;line-height:1.3}
.gday{display:flex;align-items:center;gap:8px;width:100%;text-align:start;margin-top:8px;padding:9px 10px;border-radius:12px;background:var(--card);border:1.5px solid var(--line);font-size:13.5px;font-weight:800}
.gday span{flex:none}.gday i{flex:1;height:6px;border-radius:99px;background:var(--soft);overflow:hidden}.gday i u{display:block;height:100%;background:var(--sig)}
.gday.ok{border-color:var(--okS);background:var(--okbg);color:var(--ok)}.gday.ok i u{background:var(--okS)}
.gpro{display:flex;align-items:center;gap:10px;margin:0 2px 10px}.gpro b{font-size:14px;font-weight:850;flex:none}.gpro i{flex:1;height:8px;border-radius:99px;background:var(--soft);overflow:hidden}.gpro i u{display:block;height:100%;background:var(--okS);transition:width .3s}
.gdate{display:flex;align-items:center;gap:8px;margin:0 0 10px;font-weight:800}.gdate input{height:40px;min-height:40px;max-width:180px;padding:0 10px;border-radius:10px}
.gst{display:flex;gap:10px;align-items:flex-start;background:var(--card);border:1.5px solid var(--line);border-radius:14px;padding:10px;margin-bottom:6px}
.gst.on{border-color:var(--okS)}.gst.on .gtx>b{color:var(--ok)}
.gck{width:32px;height:32px;border-radius:10px;border:2px solid var(--line);display:grid;place-items:center;flex:none;font-size:13px;font-weight:850;color:var(--sub);background:var(--card)}
.gst.on .gck{background:var(--okS);border-color:var(--okS);color:#fff}.gck:disabled{opacity:1}
.gtx{flex:1;min-width:0}.gtx>b{display:block;font-size:14.5px;font-weight:850;line-height:1.3}.gtx>b em{font-style:normal;font-size:11px;font-weight:850;background:var(--okbg);color:var(--ok);border-radius:6px;padding:1px 6px;margin-inline-start:4px}
.gtx p{margin:3px 0 6px;font-size:13px;line-height:1.4;color:var(--sub);font-weight:600}
.gwho{display:flex;flex-wrap:wrap;gap:5px}.gwho span{display:inline-flex;flex-wrap:wrap;gap:4px;align-items:baseline;background:var(--soft);border-radius:9px;padding:4px 8px;font-size:12px}.gwho i{font-style:normal;color:var(--sub);font-weight:700}.gwho b{font-weight:850}
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

window.PTW={init,open,SHEETS,guide,tickNotify,dayProgress,newFromPreset,presetsSheet,cardHTML,click,lat,buildXlsx,ensureDoc,_t:{setTeam,chgStat,readZip,setCell,refreshCache,wName}};
})();
