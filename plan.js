/* План объекта (β) — отдельный модуль. Если этот файл не загрузится или упадёт, остальное приложение работает как раньше. */
(function(){
'use strict';

/* ================= словарь ================= */
const I18N={ru:{
 pl_beta:'Тестовая функция — в разработке. Пробуйте смело, но копию данных делайте как обычно.',
 pl_empty_t:'Нарисуйте первую комнату',pl_empty_s:'Пальцем, по размерам или по фото чертежа. Потом разбейте на зоны и закрашивайте, что сделано за день — площадь посчитается сама.',
 pl_new:'Новый план',pl_def_name:n=>'Комната '+n,pl_name:'Название',pl_place:'Объект / отметка',pl_place_ph:'Например: 20 UJA -19.200',
 pl_surface:'Поверхность',pl_s_floor:'Пол',pl_s_wall:'Стены',pl_s_ceiling:'Потолок',
 pl_stages:'Этапы работ',pl_stages_hint:'Выберите, что будете делать на этой поверхности. Можно добавить позже.',pl_stage_add:'Этап',pl_stage_new:'Новый этап',pl_stage_ph:'Например: Шлифовка',
 pl_start:'С чего начать',pl_st_draw:'Нарисую',pl_st_tpl:'По размерам',pl_st_photo:'Фото чертежа',
 pl_m_draw:'Контур',pl_m_objs:'Объекты',pl_m_work:'Работы',
 pl_t_free:'Рисовать',pl_t_pts:'По точкам',pl_t_tpl:'Шаблон',pl_t_photo:'Фото',
 pl_pt_undo:'Убрать точку',pl_pt_close:'Замкнуть',
 pl_h_free:'Нарисуйте комнату одним движением пальца — линии выпрямятся сами. Два пальца — двигать и увеличивать.',
 pl_h_pts:'Ставьте точки по углам комнаты. Нажмите на первую точку, чтобы замкнуть.',
 pl_h_dims:'Нажмите на размер — впишите точный. Тяните жёлтую точку — двигайте угол. Нажмите на точку — скруглить угол.',
 pl_h_objs:'Выберите, что отметить, и проведите пальцем — получится прямоугольник. Нажмите на объект, чтобы изменить.',
 pl_h_objs_pts:'Ставьте точки по углам участка. Нажмите на первую точку, чтобы замкнуть.',
 pl_h_drain:'Нажмите на план там, где слив.',
 pl_h_zone:'Нажмите на зону — отметить её сделанной за этот день. Ещё раз — снять.',
 pl_h_zone0:'Зон нет — нажмите на комнату, чтобы отметить её целиком. Или разбейте на зоны во вкладке «Объекты».',
 pl_h_brush:'Закрасьте пальцем, где сделали. Два пальца — двигать план.',
 pl_h_erase:'Нажмите на закрашенное за этот день — отметка уберётся.',
 pl_h_cal1:'Масштаб: нажмите на начало стены, длину которой знаете.',pl_h_cal2:'Теперь нажмите на конец этой стены.',
 pl_h_nostage:'Сначала добавьте этап работ — кнопка «＋ Этап».',
 pl_need_outline:'Сначала нарисуйте контур комнаты.',
 pl_bad_draw:'Не получилось распознать комнату. Нарисуйте контур одним движением и вернитесь к началу.',
 pl_drawn:'Линии выровнены. Нажмите на размер стены и впишите точный.',
 pl_area:'Площадь',pl_work_area:'В работе',pl_area_all:'Площадь комнаты',pl_area_work:'Площадь работ',
 pl_k_zone:'Зона',pl_k_nowork:'Не работаем',pl_k_metal:'Железо',pl_k_rack:'Стеллаж',pl_k_stairs:'Лестница',pl_k_column:'Колонна',pl_k_drain:'Слив',
 pl_kh_zone:'Часть комнаты для работы по этапам (A, B, C…)',pl_kh_nowork:'Здесь не работаем — не входит в площадь',pl_kh_metal:'Участок с железом — по умолчанию не входит в площадь',pl_kh_rack:'Под стеллажом пол работаем — входит в площадь',pl_kh_stairs:'Лестница — по умолчанию не входит в площадь',pl_kh_column:'Колонна — не входит в площадь',pl_kh_drain:'Слив для воды / трап',
 pl_sh_rect:'Прямоугольник',pl_sh_pts:'По точкам',
 pl_obj:'Объект',pl_obj_name:'Название',pl_obj_w:'Ширина, м',pl_obj_h:'Длина, м',pl_obj_d:'Диаметр, м',pl_obj_sub:'Входит в площадь работ',pl_obj_del:'Удалить объект',pl_edit:'Изменить',
 pl_edge:n=>'Стена '+n,pl_edge_len:'Длина, м',pl_edge_chord:'Ширина дуги (хорда), м',pl_edge_now:v=>'Сейчас: '+v+' м',pl_edge_scale:'Подогнать весь чертёж под эту длину',pl_edge_scale_h:'Включите для первого размера: весь рисунок увеличится или уменьшится. Дальше — выключите, и будет меняться только эта стена.',
 pl_edge_arc:'Дуга: прогиб, м',pl_edge_arc_h:'0 — прямая стена. Плюс — выгнута наружу, минус — внутрь. Половина хорды — полукруг.',
 pl_edge_split:'Разделить стену пополам',pl_outline_del:'Удалить этот контур',pl_outline_del_q:'Удалить контур комнаты?',
 pl_vtx:'Угол',pl_vtx_round:'Скруглить угол',pl_vtx_r:'Радиус скругления, м',pl_vtx_del:'Удалить точку',
 pl_tpl:'Комната по размерам',pl_tpl_rect:'Прямоугольник',pl_tpl_l:'Г-образная',pl_tpl_circle:'Круглая',pl_tpl_stadium:'Скруглённая',
 pl_tpl_w:'Длина, м',pl_tpl_h:'Ширина, м',pl_tpl_d:'Диаметр, м',pl_tpl_a1:'Коридор 1: длина, м',pl_tpl_b1:'Коридор 1: ширина, м',pl_tpl_a2:'Коридор 2: длина, м',pl_tpl_b2:'Коридор 2: ширина, м',
 pl_tpl_st_h:'Прямая часть + полукруг с одной стороны',pl_tpl_l_h:'Два коридора, соединённые углом',
 pl_tpl_add:'Добавить к плану',pl_tpl_replace:'Заменить контур',pl_tpl_mode:'Если контур уже есть',
 pl_photo:'Фото чертежа',pl_photo_load:'Загрузить фото чертежа',pl_photo_replace:'Заменить фото',pl_photo_cal:'Масштаб по двум точкам',pl_photo_rot:'Повернуть на 90°',pl_photo_op:'Прозрачность',pl_photo_del:'Убрать фото',
 pl_photo_hint:'Сфотографируйте чертёж ровно сверху. Потом задайте масштаб по стене с известной длиной и обведите контур «По точкам».',
 pl_cal_len:'Длина между точками, м',pl_cal_done:'Масштаб задан',
 pl_stage_none:'Этапов нет',pl_day:'День',pl_today:'Сегодня',
 pl_w_zone:'Зона',pl_w_brush:'Кисть',pl_w_erase:'Ластик',pl_res_done:'Сделано',pl_res_redo:'Переделка',pl_bw:'Кисть',
 pl_st_done:'Готово',pl_st_redo:'Переделать',pl_st_left:'Осталось',pl_st_day:'За день',
 pl_stats:(d,w,p)=>`Готово ${d} из ${w} м² · ${p}%`,pl_stats_day:a=>`за день +${a} м²`,pl_stats_redo:a=>`переделать ${a} м²`,
 pl_to_report:'В отчёт',pl_rep_t:'Записать в факт дня',pl_rep_area:'Площадь за день, м²',pl_rep_pick:'Какую работу дополнить',pl_rep_add:'Прибавить к факту',pl_rep_set:'Заменить факт',
 pl_rep_was:(a,b)=>`Было: ${a} → станет: ${b}`,pl_rep_none:'На этот день ещё нет участков.',pl_rep_site:n=>`＋ Создать участок «\u2068${n}\u2069» с этой работой`,pl_rep_new:n=>`＋ Добавить «${n}» сюда`,pl_rep_ok:'Записано в отчёт',pl_rep_zero:'За этот день ничего не закрашено.',
 pl_menu:'План',pl_settings:'Настройки плана',pl_share_img:'Поделиться картинкой',pl_dup:'Сделать копию',pl_del:'Удалить план',pl_del_q:'Удалить план?',pl_del_t:'Чертёж и все отметки по нему будут удалены.',pl_copy:' (копия)',
 pl_zones_n:n=>'зон: '+n,pl_no_outline:'контур не нарисован',
 pl_saved:'Сохранено',pl_legend_prev:'сделано раньше',pl_legend_day:'за выбранный день',pl_legend_redo:'переделать',pl_legend_no:'не работаем',
 pl_stage_del_q:n=>`Удалить этап «${n}» и все его отметки?`,pl_stage_rename:'Переименовать',pl_stage_del:'Удалить этап'
},ar:{
 pl_beta:'ميزة تجريبية — قيد التطوير. جرّبها بحرية، واحفظ نسخة من البيانات كالمعتاد.',
 pl_empty_t:'ارسم الغرفة الأولى',pl_empty_s:'بإصبعك أو بالمقاسات أو من صورة المخطط. ثم قسّمها إلى مناطق ولوّن ما أُنجز في اليوم — تُحسب المساحة تلقائيًا.',
 pl_new:'مخطط جديد',pl_def_name:n=>'غرفة '+n,pl_name:'الاسم',pl_place:'الموقع / المنسوب',pl_place_ph:'مثلًا: 20 UJA -19.200',
 pl_surface:'السطح',pl_s_floor:'الأرضية',pl_s_wall:'الجدران',pl_s_ceiling:'السقف',
 pl_stages:'مراحل العمل',pl_stages_hint:'اختر ما ستنفذه على هذا السطح. يمكن الإضافة لاحقًا.',pl_stage_add:'مرحلة',pl_stage_new:'مرحلة جديدة',pl_stage_ph:'مثلًا: جلخ',
 pl_start:'من أين نبدأ',pl_st_draw:'سأرسم',pl_st_tpl:'بالمقاسات',pl_st_photo:'صورة المخطط',
 pl_m_draw:'المحيط',pl_m_objs:'العناصر',pl_m_work:'الأعمال',
 pl_t_free:'رسم',pl_t_pts:'بالنقاط',pl_t_tpl:'قالب',pl_t_photo:'صورة',
 pl_pt_undo:'حذف النقطة',pl_pt_close:'إغلاق الشكل',
 pl_h_free:'ارسم الغرفة بحركة واحدة من إصبعك — ستستقيم الخطوط تلقائيًا. بإصبعين: تحريك وتكبير.',
 pl_h_pts:'ضع النقاط في زوايا الغرفة. اضغط على النقطة الأولى للإغلاق.',
 pl_h_dims:'اضغط على المقاس لكتابة القيمة الدقيقة. اسحب النقطة الصفراء لتحريك الزاوية. اضغط على النقطة لتدوير الزاوية.',
 pl_h_objs:'اختر ما تريد تحديده واسحب بإصبعك — يظهر مستطيل. اضغط على العنصر لتعديله.',
 pl_h_objs_pts:'ضع النقاط في زوايا المنطقة. اضغط على النقطة الأولى للإغلاق.',
 pl_h_drain:'اضغط على المخطط مكان المصرف.',
 pl_h_zone:'اضغط على المنطقة لتحديدها منجزة في هذا اليوم. مرة أخرى للإلغاء.',
 pl_h_zone0:'لا توجد مناطق — اضغط على الغرفة لتحديدها كاملة، أو قسّمها في تبويب «العناصر».',
 pl_h_brush:'لوّن بإصبعك المكان الذي أُنجز. بإصبعين: تحريك المخطط.',
 pl_h_erase:'اضغط على ما لُوّن في هذا اليوم — تُحذف العلامة.',
 pl_h_cal1:'المقياس: اضغط على بداية جدار تعرف طوله.',pl_h_cal2:'الآن اضغط على نهاية هذا الجدار.',
 pl_h_nostage:'أضف مرحلة عمل أولًا — زر «＋ مرحلة».',
 pl_need_outline:'ارسم محيط الغرفة أولًا.',
 pl_bad_draw:'لم نتعرف على الغرفة. ارسم المحيط بحركة واحدة وعد إلى نقطة البداية.',
 pl_drawn:'استقامت الخطوط. اضغط على مقاس الجدار واكتب القيمة الدقيقة.',
 pl_area:'المساحة',pl_work_area:'للعمل',pl_area_all:'مساحة الغرفة',pl_area_work:'مساحة العمل',
 pl_k_zone:'منطقة',pl_k_nowork:'لا نعمل',pl_k_metal:'حديد',pl_k_rack:'رف',pl_k_stairs:'درج',pl_k_column:'عمود',pl_k_drain:'مصرف',
 pl_kh_zone:'جزء من الغرفة للعمل حسب المراحل (A، B، C…)',pl_kh_nowork:'لا نعمل هنا — لا يدخل في المساحة',pl_kh_metal:'منطقة بها حديد — لا تدخل في المساحة افتراضيًا',pl_kh_rack:'نعمل الأرضية تحت الرف — تدخل في المساحة',pl_kh_stairs:'درج — لا يدخل في المساحة افتراضيًا',pl_kh_column:'عمود — لا يدخل في المساحة',pl_kh_drain:'مصرف مياه',
 pl_sh_rect:'مستطيل',pl_sh_pts:'بالنقاط',
 pl_obj:'عنصر',pl_obj_name:'الاسم',pl_obj_w:'العرض، م',pl_obj_h:'الطول، م',pl_obj_d:'القطر، م',pl_obj_sub:'يدخل في مساحة العمل',pl_obj_del:'حذف العنصر',pl_edit:'تعديل',
 pl_edge:n=>'جدار '+n,pl_edge_len:'الطول، م',pl_edge_chord:'عرض القوس (الوتر)، م',pl_edge_now:v=>'الآن: '+v+' م',pl_edge_scale:'ضبط المخطط كله على هذا الطول',pl_edge_scale_h:'فعّلها لأول مقاس: يكبر الرسم كله أو يصغر. بعد ذلك أوقفها ليتغير هذا الجدار فقط.',
 pl_edge_arc:'قوس: مقدار الانحناء، م',pl_edge_arc_h:'0 — جدار مستقيم. موجب — للخارج، سالب — للداخل. نصف الوتر — نصف دائرة.',
 pl_edge_split:'تقسيم الجدار إلى نصفين',pl_outline_del:'حذف هذا المحيط',pl_outline_del_q:'حذف محيط الغرفة؟',
 pl_vtx:'زاوية',pl_vtx_round:'تدوير الزاوية',pl_vtx_r:'نصف قطر التدوير، م',pl_vtx_del:'حذف النقطة',
 pl_tpl:'غرفة بالمقاسات',pl_tpl_rect:'مستطيل',pl_tpl_l:'على شكل L',pl_tpl_circle:'دائرية',pl_tpl_stadium:'مستديرة الطرف',
 pl_tpl_w:'الطول، م',pl_tpl_h:'العرض، م',pl_tpl_d:'القطر، م',pl_tpl_a1:'الممر 1: الطول، م',pl_tpl_b1:'الممر 1: العرض، م',pl_tpl_a2:'الممر 2: الطول، م',pl_tpl_b2:'الممر 2: العرض، م',
 pl_tpl_st_h:'جزء مستقيم + نصف دائرة من جهة واحدة',pl_tpl_l_h:'ممران متصلان بزاوية',
 pl_tpl_add:'إضافة إلى المخطط',pl_tpl_replace:'استبدال المحيط',pl_tpl_mode:'إذا كان المحيط موجودًا',
 pl_photo:'صورة المخطط',pl_photo_load:'تحميل صورة المخطط',pl_photo_replace:'استبدال الصورة',pl_photo_cal:'المقياس بنقطتين',pl_photo_rot:'تدوير 90°',pl_photo_op:'الشفافية',pl_photo_del:'إزالة الصورة',
 pl_photo_hint:'صوّر المخطط من الأعلى بشكل مستقيم. ثم حدد المقياس بجدار معروف الطول وارسم المحيط «بالنقاط».',
 pl_cal_len:'المسافة بين النقطتين، م',pl_cal_done:'تم تحديد المقياس',
 pl_stage_none:'لا توجد مراحل',pl_day:'اليوم',pl_today:'اليوم',
 pl_w_zone:'منطقة',pl_w_brush:'فرشاة',pl_w_erase:'ممحاة',pl_res_done:'منجز',pl_res_redo:'إعادة',pl_bw:'فرشاة',
 pl_st_done:'منجز',pl_st_redo:'إعادة عمل',pl_st_left:'متبقٍ',pl_st_day:'في اليوم',
 pl_stats:(d,w,p)=>`منجز ${d} من ${w} م² · ${p}%`,pl_stats_day:a=>`في اليوم +${a} م²`,pl_stats_redo:a=>`إعادة ${a} م²`,
 pl_to_report:'إلى التقرير',pl_rep_t:'تسجيل في منجز اليوم',pl_rep_area:'مساحة اليوم، م²',pl_rep_pick:'أي عمل نضيف إليه',pl_rep_add:'إضافة إلى المنجز',pl_rep_set:'استبدال المنجز',
 pl_rep_was:(a,b)=>`كان: ${a} → يصبح: ${b}`,pl_rep_none:'لا توجد مواقع في هذا اليوم بعد.',pl_rep_site:n=>`＋ إنشاء موقع «\u2068${n}\u2069» مع هذا العمل`,pl_rep_new:n=>`＋ إضافة «${n}» هنا`,pl_rep_ok:'سُجّل في التقرير',pl_rep_zero:'لم يُلوَّن شيء في هذا اليوم.',
 pl_menu:'المخطط',pl_settings:'إعدادات المخطط',pl_share_img:'مشاركة صورة',pl_dup:'عمل نسخة',pl_del:'حذف المخطط',pl_del_q:'حذف المخطط؟',pl_del_t:'سيُحذف الرسم وكل العلامات عليه.',pl_copy:' (نسخة)',
 pl_zones_n:n=>'مناطق: '+n,pl_no_outline:'لم يُرسم المحيط',
 pl_saved:'تم الحفظ',pl_legend_prev:'منجز سابقًا',pl_legend_day:'في اليوم المحدد',pl_legend_redo:'إعادة عمل',pl_legend_no:'لا نعمل',
 pl_stage_del_q:n=>`حذف المرحلة «${n}» وكل علاماتها؟`,pl_stage_rename:'إعادة تسمية',pl_stage_del:'حذف المرحلة'
}};
const ICONS={
 brush:'<path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>',
 eraser:'<path d="M20 20H7L3 16a2 2 0 0 1 0-2.8L13.2 3a2 2 0 0 1 2.8 0L21 8a2 2 0 0 1 0 2.8L11 20"/><line x1="6" y1="11" x2="13" y2="18"/>',
 zone:'<rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="4 3"/><path d="M8 12l3 3 5-6"/>',
 dot:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" stroke-dasharray="3 3"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/>',
 rot:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><polyline points="21 3 21 8 16 8"/>'
};
function init(){Object.assign(L.ru,I18N.ru);Object.assign(L.ar,I18N.ar);Object.assign(IC,ICONS)}
let arDone=false;function ensureAr(){if(arDone)return;try{AR_SUG.forEach(([r,a])=>{const k=keyOf(r);if(!BASE_AR_MAP[k])BASE_AR_MAP[k]=a});arDone=true}catch(e){}}

/* ================= константы ================= */
const KINDS=['zone','nowork','metal','rack','stairs','column','drain'];
const SUB_DEF={zone:false,nowork:true,metal:true,rack:false,stairs:true,column:true,drain:true};
const KCOL={zone:'#12161c',nowork:'#8a94a3',metal:'#3d5a80',rack:'#9a6a2f',stairs:'#5a6472',column:'#4a5361',drain:'#1d4ed8'};
const COL={prev:'#8fd9a6',day:'#ffd84a',redo:'#f5a0a0',room:'#ffffff'};
const STAGE_SUG=['Расшивка','Ремонт','Шлифовка','Обеспыливание','Грунтование','Галтель'];
const LET='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SECT={floor:'Полы',wall:'Стены',ceiling:'Потолок'};
const M2=()=>S.lang==='ar'?'م²':'м²',M1=()=>S.lang==='ar'?'م':'м';
const AR_SUG=[['Расшивка','تفريغ'],['Ремонт','إصلاح'],['Шлифовка','جلخ'],['Обеспыливание','إزالة الغبار'],['Грунтование','تأسيس'],['Галтель','زوايا مقعرة'],['Зона','منطقة']];

/* ================= числа ================= */
const dsep=()=>S.lang==='ar'?'.':',';
function fm(v,d){if(!isFinite(v))return '—';d=d==null?2:d;let s=(Math.round(v*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);if(s.indexOf('.')>=0)s=s.replace(/0+$/,'').replace(/\.$/,'');return s.replace('.',dsep())}
const fa=v=>(Math.round((v||0)*10)/10).toFixed(1).replace('.',dsep());
const r2=v=>Math.round(v*100)/100;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pn=s=>{const v=num(s);return isFinite(v)?v:NaN};

/* ================= геометрия ================= */
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function sArea(pts){let a=0;for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[(i+1)%pts.length];a+=p.x*q.y-q.x*p.y}return a/2}
function bboxPts(pts){if(!pts||!pts.length)return null;let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;pts.forEach(p=>{if(p.x<x0)x0=p.x;if(p.y<y0)y0=p.y;if(p.x>x1)x1=p.x;if(p.y>y1)y1=p.y});return {x:x0,y:y0,w:x1-x0,h:y1-y0}}
function arcGeo(a,b,h,sg){
  const dx=b.x-a.x,dy=b.y-a.y,c=Math.hypot(dx,dy);if(!h||c<1e-9)return null;
  const n=sg>0?{x:dy/c,y:-dx/c}:{x:-dy/c,y:dx/c};
  const mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},k=(h*h-c*c/4)/(2*h);
  const C={x:mid.x+n.x*k,y:mid.y+n.y*k},r=Math.abs(h-k),M={x:mid.x+n.x*h,y:mid.y+n.y*h};
  const TW=Math.PI*2,nz=x=>((x%TW)+TW)%TW;
  const a1=Math.atan2(a.y-C.y,a.x-C.x),a2=Math.atan2(b.y-C.y,b.x-C.x),am=Math.atan2(M.y-C.y,M.x-C.x);
  const d2=nz(a2-a1),dm=nz(am-a1),sweep=dm<d2?d2:-(TW-d2);
  return {C,r,a1,sweep,M,n};
}
const oSign=o=>Math.sign(sArea(o.pts))||1;
function dens(o,seg){
  const pts=o.pts,n=pts.length,sg=oSign(o),out=[];
  for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n];out.push({x:a.x,y:a.y});
    if(a.s){const g=arcGeo(a,b,a.s,sg);if(g){const m=Math.max(4,Math.ceil(Math.abs(g.sweep)/(Math.PI/(seg||36))));for(let j=1;j<m;j++){const tt=g.a1+g.sweep*j/m;out.push({x:g.C.x+g.r*Math.cos(tt),y:g.C.y+g.r*Math.sin(tt)})}}}}
  return out;
}
function edgeLen(o,i){const a=o.pts[i],b=o.pts[(i+1)%o.pts.length];if(!a.s)return dist(a,b);const g=arcGeo(a,b,a.s,oSign(o));return g?g.r*Math.abs(g.sweep):dist(a,b)}
function edgeMid(o,i){const a=o.pts[i],b=o.pts[(i+1)%o.pts.length],sg=oSign(o);if(a.s){const g=arcGeo(a,b,a.s,sg);if(g)return {p:g.M,n:g.n}}const c=dist(a,b)||1,n=sg>0?{x:(b.y-a.y)/c,y:-(b.x-a.x)/c}:{x:-(b.y-a.y)/c,y:(b.x-a.x)/c};return {p:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},n}}
function oPoly(o){
  if(o.shape==='circle'){const a=[];for(let i=0;i<36;i++){const tt=i/36*Math.PI*2;a.push({x:o.x+o.r*Math.cos(tt),y:o.y+o.r*Math.sin(tt)})}return a}
  if(o.shape==='poly')return o.pts.map(p=>({x:p.x,y:p.y}));
  return [{x:o.x,y:o.y},{x:o.x+o.w,y:o.y},{x:o.x+o.w,y:o.y+o.h},{x:o.x,y:o.y+o.h}];
}
function inPoly(p,pts){let c=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)c=!c}return c}
function distSeg(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy;let tt=l?((p.x-a.x)*dx+(p.y-a.y)*dy)/l:0;tt=clamp(tt,0,1);return Math.hypot(p.x-a.x-tt*dx,p.y-a.y-tt*dy)}
function oCenter(o){if(o.shape==='circle')return {x:o.x,y:o.y};const pts=oPoly(o),b=bboxPts(pts);if(o.shape!=='poly')return {x:b.x+b.w/2,y:b.y+b.h/2};
  let A=0,cx=0,cy=0;for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[(i+1)%pts.length],f=p.x*q.y-q.x*p.y;A+=f;cx+=(p.x+q.x)*f;cy+=(p.y+q.y)*f}return A?{x:cx/(3*A),y:cy/(3*A)}:{x:b.x+b.w/2,y:b.y+b.h/2}}
