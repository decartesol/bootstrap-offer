(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2763:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2090)}])},1770:function(e){"use strict";e.exports={reactStrictMode:!0,basePath:"/bootstrap-offer",images:{unoptimized:!0}}},2090:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return H}});var o,a,s,r,i=n(5250),c=n(2934),l=n(1770);let d="9Mi32KJbNY3U7kfB8A1Uv8KMukRBa6JKcMYLZSizS6g",u=new c.PublicKey(d),h="decartesol",m="https://twitter.com/".concat(h),g=l.basePath;var p=n(79),f=n(8484),w=n(6581),y=n(4528);let b=new c.Connection("https://rpc.helius.xyz/?api-key=".concat("5962c4a2-f7d8-45e2-8444-fdbe1f4b09a8"),"confirmed");async function x(e){try{let t=await (0,y.getFavoriteDomain)(b,e),{reverse:n}=t;if(console.log("domain name for ".concat(e.toBase58()," is"),n),n)return{has:!0,domain:"".concat(n,".sol")};return console.log("weird case where we got a response but no domain name",t),{has:!1,case:s.NoDomainInResponse}}catch(e){if("Favourite domain not found"===e.message)return{has:!1,case:s.UserHasNoDomain};return console.log("Favorite domain error is unknown"),console.log(e.message),console.log(e),{has:!1,case:s.UnknownDomainError}}}(o=s||(s={})).NoDomainInResponse="NoDomainInResponse",o.UserHasNoDomain="UserHasNoDomain",o.UnknownDomainError="UnknownDomainError";let j=(0,f.Ue)()((0,w.tJ)((e,t)=>({snsCache:{},async getDomain(n){let o={...t().snsCache},a=n.toBase58(),s=!1;if(void 0!==o[a]){let e;let t=o[a];try{e=new Date(t.expiresAt)}catch(e){console.log("Failed to parse expiry for ".concat(a)),console.log(e)}if(void 0===e)delete o[a],s=!0;else if(Date.now()>e.getTime())delete o[a],s=!0;else if(t.address!==a)console.log("Cache mistmach. key is ".concat(a," value is ").concat(t.address)),delete o[a],s=!0;else{let e=t.domainName;if(null==e)return;return e}}if(s&&e({snsCache:o}),void 0!==o[a])throw Error("Unexpected state, cache item present");let r=await x(n),i=new Date(Date.now()+864e5);return o[a]={expiresAt:i.toUTCString(),address:a,domainName:r.has?r.domain:null},e({snsCache:o}),r.has?r.domain:void 0}}),{name:"spa-store"})),v=e=>{let{address:t,showDomain:n}=e,[o,a]=p.useState(void 0),{getDomain:s}=j(e=>{let{getDomain:t}=e;return{getDomain:t}}),r=t.toBase58();return p.useEffect(()=>{n?(async()=>{a(await s(t))})():a(void 0)},[t,n]),(0,i.jsx)("a",{href:"https://explorer.solana.com/address/".concat(r),children:o||r})};var k=n(6355);let S=()=>(0,i.jsxs)("p",{children:[(0,i.jsx)("b",{children:"Disclaimer:"})," This is not a binding investment contract, and I nor anyone else has a responsibility for the financial success of DLMT or to return sent SOL in case the project fails. By sending SOL you acknowledge it may end up being a total loss and that nobody else is responsible for this loss but yourself. Bootstrap at your own risk."]});var N=n(8853),O=n.n(N),E=n(8063),T=n.n(E),C=n(4984).Buffer;(a=r||(r={})).NotImplemented="NotImplemented",a.UnknownError="UnknownError",a.NotConnected="NotConnected";let L=!1,B=e=>{let{onClose:t,open:n,onConnect:o}=e,[a,s]=p.useState(n),[l,d]=p.useState(!1),[u,h]=p.useState(!1);function m(){let e=window.phantom;return void 0!==e}function f(){let e=window.solflare;return e&&e.isSolflare}async function w(){if(!f()){window.open("https://solflare.com","_blank");return}let e=window.solflare;async function n(){let n=await e.connect();if(console.log("got solflare connect result",n),n){let n=e.publicKey;o(n,y),t()}}e.on("accountChanged",async function(){for(var e,t=arguments.length,o=Array(t),a=0;a<t;a++)o[a]=arguments[a];e=async()=>{console.log("account changed",o),await n()},L||e(),L=!0,setTimeout(()=>{L=!1})}),await n()}async function y(e){try{let t=window.solflare,n=await t.connect();if(!n)return{success:!1,errorCode:r.NotConnected,errorMsg:"solflare not connected"};let o=t.publicKey,a=await b.getLatestBlockhash();e.recentBlockhash=a.blockhash,e.feePayer=o;let s=await t.signTransaction(e);console.log("solflare signed",s);let i=await b.sendRawTransaction(s.serialize());console.log("solflare sent",i);let{blockhash:c,lastValidBlockHeight:l}=await b.getLatestBlockhash();return await b.confirmTransaction({blockhash:c,lastValidBlockHeight:l,signature:i}),{success:!0,sig:i}}catch(e){return console.log("solflare send error",e),{success:!1,errorCode:r.UnknownError,errorMsg:e.message}}}async function x(){if(!m()){window.open("https://phantom.app/","_blank");return}let e=window.phantom,n=e.solana;async function a(){let e;try{let t=await n.connect();e=t.publicKey}catch(e){console.log("got error when trying to connect"),console.log(e)}void 0!==e&&(o(e,j),t())}n.on("accountChanged",e=>{e?(console.log("account changed to",e.toBase58()),o(e,j)):(console.log("account changed w/ no new pk"),a())}),await a()}async function j(e){try{let t=window.phantom,n=t.solana,{publicKey:o}=await n.connect(),a=await b.getLatestBlockhash();e.recentBlockhash=a.blockhash,e.feePayer=o;let{publicKey:s,signature:r}=await n.request({method:"signTransaction",params:{message:T().encode(e.serializeMessage())}});console.log("got signed",s,r),e.addSignature(new c.PublicKey(s),C.from(T().decode(r)));let i=e.serialize(),l=await b.sendRawTransaction(i);console.log("sent tx sig",l);let{blockhash:d,lastValidBlockHeight:u}=await b.getLatestBlockhash();return await b.confirmTransaction({blockhash:d,lastValidBlockHeight:u,signature:l}),{success:!0,sig:l}}catch(e){return console.log("phantom send error",e),{success:!1,errorCode:r.UnknownError,errorMsg:e.message}}}return p.useEffect(()=>{let e=m();d(e);let t=f();h(t)},[]),p.useEffect(()=>{n?(document.documentElement.setAttribute("class","modal-is-open modal-is-opening"),s(!0),setTimeout(()=>{document.documentElement.setAttribute("class","modal-is-open")},1e3)):(document.documentElement.setAttribute("class","modal-is-open modal-is-closing"),setTimeout(()=>{document.documentElement.removeAttribute("class"),s(!1)},1e3))},[n]),(0,i.jsx)("dialog",{id:"modal-example",open:a,children:(0,i.jsx)("article",{style:{padding:"40px ".concat(30,"px 20px ").concat(30,"px"),width:350},children:(0,i.jsxs)("section",{className:"container",style:{marginBottom:0,width:"100%"},children:[(0,i.jsxs)("button",{className:u?"contrast":"secondary",onClick:e=>{e.preventDefault(),w()},style:{position:"relative"},children:[(0,i.jsx)(D,{path:"".concat(g,"/solflare.png"),name:"Solflare"}),"Solflare"]}),(0,i.jsxs)("button",{className:l?"contrast":"secondary",onClick:e=>{e.preventDefault(),x()},style:{position:"relative"},children:[(0,i.jsx)(D,{path:"".concat(g,"/phantom.png"),name:"Phantom"}),"Phantom"]}),(0,i.jsx)("button",{onClick:e=>{e.preventDefault(),t()},children:"Close"})]})})})},D=e=>{let{path:t,name:n}=e;return(0,i.jsx)("div",{style:{position:"absolute",left:15,top:"50%",marginTop:"-".concat(15,"px")},children:(0,i.jsx)(O(),{src:t,height:30,width:30,alt:n})})},I=async()=>({success:!1,errorCode:r.NotImplemented,errorMsg:"this is the initial sign and send"}),P=()=>{let[e,t]=p.useState(1),[n,o]=p.useState(void 0),{getDomain:a}=j(e=>{let{getDomain:t}=e;return{getDomain:t}}),[s,r]=p.useState(!1),[l,d]=p.useState(""),[{signAndSend:h},g]=p.useState({signAndSend:I});async function f(){if(void 0===n||e<=0)return;let t=new c.Transaction,o=c.SystemProgram.transfer({fromPubkey:n,toPubkey:u,lamports:e*c.LAMPORTS_PER_SOL});t.add(o);let a=await h(t);a.success?console.log("Send succeeded: ".concat(a.sig)):(console.log("Send failed: ".concat(a.sig)),console.log("".concat(a.errorCode,":"),a.errorMsg))}return p.useEffect(()=>{void 0!==n&&(async()=>{let e=await a(n);void 0===e?d(n.toBase58().substring(0,6)+"..."):d(e)})()},[n]),(0,i.jsx)("div",{className:"hero","data-theme":"dark",children:(0,i.jsxs)("header",{className:"container",children:[(0,i.jsxs)("hgroup",{children:[(0,i.jsxs)("h1",{children:["Bootstrap ",(0,i.jsx)(v,{address:u,showDomain:!0})," ",(0,i.jsx)("a",{className:"fa fa-twitter",href:m})]}),(0,i.jsxs)("h2",{children:["Hi, I'm decartes.sol, a SWE with over a decade of programming & system design experience.",(0,i.jsx)("br",{}),"Over the next few years I'll be starting various web 3 projects.",(0,i.jsx)("br",{}),"I want to start these projects under a pseudonym with no traces back to my real identity.",(0,i.jsx)("br",{}),"So, to remain anonymous, I'm asking you to help bootstrap my wallet in exchange for some pre-ICO tokens of my first project.",(0,i.jsx)("br",{}),"I'm collecting ".concat(400," SOL in exchange for ").concat(5,"% (").concat(105e4,") of the total supply of the first project's tokens"),".",(0,i.jsx)("br",{}),"For my first project, I'll be building a DeCLOB on top of Orca Whirlpools: an app which allows user to set limit orders using Orca concentrated liquidity positions with the smallest possible price range.",(0,i.jsx)("br",{}),"Orca is winning the liquidity competition over both Open Book and Raydium while Open Book is stuggling to gain momentum and lacks a user friendly UI, leaving an opening for the product I'm building.",(0,i.jsx)("br",{}),"What will set this product apart is a high quality real-time order book UX available both for desktop browsers and Solana mobile."]})]}),(0,i.jsx)("section",{className:"container",style:{backgroundColor:"none",margin:"0 auto",maxWidth:550},children:(0,i.jsx)(k.iD,{tweetId:"1623764669159833601"})}),(0,i.jsxs)("article",{"data-theme":"light",children:[(0,i.jsxs)("form",{className:"grid",children:[(0,i.jsxs)("label",{htmlFor:"send",children:["Send SOL:",(0,i.jsx)("input",{type:"number",id:"send",name:"send",value:e,"aria-label":"Send Sol",required:!0,max:5,min:.1,step:.1,style:{backgroundColor:"white"},onChange:e=>{let n=Math.min(Math.max(function(e){let t=Number(e);return isNaN(t)?0:t}(e.target.value),.1),5);t(n)}})]}),(0,i.jsxs)("label",{htmlFor:"get",children:["Receive DLMT:",(0,i.jsx)("input",{value:Math.round(e/400*105e6)/100,readOnly:!0})]}),void 0===n?(0,i.jsx)("button",{type:"submit",onClick:e=>{e.preventDefault(),r(!0)},children:"Connect Wallet"}):(0,i.jsxs)("div",{children:["Connected as ",l,(0,i.jsx)("br",{}),(0,i.jsx)("a",{role:"button",style:{marginTop:5},href:"#",onClick:e=>{e.preventDefault(),f()},children:"Send"}),(0,i.jsx)("a",{role:"button",onClick:e=>{e.preventDefault(),o(void 0),g({signAndSend:I})},style:{marginLeft:10},href:"#",children:"Disconnect"})]}),(0,i.jsx)(B,{onClose:()=>{r(!1)},open:s,onConnect:(e,t)=>{o(e),g({signAndSend:t})}})]}),(0,i.jsx)(S,{})]})]})})};var M=n(8704),_=n.n(M);let R="tx-cache",A=new Set(["6uJksYpHzaGauqotdozG7RwHNX8Xg2BKtJPQwgmUWF9W",d]),U={promise:F()};async function F(){let e=(await b.getConfirmedSignaturesForAddress2(u,void 0,"confirmed")).map(e=>e.signature);"1"!==localStorage.getItem("".concat(R,"-version"))&&(localStorage.setItem(R,"{}"),localStorage.setItem("".concat(R,"-version"),"1"));let t=JSON.parse(localStorage.getItem(R)),n=[];e.forEach(e=>{void 0===t[e]&&n.push(e)}),console.log("Loaded   metadata for ".concat(Object.keys(t).length," txs from cache")),console.log("Fetching metadata for ".concat(n.length," txs: ").concat(JSON.stringify(n)));let o=await b.getParsedTransactions(n),a={};Object.entries(t).forEach(e=>{let[t,n]=e;Object.entries(n).forEach(e=>{let[t,n]=e;void 0===a[t]?a[t]=new(_()).BN(n):a[t]=a[t].add(new(_()).BN(n))})});let s=new Set(n);o.forEach((e,n)=>{if(null==e)return;let o={};if(e.transaction.signatures.length<1)throw Error("Got a tx with ".concat(e.transaction.signatures.length," sigs"));let r=e.transaction.signatures[0];if(!s.has(r))throw Error("Tx sig ".concat(r," is missing from transaction sigs. Sigs of tx are ").concat(JSON.stringify(e.transaction.signatures)));for(let t in e.transaction.signatures){let n=e.transaction.signatures[t];if(n!==r&&s.has(n))throw Error("Got unexpected sig ".concat(n," at index ").concat(t," in ").concat(JSON.stringify(e.transaction.signatures)))}e.transaction.message.instructions.forEach((e,t)=>{let{parsed:n,program:s,programId:r}=e;if(!c.SystemProgram.programId.equals(r))return;let{type:i,info:l}=n;if("transfer"!==i)return;let{destination:u,source:h,lamports:m}=l;u===d&&(A.has(h)||(void 0===a[h]?a[h]=new(_()).BN(m):a[h]=a[h].add(new(_()).BN(m)),void 0===o[h]?o[h]=new(_()).BN(m).toString():o[h]=new(_()).BN(o[h]).add(new(_()).BN(m)).toString()))}),t[r]=o}),localStorage.setItem(R,JSON.stringify(t));let r=Object.entries(a);r.sort((e,t)=>{let[n,o]=e,[a,s]=t;return s.sub(o).toNumber()});let i=Object.values(a).reduce((e,t)=>e.add(t),new(_()).BN(0));return console.log("".concat(i.toNumber()/c.LAMPORTS_PER_SOL," SOL collected from ").concat(r.length," addresses")),r.forEach((e,t)=>{let[n,o]=e;console.log("".concat(n," sent ").concat(o.toNumber()/c.LAMPORTS_PER_SOL))}),{total:i.toNumber()/c.LAMPORTS_PER_SOL,senders:Object.fromEntries(r)}}let z=()=>{let[e,t]=p.useState(-1),[n,o]=p.useState({});return p.useEffect(()=>{(async()=>{let{total:e,senders:n}=await U.promise;t(e),o(n)})()},[]),{received:e,senders:n}},q=["21 million max supply","Deflationary. Every dapp tx causes small amount of supply to be bought & burnt so token captures revenue over time. In the stock market, companies are valued based on current or future projected cash flow which in theory is/will be returned to shareholders as dividends or stock buybacks. Tokens should do the same, otherwise I find it difficult to justify why a token should have any value.","21% goes to founder (me) locked for several years (might be standard 4 year vest w/ 1 year cliff that begins after ICO to be held at future date). 29% is reserved for employee incentives and private raises. 50% goes to public through offers like this or through smart contract ICO-like offerings."],K=()=>{let{received:e,senders:t}=z();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)("h3",{children:"Terms of Deal"}),(0,i.jsxs)("p",{children:["The first ".concat(400," SOL sent to my address")," ",(0,i.jsx)(v,{address:u})," ","will get \n                    ".concat(5,"% of the first project's supply (so for example if you send ").concat(4," SOL you will get back ").concat(10500," tokens).\n                    Deal will no longer apply after ").concat(400," SOL has been received.\n                    There will be future raises but probably at a much higher market cap once the project is actually live.")]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("b",{children:"DO NOT send me very much SOL!"})," ","I would much prefer many people get involved in this project so I can ask you all questions on ",(0,i.jsx)("a",{href:m,children:"twitter"})," to help guide product development. \n                    Let us maximize the community size (to speed up development and organic marketing) while minimizing any one individual's exposure in case the project fails."]}),(0,i.jsx)(S,{})]}),(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)("h3",{children:"Projects"}),(0,i.jsx)("p",{children:"Bootstrappers will receive DLMT tokens for the first project (delimit.sol), which will be a limit order book dex aggregator. Mainly it will allow users to place limit orders on Orca Whirlpools but I might include Raydium concentrated liquidity too.\n                    I do plan on having some kind of Web 3 Labs group which has a token that extracts value from all the Labs' child projects,\n                    but the details on this aren't clear to me yet. Bootstrapers will be given a way to gain ownership in this meta project as well as the initial project.\n                    Here are my planned projects (in no particular order):"}),(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:"On-chain limit order book aggregating concetrated liquidity dexes: delimit.sol"}),(0,i.jsx)("li",{children:"Solana-based gitopia competitor: degit.sol"}),(0,i.jsx)("li",{children:"Web 3 persistent world mmorts game (imagine age of empires + factorio + evony): demesne.sol"}),(0,i.jsx)("li",{children:"On-chain ETFs and NFT funds (web 3 REITs), controlled by DAO and/or algorithmically (BlackRock, Vanguard competitor)"})]})]}),(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)("h3",{children:"Project Tokenomics"}),(0,i.jsx)("p",{children:"All the projects will have the same tokenomics:"}),(0,i.jsx)("ul",{children:q.map((e,t)=>(0,i.jsx)("li",{children:e},t))}),(0,i.jsx)("p",{children:"These tokenomics are not finalized. What I am sharing here is a working draft to give bootstrappers an idea of my general approach to fundraising, value capture, and allocation."})]}),(0,i.jsxs)("div",{className:"container",children:[(0,i.jsxs)("h3",{children:["Bootstrap Progress: ",-1===e?"loading...":"".concat(e," SOL recieved (").concat(Math.round(1e4*e/400)/100,"% of ").concat(400,")")]}),(0,i.jsx)("p",{children:"Bootstrapers Leaderboard:"}),(0,i.jsx)("ul",{children:Object.entries(t).map(e=>{let[t,n]=e;return(0,i.jsx)("li",{children:(0,i.jsxs)(i.Fragment,{children:[Math.round(100*n.toNumber()/c.LAMPORTS_PER_SOL)/100," SOL from ",(0,i.jsx)(v,{address:new c.PublicKey(t),showDomain:!0})]})},t)})})]}),(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)("h3",{children:"Got Questions/Feedback?"}),(0,i.jsxs)("p",{children:["Follow my twitter for updates, questions, comments, and suggestions:"," ",(0,i.jsxs)("a",{href:m,children:["@",h]})]})]})]})};var W=n(2),J=n.n(W);function H(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(J(),{children:[(0,i.jsx)("title",{children:"decartes.sol"}),(0,i.jsx)("link",{rel:"icon",href:"".concat(l.basePath,"/favicon.ico")})]}),(0,i.jsx)(P,{}),(0,i.jsx)(K,{})]})}},2184:function(){},3448:function(){},4712:function(){},9365:function(){}},function(e){e.O(0,[683,135,774,888,179],function(){return e(e.s=2763)}),_N_E=e.O()}]);