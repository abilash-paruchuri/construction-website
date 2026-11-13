import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile } from 'file:///C:/Users/abila_cb41xgq/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';

process.env.RUNTIME_NODE_MODULES = 'C:/Users/abila_cb41xgq/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const root = process.cwd();
const skill = 'C:/Users/abila_cb41xgq/.codex/plugins/cache/openai-primary-runtime/presentations/26.1112.11217/skills/presentations';
const C = { cream:'#F7F6F2', burgundy:'#6F2631', ink:'#252A2D', gold:'#B98A4B', pale:'#D8B981', muted:'#6F7072', white:'#FFFFFF' };
const deck = Presentation.create({slideSize:{width:1280,height:720}});
function text(s,content,x,y,w,h,size=26,color=C.ink,bold=false) {
  const t=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  t.text=content;
  t.text.style={typeface:'Arial',fontSize:size,color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};
  return t;
}
function slide(title,number,dark=false) {
  const s=deck.slides.add();s.background.fill=dark?C.burgundy:C.cream;
  text(s,title,64,60,1140,112,48,dark?C.cream:C.burgundy);
  text(s,'WishNu Construction & Development',64,665,850,24,15,dark?C.pale:C.muted);
  text(s,String(number).padStart(2,'0'),1150,660,65,28,18,dark?C.pale:C.burgundy);
  return s;
}
function note(s,body,sources=[]) { s.speakerNotes.text=body+'\n\nSources: '+sources.join('; '); }
function node(s,title,sub,x,y,w=270,h=130,dark=false) {
  const n=s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill:dark?C.burgundy:C.white,line:{fill:C.gold,width:1.3}});
  n.text=title+'\n'+sub;n.text.style={typeface:'Arial',fontSize:23,color:dark?C.white:C.ink,insets:18,verticalAlignment:'middle',alignment:'center',autoFit:'none'};return n;
}
function link(s,a,b,from='right',to='left') {s.shapes.connect(a,b,{kind:((from==='right'||from==='left')&&(to==='right'||to==='left'))?'straight':'elbow',fromSide:from,toSide:to,line:{fill:C.gold,width:2},tail:{type:'triangle',width:'med',length:'med'}});}