const pathD=pts=>pts.length?'M'+pts.map(p=>r3(p.x)+' '+r3(p.y)).join('L')+'Z':'';
const lineD=pts=>pts.length?'M'+pts.map(p=>r3(p.x)+' '+r3(p.y)).join('L'):'';
const r3=v=>Math.round(v*1000)/1000;

const polyA=pts=>pts&&pts.length>2?Math.abs(sArea(pts)):0;
function isConvex(p){let sg=0;const n=p.length;for(let i=0;i<n;i++){const a=p[i],b=p[(i+1)%n],c=p[(i+2)%n],cr=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);if(Math.abs(cr)<1e-12)continue;const s=Math.sign(cr);if(!sg)sg=s;else if(s!==sg)return false}return true}
function segX(P,Q,A,B){const d=(Q.x-P.x)*(B.y-A.y)-(Q.y-P.y)*(B.x-A.x);if(Math.abs(d)<1e-15)return null;const u=((A.x-P.x)*(B.y-A.y)-(A.y-P.y)*(B.x-A.x))/d;return {x:P.x+u*(Q.x-P.x),y:P.y+u*(Q.y-P.y)}}
/* Sutherland–Hodgman: any subject polygon clipped by a convex polygon (exact areas) */
function clipConvex(subj,clip){const sg=Math.sign(sArea(clip))||1;let out=subj;
  for(let i=0;i<clip.length&&out.length;i++){const A=clip[i],B=clip[(i+1)%clip.length],inp=out;out=[];
    const side=p=>sg*((B.x-A.x)*(p.y-A.y)-(B.y-A.y)*(p.x-A.x))>=-1e-12;
    for(let j=0;j<inp.length;j++){const P=inp[j],Q=inp[(j+1)%inp.length],pi=side(P),qi=side(Q);if(pi)out.push(P);if(pi!==qi){const r=segX(P,Q,A,B);if(r)out.push(r)}}}
  return out}

/* rough hand stroke -> clean room outline */
function rdp(pts,eps){
  if(pts.length<3)return pts.slice();
  let dm=0,ix=0;const a=pts[0],b=pts[pts.length-1];
  for(let i=1;i<pts.length-1;i++){const d=distSeg(pts[i],a,b);if(d>dm){dm=d;ix=i}}
  if(dm>eps){const l=rdp(pts.slice(0,ix+1),eps),r=rdp(pts.slice(ix),eps);return l.slice(0,-1).concat(r)}
  return [a,b];
}
function dropCollinear(p,degTol){
  let ch=true;
  while(ch&&p.length>3){ch=false;
    for(let i=0;i<p.length;i++){const a=p[(i-1+p.length)%p.length],b=p[i],c=p[(i+1)%p.length];
      const a1=Math.atan2(b.y-a.y,b.x-a.x),a2=Math.atan2(c.y-b.y,c.x-b.x);let d=Math.abs(a2-a1)*180/Math.PI;if(d>180)d=360-d;
      if(d<degTol||dist(a,b)<1e-6){p.splice(i,1);ch=true;break}}}
  return p;
}
function straighten(raw,stepM){
  const pts=[];raw.forEach(q=>{if(!pts.length||dist(pts[pts.length-1],q)>0.03)pts.push({x:q.x,y:q.y})});
  const bb=bboxPts(pts);if(!bb)return null;const diag=Math.hypot(bb.w,bb.h);if(diag<0.6||pts.length<5)return null;
  const closeD=dist(pts[0],pts[pts.length-1]);if(closeD>diag*0.35)return null;
  let s=rdp(pts.concat([pts[0]]),Math.max(0.1,diag*0.035));s.pop();
  if(s.length<3)return null;
  s=dropCollinear(s,22);if(s.length<3)return null;
  for(let it=0;it<4;it++){
    for(let i=0;i<s.length;i++){const a=s[i],b=s[(i+1)%s.length];let ang=Math.abs(Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI)%180;
      if(ang<17||ang>163){const y=(a.y+b.y)/2;a.y=y;b.y=y}else if(Math.abs(ang-90)<17){const x=(a.x+b.x)/2;a.x=x;b.x=x}}
  }
  const st=stepM||0.1;s.forEach(p=>{p.x=r2(Math.round(p.x/st)*st);p.y=r2(Math.round(p.y/st)*st)});
  for(let i=0;i<s.length;i++){if(s.length<=3)break;if(dist(s[i],s[(i+1)%s.length])<Math.max(0.15,diag*0.02)){s.splice((i+1)%s.length,1);i--}}
  s=dropCollinear(s,4);if(s.length<3||Math.abs(sArea(s))<0.3)return null;
  return s.map(p=>({x:p.x,y:p.y,s:0}));
}

