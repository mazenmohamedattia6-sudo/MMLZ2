const letters=[
{id:'tired',mood:'تعبانة',icon:'🌙',color:'#8fa3c7',title:'افتحيه لما تكوني تعبانة',paras:[
"حبيبتي ملك... لو بتقري الكلام ده يبقى إنتي تعبانة، وقلبي معاكي دلوقتي.",
"خدي نفس عميق، واقعدي، وسيبي كل حاجة شوية. إنتي مش لازم تشيلي الدنيا لوحدك، أنا هنا جنبك.",
"وأنا خايف عليكي من قلبك وضهرك، فارتاحي ومتشيليش حاجة تقيلة. اللي عليكي إنك تهتمي بنفسك بس.",
"تخيلي إني ضامّك دلوقتي وبطبطب عليكي، وكل التعب ده بيروح. حضني ليكي في أي وقت.",
"وأول ما ترتاحي، هعملك الهوت شوكليت اللي بتحبيه ونقف في البلكونة نتكلم ونضحك.",
"بحبك يا ملوكتي، وإنتي أقوى مما تتخيلي."]},
{id:'miss',mood:'وحشتك',icon:'💭',color:'#d69aa6',title:'افتحيه لما أكون وحشتك',paras:[
"لو وحشتك... فاعرفي إن أنا اللي وحشتني أكتر.",
"بشوفك في كل حتة، وبتخيلك في كل مكان، وبتخيل مواقف بينا يا ملوكتي.",
"افتكري ضحكتنا، وخناقتنا الصغيرة اللي بنضحك عليها بعدها، والبلكونة، والهوت شوكليت.",
"كلميني حتى لو مفيش سبب. أنا عمري ما هزهق منك.",
"وكل يوم بيعدّي هو خطوة أقرب لليوم اللي هنكون فيه مع بعض على طول، إن شاء الله.",
"وحشتيني يا ملك... بحبك أكتر من أي حاجة في حياتي."]},
{id:'sad',mood:'زعلانة',icon:'🍃',color:'#9bb5a2',title:'افتحيه لما تكوني زعلانة',paras:[
"لو زعلانة وأنا السبب... فحقك عليا يا ملك.",
"عارف إني ضغطت عليكي الفترة اللي فاتت، ومش عايزك تشيلي في قلبك حاجة مني.",
"وده مش معناه إني مش بحبك، بالعكس، إنتي أغلى حاجة عندي في حياتي.",
"فكّي من الزعل وتعالي نتكلم، وأنا هسمعك للآخر وهعوّضك عن كل حاجة.",
"ولو الزعل من حاجة تانية، احكيلي وأنا هبقى سندك. إنتي عمرك ما هتبقي لوحدك.",
"ضحكتك وحشاني... بحبك."]},
{id:'happy',mood:'فرحانة',icon:'✨',color:'#e0be84',title:'افتحيه لما تكوني فرحانة',paras:[
"لو فرحانة... فأنا أسعد واحد في الدنيا، لأن ضحكتك هي أحلى حاجة بشوفها.",
"عيشي الفرحة دي للآخر، واضحكي من قلبك زي ما بحب.",
"ومتنسيش إنك بتنوّري أي مكان تدخليه، زي النجم الساطع بالظبط.",
"وأنا فخور بيكي أوي، وبحمد ربنا دايمًا إنك معايا وإني اخترت صح.",
"يلا نحتفل... هعملك الأكل اللي بتحبيه وأدلعك.",
"بحبك يا أم ليلي ويزن ❤"]}
];
const $=s=>document.querySelector(s),grid=$('#grid'),modal=$('#modal'),lbody=$('#lbody'),ltitle=$('#ltitle');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let token=0,skip=false;
letters.forEach(l=>{
  const e=document.createElement('div');e.className='env';e.id='e-'+l.id;e.style.setProperty('--c',l.color);
  e.innerHTML='<div class="box"><div class="shade"></div><div class="flap"></div><div class="seal">'+l.icon+'</div></div><div class="lbl">افتحيه لما تكوني</div><div class="mood">'+l.mood+'</div>';
  e.onclick=()=>openLetter(l,e);grid.appendChild(e);
});
async function openLetter(l,el){
  el.classList.add('opening');await wait(750);
  const my=++token;skip=false;
  ltitle.textContent=l.title;lbody.innerHTML='';lbody.classList.add('cur');
  modal.classList.add('show');await wait(700);
  for(const t of l.paras){
    if(my!==token)return;
    const p=document.createElement('p');lbody.appendChild(p);
    for(let k=1;k<=t.length;k++){
      if(my!==token)return;
      p.textContent=skip?t:t.slice(0,k);if(skip)break;
      const ch=t[k-1];await wait(ch==='.'||ch==='،'?220:ch===' '?45:32);
    }
    p.textContent=t;
    $('#letter').scrollTop=$('#letter').scrollHeight;
    if(!skip)await wait(500);
  }
  lbody.classList.remove('cur');el.classList.add('read');
}
$('#letter').addEventListener('click',e=>{if(e.target.id!=='close')skip=true});
$('#close').onclick=()=>{token++;modal.classList.remove('show');document.querySelectorAll('.env.opening').forEach(e=>e.classList.remove('opening'))};
$('#start').onclick=()=>{
  $('#intro').classList.add('gone');
  const a=$('#song');a.volume=0;a.play().catch(()=>{});
  let v=0;const fi=setInterval(()=>{v=Math.min(v+.02,.6);a.volume=v;if(v>=.6)clearInterval(fi)},150);
};
$('#mute').onclick=()=>{const a=$('#song');a.muted=!a.muted;$('#mute').textContent=a.muted?'🔇':'🔊'};
const cv=$('#bg'),x=cv.getContext('2d');let W,H,S=[];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;S=Array.from({length:Math.min(120,W/6)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.3,p:Math.random()*6,s:Math.random()*.02+.006}))}
rs();addEventListener('resize',rs);
(function f(){x.clearRect(0,0,W,H);for(const s of S){s.p+=s.s;x.globalAlpha=.2+.5*Math.abs(Math.sin(s.p));x.fillStyle='#eef1fa';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()}x.globalAlpha=1;requestAnimationFrame(f)})();