// 1. A restrained brand cover.
{
 const s=slide('WishNu',1,true);
 text(s,'Website presentation',64,225,1100,95,72,C.cream);
 text(s,'Design, visitor experience and architecture',68,343,1080,75,30,C.pale);
 text(s,'Client review\n13 November 2026',68,510,700,90,23,C.cream);
 note(s,'This presentation introduces the current WishNu website and the client experience. It includes ten slides in total. The website is a local implementation, with publication and live enquiry delivery to be confirmed.', ['src/App.tsx','src/index.css']);
}
// 2. Purpose grounded in supplied company data.
{
 const s=slide('A website that supports project enquiries',2);
 text(s,'Help hotel owners understand WishNu’s experience, explore relevant work and start a project conversation.',64,190,1120,130,34);
 const cols=[['20','completed hotel projects'],['2013','experience begins'],['3 states','Indiana, Ohio and Michigan']];
 cols.forEach(([a,b],i)=>{text(s,a,64+i*390,385,360,100,64,C.burgundy);text(s,b,64+i*390,495,345,70,24,C.muted);});
 note(s,'The company figures come from the supplied website content. They are not independently audited. The website presents renovation and reopening experience while describing ground-up hotel construction as an expanding offering. The objective is to make that experience easier for prospective clients to assess.', ['src/data.ts','src/components/About.tsx']);
}
// 3. Native editable sequence diagram.
{
 const s=slide('The curtain entrance',3,true);
 text(s,'A branded welcome opens into the homepage',64,175,1130,70,32,C.cream);
 const a=node(s,'Welcome','WishNu identity',64,310,245,150);
 const b=node(s,'Enter WishNu','Visitor chooses to continue',366,310,245,150);
 const c=node(s,'Curtains open','Two panels move apart',668,310,245,150);
 const d=node(s,'Homepage','Hotel imagery and headline',970,310,245,150);
 link(s,a,b);link(s,b,c);link(s,c,d);
 text(s,'1.25-second entrance transition. Skip and Escape remain available.',64,535,1130,65,25,C.pale);
 note(s,'The existing welcome screen includes an initial curtain reveal. The updated Enter action uses a second curtain opening to reveal the already-mounted homepage underneath. It completes after 1,250 milliseconds. Reduced-motion visitors bypass the timed transition. Session storage remembers entry for the browser session. Direct section anchors bypass the welcome, and #welcome explicitly replays it. The footer also offers replay. This is website behavior, not an embedded PowerPoint animation.', ['src/components/WelcomeScreen.tsx','src/App.tsx','src/index.css']);
}
// 4. Typography illustrates the actual visual direction without a fake UI.
{
 const s=slide('Visual design and motion',4);
 text(s,'Building places.\nElevating stays.',64,197,740,190,65,C.burgundy);
 text(s,'Burgundy, cream and gold\nLarge editorial typography\nHotel photography as the focus',835,205,365,210,26);
 text(s,'Image wipes introduce each featured hotel. Scroll reveals and subtle parallax carry the motion through the page.',64,460,1120,120,30);
 note(s,'The website uses DM Sans and Cormorant Garamond. The presentation uses Arial for portable editing. The design takes inspiration from the Maman reference, retaining WishNu branding and its own content. Three unwanted construction photos have been removed. Hero slides feature hotel properties. Shared reveal effects, section rules and hover transitions create continuity. CSS and JavaScript honor reduced-motion preferences.', ['src/components/Hero.tsx','src/components/SiteMotion.tsx','src/components/ui.tsx','src/index.css','https://www.maman-corp.com/']);
}
// 5. Native editable sitemap grouped into visitor stages.
{
 const s=slide('Website structure',5);
 const a=node(s,'Introduction','Welcome and homepage',64,205,320,115,true);
 const b=node(s,'Project evidence','Portfolio and renovation results',480,205,320,115,true);
 const c=node(s,'Project conversation','Contact details and enquiry form',896,205,320,115,true);
 link(s,a,b);link(s,b,c);
 text(s,'Experience\nConstruction services',64,370,320,115,27);
 text(s,'Hotel inspiration\nBuilding process',480,370,320,115,27);
 text(s,'Development expansion\nFooter and welcome replay',896,370,320,120,27);
 text(s,'One continuous page with section navigation and project-detail dialogs',64,555,1130,65,27,C.burgundy);
 note(s,'This is a grouped information architecture, not separate application routes. Actual section order: home, marquee, about, services, projects, renovation results, hotel inspiration, process, expansion, contact and footer. The header links to Home, Experience, Services, Projects, Results and Contact. Project details open in a dialog.', ['src/App.tsx','src/components/Navbar.tsx','src/components/Projects.tsx']);
}
// 6. Flat service list.
{
 const s=slide('Construction services',6,true);
 const items=[['Ground-up hotel construction','An expanding offering for new hotel development'],['Full renovation and conversion','Building systems, rooms and property finishes'],['PIP and partial renovation','Targeted improvements for brand requirements'],['Closed-property reopening','Coordinated work through opening readiness'],['Construction completion','A path forward for unfinished hotel projects'],['Upgrades and maintenance','Focused repairs and ongoing property upkeep']];
 items.forEach(([a,b],i)=>{const x=i%2?670:64,y=195+Math.floor(i/2)*145;text(s,a,x,y,535,63,28,C.cream);text(s,b,x,y+67,535,62,22,C.pale);});
 note(s,'These six service categories match the website. Ground-up development is described as an expanding offering. Do not describe it as a completed portfolio of ground-up work unless the client supplies evidence.', ['src/components/Services.tsx']);
}
// 7. The real portfolio photograph stays separate from editable content.
{
 const s=slide('The portfolio makes experience tangible',7);
 const bytes=await fs.readFile(path.join(root,'.deck-build/kokomo.jpg'));
 s.images.add({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/jpeg',alt:'BlissPoint Inn Kokomo official property photograph',fit:'cover',position:{left:64,top:195,width:660,height:390}});
 text(s,'Bliss Point Inn\nKokomo, Indiana',775,200,435,105,32,C.burgundy);
 text(s,'Filter by project scope\nSearch by property or city\nOpen photos and project details\nExplore more properties',775,345,435,220,25);
 text(s,'Published property photograph',64,599,650,25,17,C.muted);
 note(s,'The website offers filters, search, show more and property-detail dialogs. Published photos illustrate properties and do not establish renovation before-and-after evidence. Historical hotel names and representative-photo disclosures remain in the website. The photographed property is BlissPoint Inn Kokomo. No fabricated performance figures are included here.', ['src/components/Projects.tsx','src/components/PropertyPhoto.tsx','src/propertyPhotos.ts','https://www.blisspointinns.com/blisspoint-inn-suites-kokomo.html','https://www.blisspointinns.com/media/catalog/product/cache/8f8fc99967f1f6da36182268eaf001fc/k/o/kokomo.jpeg']);
}
// 8. Architecture diagram uses native PowerPoint objects.
{
 const s=slide('Technical architecture',8);
 const a=node(s,'Visitor browser','Desktop or mobile',64,200,290,120);
 const b=node(s,'React application','Sections and interactions',495,200,290,120,true);
 const c=node(s,'Static website host','Production build output',925,200,290,120);
 link(s,c,b,'left','right');link(s,b,a,'left','right');
 const d=node(s,'Structured content','Company, projects and photos',495,455,290,125);
 const e=node(s,'Google Apps Script','Enquiry endpoint',925,455,290,125);
 link(s,d,b,'top','bottom');link(s,b,e,'bottom','top');
 text(s,'Build tools: Vite, TypeScript and Tailwind CSS',64,605,1100,45,25,C.burgundy);
 note(s,'React runs in the visitor browser. Vite creates a static production build. The current configuration uses the single-file plugin to inline frontend assets into dist/index.html, while property photography remains hosted externally. Structured content lives in source modules. The contact form makes an HTTP POST to the configured Google Apps Script endpoint. A hosting provider is not established by this diagram. The host represents the intended deployment location.', ['package.json','vite.config.ts','src/data.ts','src/portfolio.ts','src/propertyPhotos.ts','src/components/contact/ContactForm.jsx']);
}
// 9. Flow distinguishes configuration from live verification.
{
 const s=slide('How an enquiry reaches the business',9);
 const a=node(s,'Contact form','Required fields and spam trap',64,200,290,125);
 const b=node(s,'POST request','Project details as JSON',495,200,290,125);
 const c=node(s,'Apps Script','Configured backend endpoint',925,200,290,125,true);
 link(s,a,b);link(s,b,c);
 const d=node(s,'Business records','Google Form and Sheet',64,450,290,125);
 const e=node(s,'Email notification','Business inbox',495,450,290,125);
 const f=node(s,'Visitor feedback','Success or error message',925,450,290,125);
 link(s,c,d,'bottom','top');link(s,c,e,'bottom','top');link(s,c,f,'bottom','top');
 text(s,'Live delivery and deployed backend behavior still require an end-to-end test',64,603,1140,42,23,C.burgundy);
 note(s,'The form requires name, email, phone, project type, location and message. Browser-native constraints validate required fields. A honeypot helps catch automated submissions. Frontend code posts JSON as text/plain and checks the returned success value. The supplied backend script creates a Google Form response, appends a Sheet row and sends an email. It then returns JSON. The configured deployed script has not been inspected or tested here, so storage and email delivery are not verified. The arrows summarize handling, not separate sequential APIs between each output. The success response returns from Apps Script to the browser.', ['src/components/contact/ContactForm.jsx','src/data.ts','google-apps-script-contact-submitter.gs']);
}
// 10. Concrete review and launch discussion.
{
 const s=slide('Client review and next steps',10,true);
 text(s,'The demonstration',64,195,500,65,32,C.pale);
 text(s,'Curtain entrance and homepage\nPortfolio search and project details\nServices, results and contact form',64,280,535,240,28,C.cream);
 text(s,'Before launch',695,195,510,65,32,C.pale);
 text(s,'Approve content and property photos\nConfirm hosting and domain\nTest enquiry storage and email\nComplete mobile and browser review',695,280,510,265,27,C.cream);
 text(s,'WishNu Construction & Development',64,565,1120,55,32,C.cream);
 note(s,'Demonstrate the local website. Use #welcome or the footer replay to show the entrance. Show a project search and open a property dialog. Production compilation passed after the visual redesign, while full browser verification remains pending. The developer should complete a live enquiry test without assuming that a configured endpoint proves delivery. Obtain client confirmation for published property images and factual claims before publication.', ['src/components/WelcomeScreen.tsx','src/components/Projects.tsx','src/components/Footer.tsx','src/components/contact/ContactForm.jsx']);
}

await fs.mkdir(path.join(root,'.deck-build/previews'),{recursive:true});
for(let i=0;i<deck.slides.items.length;i++) {
 const png=await deck.export({slide:deck.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(root,`.deck-build/previews/slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
}
const draft=path.join(root,'.deck-build/candidate.pptx');
await (await PresentationFile.exportPptx(deck)).save(draft);
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const result=await finalizePresentation({workspaceDir:root,candidatePath:draft,finalPath:path.join(root,'deliverables/WishNu-Client-Presentation-Final.pptx'),pythonExecutable:'C:/Users/abila_cb41xgq/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],explicitTotalSlideCount:10,requiredNativeChartOwnerSlides:[],requiredNativeTableOwnerSlides:[],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:path.join(root,'.deck-build/validation-final.json')});
console.log(JSON.stringify(result));