/* ================= растр: площади считаются по сетке 5 см ================= */
const GCACHE=new Map();
function grid(p){
  const key=JSON.stringify([p.outlines,p.objs]),c0=GCACHE.get(p.id);if(c0&&c0.key===key)return c0.g;
  const polys=p.outlines.filter(o=>o.pts.length>2).map(o=>dens(o,90));
  const bb=bboxPts([].concat(...polys));let g=null;
  if(bb&&bb.w>0&&bb.h>0){
    let c=0.05;while((bb.w/c+2)*(bb.h/c+2)>400000)c*=2;
    const x0=Math.floor(bb.x/c)*c,y0=Math.floor(bb.y/c)*c,cols=Math.ceil((bb.x+bb.w-x0)/c)+1,rows=Math.ceil((bb.y+bb.h-y0)/c)+1;
    g={x0,y0,c,cols,rows,room:new Uint8Array(cols*rows),zone:new Int16Array(cols*rows).fill(-1)};
    polys.forEach(pl=>scan(pl,g,i=>{g.room[i]=1}));
    g.work=g.room.slice();
    p.objs.forEach(o=>{if(o.sub)scan(oPoly(o),g,i=>{g.work[i]=0})});
    g.zones=p.objs.filter(o=>o.kind==='zone');
    g.zones.forEach((z,zi)=>scan(oPoly(z),g,i=>{g.zone[i]=zi}));
    const a=c*c;let rm=0,wk=0;for(let i=0;i<g.room.length;i++){if(g.room[i])rm++;if(g.work[i])wk++}
    /* exact areas from geometry; the grid only corrects overlaps and painted strokes */
    const each=polys.map(pl=>{let n=0;scan(pl,g,()=>n++);return n});
    g.roomA=Math.max(0,polys.reduce((t2,pl)=>t2+polyA(pl),0)-(each.reduce((t2,n)=>t2+n,0)-rm)*a);
    const inRoomAll=q=>polys.some(pl=>inPoly(q,pl));
    const exactIn=(op,o)=>{if(!isConvex(op))return null;if(o&&o.shape==='circle'&&op.every(inRoomAll))return Math.PI*o.r*o.r;return polys.reduce((t2,pl)=>t2+polyA(clipConvex(pl,op)),0)};
    g.objA={};let exE=0,exR=0;
    p.objs.filter(o=>o.kind!=='zone').forEach(o=>{const op=oPoly(o);let n=0;scan(op,g,i=>{if(g.room[i])n++});const e=exactIn(op,o);g.objA[o.id]=e!=null?e:n*a;if(o.sub){exE+=g.objA[o.id];exR+=n}});
    g.workA=Math.max(0,g.roomA-(exE-(exR-(rm-wk))*a));
    const subs=p.objs.filter(o=>o.sub).map(o=>oPoly(o)).filter(isConvex);
    g.wz=g.zones.map((z,zi)=>{const zp=oPoly(z);let n=0;for(let i=0;i<g.zone.length;i++)if(g.zone[i]===zi&&g.work[i])n++;
      let e=null;if(isConvex(zp)){const parts=polys.map(pl=>clipConvex(pl,zp)).filter(x=>x.length>2);e=parts.reduce((t2,q)=>t2+polyA(q),0)-parts.reduce((t2,q)=>t2+subs.reduce((t3,sp)=>t3+polyA(clipConvex(q,sp)),0),0)}
      g.objA[z.id]=e!=null?Math.max(0,e):n*a;g.zn=g.zn||[];g.zn[zi]=n;return n?clamp(g.objA[z.id]/(n*a),0.8,1.25):1});
    const zE=g.zones.reduce((t2,z)=>t2+g.objA[z.id],0),zR=(g.zn||[]).reduce((t2,n)=>t2+n,0);
    g.wn=(wk-zR)>0?clamp((g.workA-zE)/((wk-zR)*a),0.8,1.25):1;
  }
  GCACHE.set(p.id,{key,g});return g;
}
function scan(pts,g,fn){
  const bb=bboxPts(pts);if(!bb)return;const n=pts.length;
  const j0=Math.max(0,Math.floor((bb.y-g.y0)/g.c)),j1=Math.min(g.rows-1,Math.ceil((bb.y+bb.h-g.y0)/g.c));
  for(let j=j0;j<=j1;j++){const yc=g.y0+(j+.5)*g.c,xs=[];
    for(let i=0,k=n-1;i<n;k=i++){const a=pts[i],b=pts[k];if((a.y<=yc)!==(b.y<=yc))xs.push(a.x+(yc-a.y)*(b.x-a.x)/(b.y-a.y))}
    xs.sort((u,v)=>u-v);
    for(let m=0;m+1<xs.length;m+=2){let i0=Math.ceil((xs[m]-g.x0)/g.c-.5),i1=Math.ceil((xs[m+1]-g.x0)/g.c-.5)-1;i0=Math.max(0,i0);i1=Math.min(g.cols-1,i1);for(let i=i0;i<=i1;i++)fn(j*g.cols+i)}}
}
function capsule(a,b,w,g,fn){
  const r=w/2,x0=Math.min(a.x,b.x)-r,x1=Math.max(a.x,b.x)+r,y0=Math.min(a.y,b.y)-r,y1=Math.max(a.y,b.y)+r;
  const i0=Math.max(0,Math.floor((x0-g.x0)/g.c)),i1=Math.min(g.cols-1,Math.ceil((x1-g.x0)/g.c)),j0=Math.max(0,Math.floor((y0-g.y0)/g.c)),j1=Math.min(g.rows-1,Math.ceil((y1-g.y0)/g.c));
  for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const p={x:g.x0+(i+.5)*g.c,y:g.y0+(j+.5)*g.c};if(distSeg(p,a,b)<=r)fn(j*g.cols+i)}
}
function markCells(p,m,g,fn){
  if(m.zone){if(m.zone==='*'){for(let i=0;i<g.room.length;i++)if(g.room[i])fn(i);return}const z=p.objs.find(o=>o.id===m.zone);if(z)scan(oPoly(z),g,fn);return}
  (m.strokes||[]).forEach(s=>{const q=s.pts;if(q.length===1)capsule(q[0],q[0],s.w,g,fn);for(let i=1;i<q.length;i++)capsule(q[i-1],q[i],s.w,g,fn)});
}
function stageState(p,stId,date){
  const g=grid(p);if(!g||!stId)return null;
  const N=g.room.length,st=new Uint8Array(N),day=new Uint8Array(N);
  p.marks.filter(m=>m.st===stId&&m.date<=date).sort((a,b)=>a.date.localeCompare(b.date)||(a.at||0)-(b.at||0)).forEach(m=>{
    const v=m.res==='redo'?2:1,isDay=m.date===date;markCells(p,m,g,i=>{st[i]=v;if(isDay)day[i]=v===1?1:0})});
  let work=0,done=0,redo=0,dd=0;const zs=g.zones.map(()=>({work:0,done:0,redo:0,day:0}));
  for(let i=0;i<N;i++){if(!g.work[i])continue;const zi=g.zone[i],wt=zi>=0?g.wz[zi]:g.wn;work+=wt;const z=zi>=0?zs[zi]:null;if(z)z.work+=wt;
    if(st[i]===1){done+=wt;if(z)z.done+=wt;if(day[i]){dd+=wt;if(z)z.day+=wt}}else if(st[i]===2){redo+=wt;if(z)z.redo+=wt}}
  const a=g.c*g.c,k=x=>x*a;
  return {work:k(work),done:k(done),redo:k(redo),today:k(dd),zones:zs.map(z=>({work:k(z.work),done:k(z.done),redo:k(z.redo),day:k(z.day)}))};
}
const pct=(a,b)=>b>0?Math.round(a/b*100):0;

/* ================= данные ================= */
function fixPlan(p){
  p.outlines=Array.isArray(p.outlines)?p.outlines:[];p.objs=Array.isArray(p.objs)?p.objs:[];p.stages=Array.isArray(p.stages)?p.stages:[];p.marks=Array.isArray(p.marks)?p.marks:[];
  p.surface=p.surface||'floor';p.name=p.name||t('pl_def_name',1);return p;
}
let P=null,ED=null,saveT=null;
function savePlan(now){
  if(!P)return;P.updated=Date.now();const p=P;clearTimeout(saveT);
  const go=async()=>{try{await put('plans',p);const i=data.plans.findIndex(x=>x.id===p.id);if(i>=0)data.plans[i]=p;else data.plans.push(p);await touch()}catch(e){toast('⚠️ '+e.message)}};
  if(now)return go();saveT=setTimeout(go,400);
}
function snapState(){const b=P.bg?Object.assign({},P.bg,{src:undefined}):null;return JSON.stringify({o:P.outlines,b:P.objs,s:P.stages,m:P.marks,c:!!P.calibrated,g:b})}
function pushUndo(){ED.undo.push(snapState());if(ED.undo.length>40)ED.undo.shift()}
function undo(){const s=ED.undo.pop();if(!s){toast('—');return}const j=JSON.parse(s);P.outlines=j.o;P.objs=j.b;P.stages=j.s;P.marks=j.m;P.calibrated=j.c;if(j.g&&P.bg)Object.assign(P.bg,j.g,{src:P.bg.src});ED.sel=null;ED.pts=[];if(!P.stages.find(x=>x.id===ED.stage))ED.stage=(P.stages[0]||{}).id;savePlan();draw();bar()}
function stageName(st){return st?tx(st.name):''}

/* ================= рисование SVG ================= */
function defs(px,U){
  return `<defs>
  <pattern id="plh${U}" patternUnits="userSpaceOnUse" width=".35" height=".35" patternTransform="rotate(45)"><rect width=".35" height=".35" fill="#e3e7ec"/><line x1="0" y1="0" x2="0" y2=".35" stroke="#9aa5b4" stroke-width=".07"/></pattern>
  <pattern id="plmet${U}" patternUnits="userSpaceOnUse" width=".3" height=".3"><rect width=".3" height=".3" fill="#cfdbe8"/><path d="M0 0L.3 .3M.3 0L0 .3" stroke="#3d5a80" stroke-width=".035"/></pattern>
  <pattern id="plrack${U}" patternUnits="userSpaceOnUse" width=".5" height=".5" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2=".5" stroke="#9a6a2f" stroke-width=".05" opacity=".55"/></pattern>
  <clipPath id="plclip${U}">${P_clip}</clipPath></defs>`;
}
let P_clip='';
function objSVG(o,px,sel,label,U){
  const k=o.kind,c=KCOL[k]||'#12161c',sw=(sel?3.2:1.8)*px;let h='';
  const d=o.shape==='circle'?'':pathD(oPoly(o));
  const fill={zone:'none',nowork:`url(#plh${U})`,metal:`url(#plmet${U})`,rack:`url(#plrack${U})`,stairs:`url(#plh${U})`,column:'#c4ccd6',drain:'#dbeafe'}[k];
  if(o.shape==='circle')h+=`<circle cx="${r3(o.x)}" cy="${r3(o.y)}" r="${r3(o.r)}" fill="${fill}" stroke="${c}" stroke-width="${sw}"/>`;
  else h+=`<path d="${d}" fill="${fill}" stroke="${c}" stroke-width="${sw}" ${k==='zone'||k==='rack'?`stroke-dasharray="${6*px} ${4*px}"`:''} stroke-linejoin="round"/>`;
  if(k==='drain'){const r=o.r||.15;h+=`<path d="M${r3(o.x-r*.6)} ${r3(o.y)}H${r3(o.x+r*.6)}M${r3(o.x)} ${r3(o.y-r*.6)}V${r3(o.y+r*.6)}" stroke="${c}" stroke-width="${1.6*px}"/>`}
  if(k==='stairs'&&o.shape!=='circle'&&o.shape!=='poly'){const n=Math.max(2,Math.round(Math.max(o.w,o.h)/0.3));let ln='';for(let i=1;i<n;i++){if(o.w>=o.h){const x=o.x+o.w*i/n;ln+=`M${r3(x)} ${r3(o.y)}V${r3(o.y+o.h)}`}else{const y=o.y+o.h*i/n;ln+=`M${r3(o.x)} ${r3(y)}H${r3(o.x+o.w)}`}}h+=`<path d="${ln}" stroke="#5a6472" stroke-width="${1.2*px}"/>`}
  if(sel)h+=o.shape==='circle'?`<circle cx="${r3(o.x)}" cy="${r3(o.y)}" r="${r3(o.r+4*px)}" fill="none" stroke="#ffd400" stroke-width="${3*px}"/>`:`<path d="${d}" fill="none" stroke="#ffd400" stroke-width="${5*px}" opacity=".7"/>`;
  if(label){const cc=oCenter(o);h+=label(cc)}
  return h;
}
function txt(x,y,s,px,size,weight,fill,bg){
  const fs=size*px;let h='';
  if(bg){const w=String(s).length*fs*0.58+8*px,hh=fs*1.45;h+=`<rect x="${r3(x-w/2)}" y="${r3(y-hh/2)}" width="${r3(w)}" height="${r3(hh)}" rx="${r3(6*px)}" fill="${bg}"/>`}
  return h+`<text x="${r3(x)}" y="${r3(y+fs*0.36)}" font-size="${r3(fs)}" font-weight="${weight||800}" fill="${fill||'#12161c'}" text-anchor="middle" font-family="-apple-system,system-ui,sans-serif">${esc(s)}</text>`;
}
/* the whole drawing; used by the editor, list thumbnails and the shared picture */
function planSVG(p,o){
  o=o||{};const px=o.px,mini=!!o.mini,stId=o.stage,date=o.date||iso(),mode=o.mode||'work',U=o.uid||'E';
  const polys=p.outlines.filter(x=>x.pts.length>2).map(x=>dens(x,60));
  P_clip=polys.map(pl=>`<path d="${pathD(pl)}"/>`).join('');
  let h=defs(px,U);
  if(p.bg&&p.bg.src&&!mini&&!o.noBg){const b=p.bg,w=b.pw*b.mpp,hh=b.ph*b.mpp;h+=`<image href="${b.src}" x="${r3(b.x)}" y="${r3(b.y)}" width="${r3(w)}" height="${r3(hh)}" opacity="${b.op==null?.6:b.op}" preserveAspectRatio="none" ${b.rot?`transform="rotate(${b.rot} ${r3(b.x+w/2)} ${r3(b.y+hh/2)})"`:''}/>`}
  h+=polys.map(pl=>`<path d="${pathD(pl)}" fill="${COL.room}" fill-opacity="${p.bg&&mode==='draw'&&!mini?.55:1}"/>`).join('');
  if(stId){
    const ms=p.marks.filter(m=>m.st===stId&&m.date<=date).sort((a,b)=>a.date.localeCompare(b.date)||(a.at||0)-(b.at||0));
    let mk='';ms.forEach(m=>{const col=m.res==='redo'?COL.redo:(m.date===date?COL.day:COL.prev);
      if(m.zone){if(m.zone==='*')mk+=polys.map(pl=>`<path d="${pathD(pl)}" fill="${col}"/>`).join('');else{const z=p.objs.find(x=>x.id===m.zone);if(z)mk+=z.shape==='circle'?`<circle cx="${z.x}" cy="${z.y}" r="${z.r}" fill="${col}"/>`:`<path d="${pathD(oPoly(z))}" fill="${col}"/>`}}
      else (m.strokes||[]).forEach(s=>{mk+=s.pts.length===1?`<circle cx="${r3(s.pts[0].x)}" cy="${r3(s.pts[0].y)}" r="${r3(s.w/2)}" fill="${col}"/>`:`<path d="${lineD(s.pts)}" fill="none" stroke="${col}" stroke-width="${r3(s.w)}" stroke-linecap="round" stroke-linejoin="round"/>`})});
    h+=`<g clip-path="url(#plclip${U})">${mk}</g>`;
  }
  const g=(!mini)?grid(p):null,ss=(!mini&&stId)?stageState(p,stId,date):null;
  const zones=p.objs.filter(x=>x.kind==='zone');
  p.objs.filter(x=>x.kind!=='zone').forEach(ob=>{h+=objSVG(ob,px,o.sel===ob.id,mini?null:(cc=>ob.kind==='drain'?'':txt(cc.x,cc.y,tx(ob.name)||t('pl_k_'+ob.kind),px,11,750,'#2a313b','rgba(255,255,255,.85)')),U)});
  let zl='';zones.forEach((z,zi)=>{zl+=objSVG(z,px,o.sel===z.id,mini?null:(cc=>{
    let sub=g&&g.objA?fa(g.objA[z.id]||0)+' '+M2():'';
    if(ss){const zs=ss.zones[zi];if(zs&&zs.work>0)sub=pct(zs.done,zs.work)+'%'+(zs.day>0?' · +'+fa(zs.day):'')}
    return txt(cc.x,cc.y-7*px,z.name||'?',px,19,900,'#12161c')+(sub?txt(cc.x,cc.y+11*px,sub,px,11.5,800,'#12161c','rgba(255,255,255,.8)'):'')}),U)});
  if(zl)h+=`<g clip-path="url(#plclip${U})">${zl}</g>`;
  h+=polys.map(pl=>`<path d="${pathD(pl)}" fill="none" stroke="#12161c" stroke-width="${(mini?3:3.5)*px}" stroke-linejoin="round"/>`).join('');
  return h;
}

/* ================= редактор ================= */
function hostSize(){const c=$('#plc');return c?{w:c.clientWidth,h:c.clientHeight}:{w:390,h:500}}
function vb(){const sv=$('#plsvg');if(!sv)return;const {w,h}=hostSize(),c=ED.cam;sv.setAttribute('viewBox',`${r3(c.x-w/2/c.s)} ${r3(c.y-h/2/c.s)} ${r3(w/c.s)} ${r3(h/c.s)}`);sv.setAttribute('width',w);sv.setAttribute('height',h)}
function toW(pt){const {w,h}=hostSize(),c=ED.cam;return {x:c.x+(pt.x-w/2)/c.s,y:c.y+(pt.y-h/2)/c.s}}
function toS(pt){const {w,h}=hostSize(),c=ED.cam;return {x:(pt.x-c.x)*c.s+w/2,y:(pt.y-c.y)*c.s+h/2}}
function contentBox(){
  let pts=[];P.outlines.forEach(o=>pts=pts.concat(dens(o,24)));P.objs.forEach(o=>pts=pts.concat(oPoly(o)));
  if(!pts.length&&P.bg){const b=P.bg;pts=[{x:b.x,y:b.y},{x:b.x+b.pw*b.mpp,y:b.y+b.ph*b.mpp}]}
  return bboxPts(pts);
}
function fit(){
  const {w,h}=hostSize(),b=contentBox();
  if(!b){ED.cam={x:8,y:8,s:Math.min(w,h)/18};return}
  const bw=Math.max(b.w,2),bh=Math.max(b.h,2);ED.cam={x:b.x+b.w/2,y:b.y+b.h/2,s:clamp(Math.min((w-120)/bw,(h-130)/bh),3,600)};
}
const step=()=>{const s=ED.cam.s;return s>160?0.05:s>50?0.1:s>20?0.25:0.5};
const snapV=v=>r2(Math.round(v/step())*step());
const pxw=()=>1/ED.cam.s;

function draw(){
  const sv=$('#plsvg');if(!sv)return;vb();
  const px=pxw(),m=ED.mode;
  let h=planSVG(P,{px,stage:m==='work'?ED.stage:null,date:ED.date,sel:ED.sel,mode:m});
  ED.dims=[];
  if(m==='draw'){
    P.outlines.forEach((o,oi)=>{const n=o.pts.length;
      for(let i=0;i<n;i++){const L=edgeLen(o,i),em=edgeMid(o,i),pos={x:em.p.x+em.n.x*16*px,y:em.p.y+em.n.y*16*px};
        ED.dims.push({oi,ei:i,x:pos.x,y:pos.y});h+=txt(pos.x,pos.y,(o.pts[i].s?'⌒ ':'')+fm(L,2)+' '+M1(),px,12.5,800,'#fff','#12161c')}
      o.pts.forEach(p=>{h+=`<circle cx="${r3(p.x)}" cy="${r3(p.y)}" r="${r3(7*px)}" fill="#ffd400" stroke="#12161c" stroke-width="${2*px}"/>`});
    });
  }
  if(ED.pts.length){h+=`<path d="${lineD(ED.pts)}" fill="none" stroke="#12161c" stroke-width="${2.5*px}" stroke-dasharray="${5*px} ${4*px}"/>`;ED.pts.forEach((p,i)=>{h+=`<circle cx="${r3(p.x)}" cy="${r3(p.y)}" r="${r3((i?6:9)*px)}" fill="${i?'#fff':'#ffd400'}" stroke="#12161c" stroke-width="${2*px}"/>`})}
  if(ED.calib)ED.calib.forEach(p=>{h+=`<circle cx="${r3(p.x)}" cy="${r3(p.y)}" r="${r3(10*px)}" fill="#ffd400" stroke="#12161c" stroke-width="${3*px}"/>`});
  if(ED.calib&&ED.calib.length===2)h+=`<line x1="${ED.calib[0].x}" y1="${ED.calib[0].y}" x2="${ED.calib[1].x}" y2="${ED.calib[1].y}" stroke="#ffd400" stroke-width="${4*px}" stroke-dasharray="${8*px} ${6*px}"/>`;
  h+=`<path id="pllive" fill="none"/>`;
  sv.innerHTML=h;
  floatInfo();
}
function liveSet(attrs){const l=$('#pllive');if(!l)return;Object.keys(attrs).forEach(k=>l.setAttribute(k,attrs[k]))}

function hint(){
  const el=$('#plhint');if(!el)return;let k='';const m=ED.mode,tl=ED.tool[m];
  if(ED.calib)k=ED.calib.length?'pl_h_cal2':'pl_h_cal1';
  else if(m==='draw')k=tl==='pts'?'pl_h_pts':(P.outlines.length?'pl_h_dims':'pl_h_free');
  else if(m==='objs')k=!P.outlines.length?'pl_need_outline':ED.kind==='drain'?'pl_h_drain':tl==='pts'?'pl_h_objs_pts':'pl_h_objs';
  else k=!P.outlines.length?'pl_need_outline':!P.stages.length?'pl_h_nostage':tl==='brush'?'pl_h_brush':tl==='erase'?'pl_h_erase':(P.objs.some(o=>o.kind==='zone')?'pl_h_zone':'pl_h_zone0');
  el.innerHTML=`<span>${esc(t(k))}</span><button data-a="hidehint" data-k="${k}" aria-label="x">${ic('x',16)}</button>`;el.hidden=!!ED.hideHint[k];
}
function floatInfo(){
  const el=$('#plfloat');if(!el)return;const g=grid(P);let h='';
  if(ED.mode==='objs'&&ED.sel){const o=P.objs.find(x=>x.id===ED.sel);if(o)h=`<div class="plsel"><div><b class="bidi">${esc(tx(o.name)||t('pl_k_'+o.kind))}</b><small>${t('pl_k_'+o.kind)}${g&&g.objA?' · '+fa(g.objA[o.id]||0)+' '+M2():''}</small></div><button class="btn" data-a="objedit">${ic('edit',16)} ${t('pl_edit')}</button><button class="plib red" data-a="objdel" aria-label="${t('del')}">${ic('trash',18)}</button></div>`}
  else if(ED.mode!=='work'&&g)h=`<div class="plarea"><span>${t('pl_area')} <b class="num">${fa(g.roomA)}</b> ${M2()}</span>${Math.abs(g.roomA-g.workA)>0.05?`<span>${t('pl_work_area')} <b class="num">${fa(g.workA)}</b> ${M2()}</span>`:''}</div>`;
  el.innerHTML=h;
}

function stageChips(){
  return P.stages.map(s=>`<button class="chip ${s.id===ED.stage?'on':''}" data-stage="${s.id}">${esc(stageName(s))}</button>`).join('')+`<button class="chip add" data-a="stadd">${ic('plus',15)}${t('pl_stage_add')}</button>`;
}
function tbtn(tool,icon,label){return `<button class="pltb ${ED.tool[ED.mode]===tool?'on':''}" data-tool="${tool}">${ic(icon,20)}<span>${label}</span></button>`}
function bar(){
  const b=$('#plbot');if(!b)return;const m=ED.mode;let h='';
  $$('#pled [data-mode]').forEach(x=>x.classList.toggle('on',x.dataset.mode===m));
  if(m==='draw'){
    h=`<div class="plrow">${tbtn('free','edit',t('pl_t_free'))}${tbtn('pts','dot',t('pl_t_pts'))}<button class="pltb" data-a="tpl">${ic('layers',20)}<span>${t('pl_t_tpl')}</span></button><button class="pltb ${P.bg?'has':''}" data-a="photo">${ic('image',20)}<span>${t('pl_t_photo')}</span></button></div>`;
  }else if(m==='objs'){
    h=`<div class="plchips">${KINDS.map(k=>`<button class="chip plk ${ED.kind===k?'on':''}" data-kind="${k}"><i style="background:${KCOL[k]}"></i>${t('pl_k_'+k)}</button>`).join('')}</div>
    <div class="plkh">${t('pl_kh_'+ED.kind)}</div>
    ${ED.kind==='drain'?'':`<div class="plrow">${tbtn('rect','zone',t('pl_sh_rect'))}${tbtn('pts','dot',t('pl_sh_pts'))}</div>`}`;
  }else{
    const ss=stageState(P,ED.stage,ED.date);const isT=ED.date===iso();
    h=`<div class="plchips">${stageChips()}</div>
    <div class="plrow">${tbtn('zone','zone',t('pl_w_zone'))}${tbtn('brush','brush',t('pl_w_brush'))}${tbtn('erase','eraser',t('pl_w_erase'))}<div class="plres seg mini"><button data-res="done" class="${ED.res==='done'?'on':''}">${ic('check',16)}</button><button data-res="redo" class="${ED.res==='redo'?'on red':''}">${ic('x',16)}</button></div></div>
    ${ED.tool.work==='brush'?`<div class="plbw">${[0.5,1,2,3].map(w=>`<button class="chip ${ED.bw===w?'on':''}" data-bw="${w}"><i style="width:${6+w*5}px;height:${6+w*5}px"></i>${fm(w,1)} м</button>`).join('')}</div>`:''}
    <div class="plstat"><label class="pldate"><span>${ic('cal',15)} ${isT?t('pl_today'):fmt(ED.date)}</span><input type="date" data-a="date" value="${ED.date}"></label>
      <div class="plst num">${ss?`<b>${t('pl_stats',fa(ss.done),fa(ss.work),pct(ss.done,ss.work))}</b><small>${[ss.today>0?`<em class="dy">${t('pl_stats_day',fa(ss.today))}</em>`:'',ss.redo>0?`<em class="rd">${t('pl_stats_redo',fa(ss.redo))}</em>`:''].filter(Boolean).join(' · ')||'&nbsp;'}</small>`:`<small>${t('pl_stage_none')}</small>`}</div>
      <button class="btn pri" data-a="report" ${ss&&ss.today>0?'':'disabled'}>${ic('send',16)} ${t('pl_to_report')}</button></div>
    <div class="plleg"><span><i style="background:${COL.prev}"></i>${t('pl_legend_prev')}</span><span><i style="background:${COL.day}"></i>${t('pl_legend_day')}</span><span><i style="background:${COL.redo}"></i>${t('pl_legend_redo')}</span></div>`;
  }
  if(ED.pts.length)h+=`<div class="plrow2"><button class="btn" data-a="ptundo">${t('pl_pt_undo')}</button><button class="btn pri" data-a="ptclose" ${ED.pts.length<3?'disabled':''}>${t('pl_pt_close')}</button></div>`;
  b.innerHTML=h;
  const tt=$('#pled .pltt');if(tt)tt.innerHTML=`<b class="bidi">${esc(P.name)}</b><small class="bidi">${esc([P.place,t('pl_s_'+P.surface)].filter(Boolean).join(' · '))}</small>`;
  hint();
  requestAnimationFrame(()=>{const c=$('#pled .plchips .chip.on');if(c&&c.scrollIntoView)c.scrollIntoView({block:'nearest',inline:'center'})});
}

function open(id,then){ensureAr();
  const p=data.plans.find(x=>x.id===id);if(!p)return;P=fixPlan(p);
  ED={mode:P.outlines.length?(P.stages.length?'work':'objs'):'draw',tool:{draw:'free',objs:'rect',work:'zone'},kind:'zone',res:'done',bw:1,stage:(P.stages.find(s=>s.id===P.lastStage)||P.stages[0]||{}).id,date:iso(),cam:{x:0,y:0,s:30},sel:null,pts:[],calib:null,undo:[],dims:[],hideHint:{}};
  const el=document.createElement('div');el.id='pled';el.className='pled';
  el.innerHTML=`<div class="plt"><button class="plib" data-a="close" aria-label="${t('close')}">${ic('chevl',22)}</button><button class="pltt" data-a="settings"></button><button class="plib" data-a="undo" aria-label="${t('undo')}">${ic('undo',20)}</button><button class="plib" data-a="menu" aria-label="${t('pl_menu')}">${ic('more',22)}</button></div>
  <div class="plm seg">${['draw','objs','work'].map(k=>`<button data-mode="${k}">${t('pl_m_'+k)}</button>`).join('')}</div>
  <div class="plc" id="plc"><svg id="plsvg" xmlns="http://www.w3.org/2000/svg" style="direction:ltr"></svg><div class="plhint" id="plhint"></div><div class="plfloat" id="plfloat"></div><button class="plfit" data-a="fit" aria-label="fit">${ic('target',20)}</button></div>
  <div class="plbot" id="plbot"></div><datalist id="plstdl"></datalist>`;
  document.body.appendChild(el);lockScroll();document.body.classList.add('plopen');
  requestAnimationFrame(()=>el.classList.add('open'));
  el.addEventListener('click',onClick);el.addEventListener('change',onChange);
  const c=$('#plc');['pointerdown','pointermove','pointerup','pointercancel'].forEach(ev=>c.addEventListener(ev,onPtr));
  c.addEventListener('wheel',onWheel,{passive:false});
  el.addEventListener('gesturestart',e=>e.preventDefault());
  window.addEventListener('resize',onResize);
  fit();draw();bar();
  if(then)setTimeout(then,250);
}
function onResize(){if(!ED)return;vb();draw()}
async function close(){
  if(!P)return;clearTimeout(saveT);await savePlan(true);
  const el=$('#pled');window.removeEventListener('resize',onResize);
  if(el){el.classList.remove('open');setTimeout(()=>el.remove(),250)}
  document.body.classList.remove('plopen');unlockScroll();P=null;ED=null;render();
}

/* ---------- указатели: один палец — действие, два — двигать и увеличивать ---------- */
const ptrs=new Map();let G=null;
function lp(e){const r=$('#plc').getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function onPtr(e){
  if(!ED)return;
  if(e.type==='pointerdown'){
    if(e.target.closest('button,label,input'))return;
    try{e.currentTarget.setPointerCapture(e.pointerId)}catch(x){}
    ptrs.set(e.pointerId,lp(e));
    if(ptrs.size===2){cancelAct();const [a,b]=[...ptrs.values()];G={type:'pinch',d0:Math.max(10,dist(a,b)),m0:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},cam0:Object.assign({},ED.cam)};return}
    if(ptrs.size>2)return;
    const p=lp(e);G={type:'one',p0:p,last:p,w0:toW(p),t0:Date.now(),moved:false};G.act=startAct(G.w0,p);return;
  }
  if(!ptrs.has(e.pointerId))return;
  if(e.type==='pointermove'){
    ptrs.set(e.pointerId,lp(e));
    if(G&&G.type==='pinch'&&ptrs.size>=2){const [a,b]=[...ptrs.values()],m={x:(a.x+b.x)/2,y:(a.y+b.y)/2},c0=G.cam0;
      const s=clamp(c0.s*dist(a,b)/G.d0,3,600),{w,h}=hostSize();
      const wx=c0.x+(G.m0.x-w/2)/c0.s,wy=c0.y+(G.m0.y-h/2)/c0.s;
      ED.cam={x:wx-(m.x-w/2)/s,y:wy-(m.y-h/2)/s,s};vb();return}
    if(G&&G.type==='one'){const p=lp(e);if(!G.moved&&Math.hypot(p.x-G.p0.x,p.y-G.p0.y)>8)G.moved=true;if(G.moved)moveAct(G,toW(p),p);G.last=p}
    return;
  }
  // up / cancel
  ptrs.delete(e.pointerId);
  if(!G)return;
  if(G.type==='pinch'||G.type==='dead'){if(!ptrs.size){G=null;draw()}else G={type:'dead'};return}
  if(G.type==='one'){const g=G;G=null;
    if(e.type==='pointercancel'){cancelAct(g);return}
    if(!g.moved&&Date.now()-g.t0<700)tapAct(g.w0,g.p0,g);else endAct(g);}
}
function onWheel(e){e.preventDefault();const p=lp(e),w0=toW(p),k=Math.exp(-e.deltaY*0.0015);ED.cam.s=clamp(ED.cam.s*k,3,600);const w1=toW(p);ED.cam.x+=w0.x-w1.x;ED.cam.y+=w0.y-w1.y;vb();clearTimeout(onWheel.t);onWheel.t=setTimeout(draw,120)}
function cancelAct(g){g=g||G;if(g&&g.act&&g.act.k==='vtx'&&g.act.orig){const o=P.outlines[g.act.oi];o.pts[g.act.vi]=g.act.orig;ED.undo.pop()}if(g&&g.act&&g.act.k==='move'&&g.act.orig){const o=P.objs.find(x=>x.id===g.act.id);if(o)Object.assign(o,g.act.orig);ED.undo.pop()}G=null;liveSet({d:''});draw()}

function hitVertex(p){let best=null,bd=24;P.outlines.forEach((o,oi)=>o.pts.forEach((v,vi)=>{const s=toS(v),d=Math.hypot(s.x-p.x,s.y-p.y);if(d<bd){bd=d;best={oi,vi}}}));return best}
function hitDim(p){let best=null,bd=28;(ED.dims||[]).forEach(d=>{const s=toS(d),dd=Math.hypot(s.x-p.x,s.y-p.y);if(dd<bd){bd=dd;best=d}});return best}
function hitObj(w,kinds){for(let i=P.objs.length-1;i>=0;i--){const o=P.objs[i];if(kinds&&!kinds.includes(o.kind))continue;if(o.shape==='circle'?dist(w,o)<=Math.max(o.r,14*pxw()):inPoly(w,oPoly(o)))return o}return null}
function inRoom(w){return P.outlines.some(o=>o.pts.length>2&&inPoly(w,dens(o,36)))}

function startAct(w,p){
  const m=ED.mode,tl=ED.tool[m];
  if(ED.calib)return {k:'pan'};
  if(m==='draw'){
    const v=hitVertex(p);if(v){pushUndo();return {k:'vtx',oi:v.oi,vi:v.vi,orig:Object.assign({},P.outlines[v.oi].pts[v.vi])}}
    if(hitDim(p))return {k:'none'};
    if(tl==='free')return {k:'free',pts:[w]};
    return {k:'pan'};
  }
  if(m==='objs'){
    if(ED.sel){const o=P.objs.find(x=>x.id===ED.sel);if(o&&(o.shape==='circle'?dist(w,o)<=Math.max(o.r,16*pxw()):inPoly(w,oPoly(o)))){pushUndo();return {k:'move',id:o.id,w0:w,orig:clone(o)}}}
    if(!P.outlines.length||ED.kind==='drain'||tl==='pts')return {k:'pan'};
    return {k:'rect',a:{x:snapV(w.x),y:snapV(w.y)}};
  }
  if(tl==='brush'&&ED.stage&&P.outlines.length)return {k:'paint',pts:[{x:r2(w.x),y:r2(w.y)}]};
  return {k:'pan'};
}
function moveAct(g,w,p){
  const a=g.act;if(!a)return;
  if(a.k==='pan'||a.k==='none'){ED.cam.x-=(p.x-g.last.x)/ED.cam.s;ED.cam.y-=(p.y-g.last.y)/ED.cam.s;vb();return}
  if(a.k==='free'||a.k==='paint'){const q=a.pts[a.pts.length-1];if(dist(q,w)*ED.cam.s>3)a.pts.push({x:r2(w.x),y:r2(w.y)});
    if(a.k==='free')liveSet({d:lineD(a.pts),stroke:'#12161c','stroke-width':3*pxw(),'stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':''});
    else liveSet({d:lineD(a.pts),stroke:ED.res==='redo'?COL.redo:COL.day,'stroke-width':ED.bw,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.85});return}
  if(a.k==='vtx'){const o=P.outlines[a.oi],n=o.pts.length,v=o.pts[a.vi],pr=o.pts[(a.vi-1+n)%n],nx=o.pts[(a.vi+1)%n];
    let x=snapV(w.x),y=snapV(w.y);const tol=12*pxw();
    [pr,nx].forEach(q=>{if(Math.abs(x-q.x)<tol)x=q.x;if(Math.abs(y-q.y)<tol)y=q.y});
    v.x=x;v.y=y;draw();return}
  if(a.k==='rect'){const b={x:snapV(w.x),y:snapV(w.y)};a.b=b;const x=Math.min(a.a.x,b.x),y=Math.min(a.a.y,b.y),ww=Math.abs(b.x-a.a.x),hh=Math.abs(b.y-a.a.y);
    liveSet({d:`M${x} ${y}h${ww}v${hh}h${-ww}Z`,stroke:KCOL[ED.kind],'stroke-width':2.5*pxw(),'stroke-dasharray':`${6*pxw()} ${4*pxw()}`,fill:'rgba(255,212,0,.18)',opacity:1});
    const sv=$('#plsvg');let lb=$('#plrl');if(!lb){sv.insertAdjacentHTML('beforeend','<g id="plrl"></g>');lb=$('#plrl')}lb.innerHTML=txt(x+ww/2,y+hh/2,fm(ww,2)+' × '+fm(hh,2)+' '+M1(),pxw(),13,850,'#fff','#12161c');return}
  if(a.k==='move'){const o=P.objs.find(x=>x.id===a.id);if(!o)return;const dx=snapV(w.x-a.w0.x),dy=snapV(w.y-a.w0.y);
    if(o.shape==='poly')o.pts=a.orig.pts.map(q=>({x:r2(q.x+dx),y:r2(q.y+dy)}));else{o.x=r2(a.orig.x+dx);o.y=r2(a.orig.y+dy)}draw();return}
}
function endAct(g){
  const a=g.act;if(!a)return;liveSet({d:''});
  if(a.k==='pan'||a.k==='none'){draw();return}
  if(a.k==='free'){const s=straighten(a.pts,step()<0.1?0.05:0.1);if(!s){toast(t('pl_bad_draw'));draw();return}
    pushUndo();P.outlines.push({id:uid(),pts:s});savePlan();if(P.outlines.length===1&&!P.calibrated)toast(t('pl_drawn'));draw();bar();return}
  if(a.k==='paint'){addMark({strokes:[{w:ED.bw,pts:a.pts}]});return}
  if(a.k==='vtx'){savePlan();draw();return}
  if(a.k==='rect'){if(!a.b){draw();return}const x=Math.min(a.a.x,a.b.x),y=Math.min(a.a.y,a.b.y),w=r2(Math.abs(a.b.x-a.a.x)),h=r2(Math.abs(a.b.y-a.a.y));
    if(w<0.1||h<0.1){draw();return}addObj({shape:'rect',x:r2(x),y:r2(y),w,h});return}
  if(a.k==='move'){savePlan();draw();return}
}
function tapAct(w,p){
  const m=ED.mode,tl=ED.tool[m];
  if(ED.calib){ED.calib.push(w);draw();hint();if(ED.calib.length===2)calibAsk();return}
  if(m==='draw'){
    const d=hitDim(p);if(d){edgeSheet(d.oi,d.ei);return}
    const v=hitVertex(p);if(v){vertexMenu(v.oi,v.vi);return}
    if(tl==='pts'){addPt(w,p);return}
    return;
  }
  if(m==='objs'){
    if(!P.outlines.length){toast(t('pl_need_outline'));return}
    if(tl==='pts'&&ED.kind!=='drain'){if(ED.sel){ED.sel=null;draw()}addPt(w,p);return}
    const o=hitObj(w);
    if(ED.kind==='drain'){const dr=hitObj(w,['drain']);if(dr){ED.sel=ED.sel===dr.id?null:dr.id;draw();return}if(ED.sel){ED.sel=null;draw();return}addObj({shape:'circle',x:snapV(w.x),y:snapV(w.y),r:0.15});return}
    if(o){ED.sel=ED.sel===o.id?null:o.id;draw();return}
    if(ED.sel){ED.sel=null;draw();return}
    return;
  }
  // work
  if(!P.outlines.length){toast(t('pl_need_outline'));return}
  if(!ED.stage){toast(t('pl_h_nostage'));return}
  if(tl==='erase'){eraseAt(w);return}
  if(tl==='brush'){addMark({strokes:[{w:ED.bw,pts:[{x:r2(w.x),y:r2(w.y)}]}]});return}
  const z=hitObj(w,['zone']);
  if(!z&&!inRoom(w))return;
  const zid=z?z.id:(P.objs.some(o=>o.kind==='zone')?null:'*');
  if(!zid){toast(t('pl_h_zone'));return}
  const ex=P.marks.find(mk=>mk.st===ED.stage&&mk.date===ED.date&&mk.zone===zid&&mk.res===ED.res);
  pushUndo();
  if(ex)P.marks=P.marks.filter(mk=>mk!==ex);else P.marks.push({id:uid(),st:ED.stage,date:ED.date,at:Date.now(),res:ED.res,zone:zid});
  savePlan();draw();bar();
}
function addPt(w,p){
  let q={x:snapV(w.x),y:snapV(w.y)};
  if(ED.pts.length>=3){const f=toS(ED.pts[0]);if(Math.hypot(f.x-p.x,f.y-p.y)<22){finishPts();return}}
  const pr=ED.pts[ED.pts.length-1];
  if(pr){const dx=q.x-pr.x,dy=q.y-pr.y,ang=Math.abs(Math.atan2(dy,dx)*180/Math.PI)%180;if(ang<9||ang>171)q.y=pr.y;else if(Math.abs(ang-90)<9)q.x=pr.x}
  ED.pts.push(q);draw();bar();
}
function finishPts(){
  if(ED.pts.length<3)return;const pts=ED.pts.map(p=>({x:p.x,y:p.y}));ED.pts=[];
  if(ED.mode==='draw'){pushUndo();P.outlines.push({id:uid(),pts:pts.map(p=>({x:p.x,y:p.y,s:0}))});savePlan();draw();bar();return}
  addObj({shape:'poly',pts});
}
function nextZoneName(){const used=new Set(P.objs.filter(o=>o.kind==='zone').map(o=>o.name));for(const c of LET)if(!used.has(c))return c;return 'Z'+(used.size+1)}
function addObj(geo){
  pushUndo();const k=ED.kind;
  const o=Object.assign({id:uid(),kind:k,sub:SUB_DEF[k],name:k==='zone'?nextZoneName():''},geo);
  P.objs.push(o);ED.sel=k==='zone'?null:o.id;savePlan();draw();bar();
}
function addMark(m){
  if(!ED.stage){toast(t('pl_h_nostage'));draw();return}
  pushUndo();P.marks.push(Object.assign({id:uid(),st:ED.stage,date:ED.date,at:Date.now(),res:ED.res},m));savePlan();draw();bar();
}
function eraseAt(w){
  const g=grid(P);const hit=P.marks.filter(m=>m.st===ED.stage&&m.date===ED.date).sort((a,b)=>(b.at||0)-(a.at||0)).find(m=>{
    if(m.zone){if(m.zone==='*')return inRoom(w);const z=P.objs.find(o=>o.id===m.zone);return z&&inPoly(w,oPoly(z))}
    return (m.strokes||[]).some(s=>s.pts.length===1?dist(w,s.pts[0])<=s.w/2+0.1:s.pts.some((q,i)=>i&&distSeg(w,s.pts[i-1],q)<=s.w/2+0.1))});
  if(!hit||!g)return;pushUndo();P.marks=P.marks.filter(m=>m!==hit);savePlan();draw();bar();
}

/* ---------- клики по кнопкам редактора ---------- */
async function onClick(e){
  if(!ED)return;
  const md=e.target.closest('[data-mode]');if(md){ED.mode=md.dataset.mode;ED.sel=null;ED.pts=[];ED.calib=null;draw();bar();return}
  const tl=e.target.closest('[data-tool]');if(tl){ED.tool[ED.mode]=tl.dataset.tool;ED.pts=[];draw();bar();return}
  const kd=e.target.closest('[data-kind]');if(kd){ED.kind=kd.dataset.kind;ED.sel=null;ED.pts=[];draw();bar();return}
  const sg=e.target.closest('[data-stage]');if(sg){if(sg.dataset.stage===ED.stage)return stageMenu(sg.dataset.stage);ED.stage=sg.dataset.stage;P.lastStage=ED.stage;savePlan();draw();bar();return}
  const rs=e.target.closest('[data-res]');if(rs){ED.res=rs.dataset.res;bar();return}
  const bw=e.target.closest('[data-bw]');if(bw){ED.bw=+bw.dataset.bw;ED.tool.work='brush';bar();return}
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='date')return;
  if(a==='close')return close();
  if(a==='undo')return undo();
  if(a==='fit'){fit();draw();return}
  if(a==='hidehint'){ED.hideHint[b.dataset.k]=1;$('#plhint').hidden=true;return}
  if(a==='menu')return menu();
  if(a==='settings')return settingsSheet();
  if(a==='tpl')return tplSheet();
  if(a==='photo')return photoSheet();
  if(a==='ptundo'){ED.pts.pop();draw();bar();return}
  if(a==='ptclose'){finishPts();bar();return}
  if(a==='stadd')return stageAdd();
  if(a==='objedit')return objSheet(P.objs.find(o=>o.id===ED.sel));
  if(a==='objdel'){pushUndo();P.objs=P.objs.filter(o=>o.id!==ED.sel);P.marks=P.marks.filter(m=>m.zone!==ED.sel);ED.sel=null;savePlan();draw();bar();return}
  if(a==='report')return reportSheet();
}
function onChange(e){
  if(e.target.dataset.a==='date'){ED.date=e.target.value||iso();draw();bar()}
}

/* ================= листы: стена, угол, объект, шаблоны, фото ================= */
function scaleAll(f,o){
  const S2=q=>{q.x=r2(o.x+(q.x-o.x)*f);q.y=r2(o.y+(q.y-o.y)*f)};
  P.outlines.forEach(ol=>ol.pts.forEach(q=>{S2(q);if(q.s)q.s=r2(q.s*f)}));
  P.objs.forEach(ob=>{if(ob.shape==='poly')ob.pts.forEach(S2);else{S2(ob);if(ob.shape==='circle')ob.r=r2(ob.r*f);else{ob.w=r2(ob.w*f);ob.h=r2(ob.h*f)}}});
  P.marks.forEach(m=>(m.strokes||[]).forEach(s=>{s.w=r2(s.w*f);s.pts.forEach(S2)}));
  if(P.bg){const b=P.bg;b.x=o.x+(b.x-o.x)*f;b.y=o.y+(b.y-o.y)*f;b.mpp*=f}
  ED.cam.x=o.x+(ED.cam.x-o.x)*f;ED.cam.y=o.y+(ED.cam.y-o.y)*f;ED.cam.s/=f;
}
function edgeSheet(oi,ei){
  const o=P.outlines[oi],n=o.pts.length,a=o.pts[ei],b=o.pts[(ei+1)%n],arc=!!a.s,chord=dist(a,b);
  const sc=!P.calibrated;
  const body=`<div class="hint" style="margin:0 4px 12px">${t('pl_edge_now',fm(edgeLen(o,ei),2))}</div>
  ${fld(arc?t('pl_edge_chord'):t('pl_edge_len'),`<input data-e="len" class="num" inputmode="decimal" value="${fm(chord,2)}" style="font-size:24px;font-weight:850">`)}
  ${ynRow('ruler',t('pl_edge_scale'),'scale',sc,t('yes2'),t('no'))}<div class="hint" style="margin:-4px 4px 14px">${t('pl_edge_scale_h')}</div>
  ${fld(t('pl_edge_arc'),`<input data-e="arc" class="num" inputmode="decimal" value="${fm(a.s||0,2)}">`,t('pl_edge_arc_h'))}
  <button type="button" class="btn wide" data-split>${t('pl_edge_split')}</button>
  <button type="button" class="btn danger wide" style="margin-top:10px" data-odel>${ic('trash',18)} ${t('pl_outline_del')}</button>`;
  const w=sheet({title:t('pl_edge',ei+1),body,onSave:async w=>{
    const L=pn($('[data-e="len"]',w).value),h=pn($('[data-e="arc"]',w).value),scale=$('[data-k="scale"]',w).dataset.v==='1';
    pushUndo();
    if(isFinite(L)&&L>0.01&&Math.abs(L-chord)>0.004){
      if(scale){scaleAll(L/chord,{x:a.x,y:a.y});P.calibrated=true}
      else{const u={x:(b.x-a.x)/chord,y:(b.y-a.y)/chord},d=L-chord;b.x=r2(b.x+u.x*d);b.y=r2(b.y+u.y*d);if(n>=4){const c=o.pts[(ei+2)%n];c.x=r2(c.x+u.x*d);c.y=r2(c.y+u.y*d)}P.calibrated=true}
    }
    if(isFinite(h)){const c2=dist(a,b);a.s=Math.abs(h)<0.005?0:r2(clamp(h,-c2*0.5,c2*0.5))}
    savePlan();draw();
  }});
  bindForm(w,{});
  $('[data-split]',w).onclick=()=>{pushUndo();o.pts.splice(ei+1,0,{x:r2((a.x+b.x)/2),y:r2((a.y+b.y)/2),s:0});a.s=0;savePlan();w.close();draw()};
  $('[data-odel]',w).onclick=async()=>{if(await confirmDlg(t('pl_outline_del_q'),'')){pushUndo();P.outlines.splice(oi,1);savePlan();w.close();draw();bar()}};
  setTimeout(()=>{const i=$('[data-e="len"]',w);if(i){i.focus();i.select()}},450);
}
async function vertexMenu(oi,vi){
  const r=await ask({title:t('pl_vtx'),buttons:[{l:t('pl_vtx_round'),v:'round',c:'pri'},{l:t('pl_vtx_del'),v:'del',c:'danger'},{l:t('cancel'),v:false}]});
  const o=P.outlines[oi];if(!o)return;
  if(r.v==='del'){if(o.pts.length<=3){if(await confirmDlg(t('pl_outline_del_q'),'')){pushUndo();P.outlines.splice(oi,1)}}else{pushUndo();o.pts.splice(vi,1)}savePlan();draw();bar();return}
  if(r.v==='round'){
    const q=await ask({title:t('pl_vtx_round'),input:{ph:t('pl_vtx_r'),val:'1',mode:'decimal'},buttons:[{l:t('ok'),v:true,c:'pri'},{l:t('cancel'),v:false}]});
    const R=pn(q.text);if(!q.v||!(R>0))return;pushUndo();roundCorner(o,vi,R);savePlan();draw();
  }
}
function roundCorner(o,vi,R){
  const n=o.pts.length,v=o.pts[vi],pr=o.pts[(vi-1+n)%n],nx=o.pts[(vi+1)%n];
  const l1=dist(v,pr),l2=dist(v,nx);if(l1<1e-6||l2<1e-6)return;
  const u1={x:(pr.x-v.x)/l1,y:(pr.y-v.y)/l1},u2={x:(nx.x-v.x)/l2,y:(nx.y-v.y)/l2};
  const th=Math.acos(clamp(u1.x*u2.x+u1.y*u2.y,-1,1));if(th<0.05||th>Math.PI-0.02)return;
  let d=R/Math.tan(th/2);const dm=Math.min(l1,l2)*0.98;if(d>dm){d=dm;R=d*Math.tan(th/2)}
  const phi=Math.PI-th,sag=R*(1-Math.cos(phi/2));
  const cr=(v.x-pr.x)*(nx.y-v.y)-(v.y-pr.y)*(nx.x-v.x),convex=cr*oSign(o)>0;
  const A={x:r2(v.x+u1.x*d),y:r2(v.y+u1.y*d),s:r2(convex?sag:-sag)},B={x:r2(v.x+u2.x*d),y:r2(v.y+u2.y*d),s:v.s||0};
  o.pts.splice(vi,1,A,B);
}
function objSheet(o){
  if(!o)return;const s=clone(o);
  const kindSeg=`<div class="plkinds">${KINDS.map(k=>`<button type="button" class="chip plk ${s.kind===k?'on':''}" data-ok="${k}"><i style="background:${KCOL[k]}"></i>${t('pl_k_'+k)}</button>`).join('')}</div>`;
  const dims=s.shape==='circle'?fld(t('pl_obj_d'),`<input data-o="d" class="num" inputmode="decimal" value="${fm(s.r*2,2)}">`):s.shape==='rect'?`<div class="tgrid" style="grid-template-columns:1fr 1fr"><label><span>${t('pl_obj_w')}</span><input data-o="w" class="num" inputmode="decimal" value="${fm(s.w,2)}"></label><label><span>${t('pl_obj_h')}</span><input data-o="h" class="num" inputmode="decimal" value="${fm(s.h,2)}"></label></div>`:'';
  const body=`${fld(t('pl_obj_name'),`<input data-k="name" class="bidi" value="${esc(s.name||'')}" placeholder="${esc(t('pl_k_'+s.kind))}" autocomplete="off">`)}
  <div class="lab">${t('pl_obj')}</div>${kindSeg}<div class="hint" data-kh style="margin:6px 4px 14px">${t('pl_kh_'+s.kind)}</div>
  ${dims}
  ${ynRow('ruler',t('pl_obj_sub'),'inc',!s.sub,t('yes2'),t('no'))}
  <button type="button" class="btn danger wide" style="margin-top:12px" data-od>${ic('trash',18)} ${t('pl_obj_del')}</button>`;
  const w=sheet({title:tx(s.name)||t('pl_k_'+s.kind),body,onSave:async w=>{
    collect(w,s);s.sub=$('[data-k="inc"]',w).dataset.v!=='1';delete s.inc;
    if(s.shape==='circle'){const d=pn($('[data-o="d"]',w).value);if(d>0)s.r=r2(d/2)}
    if(s.shape==='rect'){const ww=pn($('[data-o="w"]',w).value),hh=pn($('[data-o="h"]',w).value);if(ww>0)s.w=r2(ww);if(hh>0)s.h=r2(hh)}
    pushUndo();const i=P.objs.findIndex(x=>x.id===o.id);if(i>=0)P.objs[i]=s;savePlan();draw();bar();
  }});
  bindForm(w,s);
  $('.plkinds',w).onclick=e=>{const b=e.target.closest('[data-ok]');if(!b)return;s.kind=b.dataset.ok;$$('[data-ok]',w).forEach(x=>x.classList.toggle('on',x===b));$('[data-kh]',w).textContent=t('pl_kh_'+s.kind);
    const y=$('[data-k="inc"]',w);y.dataset.v=SUB_DEF[s.kind]?'0':'1'};
  $('[data-od]',w).onclick=()=>{pushUndo();P.objs=P.objs.filter(x=>x.id!==o.id);P.marks=P.marks.filter(m=>m.zone!==o.id);ED.sel=null;savePlan();w.close();draw();bar()};
}
function tplSheet(){
  const st={k:'rect'};
  const F=(k,l,v)=>`<label><span>${t(l)}</span><input data-tp="${k}" class="num" inputmode="decimal" value="${v}"></label>`;
  const forms={rect:`<div class="tgrid" style="grid-template-columns:1fr 1fr">${F('w','pl_tpl_w','10')}${F('h','pl_tpl_h','6')}</div>`,
    l:`<div class="hint" style="margin:0 4px 10px">${t('pl_tpl_l_h')}</div><div class="tgrid" style="grid-template-columns:1fr 1fr">${F('a1','pl_tpl_a1','15')}${F('b1','pl_tpl_b1','3')}${F('a2','pl_tpl_a2','10')}${F('b2','pl_tpl_b2','3')}</div>`,
    circle:`<div class="tgrid" style="grid-template-columns:1fr">${F('d','pl_tpl_d','8')}</div>`,
    stadium:`<div class="hint" style="margin:0 4px 10px">${t('pl_tpl_st_h')}</div><div class="tgrid" style="grid-template-columns:1fr 1fr">${F('w','pl_tpl_w','10')}${F('h','pl_tpl_h','6')}</div>`};
  const body=`${seg('k',[['rect',t('pl_tpl_rect')],['l',t('pl_tpl_l')],['circle',t('pl_tpl_circle')],['stadium',t('pl_tpl_stadium')]],'rect','g4')}<div id="tpf">${forms.rect}</div>
  ${P.outlines.length?`<div class="lab">${t('pl_tpl_mode')}</div>${seg('mode',[['replace',t('pl_tpl_replace')],['add',t('pl_tpl_add')]],'replace')}`:''}`;
  st.mode='replace';
  const w=sheet({title:t('pl_tpl'),body,saveLabel:t('done'),onSave:async w=>{
    const v=k=>{const x=$(`[data-tp="${k}"]`,w);return x?pn(x.value):NaN};let pts=null;
    if(st.k==='rect'){const W=v('w'),H=v('h');if(W>0&&H>0)pts=[[0,0,0],[W,0,0],[W,H,0],[0,H,0]]}
    if(st.k==='l'){const A=v('a1'),a=v('b1'),B=v('a2'),b=v('b2');if(A>0&&a>0&&B>0&&b>0&&A>b&&B>a)pts=[[0,0,0],[A,0,0],[A,a,0],[b,a,0],[b,B,0],[0,B,0]]}
    if(st.k==='circle'){const D=v('d');if(D>0){const R=D/2,c=R*Math.SQRT2,sg=R*(1-Math.SQRT1_2);pts=[[R,0,sg],[2*R,R,sg],[R,2*R,sg],[0,R,sg]];void c}}
    if(st.k==='stadium'){const W=v('w'),H=v('h');if(W>0&&H>0)pts=[[0,0,0],[W,0,H/2],[W,H,0],[0,H,0]]}
    if(!pts){toast('⚠️');throw new Error('v')}
    pushUndo();
    let ox=0,oy=0;if(st.mode==='add'&&P.outlines.length){const b=contentBox();ox=r2(b.x+b.w);oy=r2(b.y)}else{if(P.outlines.length)P.outlines=[]}
    P.outlines.push({id:uid(),pts:pts.map(([x,y,s])=>({x:r2(x+ox),y:r2(y+oy),s:r2(s)}))});P.calibrated=true;
    savePlan();fit();draw();bar();
  }});
  bindForm(w,st,(k,val)=>{if(k==='k')$('#tpf',w).innerHTML=forms[val]});
}
function photoSheet(){
  const b=P.bg;
  const body=`<div class="note">${t('pl_photo_hint')}</div>
  <label class="btn ${b?'':'pri'} wide" style="display:flex">${ic('camera',20)} ${b?t('pl_photo_replace'):t('pl_photo_load')}<input type="file" accept="image/*" hidden data-ph></label>
  ${b?`<button class="btn pri wide" style="margin-top:10px" data-cal>${ic('ruler',18)} ${t('pl_photo_cal')}</button>
  <button class="btn wide" style="margin-top:10px" data-rot>${ic('rot',18)} ${t('pl_photo_rot')}</button>
  <div class="lab" style="margin-top:14px">${t('pl_photo_op')}</div><input type="range" min="0.15" max="1" step="0.05" value="${b.op==null?.6:b.op}" data-op style="padding:0;border:0;background:none">
  <button class="btn danger wide" style="margin-top:14px" data-phdel>${ic('trash',18)} ${t('pl_photo_del')}</button>`:''}`;
  const w=sheet({title:t('pl_photo'),left:t('close'),tapOut:true,body});
  $('[data-ph]',w).onchange=async e=>{const f=e.target.files[0];if(!f)return;try{
      const {img,url}=await loadImg(f);const src=drawImg(img,1800,.82);URL.revokeObjectURL(url);
      const im=new Image();await new Promise((r,j)=>{im.onload=r;im.onerror=j;im.src=src});
      const pw=im.naturalWidth,ph=im.naturalHeight,cb=contentBox();
      const mpp=cb?Math.max(cb.w,cb.h)*1.3/Math.max(pw,ph):20/pw;
      P.bg={src,pw,ph,mpp,x:cb?cb.x-(pw*mpp-cb.w)/2:0,y:cb?cb.y-(ph*mpp-cb.h)/2:0,rot:0,op:.6};
      savePlan(true);w.close();ED.mode='draw';if(!P.outlines.length){fit();ED.tool.draw='pts'}draw();bar();
      setTimeout(()=>{if(!ED)return;ED.calib=[];hint();draw()},450);
    }catch(x){toast('⚠️ photo')}};
  if(!b)return;
  $('[data-cal]',w).onclick=()=>{w.close();ED.mode='draw';ED.calib=[];ED.pts=[];draw();bar()};
  $('[data-rot]',w).onclick=()=>{P.bg.rot=((P.bg.rot||0)+90)%360;savePlan();draw()};
  $('[data-op]',w).oninput=e=>{P.bg.op=+e.target.value;draw()};
  $('[data-op]',w).onchange=()=>savePlan();
  $('[data-phdel]',w).onclick=()=>{P.bg=null;savePlan(true);w.close();draw();bar()};
}
async function calibAsk(){
  const [a,b]=ED.calib,d=dist(a,b);
  const r=await ask({title:t('pl_photo_cal'),input:{ph:t('pl_cal_len'),val:'',mode:'decimal'},buttons:[{l:t('ok'),v:true,c:'pri'},{l:t('cancel'),v:false}]});
  const L=pn(r.text);ED.calib=null;
  if(r.v&&L>0&&d>1e-6){pushUndo();scaleAll(L/d,{x:a.x,y:a.y});P.calibrated=true;savePlan();toast(t('pl_cal_done'));fit();ED.tool.draw='pts'}
  draw();bar();
}

/* ================= этапы ================= */
function stageSug(){let ts={};try{ts=typeStats()}catch(e){}const types=data.types.filter(x=>x.name).sort((a,b)=>((ts[b.id]||{}).n||0)-((ts[a.id]||{}).n||0)).map(x=>x.name);const out=[];const add=n=>{if(n&&!out.some(v=>keyOf(v)===keyOf(n)))out.push(n)};STAGE_SUG.forEach(add);types.forEach(add);return out}
async function stageAdd(){
  const dl=$('#plstdl');if(dl)dl.innerHTML=stageSug().map(n=>`<option value="${esc(n)}">`).join('');
  const r=await ask({title:t('pl_stage_new'),input:{ph:t('pl_stage_ph'),list:'plstdl'},buttons:[{l:t('add'),v:true,c:'pri'},{l:t('cancel'),v:false}]});
  if(!r.v||!r.text)return;
  pushUndo();const tp=data.types.find(x=>keyOf(x.name)===keyOf(r.text));
  const st={id:uid(),name:r.text,typeId:tp?tp.id:''};P.stages.push(st);ED.stage=st.id;P.lastStage=st.id;ED.mode='work';savePlan();draw();bar();
}
async function stageMenu(id){
  const st=P.stages.find(s=>s.id===id);if(!st)return;
  const r=await ask({title:stageName(st),buttons:[{l:t('pl_stage_rename'),v:'ren',c:'pri'},{l:t('pl_stage_del'),v:'del',c:'danger'},{l:t('cancel'),v:false}]});
  if(r.v==='ren'){const q=await ask({title:t('pl_stage_rename'),input:{val:st.name},buttons:[{l:t('save'),v:true,c:'pri'},{l:t('cancel'),v:false}]});if(q.v&&q.text){pushUndo();st.name=q.text;savePlan();bar()}}
  if(r.v==='del'){if(await confirmDlg(t('pl_stage_del_q',stageName(st)),'')){pushUndo();P.stages=P.stages.filter(s=>s.id!==id);P.marks=P.marks.filter(m=>m.st!==id);ED.stage=(P.stages[0]||{}).id;savePlan();draw();bar()}}
}

/* ================= в отчёт дня ================= */
function reportSheet(){
  const st=P.stages.find(s=>s.id===ED.stage),ss=stageState(P,ED.stage,ED.date);
  if(!st||!ss||ss.today<=0){toast(t('pl_rep_zero'));return}
  const d=getDay(ED.date),area=Math.round(ss.today*10)/10;
  const works=[];d.sites.forEach(s=>s.works.forEach(w=>works.push({s,w})));
  const k=keyOf(st.name),score=x=>(st.typeId&&x.w.typeId===st.typeId?3:0)+(keyOf(x.w.name).includes(k)||k.includes(keyOf(x.w.name))?2:0)+(P.place&&x.s.place===P.place?1:0);
  works.sort((a,b)=>score(b)-score(a));
  const sel={wid:works.length&&score(works[0])>0?works[0].w.id:'',mode:'add'};
  const row=x=>`<button type="button" class="prs ${sel.wid===x.w.id?'on':''}" data-wid="${x.w.id}"><span class="av">${ic('ruler',20)}</span><div style="min-width:0;flex:1"><span class="bidi">${esc(tx(x.w.name))}</span><small class="bidi">${esc(siteName(x.s))}${String(x.w.fact||'').trim()?' · '+esc(x.w.fact)+' '+esc(x.w.unit||''):''}</small></div></button>`;
  const body=`${fld(t('pl_rep_area'),`<input data-ra class="num" inputmode="decimal" value="${fm(area,1)}" style="font-size:26px;font-weight:900">`)}
  <div class="lab">${t('pl_rep_pick')}</div>
  <div id="rpw">${works.map(row).join('')||`<div class="note">${t('pl_rep_none')}</div>`}</div>
  ${d.sites.length?d.sites.map(s=>`<button type="button" class="btn wide" style="margin-bottom:6px" data-addw="${s.id}">${esc(t('pl_rep_new',tx(st.name)))} · ${esc(siteName(s))}</button>`).join(''):`<button type="button" class="btn pri wide" data-addsite>${ic('plus',18)} ${esc(t('pl_rep_site',[P.place,SECT[P.surface]].filter(Boolean).join(' · ')))}</button>`}
  <div style="margin-top:12px">${seg('mode',[['add',t('pl_rep_add')],['set',t('pl_rep_set')]],'add')}</div><div class="hint" id="rpv" style="margin:0 4px"></div>`;
  const w=sheet({title:t('pl_rep_t'),body,saveLabel:t('save'),onSave:async w=>{
    const v=pn($('[data-ra]',w).value);const x=works.find(y=>y.w.id===sel.wid);
    if(!x||!(v>=0)){toast(t('pl_rep_pick'));throw new Error('v')}
    const old=pn(x.w.fact),nv=sel.mode==='add'&&isFinite(old)?old+v:v;
    x.w.fact=String(Math.round(nv*100)/100).replace('.',',');
    await persistDay(d);toast(t('pl_rep_ok'));
  }});
  const prev=()=>{const x=works.find(y=>y.w.id===sel.wid),v=pn($('[data-ra]',w).value);const el=$('#rpv',w);if(!x||!isFinite(v)){el.textContent='';return}
    const old=pn(x.w.fact),nv=sel.mode==='add'&&isFinite(old)?old+v:v;el.textContent=t('pl_rep_was',isFinite(old)?fm(old,2):'—',fm(nv,2))};
  bindForm(w,sel,()=>prev());
  $('#rpw',w).onclick=e=>{const b=e.target.closest('[data-wid]');if(!b)return;sel.wid=b.dataset.wid;$$('[data-wid]',w).forEach(x=>x.classList.toggle('on',x===b));prev()};
  $('[data-ra]',w).oninput=prev;
  const addSite=$('[data-addsite]',w);if(addSite)addSite.onclick=async()=>{
    const s={id:uid(),place:P.place||'',section:SECT[P.surface]||'',auto:true,init:[],works:[]};d.sites.push(s);
    if(P.place)remember('places',P.place);if(s.section)remember('sections',s.section);
    addSite.remove();const nn=$('#rpw .note',w);if(nn)nn.remove();await addW(s.id)};
  const addW=async sid=>{
    const s=d.sites.find(x=>x.id===sid);if(!s)return;
    let tp=data.types.find(x=>st.typeId?x.id===st.typeId:keyOf(x.name)===keyOf(st.name));
    if(!tp){tp={id:uid(),name:st.name,unit:'м²',created:Date.now()};data.types.push(tp);await put('types',tp)}
    let wk=s.works.find(x=>x.typeId===tp.id);if(!wk){wk={id:uid(),typeId:tp.id,name:tp.name,unit:tp.unit||'м²',plan:'',fact:''};s.works.push(wk)}
    st.typeId=tp.id;savePlan();works.unshift({s,w:wk});sel.wid=wk.id;$('#rpw',w).innerHTML=works.filter((x,i,a)=>a.findIndex(y=>y.w.id===x.w.id)===i).map(row).join('');const bb=$(`[data-addw="${sid}"]`,w);if(bb)bb.remove();prev();
  };
  $$('[data-addw]',w).forEach(b=>b.onclick=()=>addW(b.dataset.addw));
  prev();
}

/* ================= настройки плана, меню ================= */
function placesDL(){return `<datalist id="plpl">${(S.places||[]).map(p=>`<option value="${esc(p)}">`).join('')}</datalist>`}
function settingsSheet(){
  const s={surface:P.surface};
  const body=`${fld(t('pl_name'),`<input data-k="name" class="bidi" value="${esc(P.name)}" autocomplete="off">`)}
  ${fld(t('pl_place'),`<input data-k="place" class="bidi" list="plpl" value="${esc(P.place||'')}" placeholder="${esc(t('pl_place_ph'))}" autocomplete="off">`)}${placesDL()}
  <div class="lab">${t('pl_surface')}</div>${seg('surface',[['floor',t('pl_s_floor')],['wall',t('pl_s_wall')],['ceiling',t('pl_s_ceiling')]],s.surface)}
  <div class="lab">${t('pl_stages')}</div><div class="crow wrap">${P.stages.map(x=>`<span class="chip on">${esc(stageName(x))}</span>`).join('')||`<span class="hint">${t('pl_stage_none')}</span>`}</div>
  <div class="hint" style="margin:4px 4px 0">${t('pl_stages_hint')}</div>`;
  const w=sheet({title:t('pl_settings'),body,onSave:async w=>{collect(w,s);if(!s.name)throw new Error('v');P.name=s.name;P.place=s.place;P.surface=s.surface;if(s.place)remember('places',s.place);savePlan();bar()}});
  bindForm(w,s);
}
async function menu(){
  const r=await ask({title:P.name,buttons:[{l:t('pl_settings'),v:'set',c:'pri'},{l:t('pl_share_img'),v:'img'},{l:t('pl_dup'),v:'dup'},{l:t('pl_del'),v:'del',c:'danger'},{l:t('cancel'),v:false}]});
  if(r.v==='set')return settingsSheet();
  if(r.v==='img')return shareImage(P,ED.stage,ED.date);
  if(r.v==='dup'){const c=clone(P);c.id=uid();c.name=P.name+t('pl_copy');c.created=c.updated=Date.now();await savePlan(true);data.plans.push(c);await put('plans',c);await touch();const id=c.id;await close();setTimeout(()=>open(id),300);return}
  if(r.v==='del'){if(await confirmDlg(t('pl_del_q'),esc(t('pl_del_t')))){const id=P.id;clearTimeout(saveT);await del('plans',id);data.plans=data.plans.filter(x=>x.id!==id);GCACHE.delete(id);await touch();const el=$('#pled');if(el)el.remove();document.body.classList.remove('plopen');unlockScroll();P=null;ED=null;render()}}
}

/* ================= картинка плана для WhatsApp ================= */
async function shareImage(p,stId,date){
  try{
    const prevP=P;P=p;
    let pts=[];p.outlines.forEach(o=>pts=pts.concat(dens(o,24)));p.objs.forEach(o=>pts=pts.concat(oPoly(o)));const b=bboxPts(pts);if(!b){P=prevP;toast(t('pl_need_outline'));return}
    const W=1200,pad=60,head=150,scale=Math.min((W-2*pad)/Math.max(b.w,1),1400/Math.max(b.h,1)),H=Math.round(b.h*scale+2*pad+head+70);
    const px=1/scale*1.6;
    const inner=planSVG(p,{px,stage:stId,date,noBg:true,uid:'img'});
    const st=p.stages.find(s=>s.id===stId),ss=stId?stageState(p,stId,date):null,g=grid(p);
    const line1=[p.place,t('pl_s_'+p.surface)].filter(Boolean).join(' · ');
    const line2=ss?`${stageName(st)}: ${t('pl_stats',fa(ss.done),fa(ss.work),pct(ss.done,ss.work))}${ss.today>0?' · '+t('pl_stats_day',fa(ss.today)):''}`:(g?`${t('pl_area')} ${fa(g.roomA)} ${M2()}`:'');
    P=prevP;
    const e=s=>esc(s);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#e6e9ee"/>
      <text x="${pad}" y="70" font-size="44" font-weight="800" fill="#12161c" font-family="-apple-system,system-ui,sans-serif">${e(p.name)}</text>
      <text x="${pad}" y="108" font-size="26" fill="#4a5361" font-family="-apple-system,system-ui,sans-serif">${e(line1)} · ${e(fmt(date))}</text>
      <text x="${pad}" y="140" font-size="26" font-weight="700" fill="#12161c" font-family="-apple-system,system-ui,sans-serif">${e(line2)}</text>
      <g transform="translate(${pad-b.x*scale} ${head+pad-b.y*scale}) scale(${scale})">${inner}</g>
      <g font-size="22" font-family="-apple-system,system-ui,sans-serif" fill="#2a313b">${[[COL.prev,t('pl_legend_prev')],[COL.day,t('pl_legend_day')],[COL.redo,t('pl_legend_redo')]].map(([c,l],i)=>`<rect x="${pad+i*330}" y="${H-52}" width="26" height="26" rx="6" fill="${c}"/><text x="${pad+i*330+36}" y="${H-31}">${e(l)}</text>`).join('')}</g></svg>`;
    const img=new Image();const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url});
    const c=document.createElement('canvas');c.width=W;c.height=H;c.getContext('2d').drawImage(img,0,0);URL.revokeObjectURL(url);
    let blob=await new Promise(r=>c.toBlob(r,'image/png'));
    if(!blob){const du=c.toDataURL('image/png'),bin=atob(du.split(',')[1]),u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);blob=new Blob([u8],{type:'image/png'})}
    await shareFile(blob,`plan-${keyOf(p.name)||'room'}-${date}.png`,'image/png',p.name);
  }catch(x){toast('⚠️ '+(x&&x.message||'img'))}
}

/* ================= вкладка «План»: список ================= */
function thumb(p,stId){
  const polys=p.outlines.filter(x=>x.pts.length>2);if(!polys.length)return `<span class="plth0">${ic('plan',34)}</span>`;
  let pts=[];polys.forEach(o=>pts=pts.concat(dens(o,24)));const b=bboxPts(pts),m=Math.max(b.w,b.h)*0.08+0.2;
  const px=Math.max(b.w,b.h)/110;
  return `<svg viewBox="${r3(b.x-m)} ${r3(b.y-m)} ${r3(b.w+2*m)} ${r3(b.h+2*m)}" width="104" height="92" aria-hidden="true">${planSVG(p,{px,mini:true,stage:stId,date:iso(),uid:'t'+p.id})}</svg>`;
}
function listHTML(){ensureAr();
  const ps=data.plans.map(fixPlan).slice().sort((a,b)=>(b.updated||0)-(a.updated||0));
  let h=`<div class="plbeta">${ic('spark',18)}<span>${t('pl_beta')}</span></div>`;
  if(!ps.length)return h+`<div class="plempty"><div class="plemi">${ic('plan',46)}</div><h3>${t('pl_empty_t')}</h3><p>${t('pl_empty_s')}</p><button class="fb solid" data-plnew>${ic('plus',18)} ${t('pl_new')}</button></div>`;
  const today=iso();
  h+=ps.map(p=>{
    const stId=(p.stages.find(s=>s.id===p.lastStage)||p.stages[0]||{}).id,g=grid(p);
    const bars=p.stages.slice(0,3).map(s=>{const ss=stageState(p,s.id,today);if(!ss)return '';const pc=pct(ss.done,ss.work);
      return `<div class="plbar"><span class="bidi">${esc(stageName(s))}</span><i><b style="width:${pc}%"></b>${ss.redo>0?`<u style="width:${pct(ss.redo,ss.work)}%"></u>`:''}</i><em class="num">${pc}%${ss.today>0?` · +${fa(ss.today)}`:''}</em></div>`}).join('');
    const sub=[p.place,t('pl_s_'+p.surface),g?fa(g.workA)+' '+M2():t('pl_no_outline'),p.objs.some(o=>o.kind==='zone')?t('pl_zones_n',p.objs.filter(o=>o.kind==='zone').length):''].filter(Boolean).join(' · ');
    return `<div class="card plcard" data-pid="${p.id}"><div class="plthumb">${thumb(p,stId)}</div><div class="ct"><div class="nm bidi">${esc(p.name)}</div><div class="sub bidi" style="white-space:normal">${esc(sub)}</div>${bars}</div></div>`;
  }).join('');
  return h;
}
function listClick(e){
  if(e.target.closest('[data-plnew]'))return newSheet();
  const c=e.target.closest('[data-pid]');if(c)open(c.dataset.pid);
}
function newSheet(){ensureAr();
  const n=data.plans.length+1,sug=stageSug().slice(0,16),picked=new Set();
  const s={surface:'floor',start:'draw'};
  const body=`${fld(t('pl_name'),`<input data-k="name" class="bidi" value="${esc(t('pl_def_name',n))}" autocomplete="off">`)}
  ${fld(t('pl_place'),`<input data-k="place" class="bidi" list="plpl" value="${esc((S.places||[])[0]||'')}" placeholder="${esc(t('pl_place_ph'))}" autocomplete="off">`)}${placesDL()}
  <div class="lab">${t('pl_surface')}</div>${seg('surface',[['floor',t('pl_s_floor')],['wall',t('pl_s_wall')],['ceiling',t('pl_s_ceiling')]],'floor')}
  <div class="lab">${t('pl_stages')}</div><div class="crow wrap" id="nsg">${sug.map(x=>`<button type="button" class="chip" data-sg="${esc(x)}">${esc(tx(x))}</button>`).join('')}</div>
  <div class="hint" style="margin:4px 4px 14px">${t('pl_stages_hint')}</div>
  <div class="lab">${t('pl_start')}</div>${seg('start',[['draw',t('pl_st_draw')],['tpl',t('pl_st_tpl')],['photo',t('pl_st_photo')]],'draw')}`;
  const w=sheet({title:t('pl_new'),body,saveLabel:t('add'),onSave:async w=>{
    collect(w,s);if(!s.name){toast(t('pl_name'));throw new Error('v')}
    const order=sug.filter(x=>picked.has(x));
    const p={id:uid(),name:s.name,place:s.place||'',surface:s.surface,outlines:[],objs:[],stages:order.map(x=>{const tp=data.types.find(y=>keyOf(y.name)===keyOf(x));return {id:uid(),name:x,typeId:tp?tp.id:''}}),marks:[],created:Date.now(),updated:Date.now()};
    await put('plans',p);data.plans.push(p);await touch();if(s.place)remember('places',s.place);
    const start=s.start;
    setTimeout(()=>open(p.id,()=>{if(start==='tpl')tplSheet();else if(start==='photo')photoSheet()}),380);
  }});
  bindForm(w,s);
  $('#nsg',w).onclick=e=>{const b=e.target.closest('[data-sg]');if(!b)return;const v=b.dataset.sg;picked.has(v)?picked.delete(v):picked.add(v);b.classList.toggle('on',picked.has(v))};
}

/* ================= стили модуля ================= */
const CSS=`
.plbeta{display:flex;gap:10px;align-items:flex-start;background:var(--sigbg);border:1.5px dashed var(--sig);border-radius:16px;padding:10px 12px;margin:4px 0 12px;font-size:13.5px;font-weight:650;line-height:1.4}
.plbeta .ic{flex:none;margin-top:1px}
.plempty{text-align:center;padding:26px 14px}.plempty h3{font-size:22px;font-weight:850;margin:14px 0 6px}.plempty p{color:var(--sub);margin:0 0 18px;font-size:15px;line-height:1.45}
.plemi{width:96px;height:96px;border-radius:28px;background:var(--hero);color:var(--sig);display:grid;place-items:center;margin:0 auto}
.plcard{display:flex;gap:12px;align-items:flex-start}
.plthumb{width:116px;height:104px;border-radius:14px;background:var(--soft);display:grid;place-items:center;flex:none;overflow:hidden}
.plth0{color:var(--sub)}
.plcard .ct{flex:1;min-width:0}
.plbar{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 8px;margin-top:8px;font-size:12.5px;font-weight:700}
.plbar span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.plbar em{font-style:normal;color:var(--sub);font-weight:800}
.plbar i{grid-column:1/-1;height:7px;border-radius:99px;background:var(--soft);overflow:hidden;display:flex}
.plbar i b{background:#2fbf5b;height:100%}.plbar i u{background:#e5484d;height:100%}
.pled{position:fixed;inset:0;z-index:45;background:var(--bg);display:flex;flex-direction:column;opacity:0;transform:translateY(16px);transition:opacity .25s var(--ease),transform .3s var(--ease)}
.pled.open{opacity:1;transform:none}
body.plopen .tabs,body.plopen #fab,body.plopen #selbar{display:none}
.plt{display:flex;align-items:center;gap:8px;padding:calc(8px + env(safe-area-inset-top)) 10px 8px;background:var(--card);border-bottom:1.5px solid var(--line)}
.plib{width:42px;height:42px;border-radius:13px;background:var(--soft);display:grid;place-items:center;flex:none;color:var(--ink)}
.plib.red{background:var(--badbg);color:var(--bad)}
.pltt{flex:1;min-width:0;text-align:center;display:flex;flex-direction:column;align-items:center}
.pltt b{font-size:16.5px;font-weight:850;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pltt small{font-size:12px;color:var(--sub);font-weight:650;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.plm{margin:8px 10px 0}
.plc{position:relative;flex:1;min-height:0;margin:8px 10px 0;border-radius:20px;border:1.5px solid var(--line);overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;
 background-color:#f4f6f8;background-image:radial-gradient(#cfd6df 1.1px,transparent 1.2px);background-size:22px 22px}
@media(prefers-color-scheme:dark){.plc{background-color:#1b2028;background-image:radial-gradient(#323a46 1.1px,transparent 1.2px)}}
.plc>svg{display:block;position:absolute;inset:0}
.plhint{position:absolute;left:8px;right:8px;top:8px;background:rgba(18,22,28,.84);color:#fff;font-size:13px;font-weight:650;line-height:1.35;padding:8px 6px 8px 11px;border-radius:12px;pointer-events:none;display:flex;gap:6px;align-items:flex-start}
.plhint span{flex:1}.plhint button{pointer-events:auto;flex:none;width:30px;height:30px;margin:-4px 0;border-radius:9px;display:grid;place-items:center;color:#fff;background:rgba(255,255,255,.12)}
.plfloat{position:absolute;left:8px;right:8px;bottom:8px;pointer-events:none;display:flex;justify-content:flex-start}
.plfloat>*{pointer-events:auto}
.plarea{display:flex;gap:6px;flex-wrap:wrap}.plarea span{background:#12161c;color:#fff;border-radius:11px;padding:6px 10px;font-size:13px;font-weight:650}.plarea b{color:var(--sig);font-weight:900}
.plsel{display:flex;align-items:center;gap:8px;background:var(--card);border:1.5px solid var(--line);border-radius:16px;padding:8px 8px 8px 12px;box-shadow:0 8px 24px -10px rgba(0,0,0,.4);width:100%}
.plsel div{flex:1;min-width:0}.plsel b{display:block;font-size:15px;font-weight:850;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.plsel small{display:block;font-size:12.5px;color:var(--sub);font-weight:650}
.plsel .btn{min-height:40px;padding:0 12px}
.plfit{position:absolute;right:8px;bottom:56px;width:42px;height:42px;border-radius:13px;background:var(--card);border:1.5px solid var(--line);display:grid;place-items:center;color:var(--ink)}
[dir=rtl] .plfit{right:auto;left:8px}
.plbot{background:var(--card);border-top:1.5px solid var(--line);margin-top:8px;padding:8px 10px calc(10px + env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:8px}
.plrow{display:flex;gap:6px;align-items:stretch}
.pltb{flex:1;min-width:0;min-height:54px;border-radius:14px;background:var(--soft);border:1.5px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:11.5px;font-weight:800;color:var(--ink)}
.pltb span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 2px}
.pltb.on{background:#12161c;color:#fff;border-color:#12161c}.pltb.on .ic{color:var(--sig)}
.pltb.has{border-color:var(--sig)}
@media(prefers-color-scheme:dark){.pltb.on{background:var(--sig);color:#12161c;border-color:var(--sig)}.pltb.on .ic{color:#12161c}}
.plrow2{display:flex;gap:8px}.plrow2 .btn{flex:1}
.plchips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:0 -10px;padding:0 10px}
.plchips::-webkit-scrollbar{display:none}.plchips .chip{flex:none}
.chip.plk i{width:10px;height:10px;border-radius:3px;display:inline-block;margin-inline-end:6px}
.plkh{font-size:12.5px;color:var(--sub);font-weight:650;padding:0 4px}
.plkinds{display:flex;flex-wrap:wrap;gap:6px}
.plres{flex:none;width:auto;display:flex;margin:0;padding:3px}.plres button{min-width:46px;min-height:46px}
.plres button.on.red{background:#e5484d;color:#fff}
.plbw{display:flex;gap:6px}.plbw .chip{flex:1;justify-content:center;gap:6px}.plbw i{display:inline-block;border-radius:50%;background:currentColor;opacity:.75}
.plstat{display:flex;align-items:center;gap:8px}
.pldate{position:relative;flex:none;min-height:44px;padding:0 10px;border-radius:12px;background:var(--soft);border:1.5px solid var(--line);display:flex;align-items:center;font-size:12.5px;font-weight:800}
.pldate input{position:absolute;inset:0;opacity:0;width:100%;height:100%;padding:0;border:0}
.plst{flex:1;min-width:0;line-height:1.25}.plst b{display:block;font-size:13px;font-weight:850}.plst small{display:block;font-size:12px;color:var(--sub);font-weight:700}
.plst em{font-style:normal}.plst em.dy{color:#a88b00}.plst em.rd{color:var(--bad)}
@media(prefers-color-scheme:dark){.plst em.dy{color:var(--sig)}}
.plstat .btn{flex:none;min-height:44px;padding:0 12px}
.plleg{display:flex;gap:12px;flex-wrap:wrap;font-size:11.5px;font-weight:700;color:var(--sub)}.plleg span{display:flex;align-items:center;gap:5px}.plleg i{width:12px;height:12px;border-radius:4px;display:inline-block}
.seg.g4{display:grid;grid-template-columns:repeat(2,1fr)}
.prs.on{border-color:var(--ink);box-shadow:0 0 0 2px var(--sig) inset}
`;
function injectCSS(){if(document.getElementById('plcss'))return;const st=document.createElement('style');st.id='plcss';st.textContent=CSS;document.head.appendChild(st)}
injectCSS();

window.PL={init,listHTML,listClick,newSheet,open,close,
  /* для проверки */ _t:{straighten,grid,stageState,dens,roundCorner,shareImage,get P(){return P},get ED(){return ED}}};
})();
